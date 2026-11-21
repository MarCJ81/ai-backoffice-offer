# 원탭 백오피스 — AI 백오피스 대행 소개 페이지

사장님·1인 대표에게 **월 단위 백오피스 대행**을 팔기 위한 영업용 랜딩 페이지입니다.
카톡·문자로 링크 하나만 보내면 30초 안에 "직원 뽑는 것보다 낫다"가 계산되는 구성입니다.

- 라이브: `https://marcj81.github.io/ai-backoffice-offer/`
- 서버 없음 · 빌드 없음 · 정적 파일만. 모든 계산은 브라우저에서 돈다.
- GitHub Pages(`gh-pages`)에 정적 파일 그대로 배포되어 있습니다. 빌드 과정 없음.

---

## 1. 파일 구성

| 파일 | 역할 |
|---|---|
| `index.html` | 랜딩 페이지 전체(히어로·계산기·3단계·결과물·요금제·신청서·FAQ) |
| `styles.css` | `design-ref-engine.js`의 `cream-editorial` 토큰 기반 스타일 |
| `core.js` | 비교 계산·신청서 검증·문안 생성 (UMD, node/브라우저 공용) |
| `app.js` | DOM 조립, 계산기 반응, 폼 오류 표시, 복사 |
| `test.js` | 계산·검증·문안 + 페이지 내용·파일 위생 검사 (DOM 없이) |
| `uitest.py` | 실제 Chrome으로 데스크톱 1440×900 / 모바일 390×844 검증 + 스크린샷 |
| `privacy.html` | 개인정보처리방침(이 페이지가 무엇을 모으지 않는지) |
| `favicon.svg` · `robots.txt` · `sitemap.xml` · `.nojekyll` | GitHub Pages 필수 파일 |
| `assets/fonts/` | 로컬 폰트(외부 요청 0) |

## 2. 디자인

- 색·타이포: `packages/design-ref-engine.js` 의 `cream-editorial` 프리셋
  (`#F3EADD` 배경 · `#FFFCF6` 카드 · `#33281E` 본문 · `#A8431F` 강조 · `#F6E3D6` 강조 배경)
- 폰트: 전부 로컬.
  - 본문·UI — IBM Plex Sans KR (`plexkr-*.woff2`, `apps/review-reply-studio/assets/fonts/` 재사용)
  - 제목 — Noto Serif CJK KR Regular를 **이 페이지에 쓰인 글자만 서브셋**해 `offer-serif-regular.woff2`(67KB)로 동봉.
    라이선스는 같은 폴더의 `OFL-NotoSerifCJK.txt`. 서브셋에 없는 글자는 다른 세리프로 대체되므로,
    **제목 문구를 새로 추가하면 폰트를 다시 서브셋해야 합니다**(아래 6번).
  - 세리프는 Regular 한 굵기만 넣었습니다. 굵은 세리프를 요청하면 브라우저가 가짜 굵기를 만들기 때문에,
    `h1~h4`·가격·큰 숫자는 모두 `font-weight:400`으로 두고 크기와 자간으로 위계를 만들었습니다.

## 3. 로컬에서 보기 / 테스트

```bash
cd apps/ai-backoffice-offer
/workspace/scratch/node-v22.11.0-linux-x64/bin/node test.js

LD_LIBRARY_PATH=/workspace/scratch/chromelibs:/workspace/scratch/calc/libs python3 uitest.py
```

`test.js` 는 계산기 산식, 검증 순서, 문안 생성, 외부 요청 허용 목록, 개인정보 0건, 파일·폰트 위생을 봅니다.
`uitest.py` 는 127.0.0.1 HTTP 서버 + 헤드리스 Chrome으로

- 외부 요청 0건, 콘솔 에러 0건, 4xx 0건
- 가로 넘침 0건(데스크톱·모바일), 넘치는 요소 없음
- 계산기: 급여·대행사비·요금제 변경 시 금액·막대 갱신, 0원/이상값에서도 안 깨짐
- 신청서: 동의 전 제출 → 오류, 필수값 누락 → 해당 칸 오류와 포커스, 정상 입력 → 문안 생성
- 복사 버튼 → 클립보드에 문안, 입력값이 localStorage에 남지 않음
- `preview-desktop.png` · `preview-mobile.png` 저장

을 확인합니다.

## 4. 상품·요금 가정 (여기만 고치면 됩니다)

`core.js` 상단의 `PLANS` 와 `BURDEN` 이 페이지·계산기·테스트의 단일 출처입니다.

| 요금제 | 월 금액 | 한 달 산출물 |
|---|---|---|
| 라이트 | 290,000원 | 리뷰 답글 12 + 블로그 2 (+ 월간 리포트) |
| 스탠다드 (추천) | 390,000원 | 리뷰 답글 20 + 블로그 4 + 카드뉴스 4 + 견적서 2 |
| 프로 | 690,000원 | 스탠다드 전체 + 전용 커스텀 툴 1종 + A/B 문구 + 월 1회 통화 |

- **금액은 부가세 포함**으로 표기했습니다. 부가세 별도로 받으려면 `PLANS[].price`를 그대로 두고
  `index.html` 의 "부가세 포함" 문구·계산기 안내·`privacy`/요금제 하단 주석을 "부가세 별도"로 바꾸면 됩니다.
  (계산기 결과가 세전/세후로 갈리므로 문구를 한쪽으로 통일해야 합니다.)
- 계약은 **월 단위, 위약금 없음, 자동 갱신 없음**으로 썼습니다. 실제 계약서와 다르면 이 문구를 먼저 고치세요.
- "영업일 2일 안에 샘플", "접수 후 4영업시간 안에 초안"은 페이지에 적힌 약속입니다. 지킬 수 있는 값인지 확인 후 배포하세요.
- 직원 비용 배수(4대보험 10.9% + 퇴직금 8.33%)는 `BURDEN` 에 있고 계산기 각주에도 표시됩니다.

## 5. 개인정보·보안

- 개인 식별 정보(이름·전화·메일·사업명) 0건. `test.js` 가 토큰 목록으로 검사합니다.
- 신청서는 `fetch`/`XHR` 없이 문안만 만들고, 사용자가 직접 복사해 보내는 구조입니다.
  쿠키·분석 도구·localStorage 를 쓰지 않습니다.
- 방침(`privacy.html`)은 "무엇을 모으지 않는지" 중심으로 썼습니다. 사업자 등록 후에는
  상호·대표자·사업자번호·개인정보 보호책임자·연락처를 넣어야 법정 기재사항이 채워집니다.
- 소개 페이지 링크는 공개 URL이므로, 링크를 받은 누구나 열람할 수 있습니다. 링크에 개인 정보를 붙여 보내지 마세요.

## 6. 제목 문구를 고칠 때 (세리프 서브셋 재생성)

```bash
cd apps/ai-backoffice-offer
python3 - <<'PY'
chars = set()
for f in ('index.html', 'privacy.html'):
    chars |= set(open(f, encoding='utf-8').read())
chars |= set(' 만원억천백0123456789,.-~%()[]{}·↗→←✓−‘’“”…')
chars.discard('\n'); chars.discard('\r')
open('/tmp/offer-chars.txt', 'w', encoding='utf-8').write(''.join(sorted(chars)))
PY
pyftsubset /usr/share/fonts/pickle-hwp/NotoSerifCJKkr-Regular.otf \
  --text-file=/tmp/offer-chars.txt --flavor=woff2 \
  --output-file=assets/fonts/offer-serif-regular.woff2 \
  --layout-features='kern,liga,clig,calt' --no-hinting --desubroutinize
```

계산기 결과처럼 **스크립트가 세리프로 찍는 글자**(숫자·쉼표·`만`·`원`)는 위 문자 집합에 반드시 포함되어야 합니다.

## 7. 배포 (승인 후)

1. 저장소 루트에 `ai-backoffice-offer/` 폴더로 올리거나, 하위 폴더를 그대로 `gh-pages`에 배치합니다.
2. `.nojekyll` 이 있어야 `assets/` 가 그대로 서빙됩니다.
3. 배포 후 확인: `/` 200, `/privacy.html` 200, `/favicon.svg` 200, `/robots.txt` 200, `/sitemap.xml` 200.
4. 소개 페이지의 4개 도구 링크(`review-reply-studio`, `blog-seo-studio`, `agency-proposal-maker`,
   `onetaplink-studio`)가 모두 200인지 다시 확인합니다.
5. `test.js`·`uitest.py` 는 개발 산출물입니다. 페이지 동작과 무관하므로 배포 폴더에서 빼도 되고,
   함께 올려도 개인 식별 정보가 남지 않도록 검사 토큰을 파일에 그대로 적지 않고 조립해 둡니다.

## 8. 영업에 쓸 때

- `reports/ai-backoffice-sales-kit-2026.md` 에 업종별 문구·거절 방어·선제작 후제안 절차가 있습니다.
- 링크를 보낼 때는 **"만들어 드릴게요"가 아니라 "이미 만들어 봤습니다"** 로 시작하는 편이 열람률이 높습니다.
  페이지의 무료 샘플 폼은 그 순서를 그대로 따라가도록 만들었습니다.
