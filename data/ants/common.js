// 개미 종들이 같이 쓰는 데이터와 삶을 만드는 함수
// 종별 파일(formica.js 등)은 여기 있는 사건을 골라 쓰고, 자기만의 사건을 더한다
// risk 등 확률 값은 게임용 가정값 (verified: false)
window.ANIMALS = window.ANIMALS || {};
window.ANT_SPECIES = [];

const ANT = {};

// 일개미의 1년: 한 턴 = 2주, 겨울잠은 한 턴으로 묶음
ANT.workerTimeline = [
  { label: "5월 초", season: "봄", weeks: 2 },
  { label: "5월 말", season: "봄", weeks: 2 },
  { label: "6월 초", season: "여름", weeks: 2 },
  { label: "6월 말 (장마)", season: "여름", weeks: 2 },
  { label: "7월 초", season: "여름", weeks: 2 },
  { label: "7월 말", season: "여름", weeks: 2 },
  { label: "8월 초", season: "여름", weeks: 2 },
  { label: "8월 말", season: "여름", weeks: 2 },
  { label: "9월 초", season: "가을", weeks: 2 },
  { label: "9월 말", season: "가을", weeks: 2 },
  { label: "10월 초", season: "가을", weeks: 2 },
  { label: "10월 말", season: "가을", weeks: 2 },
  { label: "11월 ~ 3월 (겨울잠)", season: "겨울", weeks: 22 },
  { label: "이듬해 4월", season: "봄", weeks: 6 },
];

// 나이에 따라 하는 일이 바뀜 (어릴 땐 집 안, 나이 들면 바깥)
ANT.workerStages = [
  { id: "nurse", name: "육아 담당", fromTurn: 0, baseRisk: 0.01, desc: "집 안 깊은 곳에서 알과 애벌레를 돌본다." },
  { id: "builder", name: "집 관리 담당", fromTurn: 4, baseRisk: 0.02, desc: "통로를 넓히고 흙을 나르며 집을 지킨다." },
  { id: "forager", name: "먹이 수집 담당", fromTurn: 7, baseRisk: 0.05, desc: "가장 나이 든 개미의 일. 집 밖으로 나가 먹이를 찾는다." },
];

ANT.workerBackgroundDeaths = [
  { stages: ["nurse", "builder"], tag: "자연", text: "병에 걸려 죽었다." },
  { stages: ["builder"], tag: "자연", text: "무너진 흙더미에 깔렸다." },
  { stages: ["forager"], tag: "자연", text: "먹이를 찾다 참새에게 잡아먹혔다." },
  { stages: ["forager"], tag: "자연", text: "길을 잃고 집으로 돌아오지 못했다." },
  { stages: ["forager"], tag: "사람", text: "인도 위를 걷다 사람 발에 밟혔다." },
  { stages: ["forager"], tag: "사람", text: "자전거 바퀴에 깔렸다." },
];

ANT.workerLifespan = {
  weeks: 52,
  label: "약 1년",
  note: "일개미 수명은 짧고 개체마다 차이가 크다 (Kramer et al. 2016). 종별 야외 수명은 확인 필요",
  verified: false,
};

// ---------- 일개미 공통 사건 ----------
ANT.events = {
  nurse_feed: {
    tag: "자연", seasons: ["봄", "여름"], stages: ["nurse"], weight: 3,
    text: "애벌레들이 배가 고파 몸을 흔든다.",
    choices: [
      { label: "내 배 속 먹이를 토해 나눠 준다", risk: 0, health: -15, contrib: 3,
        result: "애벌레가 무럭무럭 자란다. 개미는 입에서 입으로 먹이를 나눈다(영양교환). 대신 내 배는 비었다." },
      { label: "조금만 나눠 주고 쉰다", risk: 0, health: 5, contrib: 1,
        result: "애벌레 몇 마리가 아직 배고파 보인다." },
    ],
  },
  fungus: {
    tag: "자연", seasons: ["봄", "여름", "가을"], stages: ["nurse", "builder"], weight: 2,
    text: "옆방 동료의 몸에 하얀 곰팡이 포자가 붙어 있다.",
    choices: [
      { label: "핥아서 떼어 준다", risk: 0.06, health: -5, contrib: 3,
        result: "개미는 서로 몸을 핥아 병이 퍼지는 걸 막는다(사회적 면역). 동료가 살았다.",
        death: "동료를 돌보다 곰팡이에 감염되어 죽었다." },
      { label: "거리를 둔다", risk: 0.01, health: 0, contrib: 0,
        result: "다른 개미가 대신 돌봐 주었다.",
        death: "결국 곰팡이가 옮아 죽었다." },
    ],
  },
  rain_flood: {
    tag: "자연", seasons: ["여름"], stages: ["nurse", "builder"], weight: 3,
    text: "장맛비가 사흘째 내린다. 아랫방부터 물이 차오른다.",
    choices: [
      { label: "알과 번데기를 위층으로 옮긴다", risk: 0.05, health: -10, contrib: 4,
        result: "마지막 번데기까지 옮겼다. 흠뻑 젖었지만 동생들이 무사하다.",
        death: "번데기를 옮기다 물에 휩쓸렸다." },
      { label: "먼저 위층으로 피한다", risk: 0.02, health: 0, contrib: 0,
        result: "살았다. 아랫방의 알 일부는 물에 잠겼다.",
        death: "피할 길이 막혀 물에 잠겼다." },
    ],
  },
  pavement: {
    tag: "사람", seasons: ["봄", "여름", "가을"], stages: ["nurse", "builder"], weight: 2,
    text: "쿵, 쿵. 인도 보수 공사로 개미집 위의 보도블록이 들려 나간다.",
    choices: [
      { label: "무너진 통로를 다시 판다", risk: 0.1, health: -15, contrib: 4,
        result: "밤새 흙을 날라 통로를 다시 이었다.",
        death: "공사로 무너진 흙에 깔렸다." },
      { label: "여왕을 따라 깊은 방으로 피한다", risk: 0.04, health: 0, contrib: 1,
        result: "집의 절반을 잃었지만 여왕은 무사하다.",
        death: "깊은 방까지 무너져 내렸다." },
    ],
  },
  nest_dig: {
    tag: "자연", seasons: ["봄", "여름", "가을"], stages: ["builder"], weight: 3,
    text: "식구가 늘어 집이 비좁다. 새 방을 파야 한다.",
    choices: [
      { label: "쉬지 않고 흙을 나른다", risk: 0.01, health: -15, contrib: 4,
        result: "새 방이 생겼다. 다리가 후들거린다.",
        death: "지쳐서 흙을 나르다 쓰러졌다." },
      { label: "쉬엄쉬엄 판다", risk: 0, health: 5, contrib: 1,
        result: "다른 자매들이 대부분을 팠다." },
    ],
  },
  bait: {
    tag: "사람", seasons: ["봄", "여름", "가을"], stages: ["builder", "forager"], weight: 2,
    text: "입구 근처에 달콤한 냄새가 나는 작은 상자가 놓였다. 사람이 둔 개미약 미끼다.",
    choices: [
      { label: "달콤한 먹이를 집으로 나른다", risk: 0.3, health: -20, contrib: -3,
        result: "먹이를 나눠 먹은 동료들이 하나둘 쓰러진다. 미끼형 살충제는 군체 전체를 노린다.",
        death: "미끼에 섞인 살충제에 중독되었다." },
      { label: "낯선 냄새라 피한다", risk: 0.02, health: 0, contrib: 0,
        result: "운이 좋았다. 이번에는.",
        death: "피했지만 동료가 나른 먹이를 먹고 중독되었다." },
    ],
  },
  ant_war: {
    tag: "자연", seasons: ["여름", "가을"], stages: ["builder", "forager"], weight: 2,
    text: "이웃 군체의 개미들이 영역 경계로 몰려온다.",
    choices: [
      { label: "맞서 싸운다", risk: 0.2, health: -15, contrib: 5,
        result: "경계를 지켜 냈다. 더듬이 하나가 조금 짧아졌다.",
        death: "이웃 군체와의 싸움에서 죽었다." },
      { label: "경보 페로몬을 뿌리고 물러선다", risk: 0.05, health: 0, contrib: 1,
        result: "동료들이 몰려와 이웃 개미들이 물러갔다.",
        death: "물러서다 붙잡혔다." },
    ],
  },
  snack: {
    tag: "사람", seasons: ["봄", "여름", "가을"], stages: ["forager"], weight: 3,
    text: "벤치 아래에 사람이 흘린 과자 부스러기가 잔뜩 있다!",
    choices: [
      { label: "페로몬 길을 그려 동료를 부른다", risk: 0.06, health: 10, contrib: 6,
        result: "수백 마리가 줄지어 부스러기를 날랐다. 오늘은 잔칫날이다.",
        death: "부스러기를 나르다 지나가던 사람 발에 밟혔다." },
      { label: "한 조각만 들고 조용히 돌아간다", risk: 0.02, health: 5, contrib: 2,
        result: "작지만 확실한 수확.",
        death: "돌아가는 길에 사람 발에 밟혔다." },
    ],
  },
  asphalt: {
    tag: "사람", seasons: ["여름"], stages: ["forager"], weight: 3,
    text: "한낮의 아스팔트가 이글거린다. 길 건너편에 죽은 매미가 있다.",
    choices: [
      { label: "뜨거운 길을 건넌다", risk: 0.15, health: -10, contrib: 5,
        result: "매미 다리 하나를 끌고 왔다. 한여름 도시의 포장도로는 50도를 넘기도 한다.",
        death: "달궈진 아스팔트 위에서 몸이 말라 버렸다." },
      { label: "그늘이 생길 때까지 기다린다", risk: 0.01, health: 0, contrib: 1,
        result: "해가 기울 무렵엔 다른 곤충이 매미를 차지했다.",
        death: "기다리다 새의 눈에 띄었다." },
    ],
  },
  antlion: {
    tag: "자연", seasons: ["여름", "가을"], stages: ["forager"], weight: 2,
    text: "발밑 모래가 깔때기처럼 꺼진다. 개미귀신의 함정이다!",
    choices: [
      { label: "혼자 필사적으로 기어오른다", risk: 0.25, health: -15, contrib: 0,
        result: "모래를 맞으면서도 겨우 빠져나왔다.",
        death: "개미귀신에게 잡아먹혔다." },
      { label: "구조 신호를 보낸다", risk: 0.12, health: -5, contrib: 0,
        result: "동료가 다리를 물고 끌어올려 주었다. 어떤 개미는 함정에 빠진 동료를 구한다.",
        death: "동료가 오기 전에 개미귀신에게 잡아먹혔다." },
    ],
  },
  spider: {
    tag: "자연", seasons: ["봄", "여름", "가을"], stages: ["forager"], weight: 2,
    text: "풀잎 사이에 거미줄이 쳐져 있다. 그 너머에 먹이 냄새가 난다.",
    choices: [
      { label: "먼 길로 돌아간다", risk: 0.03, health: -10, contrib: 2,
        result: "한참 걸렸지만 먹이를 가져왔다.",
        death: "돌아가는 길에 다른 거미를 만났다." },
      { label: "틈 사이로 지나간다", risk: 0.2, health: 0, contrib: 4,
        result: "아슬아슬하게 빠져나갔다.",
        death: "거미줄에 걸려 거미의 먹이가 되었다." },
    ],
  },
  aphid: {
    tag: "자연", seasons: ["봄", "여름"], stages: ["forager"], weight: 2,
    text: "나뭇잎 뒤의 진딧물들이 달콤한 단물을 내놓는다.",
    choices: [
      { label: "진딧물을 지키며 단물을 모은다", risk: 0.05, health: 5, contrib: 5,
        result: "개미는 진딧물을 천적에게서 지켜 주고 단물을 얻는다. 일종의 목축이다.",
        death: "나뭇잎 위에서 참새에게 잡아먹혔다." },
      { label: "단물만 조금 먹고 간다", risk: 0.01, health: 15, contrib: 1,
        result: "배가 든든해졌다.",
        death: "돌아가는 길에 참새에게 잡아먹혔다." },
    ],
  },
  fogging: {
    tag: "사람", seasons: ["여름", "가을"], stages: ["forager"], weight: 2,
    text: "아파트 화단에 방역차가 지나간다. 하얀 연기가 퍼진다.",
    choices: [
      { label: "먹이를 버리고 굴로 달린다", risk: 0.05, health: -10, contrib: 0,
        result: "연기를 조금 마셨지만 살았다.",
        death: "방역 연기를 피하지 못했다." },
      { label: "먹이를 끝까지 챙긴다", risk: 0.2, health: -10, contrib: 3,
        result: "먹이를 지켜 냈다. 숨이 가쁘다.",
        death: "먹이를 물고 가다 방역 연기에 쓰러졌다." },
    ],
  },
  winter_prep: {
    tag: "자연", seasons: ["가을"], stages: ["builder", "forager"], weight: 3,
    text: "날이 차가워진다. 겨울을 나려면 몸에 양분을 채워야 한다.",
    choices: [
      { label: "먼 곳까지 먹이를 찾으러 간다", risk: 0.08, health: 10, contrib: 4,
        result: "죽은 메뚜기를 찾아냈다. 군체의 겨울 창고가 든든하다.",
        death: "늦가을 추위에 집으로 돌아오지 못했다." },
      { label: "집 근처에서만 찾는다", risk: 0.02, health: 10, contrib: 1,
        result: "조금이지만 배를 채웠다.",
        death: "집 앞에서 새에게 잡아먹혔다." },
    ],
  },
  hibernation: {
    tag: "자연", seasons: ["겨울"], stages: ["nurse", "builder", "forager"], weight: 3,
    text: "땅속 깊은 방에서 동료들과 몸을 맞대고 긴 겨울을 보낸다.",
    choices: [
      { label: "무리 안쪽으로 파고든다", risk: 0.05, health: 0, contrib: 0,
        result: "따뜻하게 겨울을 났다.",
        death: "겨울을 넘기지 못했다." },
      { label: "추운 입구 쪽 방을 지킨다", risk: 0.12, health: -10, contrib: 3,
        result: "입구를 지킨 덕에 군체가 무사히 겨울을 났다.",
        death: "입구 쪽 방에서 얼어 죽었다." },
    ],
  },
  warm_winter: {
    tag: "사람", tagNote: "기후 변화", seasons: ["겨울"], stages: ["nurse", "builder", "forager"], weight: 1,
    text: "한겨울인데 며칠째 이상하게 따뜻하다. 몸이 깨어나려 한다.",
    choices: [
      { label: "밖으로 나가 본다", risk: 0.3, health: -10, contrib: 1,
        result: "먹이는 없었다. 서둘러 돌아왔다.",
        death: "따뜻한 날씨에 깨어났다가 갑자기 찾아온 한파에 얼어 죽었다." },
      { label: "다시 몸을 웅크린다", risk: 0.06, health: -5, contrib: 0,
        result: "다시 잠들었다. 양분을 조금 써 버렸다.",
        death: "겨울잠이 깨져 양분이 바닥났다." },
    ],
  },
};

ANT.pick = (ids) => ids.map((id) => Object.assign({ id }, ANT.events[id]));
ANT.ALL_COMMON = Object.keys(ANT.events);

ANT.defaultAction = "개미약과 살충제는 꼭 필요한 곳에만 쓰고, 먼저 먹이 부스러기를 치우고 틈을 막아 보세요. 개미는 흙을 갈아 주고 씨앗을 퍼뜨리는 작은 정원사예요.";

// 일개미 삶 만들기. opts로 바꾸고 싶은 부분만 덮어씀
ANT.makeWorkerLife = function (opts) {
  return Object.assign({
    emoji: "🐜",
    peerLabel: "자매",
    successLabel: "자연 수명까지 산 개미",
    contribLabel: "군체 기여",
    endText: "자연 수명을 다 채웠다. 늙은 일개미는 마지막 봄볕 아래서 조용히 멈췄다.",
    lifespan: ANT.workerLifespan,
    timeline: ANT.workerTimeline,
    stages: ANT.workerStages,
    backgroundDeaths: ANT.workerBackgroundDeaths,
    healthDeath: { tag: "자연", text: "힘이 다해 쓰러졌다." },
    action: ANT.defaultAction,
  }, opts);
};

// ---------- 여왕 후보(공주개미)의 삶 ----------
// 결혼비행부터 첫 겨울까지. 새 군체를 세우는 데 성공하는 여왕은 극소수로 알려져 있음 (흔히 95~99% 실패로 인용)
ANT.queenTimeline = [
  { label: "여름, 태어난 집에서", season: "여름", weeks: 4 },
  { label: "결혼비행 날", season: "여름", weeks: 1 },
  { label: "땅에 내려앉은 날", season: "여름", weeks: 1 },
  { label: "새 집을 찾는 며칠", season: "여름", weeks: 1 },
  { label: "홀로 육아 1~2주", season: "여름", weeks: 2 },
  { label: "홀로 육아 3~5주", season: "여름", weeks: 3 },
  { label: "첫 일개미가 나온 가을", season: "가을", weeks: 6 },
  { label: "첫 겨울", season: "겨울", weeks: 22 },
];

ANT.queenStages = [
  { id: "princess", name: "날개 달린 공주개미", fromTurn: 0, baseRisk: 0, desc: "날개가 있는 여왕 후보. 언젠가 집을 떠나야 한다." },
  { id: "founder", name: "홀로 선 여왕", fromTurn: 2, baseRisk: 0, desc: "날개를 떼어 냈다. 이제 혼자서 군체를 시작해야 한다." },
];

ANT.queenEvents = {
  wait: {
    turns: [0], tag: "자연", weight: 1,
    text: "등에 날개가 돋았다. 일개미 자매들이 먹이를 먹여 주며 비행할 날을 함께 기다린다.",
    choices: [
      { label: "최대한 많이 먹어 둔다", risk: 0, health: 10, contrib: 1,
        result: "몸이 무거워졌다. 이 양분이 혼자 버틸 시간의 연료가 된다." },
      { label: "입구에서 날개를 퍼덕여 본다", risk: 0.05, health: 0, contrib: 0,
        result: "바람의 냄새를 익혔다.",
        death: "입구에 나왔다가 새에게 잡아먹혔다." },
    ],
  },
  flight: {
    turns: [1], tag: "자연", weight: 3,
    text: "비 온 뒤 맑고 따뜻한 날, 여러 집에서 날개 달린 개미들이 한꺼번에 날아오른다.",
    choices: [
      { label: "높이 날아오른다", risk: 0.45, health: -10, contrib: 2,
        result: "공중에서 수개미와 짝짓기를 했다. 수개미들은 곧 죽는다. 평생 쓸 정자를 몸에 담았다.",
        death: "날아오르자마자 잠자리에게 잡아먹혔다." },
      { label: "낮게 날며 기회를 본다", risk: 0.5, health: 0, contrib: 1,
        result: "풀 위에서 짝짓기를 마쳤다.",
        death: "낮게 날다 새에게 잡아먹혔다." },
    ],
  },
  flight_light: {
    turns: [1], tag: "사람", weight: 1,
    text: "날아오른 밤하늘에 가로등 불빛이 눈부시다. 몸이 저절로 빛 쪽으로 끌려간다.",
    choices: [
      { label: "빛을 따라간다", risk: 0.6, health: -10, contrib: 1,
        result: "가로등 아래서 겨우 짝짓기를 마쳤다.",
        death: "가로등 아래 도로에 떨어져 차 바퀴에 깔렸다." },
      { label: "어두운 숲 쪽으로 방향을 튼다", risk: 0.45, health: -15, contrib: 2,
        result: "어둠 속에서 짝짓기를 마쳤다.",
        death: "길을 잃고 지쳐 떨어졌다." },
    ],
  },
  landing: {
    turns: [2], tag: "자연", weight: 3,
    text: "땅에 내려앉아 스스로 날개를 떼어 냈다. 다른 개미들이 우글거린다.",
    choices: [
      { label: "가까운 맨땅에 바로 자리 잡는다", risk: 0.45, health: 0, contrib: 1,
        result: "아무도 눈치채지 못했다.",
        death: "그곳은 다른 개미의 영역이었다. 일개미들에게 물려 죽었다." },
      { label: "멀리 부드러운 흙을 찾아 걷는다", risk: 0.4, health: -15, contrib: 1,
        result: "축축하고 부드러운 흙을 찾았다.",
        death: "걷다가 거미에게 잡아먹혔다." },
    ],
  },
  landing_paved: {
    turns: [2], tag: "사람", weight: 2,
    text: "내려앉은 곳은 끝없는 아스팔트와 보도블록이다. 팔 수 있는 흙이 보이지 않는다.",
    choices: [
      { label: "보도블록 틈을 찾는다", risk: 0.5, health: -10, contrib: 1,
        result: "블록 사이 좁은 흙에 겨우 자리를 잡았다.",
        death: "흙을 찾아 헤매다 사람 발에 밟혔다." },
      { label: "화단까지 걸어간다", risk: 0.5, health: -20, contrib: 1,
        result: "화단 구석에 닿았다.",
        death: "뜨거운 바닥 위에서 말라 버렸다." },
    ],
  },
  dig_cell: {
    turns: [3], tag: "자연", weight: 1,
    text: "흙을 파고 들어가 작은 방을 만든다. 입구를 막으면 이제 밖으로 나오지 않는다.",
    choices: [
      { label: "깊게 판다", risk: 0.3, health: -15, contrib: 2,
        result: "깊고 습도가 알맞은 방을 만들었다. 입구를 흙으로 막았다.",
        death: "방을 파는 동안 새에게 들켰다." },
      { label: "얕게 파고 서둘러 막는다", risk: 0.35, health: -5, contrib: 1,
        result: "급하게 만든 방이지만 일단 숨었다.",
        death: "얕은 방이 비에 무너져 내렸다." },
    ],
  },
  claustral: {
    turns: [4, 5], tag: "자연", weight: 2,
    text: "먹지도 마시지도 않고 첫 알을 돌본다. 이제 쓸모없어진 날개 근육을 분해해 애벌레에게 먹일 양분을 만든다.",
    choices: [
      { label: "애벌레에게 아낌없이 먹인다", risk: 0.25, health: -25, contrib: 4,
        result: "애벌레가 빨리 자란다. 몸이 눈에 띄게 야위었다.",
        death: "양분이 바닥나 애벌레들과 함께 굶어 죽었다." },
      { label: "알 몇 개를 먹고 버틴다", risk: 0.3, health: -10, contrib: 1,
        result: "살아남기 위해 알 몇 개를 먹었다. 첫 식구는 줄었다.",
        death: "버티지 못하고 쓰러졌다." },
    ],
  },
  cell_mold: {
    turns: [4, 5], tag: "자연", weight: 1,
    text: "방 한구석에 곰팡이가 피기 시작했다.",
    choices: [
      { label: "곰팡이 핀 흙을 긁어낸다", risk: 0.3, health: -10, contrib: 2,
        result: "방을 깨끗이 했다. 알들은 무사하다.",
        death: "곰팡이가 몸에 퍼졌다." },
      { label: "알을 반대편으로 옮긴다", risk: 0.35, health: -5, contrib: 1,
        result: "곰팡이를 피해 자리를 옮겼다.",
        death: "곰팡이가 방 전체로 번졌다." },
    ],
  },
  first_workers: {
    turns: [6], tag: "자연", weight: 1,
    text: "첫 일개미들이 나왔다. 작고 약하지만 처음으로 집 밖에서 먹이를 구해 온다.",
    choices: [
      { label: "일개미들을 바로 밖으로 내보낸다", risk: 0.3, health: 15, contrib: 4,
        result: "먹이가 들어오기 시작했다. 군체가 자라기 시작한다.",
        death: "작은 군체는 이웃 개미들의 습격에 무너졌다." },
      { label: "입구를 작게 두고 조심한다", risk: 0.3, health: 5, contrib: 2,
        result: "천천히, 하지만 확실하게 식구가 늘었다.",
        death: "먹이가 모자라 군체가 버티지 못했다." },
    ],
  },
  queen_winter: {
    turns: [7], tag: "자연", weight: 3,
    text: "작은 군체의 첫 겨울. 일개미 몇십 마리와 함께 땅속에서 웅크린다.",
    choices: [
      { label: "일개미들 한가운데서 잠든다", risk: 0.25, health: 0, contrib: 1,
        result: "봄이 왔다.",
        death: "첫 겨울을 넘기지 못했다." },
      { label: "알을 조금 더 낳아 둔다", risk: 0.3, health: -10, contrib: 3,
        result: "봄이 오자마자 새 식구들이 태어났다.",
        death: "양분을 너무 써서 겨울을 넘기지 못했다." },
    ],
  },
  queen_warm_winter: {
    turns: [7], tag: "사람", tagNote: "기후 변화", weight: 1,
    text: "한겨울인데 며칠째 이상하게 따뜻하다. 일개미들이 깨어나 움직인다.",
    choices: [
      { label: "일개미를 밖으로 내보낸다", risk: 0.4, health: -5, contrib: 1,
        result: "추위가 돌아오기 전에 일개미들이 무사히 돌아왔다.",
        death: "나갔던 일개미들이 한파에 얼어 죽고 군체가 무너졌다." },
      { label: "모두 웅크리게 한다", risk: 0.3, health: -10, contrib: 0,
        result: "다시 잠들었다.",
        death: "겨울잠이 깨져 양분이 바닥났다." },
    ],
  },
};

ANT.pickQueen = (ids) => ids.map((id) => Object.assign({ id, seasons: ["봄", "여름", "가을", "겨울"], stages: ["princess", "founder"] }, ANT.queenEvents[id]));
ANT.QUEEN_DEFAULT = ["wait", "flight", "flight_light", "landing", "landing_paved", "dig_cell", "claustral", "cell_mold", "first_workers", "queen_winter", "queen_warm_winter"];

ANT.makeQueenLife = function (opts) {
  return Object.assign({
    emoji: "👑",
    peerLabel: "공주개미",
    successLabel: "군체를 세운 여왕",
    contribLabel: "군체 기여",
    endText: "봄이 왔다. 작은 일개미들이 먹이를 물고 들어온다. 당신은 이제 여왕이다. 여왕개미는 수년, 길게는 20년 넘게 살기도 한다.",
    lifespan: {
      weeks: 52 * 15,
      label: "수년~20년 이상",
      note: "여왕개미는 20년 넘게 살기도 한다 (Kramer et al. 2016). 종마다 다름",
      verified: false,
    },
    timeline: ANT.queenTimeline,
    stages: ANT.queenStages,
    backgroundDeaths: [],
    healthDeath: { tag: "자연", text: "양분이 바닥나 쓰러졌다." },
    action: ANT.defaultAction,
  }, opts);
};
