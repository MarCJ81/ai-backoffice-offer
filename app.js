/* ============================================================
   원탭 백오피스 · app.js
   화면 조립: 비교 계산기 · 무료 샘플 신청서 · 문안 복사
   계산·검증은 core.js 가 한다. 여기서는 DOM 만 만진다.
   ============================================================ */
(function () {
  'use strict';

  var C = window.BackofficeCore;
  if (!C) return;
  var F = window.BackofficeForm || null;   // engines/form-engine.js (validator.js)
  if (F && C.useValidator) C.useValidator(F);

  var $ = function (id) { return document.getElementById(id); };

  /* ══════════════ 1. 비교 계산기 ══════════════ */
  var calc = {
    salary: $('in-salary'),
    range: $('range-salary'),
    agency: $('in-agency'),
    plan: $('calc-plan')
  };

  function setText(id, value) {
    var el = $(id);
    if (el) el.textContent = value;
  }

  function setWidth(id, pct) {
    var el = $(id);
    if (el) el.style.width = Math.max(2, Math.min(100, pct)) + '%';
  }

  /* 입력은 화면에 쉼표를 넣어 보여 주고, 계산은 숫자만 떼어 쓴다. */
  function digitsOf(el) { return String(el.value || '').replace(/[^0-9]/g, ''); }
  function numOf(el) {
    var d = digitsOf(el);
    return d === '' ? 0 : Math.min(50000000, Number(d));
  }
  function reformat(el) {
    var start = el.selectionStart;
    var before = 0;
    if (typeof start === 'number') {
      before = String(el.value).slice(0, start).replace(/[^0-9]/g, '').length;
    }
    var digits = digitsOf(el).replace(/^0+(?=\d)/, '').slice(0, 8);
    var out = digits === '' ? '' : C.groupDigits(Number(digits));
    el.value = out;
    if (typeof start === 'number') {
      var idx = 0, seen = 0;
      while (idx < out.length && seen < before) {
        if (/[0-9]/.test(out.charAt(idx))) seen++;
        idx++;
      }
      try { el.setSelectionRange(idx, idx); } catch (err) { /* noop */ }
    }
  }

  function updateCalc() {
    var r = C.comparison({
      salary: numOf(calc.salary),
      agencyFee: numOf(calc.agency),
      planId: calc.plan.value
    });

    setText('out-employee', C.formatKrw(r.employeeTotal));
    setText('out-burden', '+' + C.formatKrw(r.employeeBurden));
    setText('out-agency', C.formatKrw(r.agencyFee));
    setText('out-plan', C.formatKrw(r.planPrice));
    setText('out-plan-name', r.planName);
    setText('out-per-item', C.formatKrw(r.perItem));

    setWidth('bar-employee', r.bars.employee);
    setWidth('bar-agency', r.bars.agency);
    setWidth('bar-plan', r.bars.plan);

    setText('out-save-month', C.formatCompact(r.vsEmployee.month));
    setText('out-save-year', C.formatCompact(r.vsEmployee.year));
    setText('out-save-pct', r.vsEmployee.pct + '%');

    var diff = r.vsAgency.month;
    setText('out-agency-line', diff >= 0
      ? '대행사 이용료와 비교하면 ' + C.formatCompact(diff) + ' 아낍니다.'
      : '대행사 이용료보다 ' + C.formatCompact(-diff) + ' 더 듭니다. 그래도 대행사는 산출물 건수를 정해 두지 않습니다.');
  }

  function syncRange() {
    var v = Math.min(6000000, Math.max(1000000, numOf(calc.salary)));
    calc.range.value = String(v);
  }

  if (calc.salary && calc.agency && calc.plan) {
    calc.salary.addEventListener('input', function () {
      reformat(calc.salary);
      syncRange();
      updateCalc();
    });
    calc.salary.addEventListener('blur', function () {
      if (digitsOf(calc.salary) === '') calc.salary.value = '2,500,000';
      reformat(calc.salary);
      syncRange();
      updateCalc();
    });
    calc.range.addEventListener('input', function () {
      calc.salary.value = C.groupDigits(Number(calc.range.value));
      updateCalc();
    });
    calc.agency.addEventListener('input', function () {
      reformat(calc.agency);
      updateCalc();
    });
    calc.agency.addEventListener('blur', function () {
      if (digitsOf(calc.agency) === '') calc.agency.value = '1,200,000';
      reformat(calc.agency);
      updateCalc();
    });
    calc.plan.addEventListener('change', updateCalc);
    updateCalc();
  }

  /* ══════════════ 2. 신청서 조립 ══════════════ */
  var form = $('sample-form');
  var industrySelect = $('f-industry');
  var sampleList = $('sample-list');
  var storeInput = $('f-store');
  var introInput = $('f-intro');
  var contactInput = $('f-contact');
  var consentInput = $('f-consent');
  var resultBox = $('inquiry-result');
  var resultText = $('inquiry-text');
  var copyBtn = $('btn-copy');
  var submitBtn = $('btn-generate');

  if (industrySelect) {
    C.INDUSTRIES.forEach(function (ind) {
      var opt = document.createElement('option');
      opt.value = ind.id;
      opt.textContent = ind.label;
      industrySelect.appendChild(opt);
    });
    industrySelect.addEventListener('change', function () {
      var ind = C.industryById(industrySelect.value);
      setText('hint-industry', ind ? ind.label + ' 샘플 예시 — ' + ind.hint : '업종에 맞는 샘플을 골라 드립니다.');
    });
  }

  function sampleCheckbox(item, checked) {
    var label = document.createElement('label');
    label.className = 'check-line';
    label.setAttribute('for', 'sample-' + item.id);

    var input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'sample-' + item.id;
    input.name = 'samples';
    input.value = item.id;
    input.checked = !!checked;
    input.dataset.sample = item.id;

    var span = document.createElement('span');
    span.textContent = item.label;

    label.appendChild(input);
    label.appendChild(span);
    return label;
  }

  if (sampleList) {
    C.SAMPLE_TYPES.forEach(function (item) {
      sampleList.appendChild(sampleCheckbox(item, false));
    });
  }

  /* ══════════════ 3. 오류 표시 ══════════════ */
  var ERROR_TARGETS = {
    industry: { input: industrySelect, box: 'err-industry', describedBy: 'err-industry' },
    storeName: { input: storeInput, box: 'err-store' },
    samples: { input: null, box: 'err-samples' },
    intro: { input: introInput, box: 'err-intro' },
    contact: { input: contactInput, box: 'err-contact' },
    consent: { input: consentInput, box: 'err-consent' }
  };

  function clearErrors() {
    Object.keys(ERROR_TARGETS).forEach(function (key) {
      var t = ERROR_TARGETS[key];
      var box = $(t.box);
      if (box) { box.hidden = true; box.textContent = ''; }
      if (t.input) t.input.removeAttribute('aria-invalid');
    });
  }

  function showErrors(errors) {
    Object.keys(errors).forEach(function (key) {
      var t = ERROR_TARGETS[key];
      if (!t) return;
      var box = $(t.box);
      if (box) { box.textContent = errors[key]; box.hidden = false; }
      if (t.input) t.input.setAttribute('aria-invalid', 'true');
    });
  }

  function collect() {
    var picked = [];
    if (sampleList) {
      sampleList.querySelectorAll('input[type="checkbox"]').forEach(function (cb) {
        if (cb.checked) picked.push(cb.value);
      });
    }
    return {
      industry: industrySelect ? industrySelect.value : '',
      storeName: storeInput ? storeInput.value : '',
      samples: picked,
      intro: introInput ? introInput.value : '',
      contact: contactInput ? contactInput.value : '',
      consent: !!(consentInput && consentInput.checked)
    };
  }

  function focusField(key) {
    var t = ERROR_TARGETS[key];
    if (t && t.input) { t.input.focus(); return; }
    if (key === 'samples' && sampleList) {
      var first = sampleList.querySelector('input[type="checkbox"]');
      if (first) first.focus();
    }
  }

  function hideResult() {
    if (resultBox) resultBox.hidden = true;
    if (resultText) resultText.value = '';
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      clearErrors();
      var out = C.buildInquiry(collect());
      if (!out.ok) {
        showErrors(out.errors);
        focusField(out.firstError);
        hideResult();
        return;
      }
      if (resultText) resultText.value = out.text;
      if (resultBox) resultBox.hidden = false;
      if (resultText) {
        resultText.focus();
        resultText.setSelectionRange(0, 0);
      }
      toast('문안을 만들었습니다. 복사해서 보내 주세요.');
    });

    /* 입력을 고치면 그 칸의 오류만 지운다 */
    [industrySelect, storeInput, introInput, contactInput, consentInput].forEach(function (el) {
      if (!el) return;
      el.addEventListener('input', function () { clearFieldError(el); });
      el.addEventListener('change', function () { clearFieldError(el); });
    });
    /* 연락처는 칸을 벗어날 때 보기 좋은 형식으로 정리한다(01012345678 → 010-1234-5678). */
    if (contactInput && F) {
      contactInput.addEventListener('blur', function () {
        var v = String(contactInput.value || '').trim();
        if (!v) return;
        var res = F.validateContact(v);
        if (res.ok && res.value && res.value !== v) contactInput.value = res.value;
      });
    }
    if (sampleList) {
      sampleList.addEventListener('change', function () {
        var box = $('err-samples');
        if (box) { box.hidden = true; box.textContent = ''; }
      });
    }
  }

  function clearFieldError(el) {
    var id = el.id;
    var key = null;
    if (id === 'f-industry') key = 'industry';
    else if (id === 'f-store') key = 'storeName';
    else if (id === 'f-intro') key = 'intro';
    else if (id === 'f-contact') key = 'contact';
    else if (id === 'f-consent') key = 'consent';
    if (!key) return;
    var t = ERROR_TARGETS[key];
    var box = t && $(t.box);
    if (box) { box.hidden = true; box.textContent = ''; }
    el.removeAttribute('aria-invalid');
  }

  var pickBtn = $('btn-pick-recommended');
  if (pickBtn && sampleList) {
    pickBtn.addEventListener('click', function () {
      var wanted = ['reviews', 'blog', 'cardnews'];
      sampleList.querySelectorAll('input[type="checkbox"]').forEach(function (cb) {
        cb.checked = wanted.indexOf(cb.value) >= 0;
      });
      var box = $('err-samples');
      if (box) { box.hidden = true; box.textContent = ''; }
    });
  }

  var clearBtn = $('btn-clear-samples');
  if (clearBtn && sampleList) {
    clearBtn.addEventListener('click', function () {
      sampleList.querySelectorAll('input[type="checkbox"]').forEach(function (cb) { cb.checked = false; });
    });
  }

  /* ══════════════ 4. 복사 · 토스트 ══════════════ */
  var toastTimer = null;
  function toast(message) {
    var root = $('toast-root');
    if (!root) return;
    root.textContent = '';
    var el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    root.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('is-on'); });
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.classList.remove('is-on');
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 250);
    }, 2200);
  }

  function fallbackCopy(text) {
    try {
      if (!resultText) return false;
      resultText.removeAttribute('readonly');
      resultText.select();
      var ok = document.execCommand('copy');
      resultText.setAttribute('readonly', 'readonly');
      return ok;
    } catch (err) {
      return false;
    }
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = resultText ? resultText.value : '';
      if (!text) { toast('먼저 문의 문안을 만들어 주세요.'); return; }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          toast('복사했습니다. 대화창에 붙여넣어 주세요.');
        }, function () {
          toast(fallbackCopy(text) ? '복사했습니다. 대화창에 붙여넣어 주세요.' : '복사가 막혔습니다. 문안을 길게 눌러 복사해 주세요.');
        });
      } else {
        toast(fallbackCopy(text) ? '복사했습니다. 대화창에 붙여넣어 주세요.' : '복사가 막혔습니다. 문안을 길게 눌러 복사해 주세요.');
      }
    });
  }

  /* ══════════════ 5. 기타 ══════════════ */
  var year = $('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* 오류 문구가 실제로 화면에 보이는지 확인할 수 있게 상태를 남긴다 */
  document.documentElement.setAttribute('data-app', 'on');
})();
