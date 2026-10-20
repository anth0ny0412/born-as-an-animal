// 동물마다 게임의 숫자가 어디서 왔는지
// calibration: 실제 기록에 맞춰 위험도를 조정한 부분 (없으면 사건 확률은 모두 게임용 가정값)
// links: kind는 "통계"(정부·공식 통계), "연구"(논문·연구 기관), "보도"(언론·칼럼)
// 선택지마다의 위험도는 게임을 위해 정한 값이고, 결과 문구 속 사실만 아래 자료에 근거함
window.SOURCES = {
  ant: {
    calibration: "여왕 후보가 새 군체를 세우는 데 성공하는 비율을 '95~99%가 실패한다'는 연구에 맞췄어요 (게임 약 2%).",
    links: [
      { kind: "연구", label: "지구의 개미 약 2경 마리 (Schultheiss et al. 2022, PNAS)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9546634/" },
      { kind: "연구", label: "서울 남산 개미 조사, 스미드개미 상대밀도 0.422", url: "https://db.koreascholar.com/Article/Detail/9359" },
      { kind: "연구", label: "여왕개미 군체 창설과 실패율 (AntWiki)", url: "https://antwiki.org/wiki/Colony_Foundation" },
      { kind: "연구", label: "사무라이개미의 곰개미 습격 (Hasegawa & Yamaguchi 1997)", url: "https://cir.nii.ac.jp/crid/1050564288977436800" },
      { kind: "연구", label: "스미드개미의 세계 확산 (Wetterer 2011)", url: "https://journals.flvc.org/flaent/article/view/76557" },
      { kind: "보도", label: "부산항 붉은불개미 군체 확인 (뉴시스 2018)", url: "https://mobile.newsis.com/view/NISX20180619_0000340363" },
    ],
  },
  bee: {
    calibration: "",
    links: [
      { kind: "보도", label: "2022년 겨울 꿀벌 39만 봉군·78억 마리 폐사 (더나은미래)", url: "https://futurechosun.com/archives/65049" },
      { kind: "보도", label: "꿀벌 집단 실종 원인과 피해 (서울신문 2022)", url: "https://m.go.seoul.co.kr/news/2022/11/30/20221130011001" },
      { kind: "보도", label: "꿀벌 실종 정리 (그린피스)", url: "https://www.greenpeace.org/korea/update/25543/blog-ce-honeybee-disappearance-101/" },
      { kind: "연구", label: "봉군당 일벌 수: 겨울 1만~1.5만, 한여름 5만~6만 (오리건주립대 등 확장 교육 자료)", url: "https://pollinators.msu.edu/sites/_pollinators/assets/File/pnw623.pdf" },
    ],
  },
  fish: {
    calibration: "",
    links: [
      { kind: "통계", label: "어류 양식 마릿수 3억 3,800만 마리 (통계청 지표, 2024)", url: "https://www.index.go.kr/unify/idx-info.do?idxCd=2748" },
      { kind: "보도", label: "2024년 고수온 양식 어류 폐사 6,855만 마리 (파이낸셜뉴스)", url: "https://www.fnnews.com/news/202609110858425851" },
    ],
  },
  chicken: {
    calibration: "조류인플루엔자 살처분과 폭염 폐사의 확률을 실제 피해 규모(최악의 해 약 3%, 폭염은 0.1% 미만)에 맞춰 낮췄어요.",
    links: [
      { kind: "통계", label: "산란계·육용계 사육 마릿수 (2026년 2분기 가축동향, KDI 정리)", url: "https://eiec.kdi.re.kr/policy/materialView.do?num=284651" },
      { kind: "보도", label: "한 해 닭 도축 약 10억 마리 (YTN, 한국농촌경제연구원 통계 인용)", url: "https://www.ytn.co.kr/_ln/0102_202407210940443776" },
      { kind: "보도", label: "산란계 사육면적 0.05㎡ → 0.075㎡ (데일리벳)", url: "https://www.dailyvet.co.kr/news/policy/171349" },
      { kind: "보도", label: "2024년 폭염 가축 폐사 (서울신문)", url: "https://m.seoul.co.kr/news/2024/07/29/20240729500032" },
      { kind: "보도", label: "조류인플루엔자 살처분 규모 (데일리벳)", url: "https://www.dailyvet.co.kr/?p=194435" },
    ],
  },
  pig: {
    calibration: "",
    links: [
      { kind: "보도", label: "돼지 사육두수 1,071만 6천 마리 (2026년 1분기, 피그피플)", url: "https://www.pigpeople.net/mobile/article.html?no=19112" },
      { kind: "보도", label: "ASF 첫 발생 당시 살처분 규모 (뉴시스 2019)", url: "https://www.newsis.com/view/NISX20191002_0000787351" },
    ],
  },
  duck: {
    calibration: "",
    links: [
      { kind: "통계", label: "오리 사육 마릿수 945만 1천 마리 (2026년 2분기 가축동향, KDI 정리)", url: "https://eiec.kdi.re.kr/policy/materialView.do?num=284651" },
    ],
  },
  dog: {
    calibration: "보호소에 들어간 뒤의 결과(반환·입양·자연사·안락사)는 2023년 실제 처리 통계를 품종견·믹스견별로 그대로 썼어요. 수명은 미국·영국 대규모 연구의 평균(약 12.5~12.7년)에 맞췄어요.",
    links: [
      { kind: "보도", label: "국내 반려견 약 546만 마리 (KB경영연구소 보고서, 데일리벳)", url: "https://www.dailyvet.co.kr/?p=250412" },
      { kind: "통계", label: "2024 반려동물 보호·복지 실태조사 (농림축산식품부)", url: "https://www.mafra.go.kr/bbs/home/792/574273/artclView.do" },
      { kind: "보도", label: "품종견 vs 믹스견 보호소 처리 결과 (동물자유연대 분석, 데일리벳)", url: "https://www.dailyvet.co.kr/?p=227916" },
      { kind: "보도", label: "입양 경로와 파양 고민 이유 (2024 국민의식조사, 데일리벳)", url: "https://www.dailyvet.co.kr/?p=234762" },
      { kind: "보도", label: "반려견 기대수명 12.69세 (미국 1,300만 마리 연구, 데일리벳)", url: "https://www.dailyvet.co.kr/?p=184502" },
      { kind: "보도", label: "번식장·경매장·펫숍 유통 구조 (파이낸셜뉴스)", url: "https://www.fnnews.com/news/202512111834040661" },
      { kind: "보도", label: "관악산·북한산 들개 포획 (헤럴드경제 2026)", url: "https://www.heraldk.com/article/2026030115150026529" },
    ],
  },
  cat: {
    calibration: "길에서 태어난 새끼가 생후 30일 안에 죽는 비율을 '약 50%'라는 보도에 맞췄어요 (게임 약 43%).",
    links: [
      { kind: "보도", label: "7대 광역시 길고양이 약 68만 마리 추정 (비건뉴스)", url: "https://www.vegannews.co.kr/news/article.html?no=319558" },
      { kind: "통계", label: "길고양이 중성화 사업 (농림축산식품부)", url: "https://www.mafra.go.kr/bbs/home/792/565669/artclView.do" },
      { kind: "보도", label: "TNR 효과 논쟁 (메트로서울)", url: "https://www.metroseoul.co.kr/article/20230312500200" },
      { kind: "보도", label: "길고양이 평균 수명 약 3년 (SBS 스페셜)", url: "https://programs.sbs.co.kr/programTemplate/amp/vod/sbsspecial/22000395359" },
      { kind: "보도", label: "2021년 로드킬 3만 7천여 건, 고양이가 가장 많음 (데일리벳)", url: "https://www.dailyvet.co.kr/news/policy/173451" },
    ],
  },
  pigeon: {
    calibration: "",
    links: [
      { kind: "보도", label: "집비둘기 유해야생동물 지정 (서울신문 2009)", url: "https://m.seoul.co.kr/news/plan/2009/06/15/20090615015003" },
      { kind: "보도", label: "비둘기 먹이 주기 과태료 (국민일보)", url: "https://www.kukinews.com/article/view/kuk202501030057" },
      { kind: "보도", label: "발가락이 잘린 비둘기와 머리카락 연구 (greenMe)", url: "https://www.greenme.it/animali/piccioni-zampe-mutilate-capelli-umani/" },
    ],
  },
  sparrow: {
    calibration: "",
    links: [
      { kind: "보도", label: "참새 등 수렵동물 서식밀도 감소 (서울신문 2005)", url: "https://m.seoul.co.kr/news/plan/2005/03/28/20050328026001" },
    ],
  },
  swallow: {
    calibration: "",
    links: [
      { kind: "보도", label: "제비 감소와 원인 (경기일보)", url: "https://www.kyeonggi.com/article/20231221580360" },
    ],
  },
  waterdeer: {
    calibration: "새끼의 생후 4주 생존율을 '약 40%가 4주 안에 죽는다'는 보고에 맞췄어요 (게임 약 65% 생존).",
    links: [
      { kind: "보도", label: "국내 고라니 약 70만 마리 (국립생태원 연구자 칼럼, 경기일보)", url: "https://kyeonggi.com/article/20230521580113" },
      { kind: "연구", label: "고라니 수명·번식·새끼 생존 (Animal Diversity Web)", url: "https://animaldiversity.org/accounts/Hydropotes_inermis/" },
      { kind: "보도", label: "고속도로 동물 사고의 84%가 고라니 (데일리벳)", url: "https://www.dailyvet.co.kr/?p=213731" },
      { kind: "보도", label: "농수로 야생동물 폐사 (전북일보)", url: "https://www.jjan.kr/articleAmp/20250730580336" },
      { kind: "보도", label: "새끼 고라니 '납치' (경향신문)", url: "https://www.khan.co.kr/article/201907041912001" },
      { kind: "연구", label: "고라니 서식 밀도 (이화여대)", url: "https://pure.ewha.ac.kr/en/publications/distribution-density-and-habitat-use-of-the-korean-water-deer-hyd/" },
    ],
  },
  boar: {
    calibration: "",
    links: [
      { kind: "보도", label: "북한산 포획틀·차단 울타리 (경향신문 2026)", url: "https://www.khan.co.kr/article/202605181115001/" },
      { kind: "보도", label: "도심 멧돼지 출몰과 서식 밀도 (헤럴드경제 2026)", url: "https://www.heraldk.com/article/2026052214450066048" },
      { kind: "보도", label: "ASF 이후 멧돼지 개체 수 변화 (데일리벳)", url: "https://www.dailyvet.co.kr/print?id=138587" },
    ],
  },
  dolphin: {
    calibration: "어른 상괭이의 한 해 생존율을 약 91%로 맞췄어요. 실제 혼획·좌초 폐사(한 해 약 800마리, 약 5%)에 자연사를 더한 수준이에요.",
    links: [
      { kind: "보도", label: "혼획·좌초로 죽는 상괭이 연 800마리 (데일리벳)", url: "https://www.dailyvet.co.kr/?p=147406" },
      { kind: "보도", label: "사라지는 서해 상괭이 (경인일보)", url: "https://www.kyeongin.com/article/1761396" },
      { kind: "보도", label: "제주 남방큰돌고래와 방류 돌고래 (서울신문 2016)", url: "https://m.seoul.co.kr/news/2016/08/16/20160816800110" },
      { kind: "보도", label: "제돌이 방류 (데일리벳)", url: "https://www.dailyvet.co.kr/?p=4299" },
    ],
  },
  turtle: {
    calibration: "",
    links: [
      { kind: "보도", label: "바다거북 10마리 중 8마리는 플라스틱을 먹었다 (더나은미래)", url: "https://futurechosun.com/archives/66145" },
      { kind: "보도", label: "쓰레기 삼켜 부검대에 오르는 바다거북 (헤럴드경제)", url: "https://www.heraldk.com/article/2025082322525504251" },
    ],
  },
  fox: {
    calibration: "방사 후 2주·8주·1년 안에 잃는 비율을 방사 여우 259마리의 실제 기록(7.3%·18.1%·35.9%)에 맞췄어요 (게임 약 5.5%·18.4%·39.6%).",
    links: [
      { kind: "보도", label: "여우 28마리 방사, 지금까지의 방사 기록 (경향신문 2026)", url: "https://www.khan.co.kr/article/202608061032001/" },
      { kind: "보도", label: "소백산 여우 복원 (세계일보)", url: "https://www.segye.com/newsView/20250806507476" },
      { kind: "연구", label: "붉은여우 생태 (Animal Diversity Web)", url: "https://animaldiversity.org/accounts/Vulpes_vulpes" },
    ],
  },
  bear: {
    calibration: "",
    links: [
      { kind: "보도", label: "지리산권 반달가슴곰 93마리, 61% 위치 추적 불가 (인사이트)", url: "https://www.insight.co.kr/news/526240" },
      { kind: "보도", label: "사육곰 967마리 중성화 (데일리벳)", url: "https://www.dailyvet.co.kr/print?id=76098" },
      { kind: "보도", label: "10살 이상 웅담 채취 허용 (데일리벳)", url: "https://www.dailyvet.co.kr/news/animalwelfare/30632" },
      { kind: "보도", label: "2026년부터 곰 사육 금지 법 통과 (데일리벳)", url: "https://www.dailyvet.co.kr/?p=200657" },
      { kind: "보도", label: "남은 사육곰과 보호시설 부족 (데일리벳)", url: "https://www.dailyvet.co.kr/?p=254219" },
    ],
  },
  spoonbill: {
    calibration: "",
    links: [
      { kind: "보도", label: "저어새 7,081마리, 인천에 54% (세계일보 2026)", url: "https://www.segye.com/newsView/20260707513219" },
      { kind: "보도", label: "세계 최대 번식지 남동유수지의 위기 (경인일보)", url: "https://www.kyeongin.com/article/1711499" },
      { kind: "보도", label: "IUCN 등급 '취약'으로 조정 (경인일보)", url: "https://www.kyeongin.com/article/1753165" },
    ],
  },
  frog: {
    calibration: "",
    links: [
      { kind: "보도", label: "개발 현장 맹꽁이 이주 (KNN)", url: "https://news.knn.co.kr/news/article/190497" },
      { kind: "보도", label: "도시개발 구역 맹꽁이 서식지 (매일신문)", url: "https://www.imaeil.com/page/view/2022082316584081923" },
      { kind: "연구", label: "맹꽁이 대체서식지 조성 (한국환경생태학회)", url: "https://koreascience.kr/article/CFKO201231262929129.pdf" },
    ],
  },
  cow: {
    calibration: "젖소가 도태되기 전 낳는 송아지 수를 '2~3번 출산 뒤 도태'라는 국립축산과학원 자료에 맞췄어요 (게임 평균 2.5마리).",
    links: [
      { kind: "통계", label: "젖소 사육 마릿수 36만 5천 마리 (2026년 2분기 가축동향, KDI 정리)", url: "https://eiec.kdi.re.kr/policy/materialView.do?num=284651" },
      { kind: "연구", label: "젖소 경제수명과 도태 산차 (국립축산과학원 2022)", url: "https://nias.go.kr/images/promote/result/file/2022_3_1.pdf" },
      { kind: "연구", label: "젖소 수명과 농장 수익 (PMC)", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8071937/" },
    ],
  },
};
