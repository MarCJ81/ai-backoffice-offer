/* ============================================================
   원탭 백오피스 · core.js
   소개 페이지의 계산·검증·문안 생성 로직. DOM 없이 돌아간다.
     브라우저: window.BackofficeCore
     node    : require('./core.js')
   ============================================================ */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.BackofficeCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var VERSION = '1.0.0';

  /* ── 고용 비용 가정 ─────────────────────────────────────
     사업주 부담 4대보험 10.9%(국민연금 4.5 + 건강 3.545 + 장기요양 0.4594
     + 고용 0.9 + 산재 0.7 내외)와 퇴직금 충당 8.33%(1/12)를 더한다.
     급여 외 비용을 빼고 "월급 250만"만 비교하면 실제보다 싸 보이므로
     계산기에는 이 배수를 명시한다. */
  var BURDEN = {
    insurance: 0.109,
    severance: 0.0833,
    rate: 1.109 + 0.0833,
    label: '4대보험 사업주 부담 10.9% + 퇴직금 충당 8.33%'
  };

  /* ── 요금제 ─────────────────────────────────────────────
     price 는 부가세 포함 금액. monthlyItems 는 한 달 산출물 건수로,
     "1건당 얼마"를 보여 주는 데만 쓴다(월간 리포트는 건수에서 뺀다). */
  var PLANS = [
    {
      id: 'light',
      name: '라이트',
      price: 290000,
      monthlyItems: 14,
      tagline: '한두 가지만 맡겨 보는 시작',
      forWhom: '리뷰 답글만, 또는 블로그만 먼저 맡기고 싶은 가게',
      recommended: false,
      includes: [
        '리뷰 답글 월 12건 (주 3회)',
        '블로그 원고 2편 (제목·본문·키워드 포함)',
        '월간 리포트 1장 (무엇을 했고 무엇이 달라졌는지)',
        '영업일 24시간 안에 초안, 수정 1회'
      ],
      turnaround: '영업일 24시간 안에 초안'
    },
    {
      id: 'standard',
      name: '스탠다드',
      price: 390000,
      monthlyItems: 30,
      tagline: '리뷰·블로그·카드뉴스·견적서를 한 사람이',
      forWhom: '직원 한 명 뽑을까 고민하던 가게 대부분',
      recommended: true,
      includes: [
        '리뷰 답글 월 20건 (평일 매일)',
        '블로그 원고 4편',
        '카드뉴스 4장 (한 세트)',
        '견적서·안내문 2건',
        '법규 검수 (의료법·표시광고법에 걸리는 표현 제거)',
        '접수 후 4영업시간 안에 초안, 수정 2회',
        '다음 달에 쓸 키워드 3개 제안'
      ],
      turnaround: '접수 후 4영업시간 안에 초안'
    },
    {
      id: 'pro',
      name: '프로',
      price: 690000,
      monthlyItems: 30,
      tagline: '가게 전용 툴까지 붙이는 단계',
      forWhom: '지점이 둘 이상이거나 문구 실험까지 하고 싶은 가게',
      recommended: false,
      includes: [
        '스탠다드 구성 전부',
        '가게 전용 커스텀 웹툴 1종 (가게 이름·업종·브랜드 색으로 제작, 소유권은 사장님)',
        '채널별 문구 A/B 2세트',
        '월 1회 30분 전략 통화',
        '새 메뉴·이벤트 문구 초안 월 4건 추가',
        '우선 응대 (2영업시간 안에 회신)'
      ],
      turnaround: '2영업시간 안에 회신 · 초안은 당일'
    }
  ];

  /* ── 추가 옵션 ─────────────────────────────────────────
     요금제 위에 하나만 얹는 별도 구축 상품. price 는 부가세 포함 1회 구축비,
     monthly 는 서버·호스팅 유지비다(Cloudflare Workers 무료 티어 = 0원).
     무료 티어 한도는 공식 문서 기준 일 10만 요청 · 요청당 CPU 10ms. */
  var ADDONS = [
    {
      id: 'teamroom',
      name: '사내 AI 팀 회의실 포털 구축',
      headline: '기획·마케팅·CS·검수 기본 봇 + 업종별 부서(방) 무제한 · Cloudflare 무료 티어',
      price: 990000,
      monthly: 0,
      buildDays: 5,
      freeQuotaPerDay: 100000,
      bots: [
        { role: '기획', does: '이번 주 무엇부터 할지 순서를 잡습니다' },
        { role: '마케팅', does: '채널별 문구·콘텐츠 초안을 씁니다' },
        { role: 'CS', does: '문의 답변 초안을 사장님 말투로 만듭니다' },
        { role: '검수', does: '법규·오탈자·톤을 보고 걸리는 문장을 지웁니다' }
      ],
      forWhom: '직원이 다섯 명을 넘고, 같은 질문이 세 번씩 반복되는 회사',
      includes: [
        '한 방에 네 봇 (기획·마케팅·CS·검수) — 대표가 한 줄 던지면 담당 봇이 이어받습니다',
        '업종에 맞춰 개발·디자인·영상·홍보·재무·영업 등 부서(방)를 원하는 만큼 추가 — 방 수 제한 없이 같은 구조로 늘립니다',
        '사내 전용 주소 — 초대 링크와 비밀번호로만 열리고 검색에 노출되지 않습니다',
        'Cloudflare 무료 티어 배포 — 서버·호스팅 월 0원 (일 10만 요청까지 무료)',
        '이미 쓰는 AI 구독·API 키를 연결 — AI 정액료를 새로 내지 않습니다',
        '대화 기록은 회사 저장소에 남기고 모델 학습에 넘기지 않습니다',
        '구축 5영업일, 사용법 30분 화상 1회, 첫 달 무상 수정'
      ],
      sampleId: 'teamroom',
      sampleLabel: '사내 AI 팀 회의실 구성안 1장'
    }
  ];

  var INDUSTRIES = [
    { id: 'food', label: '식당·카페', hint: '리뷰 답글 3개 + 카드뉴스 4장 구성안' },
    { id: 'clinic', label: '동네 병원·의원', hint: '리뷰 답글 3개 (의료법 검수 포함)' },
    { id: 'interior', label: '인테리어·시공', hint: '견적서 1건 + 블로그 원고 1편' },
    { id: 'commerce', label: '스마트스토어·쇼핑몰', hint: '상품 블로그 원고 1편 + 카드뉴스 구성안' },
    { id: 'academy', label: '학원·교습소', hint: '학부모 안내문 1건 + 블로그 원고 1편' },
    { id: 'etc', label: '기타 업종', hint: '리뷰 답글 3개부터' }
  ];

  var SAMPLE_TYPES = [
    { id: 'reviews', label: '리뷰 답글 3개' },
    { id: 'blog', label: '블로그 원고 1편' },
    { id: 'cardnews', label: '카드뉴스 4장 구성안' },
    { id: 'estimate', label: '견적서 1건' },
    { id: 'linkpage', label: '원탭 링크 페이지 1장' },
    { id: 'teamroom', label: '사내 AI 팀 회의실 구성안 1장' }
  ];

  /* 실제로 배포되어 돌아가는 페이지. 소개 페이지의 "이 수준의 결과물" 증거. */
  var TOOLS = [
    {
      id: 'review',
      name: '사장님 리뷰 답글 스튜디오',
      url: 'https://marcj81.github.io/review-reply-studio/',
      what: '리뷰를 붙여넣으면 사장님 말투로 답글 3개, 위험한 표현은 미리 걸러 냅니다.',
      tag: '리뷰 답글'
    },
    {
      id: 'blog',
      name: '블로그 SEO 스튜디오',
      url: 'https://marcj81.github.io/blog-seo-studio/',
      what: '키워드 경쟁률을 계산하고, 발행 전 원고를 100점으로 진단합니다.',
      tag: '블로그 원고'
    },
    {
      id: 'proposal',
      name: '견적서 스튜디오',
      url: 'https://marcj81.github.io/agency-proposal-maker/',
      what: '단가·수량·할인·부가세를 넣으면 A4 견적서와 제안서가 바로 나옵니다.',
      tag: '견적서'
    },
    {
      id: 'link',
      name: '원탭링크 스튜디오',
      url: 'https://marcj81.github.io/onetaplink-studio/',
      what: '가게 채널·메뉴·예약을 한 장에 모은 링크 페이지를 만듭니다.',
      tag: '링크 페이지'
    }
  ];

  /* ── 숫자 ─────────────────────────────────────────────── */
  function clampNum(value, lo, hi, fallback) {
    if (value === null || value === undefined || value === '') return fallback;
    var n = Number(value);
    if (typeof n !== 'number' || !isFinite(n)) return fallback;
    return Math.min(hi, Math.max(lo, Math.round(n)));
  }

  /** 가게 이름 칸에 전화번호가 들어오면 문안에 그대로 실려 나가므로 먼저 막는다. */
  var PHONE_RE = /(01[016789]|02|0[3-6][0-9])[-.\s]?\d{3,4}[-.\s]?\d{4}/;
  function looksLikePhone(value) { return PHONE_RE.test(String(value || '')); }

  function groupDigits(n) {
    var v = Math.round(Math.abs(Number(n) || 0));
    var s = String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (Number(n) < 0 ? '-' : '') + s;
  }

  function formatKrw(n) { return groupDigits(n) + '원'; }

  /** 2,585,000 → '258만 5,000원' · 390,000 → '39만 원' */
  function formatCompact(n) {
    var num = Math.round(Number(n) || 0);
    var sign = num < 0 ? '-' : '';
    var v = Math.abs(num);
    var man = Math.floor(v / 10000);
    var rest = v % 10000;
    if (man === 0) return sign + groupDigits(rest) + '원';
    if (rest === 0) return sign + groupDigits(man) + '만 원';
    return sign + groupDigits(man) + '만 ' + groupDigits(rest) + '원';
  }

  function percent(n) {
    var r = Math.round((Number(n) || 0) * 10) / 10;
    return String(r);
  }

  /* ── 목록 조회 ────────────────────────────────────────── */
  function planById(id) {
    for (var i = 0; i < PLANS.length; i++) if (PLANS[i].id === id) return PLANS[i];
    return PLANS[1];
  }
  function industryById(id) {
    for (var i = 0; i < INDUSTRIES.length; i++) if (INDUSTRIES[i].id === id) return INDUSTRIES[i];
    return null;
  }
  function sampleById(id) {
    for (var i = 0; i < SAMPLE_TYPES.length; i++) if (SAMPLE_TYPES[i].id === id) return SAMPLE_TYPES[i];
    return null;
  }
  function toolById(id) {
    for (var i = 0; i < TOOLS.length; i++) if (TOOLS[i].id === id) return TOOLS[i];
    return null;
  }
  function addonById(id) {
    for (var i = 0; i < ADDONS.length; i++) if (ADDONS[i].id === id) return ADDONS[i];
    return null;
  }

  /* ── 비교 계산 ────────────────────────────────────────── */
  function employeeTotal(salary) {
    var s = clampNum(salary, 0, 50000000, 2500000);
    return Math.round(s * BURDEN.rate);
  }

  function comparison(input) {
    input = input || {};
    var salary = clampNum(input.salary, 0, 50000000, 2500000);
    var agencyFee = clampNum(input.agencyFee, 0, 50000000, 1200000);
    var plan = planById(input.planId);

    var employee = employeeTotal(salary);
    var vsEmployeeMonth = employee - plan.price;
    var vsAgencyMonth = agencyFee - plan.price;
    var max = Math.max(employee, agencyFee, plan.price, 1);

    return {
      planId: plan.id,
      planName: plan.name,
      planPrice: plan.price,
      salary: salary,
      employeeTotal: employee,
      employeeBurden: employee - salary,
      agencyFee: agencyFee,
      vsEmployee: {
        month: vsEmployeeMonth,
        year: vsEmployeeMonth * 12,
        pct: employee > 0 ? percent(vsEmployeeMonth / employee * 100) : '0'
      },
      vsAgency: {
        month: vsAgencyMonth,
        year: vsAgencyMonth * 12,
        pct: agencyFee > 0 ? percent(vsAgencyMonth / agencyFee * 100) : '0'
      },
      perDay: Math.round(plan.price / 30),
      perItem: plan.monthlyItems > 0 ? Math.round(plan.price / plan.monthlyItems) : plan.price,
      bars: {
        employee: Math.round(employee / max * 100),
        agency: Math.round(agencyFee / max * 100),
        plan: Math.round(plan.price / max * 100)
      }
    };
  }

  /* ── 신청서 검증 ──────────────────────────────────────── */
  var FIELD_ORDER = ['industry', 'storeName', 'samples', 'intro', 'contact', 'consent'];
  var FIELD_LABEL = {
    industry: '업종',
    storeName: '가게 이름',
    samples: '받고 싶은 샘플',
    intro: '한 줄 소개',
    contact: '연락처',
    consent: '개인정보 동의'
  };

  /**
   * 공용 폼 검증 엔진(engines/form-engine.js: validator.js).
   * 페이지에서 window.BackofficeForm 을 넣으면 이메일·전화 정규화/검증을 그쪽에 맡긴다.
   */
  var FORM = null;
  function useValidator(engine) {
    FORM = engine && typeof engine.validateContact === 'function' ? engine : null;
    return !!FORM;
  }
  function formEngine() { return FORM; }

  function normalizeText(v) {
    return String(v === null || v === undefined ? '' : v)
      .replace(/[\u0000-\u001f\u007f]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function validateApplication(input) {
    input = input || {};
    var errors = {};

    var industry = normalizeText(input.industry);
    if (!industryById(industry)) errors.industry = '업종을 골라 주세요.';

    var storeName = normalizeText(input.storeName);
    if (storeName.length < 2) errors.storeName = '가게 이름을 두 글자 이상 적어 주세요.';
    else if (storeName.length > 30) errors.storeName = '가게 이름은 30자까지 적을 수 있습니다.';
    else if (looksLikePhone(storeName)) errors.storeName = '전화번호는 적지 않으셔도 됩니다. 가게 이름만 적어 주세요.';

    var picked = Array.isArray(input.samples) ? input.samples : [];
    var samples = [];
    for (var i = 0; i < picked.length; i++) {
      var found = sampleById(normalizeText(picked[i]));
      if (found && samples.indexOf(found.id) < 0) samples.push(found.id);
    }
    if (!samples.length) errors.samples = '받고 싶은 샘플을 하나 이상 골라 주세요.';

    var intro = normalizeText(input.intro);
    if (intro.length > 60) errors.intro = '한 줄 소개는 60자까지 적을 수 있습니다.';

    // 연락처(선택) — 전화 또는 이메일. 형식이 틀리면 문안을 만들지 않는다.
    var contact = '';
    var contactKind = '';
    var rawContact = normalizeText(input.contact);
    if (rawContact) {
      if (FORM) {
        var cv = FORM.validateContact(rawContact);
        if (!cv.ok) errors.contact = cv.message;
        else { contact = cv.value; contactKind = cv.kind; }
      } else {
        var digits = rawContact.replace(/[^0-9]/g, '');
        if (rawContact.indexOf('@') >= 0) {
          if (/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(rawContact)) { contact = rawContact.toLowerCase(); contactKind = 'email'; }
          else errors.contact = '이메일 형식을 확인해 주세요. 예: hello@example.com';
        } else if (digits.length >= 9 && digits.length <= 11) {
          contact = digits.indexOf('02') === 0
            ? (digits.length === 9 ? '02-' + digits.slice(2, 5) + '-' + digits.slice(5) : '02-' + digits.slice(2, 6) + '-' + digits.slice(6))
            : digits.slice(0, 3) + '-' + digits.slice(3, digits.length - 4) + '-' + digits.slice(-4);
          contactKind = 'phone';
        } else if (digits.length > 0) {
          errors.contact = '전화번호나 이메일을 적어 주세요. 전화는 010-1234-5678처럼 숫자 9~11자리입니다.';
        }
      }
    }

    if (input.consent !== true) errors.consent = '개인정보 수집·이용 동의에 체크해 주세요.';

    var firstError = null;
    for (var k = 0; k < FIELD_ORDER.length; k++) {
      if (errors[FIELD_ORDER[k]]) { firstError = FIELD_ORDER[k]; break; }
    }

    return {
      ok: firstError === null,
      errors: errors,
      firstError: firstError,
      value: {
        industry: industry,
        storeName: storeName,
        samples: samples,
        intro: intro,
        contact: contact,
        contactKind: contactKind,
        consent: input.consent === true
      }
    };
  }

  /** 복사해 보낼 문안. 유효하지 않으면 text 는 빈 문자열. */
  function buildInquiry(input) {
    var res = validateApplication(input);
    if (!res.ok) return { ok: false, errors: res.errors, firstError: res.firstError, text: '' };
    var v = res.value;
    var labels = [];
    for (var i = 0; i < v.samples.length; i++) labels.push(sampleById(v.samples[i]).label);

    var lines = [
      '안녕하세요. 소개 페이지 보고 무료 샘플 신청합니다.',
      '',
      '· 가게: ' + v.storeName,
      '· 업종: ' + industryById(v.industry).label,
      '· 원하는 샘플: ' + labels.join(' / ')
    ];
    if (v.intro) lines.push('· 한 줄 소개: ' + v.intro);
    if (v.contact) lines.push('· 연락처: ' + v.contact);
    lines.push('');
    lines.push('샘플 먼저 보고 정하겠습니다. 감사합니다.');

    return { ok: true, errors: {}, firstError: null, text: lines.join('\n') };
  }

  function escapeHtml(v) {
    return String(v === null || v === undefined ? '' : v)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  return {
    VERSION: VERSION,
    BURDEN: BURDEN,
    PLANS: PLANS,
    ADDONS: ADDONS,
    INDUSTRIES: INDUSTRIES,
    SAMPLE_TYPES: SAMPLE_TYPES,
    TOOLS: TOOLS,
    FIELD_LABEL: FIELD_LABEL,
    planById: planById,
    addonById: addonById,
    industryById: industryById,
    sampleById: sampleById,
    toolById: toolById,
    employeeTotal: employeeTotal,
    comparison: comparison,
    validateApplication: validateApplication,
    useValidator: useValidator,
    formEngine: formEngine,
    buildInquiry: buildInquiry,
    normalizeText: normalizeText,
    looksLikePhone: looksLikePhone,
    formatKrw: formatKrw,
    formatCompact: formatCompact,
    groupDigits: groupDigits,
    escapeHtml: escapeHtml
  };
});
