/* ============================================================
   원탭 백오피스 · engines/form-engine.js
   ------------------------------------------------------------
   붙인 오픈소스: validator.js 13.12.0 (MIT)
     · 이메일 형식 검증(isEmail)
     · 한국 휴대폰/유선 형식 검증(isMobilePhone ko-KR + 자체 유선 규칙)

   연락처는 '전화 또는 이메일' 한 칸으로 받는다.
   - 전화는 숫자만 남겨 010-1234-5678 / 02-123-4567 형태로 정규화한다.
   - 이메일은 앞뒤 공백 제거 + 소문자 도메인으로 정규화한다.
   - 형식이 틀리면 한국어로 이유를 알려 준다.

   브라우저: window.BackofficeForm / node: require('./engines/form-engine.js')
   ============================================================ */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(root, function (p) {
      try { return require(p); } catch (e) { return null; }
    });
  } else {
    root.BackofficeForm = factory(root, null);
  }
})(typeof self !== 'undefined' ? self : this, function (root, req) {
  'use strict';

  var VERSION = '1.0.0';
  var V = (root && root.validator) || (req ? req('../assets/vendor/validator.min.js') : null) || null;
  var hasValidator = !!(V && typeof V.isEmail === 'function');

  function str(v) { return v === null || v === undefined ? '' : String(v); }
  function trim(v) { return str(v).replace(/^\s+|\s+$/g, ''); }

  /* ---------- 전화 ---------- */

  function digitsOf(v) { return str(v).replace(/[^0-9]/g, ''); }

  /** 한국 전화번호를 보기 좋은 형태로. 모르는 형태면 숫자만 돌려준다. */
  function normalizePhone(v) {
    var d = digitsOf(v);
    if (!d) return '';
    if (d.indexOf('82') === 0 && d.length >= 11) d = '0' + d.slice(2);
    if (d.length === 11 && /^01[016789]/.test(d)) return d.slice(0, 3) + '-' + d.slice(3, 7) + '-' + d.slice(7);
    if (d.length === 10 && /^01[016789]/.test(d)) return d.slice(0, 3) + '-' + d.slice(3, 6) + '-' + d.slice(6);
    if (d.length === 10 && d.indexOf('02') === 0) return '02-' + d.slice(2, 6) + '-' + d.slice(6);
    if (d.length === 9 && d.indexOf('02') === 0) return '02-' + d.slice(2, 5) + '-' + d.slice(5);
    if (d.length === 10 && /^0[3-9]/.test(d)) return d.slice(0, 3) + '-' + d.slice(3, 6) + '-' + d.slice(6);
    if (d.length === 11 && /^0[3-9]/.test(d)) return d.slice(0, 3) + '-' + d.slice(3, 7) + '-' + d.slice(7);
    if (d.length === 8) return d.slice(0, 4) + '-' + d.slice(4); // 1588-0000 등 대표번호
    return d;
  }

  /** 통화 가능한 번호인지: 휴대폰은 validator, 유선·대표번호는 국내 규칙. */
  function isValidPhone(v) {
    var d = digitsOf(v);
    if (d.indexOf('82') === 0 && d.length >= 11) d = '0' + d.slice(2);
    if (!d) return false;
    if (/^01[016789]/.test(d)) {
      if (hasValidator) return V.isMobilePhone(normalizePhone(d), 'ko-KR');
      return d.length === 10 || d.length === 11;
    }
    if (d.indexOf('02') === 0) return d.length === 9 || d.length === 10;
    if (/^0[3-9]/.test(d)) return d.length === 10 || d.length === 11;
    if (/^(15|16|18)[0-9]{2}[0-9]{4}$/.test(d)) return true; // 1588-0000
    return false;
  }

  /* ---------- 이메일 ---------- */

  function normalizeEmail(v) {
    var s = trim(v).replace(/^mailto:/i, '');
    return s.replace(/\s+/g, '').toLowerCase();
  }

  function isValidEmail(v) {
    var s = normalizeEmail(v);
    if (!s || s.length > 254) return false;
    if (/\s/.test(trim(v))) return false; // 주소 안 공백은 오타다
    if (hasValidator) {
      return V.isEmail(s, { allow_utf8_local_part: false, require_tld: true, allow_display_name: false });
    }
    return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(s);
  }

  /* ---------- 연락처 한 칸 ---------- */

  /**
   * validateContact(value) → { ok, kind:'phone'|'email'|'', value, message }
   * - 빈 값은 ok(main 선택 입력).
   * - @ 가 있으면 이메일, 숫자가 7자리 이상이면 전화로 본다.
   */
  function validateContact(value) {
    var raw = trim(value);
    if (!raw) return { ok: true, kind: '', value: '', message: '' };
    if (raw.indexOf('@') >= 0) {
      var email = normalizeEmail(raw);
      if (!isValidEmail(email)) {
        return { ok: false, kind: 'email', value: email, message: '이메일 형식을 확인해 주세요. 예: hello@example.com' };
      }
      return { ok: true, kind: 'email', value: email, message: '' };
    }
    var d = digitsOf(raw);
    if (d.length < 7) {
      return { ok: false, kind: '', value: raw, message: '전화번호나 이메일을 적어 주세요. 전화는 010-1234-5678처럼 숫자 9~11자리입니다.' };
    }
    if (d.length > 15) {
      return { ok: false, kind: 'phone', value: d, message: '전화번호가 너무 깁니다. 010-1234-5678 형식으로 적어 주세요.' };
    }
    var phone = normalizePhone(d);
    if (!isValidPhone(phone)) {
      return { ok: false, kind: 'phone', value: phone, message: '전화번호 형식이 맞지 않습니다. 010-1234-5678 또는 02-123-4567처럼 적어 주세요.' };
    }
    return { ok: true, kind: 'phone', value: phone, message: '' };
  }

  function status() {
    return { version: VERSION, hasValidator: hasValidator };
  }

  return {
    VERSION: VERSION,
    hasValidator: hasValidator,
    status: status,
    trim: trim,
    digitsOf: digitsOf,
    normalizePhone: normalizePhone,
    isValidPhone: isValidPhone,
    normalizeEmail: normalizeEmail,
    isValidEmail: isValidEmail,
    validateContact: validateContact
  };
});
