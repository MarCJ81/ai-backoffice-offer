/* ============================================================
   OneTap i18n · KO/EN runtime translation (v1)
   - ?lang=en|ko  >  localStorage 'onetap_lang'  >  navigator.language
   - DOM text and attributes are translated in place and restored on switch.
   - Elements added later by app.js are translated by a MutationObserver.
   - Missing keys are reported to console as "I18N_MISS: <korean>".
   ============================================================ */
(function (root, doc) {
  'use strict';

  var LANG_KEY = 'onetap_lang';
  var COMMON = /*__COMMON__*/ {"닫기":"Close","취소":"Cancel","저장":"Save","저장됨":"Saved","삭제":"Delete","복사":"Copy","복사됨":"Copied","다운로드":"Download","내려받기":"Download","공유":"Share","인쇄":"Print","초기화":"Reset","다시 시도":"Try again","불러오기":"Load","내보내기":"Export","적용":"Apply","추가":"Add","편집":"Edit","수정":"Edit","보기":"View","미리보기":"Preview","설정":"Settings","도움말":"Help","사용법":"Guide","예시":"Example","샘플":"Sample","무료":"Free","유료":"Paid","개인정보":"Privacy","개인정보 처리방침":"Privacy policy","개인정보 처리 안내":"Privacy notice","이용약관":"Terms","홈":"Home","뒤로":"Back","다음":"Next","이전":"Previous","확인":"OK","검색":"Search","필터":"Filter","전체":"All","없음":"None","준비 중":"Coming soon","준비 중입니다":"Coming soon","로딩 중":"Loading","불러오는 중":"Loading","처리 중":"Working","빈칸":"Blank","필수":"Required","선택":"Optional","이름":"Name","제목":"Title","날짜":"Date","시간":"Time","메모":"Note","상태":"Status","결과":"Result","요약":"Summary","상세":"Details","언어":"Language","한국어":"Korean","영어":"English","복사하기":"Copy","링크 복사":"Copy link","전체 복사":"Copy all","다크 모드로 전환":"Switch to dark mode","라이트 모드로 전환":"Switch to light mode","테마 전환":"Toggle theme","라이트/다크":"Light / dark","다크/라이트":"Dark / light","새 탭에서 보기":"Open in new tab","새 창":"New window","본문으로 건너뛰기":"Skip to content","본문으로 바로가기":"Skip to content","맨 위로":"Back to top","더 보기":"Show more","접기":"Collapse","펼치기":"Expand","자주 묻는 질문":"Frequently asked questions","이 브라우저에만 저장됩니다":"Saved only in this browser","이 브라우저에만 저장됩니다 · 서버 전송 0":"Saved only in this browser · zero uploads","서버 전송 없음":"No upload","서버 업로드 없음":"No server upload","100% 브라우저 처리":"100% in-browser","브라우저에서 처리":"Processed in your browser","파일은 서버로 전송되지 않습니다":"Files never leave your device","파일이 서버로 전송되지 않습니다":"Files never leave your device","붙여넣은 코드는 서버로 전송되지 않습니다":"Pasted code never leaves your device"};
  var APP = /*__DICT__*/ {"원탭 백오피스 — 리뷰·블로그·카드뉴스·견적서를 매일 대신, 월 39만 원":"OneTap Backoffice — reviews, blogs, card news and quotes handled daily, from ₩390,000 a month","직원 월급 250만 원 대신 월 39만 원. 사장님은 하루 3분 자료만 카톡으로 보내고, 리뷰 답글·블로그 원고·카드뉴스·견적서를 법규 검수까지 마쳐 당일 받습니다. 아이디·비밀번호 공유 없이, 첫 샘플은 무료.":"₩390,000 a month instead of a ₩2.5M salary. Send three minutes of material on KakaoTalk and get review replies, blog drafts, card news and quotes — compliance-checked — the same day. No logins shared, and the first sample is free.","원탭 백오피스":"OneTap Backoffice","직원 월급 250만 원 대신, 월 39만 원 — 원탭 백오피스":"₩390,000 a month instead of a ₩2.5M salary — OneTap Backoffice","사장님 가게의 리뷰·블로그·카드뉴스·견적서를 매일 대신 처리합니다. 하루 3분 자료만 보내면 당일 납품, 아이디·비밀번호는 받지 않습니다.":"We handle your shop's reviews, blog, card news and quotes every day. Send three minutes of material and it comes back the same day — we never ask for your logins.","원탭 백오피스 홈":"OneTap Backoffice home","페이지 안내":"Page sections","이 서비스의 기준":"What we promise","직원 월급 슬라이더":"Employee salary slider","한눈에 보는 기준":"The numbers at a glance","예: 오늘식당":"e.g. Today's Diner","예: 국밥 전문, 20년 된 가게입니다":"e.g. Soup specialist, 20 years in business","전화번호 또는 이메일":"Phone or email","보낼 문의 문안":"Your message to send","본문으로 바로가기":"Skip to content","일하는 방식":"How it works","결과물 체험":"Try the output","요금제":"Pricing","무료 샘플":"Free sample","계약은 월 단위":"Month-to-month","무료 샘플 받기":"Get a free sample","사장님 대신 가게 뒤편을 돌보는 백오피스":"The back office that handles what happens behind the counter","직원 월급 250만 원":"A ₩2.5M salary","대신,":"instead,","월 39만 원.":"₩390,000 a month.","사장님 가게의 리뷰·블로그·카드뉴스·견적서를 매일 대신 처리합니다. 사장님은 하루 3분, 카톡으로 자료만 보내면 됩니다.":"We take care of your shop's review replies, blog posts, card news and quotes every day. All you do is send the material on KakaoTalk — three minutes.","하루 3분":"3 minutes a day","접수는 카톡으로":"Intake on KakaoTalk","아이디·비번 없음":"No logins","결과물만 받습니다":"Finished work, nothing else","당일 납품":"Same-day delivery","접수 후 4영업시간":"within 4 business hours","무료 샘플 1건 신청":"Request one free sample","결과물 먼저 보기":"See the work first","설치 없음 · 회원가입 없음 · 계약은 월 단위. 첫 달 샘플은 비용 없이 만들어 보내드립니다.":"No install, no sign-up, month-to-month. The first sample costs nothing.","예시 · 어느 식당의 어느 하루":"Example · one day at one restaurant","사장님, 이번 주 리뷰 3개 캡처만 카톡으로":"Boss, just send this week's three review screenshots on KakaoTalk","답글 3건 · 카드뉴스 1장 납품":"3 replies and 1 card news set delivered","이번 주 메뉴 블로그 원고 1편 납품":"1 blog post for this week's menu delivered","30초 비교 계산기":"30-second comparison","직원 1명 · 대행사 · 백오피스":"An employee, an agency, a back office","숫자만 바꿔 보세요. 아래 금액이 바로 바뀝니다.":"Change the numbers and the figures below update instantly.","직원 1명 월급":"One employee's salary","세전":"gross","원":"KRW","대행사 월 이용료":"Agency retainer","백오피스 요금제":"Backoffice plan","라이트 · 월 29만 원":"Lite · ₩290,000 a month","스탠다드 · 월 39만 원":"Standard · ₩390,000 a month","프로 · 월 69만 원":"Pro · ₩690,000 a month","직원 1명":"One employee","0원":"₩0","월급 + 4대보험·퇴직금":"Salary + contributions and severance","마케팅 대행사":"Marketing agency","사장님이 적은 월 이용료":"What you pay them each month","스탠다드":"Standard","한 달 산출물 30건 기준 · 1건당":"on 30 items a month · per item","직원 1명 대신 이 요금제를 쓰면":"Using this plan instead of one employee you","한 달에 아낍니다":"save every month","1년이면":"Over a year that is","절약":"saved","대행사 이용료와 비교해 계산합니다.":"Calculated against the agency fee you enter.","직원 비용에는 4대보험 사업주 부담 10.9%와 퇴직금 충당 8.33%를 더했습니다. 대행사 이용료는 실제 견적에 따라 다르므로 사장님이 적은 값으로 계산합니다. 요금제 금액은 부가세 포함입니다.":"The employee cost adds the employer's 10.9% insurance share and 8.33% severance accrual. Agency fees depend on the quote, so the figure uses what you enter. Plan prices include VAT.","스탠다드 월 요금":"Standard, per month","만 원":"×10,000 KRW","부가세 포함 · 월 단위 계약":"VAT included · month-to-month","한 달 산출물":"Deliverables a month","건":"items","리뷰·블로그·카드뉴스·견적서":"Reviews, blogs, card news, quotes","첫 초안까지":"First draft in","시간":"hours","접수 후 · 늦어도 당일":"after intake · same day at the latest","사장님이 쓰는 시간":"Your time","분":"minutes","하루 · 카톡으로 자료만":"a day · just send material on KakaoTalk","사장님이 직접 하고 있는 일":"What you are doing yourself today","밤 11시에 하던 일":"The work you do at 11pm","영업 마감하고 나서 하던 네 가지,":"The four jobs you do after closing,","이제 사장님 손을 떠납니다.":"are no longer yours to do.","직원을 뽑으면 교육이 필요하고, 대행사는 월 100만 원부터 시작합니다. 그 사이의 일을 정해진 값에 정해진 양만큼 해 드립니다.":"Hiring means training, and agencies start at ₩1M a month. We take the work in between — a fixed price for a fixed amount.","사장님이 하던 일 · 저희가 하는 일":"What you did · what we do","리뷰 답글":"Review replies","지금":"Now","별점 5점에도, 1점에도 답이 없으면 다음 손님은 망설입니다.":"Five stars or one, an unanswered review makes the next customer hesitate.","손님이 쓴 단어를 그대로 짚어 사장님 말투로 답합니다. 병원·약국은 의료법에 걸리는 표현을 먼저 걸러 냅니다.":"We answer in your voice, picking up the customer's own words. For clinics and pharmacies we screen out anything the Medical Service Act restricts.","블로그 원고":"Blog drafts","가게 이름을 검색했는데 3년 전 글이 맨 위에 있으면, 그게 가게의 현재 얼굴입니다.":"If a three-year-old post sits at the top when someone searches your shop, that is the face your shop shows.","우리 동네 손님이 실제로 치는 말로 키워드를 잡고, 사진 자리까지 표시한 원고를 드립니다.":"We pick keywords from the words local customers actually type, and hand you a draft with photo slots marked.","카드뉴스·SNS":"Card news & social","사진은 쌓여 있는데 무슨 말을 붙여야 할지 몰라서 못 올리고 있습니다.":"The photos are piling up because you don't know what to write beside them.","한 달에 한 세트, 4장짜리 카드뉴스 문구와 배치를 만들어 드립니다. 올리는 건 사장님 계정에서 한 번 누르면 끝.":"One four-card set a month, copy and layout included. Posting it is one tap in your own account.","견적서·안내문":"Quotes & notices","밤에 엑셀 켜서 견적서 만들고, 손님한테 보낼 안내문을 다시 쓰고 있습니다.":"You open a spreadsheet at night, build the quote, then rewrite the note to the customer.","단가·수량만 알려주시면 부가세 계산까지 맞춘 견적서 PDF와 안내 문구를 같은 날 보내드립니다.":"Give us the prices and quantities and we send back a VAT-correct quote PDF and the covering message the same day.","일하는 방식 · 3단계":"How it works · 3 steps","사장님이 쓰는 시간은":"Your time in this is","하루 3분입니다.":"three minutes a day.","01 접수":"01 Intake","02 초안":"02 Draft","03 납품":"03 Delivery","사장님은 자료만 보냅니다":"You send the material","카톡이나 문자로 사진, 리뷰 캡처, 이번 주 메뉴, 현장에서 들은 손님 이야기를 보내 주세요. 딱 3분이면 됩니다.":"Send photos, review screenshots, this week's menu or something a customer said — on KakaoTalk or by text. Three minutes, that's all.","아이디·비밀번호는 받지 않습니다.":"We don't take your logins.","계정에 들어가야 하는 일은 사장님과 화면을 같이 보면서 하거나, 사장님이 한 번 눌러 주시면 끝납니다.":"Anything that needs your account we do with you on screen, or you tap once and it's done.","AI가 초안을 잡고, 전담 매니저가 15분 만에 손봅니다":"AI drafts it, a dedicated manager refines it in 15 minutes","AI가 뼈대를 만들고 사람이 다시 읽습니다. 사장님이 실제로 쓰는 말투로 고치고, 의료법·표시광고법에 걸리는 표현은 이 단계에서 지웁니다. 손님에게 나가기 전에 법적으로 문제 될 문장은 없어야 하니까요.":"AI builds the frame and a person reads it again — rewritten in the way you actually speak, with anything the Medical Service Act or the Act on Fair Labelling and Advertising forbids removed at this stage. Nothing legally risky should ever reach a customer.","당일 검수·납품":"Checked and delivered the same day","초안을 카톡으로 보내드립니다. 사장님은 읽고 “좋다” 한마디만 하시면 됩니다. 고칠 곳이 있으면 그 자리에서 다시 씁니다. 스탠다드는 접수 후 4영업시간, 늦어도 당일 안에 끝납니다.":"We send the draft on KakaoTalk. You read it and say the word. If something needs changing we rewrite it there and then. Standard finishes within four business hours of intake, same day at the latest.","정해진 산출물 범위 안에서 처리합니다. 직원처럼 매달리는 일이 아니라서, 급한 전화 응대나 현장 업무는 하지 않습니다. 대신 그 시간에 사장님은 손님을 만나세요.":"We work within the agreed scope. This is not an employee on call, so urgent phone answering and on-site work are not included — spend that time with your customers instead.","말로 설명하지 않겠습니다":"No more describing it","이 수준의 결과물이 매일 나갑니다.":"This is the level that goes out every day.","지금 눌러서 직접 보세요.":"Open one and see for yourself.","아래 네 개는 지금 이 순간에도 열리는 실제 도구입니다. 설치도, 회원가입도 필요 없습니다. 저희가 사장님 가게 자료로 쓰는 도구가 그대로 공개되어 있습니다.":"These four are live tools, right now. No install, no sign-up — the same tools we use on your shop's material are open to anyone.","사장님 리뷰 답글 스튜디오":"Review Reply Studio","리뷰를 붙여넣으면 사장님 말투로 답글 3개, 위험한 표현은 미리 걸러 냅니다.":"Paste a review and get three replies in your voice, with risky wording screened out first.","직접 써보기":"Open the tool","블로그 SEO 스튜디오":"Blog SEO Studio","키워드 경쟁률을 계산하고, 발행 전 원고를 100점으로 진단합니다.":"Scores keyword competition and grades your draft out of 100 before you publish.","견적서":"Quotes","견적서 스튜디오":"Proposal Studio","단가·수량·할인·부가세를 넣으면 A4 견적서와 제안서가 바로 나옵니다.":"Enter prices, quantities, discounts and VAT and an A4 quote and proposal come out ready.","링크 페이지":"Link page","원탭링크 스튜디오":"OneTapLink Studio","가게 채널·메뉴·예약을 한 장에 모은 링크 페이지를 만듭니다.":"Builds one link page that gathers your channels, menu and booking.","요금제 · 부가세 포함":"Pricing · VAT included","세 가지 중 하나만 고르시면 됩니다.":"Pick one of three.","계약은 월 단위입니다. 다음 달에 그만두고 싶으면 그 전에 말씀만 하시면 됩니다. 위약금이나 자동 갱신 함정은 두지 않았습니다. 회사 안에 팀을 하나 더 두고 싶으시면, 아래 옵션 하나를 얹을 수 있습니다.":"Contracts run month to month. If you want to stop, just tell us before the next month starts — no penalty, no auto-renewal trap. If you want another team inside your company, there is one option below.","라이트":"Lite","월":"per month","29만 원":"₩290,000","한두 가지만 맡겨 보는 시작":"A start with one or two jobs","이런 가게에 맞습니다 — 리뷰 답글이나 블로그 하나만 먼저 맡기고 싶은 곳":"Best for — shops that want to hand over just reviews or just the blog first","리뷰 답글 월 12건 (주 3회)":"12 review replies a month (three a week)","블로그 원고 2편":"2 blog posts","월간 리포트 1장":"1 monthly report","영업일 24시간 안에 초안, 수정 1회":"Draft within 24 business hours, one revision","산출물 1건당 약":"About, per item","2만 원":"₩20,000","라이트로 샘플 받기":"Get a Lite sample","추천":"Recommended","39만 원":"₩390,000","리뷰·블로그·카드뉴스·견적서를 한 사람이":"One person for reviews, blogs, card news and quotes","이런 가게에 맞습니다 — 직원 한 명 뽑을까 고민하던 가게":"Best for — shops wondering whether to hire","리뷰 답글 월 20건 (평일 매일)":"20 review replies a month (every weekday)","블로그 원고 4편":"4 blog posts","카드뉴스 4장 (한 세트)":"4 card news cards (one set)","견적서·안내문 2건":"2 quotes or notices","법규 검수 포함":"Compliance check included","접수 후 4영업시간 안에 초안, 수정 2회":"Draft within 4 business hours, two revisions","다음 달에 쓸 키워드 3개 제안":"3 keyword suggestions for next month","하루":"a day","1만 3,000원":"₩13,000","· 산출물 1건당":"· per item","스탠다드로 샘플 받기":"Get a Standard sample","프로":"Pro","69만 원":"₩690,000","가게 전용 툴까지 붙이는 단계":"The step that adds tools built for your shop","이런 가게에 맞습니다 — 지점이 둘 이상이거나 문구 실험까지 하는 곳":"Best for — shops with two or more locations, or those testing copy","스탠다드 구성 전부":"Everything in Standard","가게 전용 커스텀 웹툴 1종 (소유권은 사장님)":"1 custom web tool for your shop (you own it)","채널별 문구 A/B 2세트":"2 A/B copy sets per channel","월 1회 30분 전략 통화":"One 30-minute strategy call a month","새 메뉴·이벤트 문구 초안 월 4건":"4 drafts a month for new menus and events","우선 응대 (2영업시간 안에 회신)":"Priority response (reply within 2 business hours)","전용 툴은 첫 달에 만들고, 이후 계속 쓰십니다":"The custom tool is built in the first month and stays yours","프로로 샘플 받기":"Get a Pro sample","모든 요금제는 부가세 포함 금액입니다. 표시된 건수는 한 달 기준이고, 남은 건수는 다음 달로 넘기지 않습니다. 산출물 범위를 넘는 요청은 그때그때 견적을 드리고, 사장님이 승낙하실 때만 진행합니다.":"All plans include VAT. Counts are per month and unused items do not roll over. Requests beyond the scope are quoted as they come, and only started once you agree.","옵션 · 요금제에 하나만":"Option · one per plan","대표에게 오는 같은 질문부터 줄이고 싶은 회사에 붙입니다.":"For companies that want to stop answering the same questions themselves.","사내 AI 팀 회의실":"In-house AI team room","서버비 월 0원":"₩0 a month in server cost","사내 AI 팀 회의실 포털 구축":"Build an in-house AI team room","기획·마케팅·CS·검수 네 봇이 한 방에서 일합니다. 대표는 회의실에 한 줄만 던지면 되고, 답은 담당 봇이 이어받습니다. 업종에 맞춰 개발·디자인·영상·홍보·재무·영업 등 담당 부서(방)를 원하는 만큼 늘릴 수 있습니다. 지금은 대표 머릿속에만 있는 업무 순서가 회의실 기록으로 남습니다.":"Four bots — planning, marketing, support and review — work in one room. The founder drops a single line and the right bot picks it up. Rooms for development, design, video, PR, finance or sales can be added to fit the business. The order of work that until now lived only in the founder's head ends up on the record.","기획 봇":"Planning bot","이번 주 무엇부터 할지 순서를 잡습니다":"Decides what to do first this week","마케팅 봇":"Marketing bot","채널별 문구·콘텐츠 초안을 씁니다":"Drafts copy and content for each channel","CS 봇":"Support bot","문의 답변 초안을 대표 말투로 만듭니다":"Writes reply drafts in the founder's voice","검수 봇":"Review bot","법규·오탈자·톤을 보고 걸리는 문장을 지웁니다":"Checks law, typos and tone, and cuts what trips","사내 전용 주소":"Private address","초대 링크와 비밀번호로만 열리고, 검색에 노출되지 않습니다":"Opens only with an invite link and password, never indexed","Cloudflare 무료 티어":"Cloudflare free tier","서버·호스팅 월 0원, 일 10만 요청까지 무료":"₩0 for server and hosting, free up to 100,000 requests a day","이미 쓰는 AI 연결":"Your existing AI","회사가 쓰던 구독·API 키를 붙여 AI 정액료를 새로 내지 않습니다":"Plug in the subscription or API key you already pay for, no new AI fee","기록은 회사 것":"The record is yours","대화는 회사 저장소에 남고, 모델 학습에 넘기지 않습니다":"Conversations stay in your storage and are never used for model training","구축 1회":"One-time build","99만 원":"₩990,000","월 유지비":"Monthly upkeep","· 부가세 포함":"· VAT included","구축 5영업일":"5 business days to build","사용법 30분 화상 1회":"One 30-minute walkthrough call","첫 달 무상 수정":"First month of changes free","구성안 먼저 받기":"Get the outline first","무료 샘플은":"The free sample is","회의실 구성안 1장":"a one-page room outline","으로 보내드립니다. 기본 봇 4개 역할과 부서(방) 확장 예시, 질문 예시, 배포 구조가 한 장에 들어갑니다.":"— with the four default bot roles, examples of adding departments (rooms), sample questions and the deployment structure on a single page.","먼저 받아보고 결정하세요":"See it before you decide","무료 샘플 1건,":"One free sample,","오늘 신청하세요.":"request it today.","가게 이름과 업종만 알려주시면, 사장님 가게 자료로 실제 샘플을 만들어 보내드립니다. 영업일 2일 안에 드리고, 마음에 안 드시면 거기서 끝입니다. 비용도, 다음 약속도 없습니다.":"Give us your shop name and trade and we make a real sample from your own material. It arrives within two business days, and if you don't like it, that's the end — no cost, no next appointment.","샘플 비용 0원, 결제 정보 요구 없음":"The sample costs ₩0 and we never ask for payment details","아이디·비밀번호를 받지 않습니다":"We do not take your logins","이 페이지는 입력값을 서버로 보내지 않습니다":"This page never sends what you type to a server","서버 전송 0":"Zero uploads","쿠키 0":"Zero cookies","분석 도구 0":"Zero analytics","오늘":"Today","위 문안을 복사해 대화창에 붙여넣습니다":"Copy the message above into the chat","영업일 2일":"Two business days","가게 자료로 만든 샘플을 받습니다":"Your sample, built from your material","그다음":"Then","마음에 들면 시작, 아니면 거기서 끝":"Start if you like it, stop if you don't","아래 신청서로 문안을 만들면,":"Build the message with the form below, then","링크를 받으신 그 대화창에 그대로 붙여넣어":"paste it into the very chat where you got the link","보내시면 됩니다. 회원가입도, 별도 개인정보 입력도 필요 없습니다.":" — no sign-up and no extra personal details.","무료 샘플 신청서":"Free sample request","업종":"Trade","업종을 골라 주세요":"Choose your trade","업종에 맞는 샘플을 골라 드립니다.":"We pick samples that fit your trade.","가게 이름":"Shop name","샘플에 들어갈 이름입니다. 30자까지.":"The name that goes into the sample. Up to 30 characters.","받고 싶은 샘플":"Samples you want","여러 개 골라도 0원":"Any number, still ₩0","추천 3종 고르기":"Pick three recommended","선택 지우기":"Clear selection","한 줄 소개":"One-line intro","선택":"optional","있으면 샘플이 훨씬 가게답게 나옵니다. 60자까지.":"It makes the sample sound much more like your shop. Up to 60 characters.","연락처":"Contact","샘플 발송 안내에만 씁니다. 전화·이메일 중 편한 것 하나만. 숫자만 붙여 써도 자동으로 정리합니다.":"Used only to tell you the sample is ready — phone or email, whichever suits. Digits only is fine; we tidy it up.","샘플 제작을 위해 가게 이름·업종·소개만 쓰는 데 동의합니다.":"I agree that my shop name, trade and intro may be used to build the sample.","개인정보처리방침":"Privacy policy","문의 문안 만들기":"Build my message","이 페이지는 문안을 브라우저 안에서만 만듭니다. 전송 버튼은 없습니다.":"This page builds the message inside your browser only. There is no send button.","이 문안을 그대로 보내 주세요":"Send this message as it is","복사":"Copy","링크를 받으신 카톡·문자·크몽 메시지 창에 붙여넣어 보내 주세요. 보내 주신 내용만 보고 샘플을 만듭니다.":"Paste it into the KakaoTalk, text or Kmong chat where you got the link. We build the sample from what you send and nothing else.","맡기기 전에 많이 물으시는 것":"Questions before handing it over","네 가지만 확인하시면 됩니다.":"Four things to check.","계정 아이디·비밀번호를 꼭 줘야 하나요?":"Do I have to hand over my account logins?","안 받습니다. 결과물만 만들어 드리고, 올리는 건 사장님 계정에서 사장님이 한 번 누르시면 됩니다. 꼭 대신 올려야 하는 경우에는 화면을 같이 보면서 진행하고, 끝나면 바로 비밀번호를 바꾸시면 됩니다.":"No. We produce the work; posting is one tap in your own account. When something must be posted for you, we do it with you on screen and you change the password straight after.","AI가 쓴 티가 나면 손님들이 알아채지 않을까요?":"Will customers notice it was written by AI?","그래서 매니저가 다시 읽습니다. 사장님이 실제로 쓰는 말, 메뉴 이름, 단골이 하던 이야기를 넣고 번역체나 상투적인 마무리는 지웁니다. 리뷰 답글은 특히 짧고 담백하게 씁니다.":"That is why a manager reads it again — your own words, your menu names, what regulars say, with translated phrasing and stock endings removed. Review replies stay short and plain.","병원인데 광고 규정이 무섭습니다.":"I run a clinic and the advertising rules scare me.","의료법·표시광고법에서 문제 되는 표현(치료 효과 단정, 최고·유일, 전후 사진 단정 등)을 목록으로 걸러 낸 뒤에 보내드립니다. 판단이 애매한 문장은 빼고 대안을 드립니다. 최종 게시 전 확인은 원장님 몫이지만, 걸리는 문장을 그대로 보내드리는 일은 없습니다.":"We filter wording that the Medical Service Act or the Act on Fair Labelling and Advertising prohibits — guaranteed outcomes, \"best\" or \"only\", before-and-after claims — before anything is sent. Anything ambiguous is dropped and replaced. Final sign-off is yours, but nothing that trips the rules will be sent as written.","효과가 없으면 돈만 버리는 거 아닌가요?":"What if it doesn't work and the money is wasted?","그래서 첫 샘플을 무료로 드립니다. 결과물을 보고 나서 정하세요. 시작하셔도 계약은 월 단위라 다음 달에 그만두시면 그만입니다. 위약금도, 자동 갱신도 없습니다.":"That is why the first sample is free. Decide after you see it. Even once you start, the contract is monthly — stop before the next month and that's it. No penalty, no auto-renewal.","사장님 가게의 리뷰·블로그·카드뉴스·견적서를 대신 처리하는 월 단위 백오피스.":"A monthly back office that handles your shop's reviews, blog, card news and quotes.","이 페이지는 서버 없이 도는 정적 페이지입니다. 입력값을 전송하지 않고, 쿠키·분석 도구를 쓰지 않습니다.":"This page is static and runs without a server. It sends nothing you type, and uses no cookies or analytics.","대행사 이용료와 비교하면":"Compared with the agency fee you'd","아낍니다.":"save.","대행사 이용료보다":"That is more than the agency fee by","더 듭니다. 그래도 대행사는 산출물 건수를 정해 두지 않습니다.":" . An agency, though, does not cap the number of deliverables.","샘플 예시 —":"Sample ·","문안을 만들었습니다. 복사해서 보내 주세요.":"Your message is ready. Copy it and send it.","먼저 문의 문안을 만들어 주세요.":"Build a message first.","복사했습니다. 대화창에 붙여넣어 주세요.":"Copied. Paste it into the chat.","복사가 막혔습니다. 문안을 길게 눌러 복사해 주세요.":"Copying is blocked. Press and hold the message to copy it.","월급 250만":"₩2.5M salary","4대보험 사업주 부담 10.9% + 퇴직금 충당 8.33%":"Employer contributions 10.9% + severance 8.33%","1건당 얼마":"Cost per item","리뷰 답글만, 또는 블로그만 먼저 맡기고 싶은 가게":"Shops that want to hand over only reviews, or only the blog, at first","블로그 원고 2편 (제목·본문·키워드 포함)":"2 blog posts (title, body and keywords included)","월간 리포트 1장 (무엇을 했고 무엇이 달라졌는지)":"1 monthly report (what we did and what changed)","영업일 24시간 안에 초안":"Draft within 24 business hours","직원 한 명 뽑을까 고민하던 가게 대부분":"Most shops wondering whether to hire someone","법규 검수 (의료법·표시광고법에 걸리는 표현 제거)":"Compliance check (removes wording banned by medical and advertising law)","접수 후 4영업시간 안에 초안":"Draft within 4 business hours of intake","지점이 둘 이상이거나 문구 실험까지 하고 싶은 가게":"Shops with more than one location, or testing copy seriously","가게 전용 커스텀 웹툴 1종 (가게 이름·업종·브랜드 색으로 제작, 소유권은 사장님)":"1 custom web tool for your shop (built with your name, trade and brand colour, and you own it)","새 메뉴·이벤트 문구 초안 월 4건 추가":"4 extra drafts a month for new menus and events","2영업시간 안에 회신 · 초안은 당일":"Reply within 2 business hours · draft the same day","기획·마케팅·CS·검수 기본 봇 + 업종별 부서(방) 무제한 · Cloudflare 무료 티어":"Planning, marketing, support and review bots + unlimited departments (rooms) by trade · Cloudflare free tier","마케팅":"Marketing","직원이 다섯 명을 넘고, 같은 질문이 세 번씩 반복되는 회사":"Companies past five staff where the same question arrives three times","한 방에 네 봇 (기획·마케팅·CS·검수) — 대표가 한 줄 던지면 담당 봇이 이어받습니다":"Four bots in one room (planning, marketing, support, review) — the founder drops a line and the right bot picks it up","업종에 맞춰 개발·디자인·영상·홍보·재무·영업 등 부서(방)를 원하는 만큼 추가 — 방 수 제한 없이 같은 구조로 늘립니다":"Add departments (rooms) for development, design, video, PR, finance or sales — no limit on rooms, all in the same structure","사내 전용 주소 — 초대 링크와 비밀번호로만 열리고 검색에 노출되지 않습니다":"A private address — opens only with an invite link and password, and never appears in search","Cloudflare 무료 티어 배포 — 서버·호스팅 월 0원 (일 10만 요청까지 무료)":"Deployed on the Cloudflare free tier — ₩0 a month for server and hosting (free up to 100,000 requests a day)","이미 쓰는 AI 구독·API 키를 연결 — AI 정액료를 새로 내지 않습니다":"Connect the AI subscription or API key you already pay for — no new AI fee","대화 기록은 회사 저장소에 남기고 모델 학습에 넘기지 않습니다":"Conversations stay in your own storage and are never handed to model training","구축 5영업일, 사용법 30분 화상 1회, 첫 달 무상 수정":"Build in 5 business days, one 30-minute walkthrough call, first month of changes free","사내 AI 팀 회의실 구성안 1장":"A one-page AI team room outline","식당·카페":"Restaurants & cafés","리뷰 답글 3개 + 카드뉴스 4장 구성안":"3 review replies + a 4-card news outline","동네 병원·의원":"Local clinics","리뷰 답글 3개 (의료법 검수 포함)":"3 review replies (medical-law check included)","인테리어·시공":"Interiors & construction","견적서 1건 + 블로그 원고 1편":"1 quote + 1 blog post","스마트스토어·쇼핑몰":"Smart stores & shops","상품 블로그 원고 1편 + 카드뉴스 구성안":"1 product blog post + a card news outline","학원·교습소":"Academies","학부모 안내문 1건 + 블로그 원고 1편":"1 parent notice + 1 blog post","기타 업종":"Other","리뷰 답글 3개부터":"Starting with 3 review replies","리뷰 답글 3개":"3 review replies","블로그 원고 1편":"1 blog post","카드뉴스 4장 구성안":"A 4-card news outline","견적서 1건":"1 quote","원탭 링크 페이지 1장":"1 OneTap link page","이 수준의 결과물":"Work at this level","258만 5,000원":"₩2,585,000","가게 이름을 두 글자 이상 적어 주세요.":"Please enter at least two characters for the shop name.","가게 이름은 30자까지 적을 수 있습니다.":"The shop name can be up to 30 characters.","전화번호는 적지 않으셔도 됩니다. 가게 이름만 적어 주세요.":"The phone number is optional. Just the shop name is enough.","받고 싶은 샘플을 하나 이상 골라 주세요.":"Choose at least one sample.","한 줄 소개는 60자까지 적을 수 있습니다.":"The one-line intro can be up to 60 characters.","이메일 형식을 확인해 주세요. 예: hello@example.com":"Check the email format, e.g. hello@example.com","전화번호나 이메일을 적어 주세요. 전화는 010-1234-5678처럼 숫자 9~11자리입니다.":"Add a phone number or email. Phone numbers take 9–11 digits, like 010-1234-5678.","개인정보 수집·이용 동의에 체크해 주세요.":"Please tick the consent box for collecting and using your details.","안녕하세요. 소개 페이지 보고 무료 샘플 신청합니다.":"Hello, I saw your page and would like a free sample.","· 가게:":"· Shop:","· 업종:":"· Trade:","· 원하는 샘플:":"· Samples:","· 한 줄 소개:":"· Intro:","· 연락처:":"· Contact:","샘플 먼저 보고 정하겠습니다. 감사합니다.":"I'll decide after seeing the sample. Thank you.","대행사 이용료와 비교하면 {0} 아낍니다.":"You save {0} against the agency fee.","다음 달 키워드 3개 제안":"3 keyword suggestions for next month","업종을 골라 주세요.":"Please choose your trade."};
  var PATTERNS = /*__PATTERNS__*/ [];

  var DICT = {};
  var k;
  for (k in COMMON) if (Object.prototype.hasOwnProperty.call(COMMON, k)) DICT[k] = COMMON[k];
  for (k in APP) if (Object.prototype.hasOwnProperty.call(APP, k)) DICT[k] = APP[k];

  var HANGUL = /[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7A3]/;
  var SKIP_TAG = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, CODE: 1, SVG: 1 };
  var ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];
  var state = { lang: 'ko' };
  var records = [];
  var missing = {};
  var missingList = [];
  var observer = null;

  /* ---------- language ---------- */
  function detect() {
    try {
      var q = new URLSearchParams(root.location.search).get('lang');
      if (q === 'ko' || q === 'en') return q;
    } catch (e) { /* very old browser */ }
    try {
      var saved = root.localStorage.getItem(LANG_KEY);
      if (saved === 'ko' || saved === 'en') return saved;
    } catch (e) { /* private mode */ }
    var nav = root.navigator.language || root.navigator.userLanguage || 'ko';
    return /^ko/i.test(nav) ? 'ko' : 'en';
  }

  /* ---------- lookup ---------- */
  function report(text) {
    if (missing[text]) return;
    missing[text] = 1;
    missingList.push(text);
    if (root.console && console.warn) console.warn('I18N_MISS: ' + text);
  }

  function tr(raw) {
    if (typeof raw !== 'string' || !HANGUL.test(raw)) return raw;
    var m = /^(\s*)([\s\S]*?)(\s*)$/.exec(raw);
    var lead = m[1], core = m[2], tail = m[3];
    if (!core) return raw;
    var hit = DICT[core];
    if (hit == null && /\s{2,}|\n/.test(core)) hit = DICT[core.replace(/\s+/g, ' ').trim()];
    if (hit != null) return lead + hit + tail;

    /* money in Korean format: 81만 원 / 2,980,750원  ->  {0} template */
    var money = takeMoney(core);
    if (money.map.length) {
      var tpl = money.text;
      var th = DICT[tpl];
      if (th == null && /\s{2,}|\n/.test(tpl)) th = DICT[tpl.replace(/\s+/g, ' ').trim()];
      if (th == null && /^\{0\}$/.test(tpl.trim())) th = '{0}';
      if (th != null) return lead + putMoney(th, money.map) + tail;
      for (var mi = 0; mi < PATTERNS.length; mi++) {
        if (PATTERNS[mi][0].test(tpl)) {
          var mo = tpl.replace(PATTERNS[mi][0], PATTERNS[mi][1]);
          if (!HANGUL.test(mo)) return lead + putMoney(mo, money.map) + tail;
        }
      }
    }
    for (var i = 0; i < PATTERNS.length; i++) {
      var p = PATTERNS[i];
      if (p[0].test(core)) {
        var out = core.replace(p[0], p[1]);
        if (!HANGUL.test(out)) return lead + out + tail;
      }
    }
    var seg = trSegments(core);
    if (seg != null) return lead + seg + tail;
    report(core);
    return raw;
  }


  /* Korean money -> token template; values are formatted as ₩1,234,567 */
  function won(n) { return '₩' + n.toLocaleString('en-US'); }
  function takeMoney(core) {
    var map = [];
    var out = core.replace(/([\d,]+)\s*만(?:\s*([\d,]+))?\s*원/g, function (all, a, b) {
      var n = parseInt(a.replace(/,/g, ''), 10) * 10000 + (b ? parseInt(b.replace(/,/g, ''), 10) : 0);
      map.push(won(n));
      return '{' + (map.length - 1) + '}';
    });
    out = out.replace(/([+\-]?[\d,]+)\s*원/g, function (all, a) {
      map.push('₩' + a);
      return '{' + (map.length - 1) + '}';
    });
    return { text: out, map: map };
  }
  function putMoney(s, map) {
    return s.replace(/\{(\d+)\}/g, function (all, i) { return map[+i] != null ? map[+i] : all; });
  }

  /* A small unit: dictionary hit or pattern hit, no whitespace trimming. */
  function lookupSmall(unit) {
    var hit = DICT[unit];
    if (hit != null) return hit;
    for (var i = 0; i < PATTERNS.length; i++) {
      var p = PATTERNS[i];
      if (p[0].test(unit)) {
        var out = unit.replace(p[0], p[1]);
        if (!HANGUL.test(out)) return out;
      }
    }
    return null;
  }

  function trPipe(line) {
    var parts = line.split(/\s*\|\s*/);
    var out = [];
    for (var i = 0; i < parts.length; i++) {
      var t = lookupSmall(parts[i].trim());
      if (t == null) return null;
      out.push(t);
    }
    return out.join(' | ');
  }

  function trSegments(core) {
    if (core.indexOf('\n') > -1) {
      var lines = core.split('\n');
      var out = [];
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var t = line.indexOf('|') > -1 ? trPipe(line) : lookupSmall(line.trim());
        if (t == null) return null;
        out.push(t);
      }
      return out.join('\n');
    }
    if (core.indexOf('|') > -1) return trPipe(core);
    return null;
  }

  /* ---------- DOM walking ---------- */
  function skipped(el) {
    while (el) {
      if (el.nodeType === 1) {
        if (SKIP_TAG[el.tagName]) return true;
        if (el.getAttribute && (el.hasAttribute('data-i18n-skip') || el.getAttribute('contenteditable') === 'true')) return true;
        if (el.classList && el.classList.contains('onetap-lang')) return true;
      }
      el = el.parentNode;
    }
    return false;
  }

  function trText(node) {
    var v = node.nodeValue;
    if (!v || !HANGUL.test(v)) return;
    var out = tr(v);
    if (out !== v) {
      records.push({ n: node, v: v });
      node.nodeValue = out;
    }
  }

  function trAttrs(el) {
    var i, at, v, out;
    for (i = 0; i < ATTRS.length; i++) {
      at = ATTRS[i];
      if (!el.hasAttribute(at)) continue;
      v = el.getAttribute(at);
      if (!v || !HANGUL.test(v)) continue;
      out = tr(v);
      if (out !== v) {
        records.push({ e: el, a: at, v: v });
        el.setAttribute(at, out);
      }
    }
    if (el.tagName === 'INPUT') {
      var ty = (el.type || '').toLowerCase();
      if (ty === 'button' || ty === 'submit' || ty === 'reset') {
        v = el.value;
        if (v && HANGUL.test(v)) {
          out = tr(v);
          if (out !== v) { records.push({ e: el, a: 'value', v: v }); el.value = out; }
        }
      }
    }
  }

  function walk(node) {
    if (node.nodeType === 3) { trText(node); return; }
    if (node.nodeType !== 1) return;
    if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE' && node.tagName !== 'SVG' &&
        !(node.classList && node.classList.contains('onetap-lang'))) trAttrs(node);
    if (skipped(node)) return;
    if (node.tagName === 'META') return;
    for (var c = node.firstChild; c; c = c.nextSibling) walk(c);
  }

  function trMeta() {
    var list = doc.querySelectorAll('meta[name="description"], meta[property="og:title"], meta[property="og:description"], meta[name="twitter:title"], meta[name="twitter:description"]');
    for (var i = 0; i < list.length; i++) {
      var el = list[i], v = el.getAttribute('content');
      if (v && HANGUL.test(v)) {
        var out = tr(v);
        if (out !== v) { records.push({ e: el, a: 'content', v: v }); el.setAttribute('content', out); }
      }
    }
  }

  function trJsonLd() {
    var list = doc.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      try {
        var data = JSON.parse(el.textContent);
        var changed = fixJson(data);
        if (changed) el.textContent = JSON.stringify(data);
      } catch (e) { /* leave as is */ }
    }
  }

  function fixJson(o) {
    var changed = false, i;
    if (Array.isArray(o)) {
      for (i = 0; i < o.length; i++) if (fixJson(o[i])) changed = true;
      return changed;
    }
    if (!o || typeof o !== 'object') return false;
    for (var key in o) {
      if (!Object.prototype.hasOwnProperty.call(o, key)) continue;
      var v = o[key];
      if (typeof v === 'string' && HANGUL.test(v)) {
        var out = DICT[v.trim()];
        if (out != null) { o[key] = out; changed = true; }
      } else if (v && typeof v === 'object') {
        if (fixJson(v)) changed = true;
      }
    }
    return changed;
  }

  /* ---------- apply / restore ---------- */
  function applyEn() {
    var title = root.__onetapTitle || (root.__onetapTitle = doc.title);
    walk(doc.body);
    trMeta();
    trJsonLd();
    doc.documentElement.lang = 'en';
    var t = DICT[title] || DICT[title.trim()];
    doc.title = t || title;
  }

  function restoreKo() {
    for (var i = records.length - 1; i >= 0; i--) {
      var r = records[i];
      if (r.n) { if (r.n.nodeValue !== r.v) r.n.nodeValue = r.v; }
      else if (r.e) {
        if (r.a === 'value') { if (r.e.value !== r.v) r.e.value = r.v; }
        else if (r.e.getAttribute(r.a) !== r.v) r.e.setAttribute(r.a, r.v);
      }
    }
    var title = root.__onetapTitle;
    if (title) doc.title = title;
    doc.documentElement.lang = 'ko';
  }

  /* ---------- language switch UI ---------- */
  function buildSwitch() {
    var wrap = doc.createElement('div');
    wrap.className = 'onetap-lang';
    wrap.setAttribute('role', 'group');
    wrap.innerHTML = '<button type="button" data-onetap-lang="ko" aria-pressed="true">KO</button>' +
      '<button type="button" data-onetap-lang="en" aria-pressed="false">EN</button>';
    var box = doc.querySelector('.top-actions') || doc.querySelector('.topbar__inner') ||
      doc.querySelector('.topbar-inner') || doc.querySelector('.topbar-in') ||
      doc.querySelector('.topbar') || doc.querySelector('header');
    if (box) {
      if (box.classList.contains('top-actions')) box.insertBefore(wrap, box.firstChild);
      else {
        var act = box.querySelector('.top-actions');
        if (act) box.insertBefore(wrap, act); else box.appendChild(wrap);
      }
    } else {
      wrap.style.cssText = 'position:fixed;top:10px;right:10px;z-index:99999;background:rgba(255,255,255,.9);color:#111';
      doc.body.appendChild(wrap);
    }
    wrap.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-onetap-lang]');
      if (!b) return;
      setLang(b.getAttribute('data-onetap-lang'));
    });
    return wrap;
  }

  var CSS = '.onetap-lang{display:inline-flex;flex:none;align-items:center;padding:2px;border:1px solid currentColor;border-radius:999px;opacity:.72;transition:opacity .15s;vertical-align:middle;align-self:center}' +
    '.onetap-lang:hover,.onetap-lang:focus-within{opacity:1}' +
    '.onetap-lang button{appearance:none;-webkit-appearance:none;border:0;background:transparent;color:inherit;font:inherit;font-size:10.5px;font-weight:700;letter-spacing:.04em;line-height:1;padding:5px 6px;border-radius:999px;cursor:pointer;min-width:26px;text-align:center}' +
    '.onetap-lang button[aria-pressed="true"]{background:rgba(128,128,128,.3)}' +
    '@media (max-width:520px){.onetap-lang button{padding:4px 4px;font-size:10px;min-width:22px}.onetap-lang{margin-left:2px}}';

  function injectCss() {
    var s = doc.createElement('style');
    s.id = 'onetap-lang-css';
    s.textContent = CSS;
    (doc.head || doc.documentElement).appendChild(s);
  }

  function paintSwitch() {
    var bs = doc.querySelectorAll('[data-onetap-lang]');
    for (var i = 0; i < bs.length; i++) {
      bs[i].setAttribute('aria-pressed', bs[i].getAttribute('data-onetap-lang') === state.lang ? 'true' : 'false');
    }
    var wrap = doc.querySelector('.onetap-lang');
    if (wrap) wrap.setAttribute('aria-label', state.lang === 'ko' ? '언어' : 'Language');
  }

  /* ---------- observe ---------- */
  function startObserver() {
    if (observer || !root.MutationObserver) return;
    observer = new MutationObserver(function (muts) {
      if (state.lang !== 'en') return;
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type === 'characterData') { trText(m.target); continue; }
        if (m.type === 'attributes') { if (m.target.nodeType === 1 && !skipped(m.target)) trAttrs(m.target); continue; }
        for (var j = 0; j < m.addedNodes.length; j++) walk(m.addedNodes[j]);
      }
    });
    observer.observe(doc.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'aria-label', 'title', 'alt'] });
  }

  function setLang(lang) {
    state.lang = lang === 'en' ? 'en' : 'ko';
    try { root.localStorage.setItem(LANG_KEY, state.lang); } catch (e) { /* private mode */ }
    if (state.lang === 'en') {
      applyEn();
      startObserver();
    } else {
      if (observer) { observer.disconnect(); observer = null; }
      restoreKo();
    }
    paintSwitch();
    try { doc.dispatchEvent(new CustomEvent('onetap:lang', { detail: { lang: state.lang } })); } catch (e) { /* old */ }
  }

  function boot() {
    injectCss();
    buildSwitch();
    state.lang = detect();
    if (state.lang === 'en') {
      applyEn();
      startObserver();
    } else {
      doc.documentElement.lang = 'ko';
    }
    paintSwitch();
    root.ONETAP_I18N = {
      lang: function () { return state.lang; },
      setLang: setLang,
      t: tr,
      missing: function () { return missingList.slice(); },
      dict: DICT
    };
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window, document);
