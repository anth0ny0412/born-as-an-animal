// 반달가슴곰 (멸종위기 1급): 지리산 야생곰보다 철창 속 사육곰이 더 많다
// 야생: 2004년 지리산 복원 시작, 2024년 활동 개체 93마리 (그중 57마리 위치 추적 불가)
// 사육곰: 웅담 채취용, 2014~2017년 967마리 중성화, 10살 이상 웅담 채취 도살 허용 → 2026년부터 사육 금지
//          남은 곰 약 249~280마리, 보호시설(구례 49 + 서천 70~120) 정원이 모자람
window.ANIMALS = window.ANIMALS || {};

(function () {
  const ALL = ["봄", "여름", "가을", "겨울", "한 해"];
  const GROWN = ["young", "adult"];

  window.BEAR_ORIGINS = [
    {
      id: "wild", name: "지리산 반달가슴곰", weight: 93, life: "bear.wild",
      desc: "복원 사업으로 돌아온 곰의 후손. 지리산과 그 주변 산에서 산다.",
      popNote: "야생 활동 개체 93마리 (2024년 집계)",
    },
    {
      id: "farmed", name: "사육곰", weight: 249, life: "bear.farmed",
      desc: "웅담을 얻기 위해 곰 농장 철창 안에서 태어난 곰.",
      popNote: "농가에 남은 사육곰 약 249마리 (시민단체 집계, 자료마다 249~280마리)",
    },
  ];

  window.ANIMALS["bear.wild"] = {
    id: "bear.wild",
    name: "지리산 반달가슴곰",
    emoji: "🐻",
    peerLabel: "아기 곰",
    successLabel: "열 살까지 산 곰",
    contribLabel: "낳은 새끼",
    intro: "한겨울, 지리산 바위 굴에서 겨울잠을 자던 어미 곁에서 태어났다. 당신의 조상은 2004년 러시아 연해주에서 온 곰들이다. 웅담을 노린 밀렵으로 이 땅의 곰이 사라진 뒤였다.",
    endText: "열 해를 살았다. 지리산의 곰은 이제 덕유산, 가야산까지 퍼져 나가고 있다.",
    lifespan: {
      weeks: 1300,
      label: "약 20~25년",
      note: "야생 반달가슴곰의 수명은 20년 이상으로 알려져 있음 (확인 필요)",
      verified: false,
    },
    timeline: [
      { label: "겨울잠 굴에서 태어남", season: "겨울", weeks: 8 },
      { label: "어미를 따라 나온 첫 봄", season: "봄", weeks: 13 },
      { label: "첫 여름", season: "여름", weeks: 13 },
      { label: "첫 가을", season: "가을", weeks: 13 },
      { label: "어미와 두 번째 겨울잠", season: "겨울", weeks: 13 },
      { label: "어미 곁을 떠나는 봄", season: "봄", weeks: 26 },
      { label: "2살 → 3살", season: "한 해", weeks: 52 },
      { label: "3살 → 4살", season: "한 해", weeks: 52 },
      { label: "4살 → 5살", season: "한 해", weeks: 52 },
      { label: "5살 → 6살", season: "한 해", weeks: 52 },
      { label: "6살 → 7살", season: "한 해", weeks: 52 },
      { label: "7살 → 8살", season: "한 해", weeks: 52 },
      { label: "8살 → 9살", season: "한 해", weeks: 52 },
      { label: "9살 → 10살", season: "한 해", weeks: 52 },
    ],
    stages: [
      { id: "cub", name: "아기 곰", fromTurn: 0, baseRisk: 0.03, desc: "어미 곁을 떠나지 않는다." },
      { id: "young", name: "어린 곰", fromTurn: 5, baseRisk: 0.04, desc: "혼자 산을 익힌다." },
      { id: "adult", name: "어른 곰", fromTurn: 7, baseRisk: 0.06, desc: "자기 영역을 갖고 산다." },
    ],
    backgroundDeaths: [
      { stages: ["cub"], tag: "자연", text: "어미와 떨어져 살아남지 못했다." },
      { stages: GROWN, tag: "사람", text: "불법 올무에 걸렸다." },
      { stages: GROWN, tag: "자연", text: "병에 걸려 죽었다." },
      { stages: GROWN, tag: "자연", text: "다른 곰과 싸우다 다친 상처가 덧났다." },
    ],
    healthDeath: { tag: "자연", text: "먹이를 구하지 못해 겨울잠에서 깨어나지 못했다." },
    events: [
      {
        id: "den_birth", tag: "자연", turns: [0], weight: 1,
        text: "어두운 굴 안. 어미는 잠든 채로 당신에게 젖을 물린다. 반달가슴곰은 겨울잠 동안 새끼를 낳는다.",
        choices: [
          { label: "어미 품에 파고든다", risk: 0.03, health: 10, contrib: 0, result: "봄까지 어미 품에서 자랐다.", death: "봄을 보지 못했다." },
          { label: "형제와 몸을 붙인다", risk: 0.04, health: 5, contrib: 0, result: "형제와 함께 봄을 기다린다.", death: "봄을 보지 못했다." },
        ],
      },
      {
        id: "follow_mother", tag: "자연", turns: [1, 2, 3], weight: 2,
        text: "어미를 따라 산을 오른다. 어디에 도토리가 많고, 어디서 개미를 잡는지 배운다.",
        choices: [
          { label: "나무에 기어오른다", risk: 0.02, health: 10, contrib: 0, result: "반달가슴곰은 나무를 잘 탄다. 높은 가지에서 열매를 땄다.", death: "나무에서 떨어졌다." },
          { label: "어미 뒤에 바짝 붙는다", risk: 0.01, health: 5, contrib: 0, result: "어미가 다른 곰을 쫓아냈다.", death: "어미를 놓쳤다." },
        ],
      },
      {
        id: "acorns", tag: "자연", seasons: ["가을", "한 해"], weight: 2,
        text: "가을. 겨울잠 전에 살을 찌워야 한다. 올해는 도토리가 흉년이다.",
        choices: [
          { label: "산 깊이 들어가 먹이를 찾는다", risk: 0.03, health: 5, contrib: 0, result: "깊은 골짜기에서 다래를 찾았다.", death: "먹이가 모자라 겨울잠을 버티지 못했다." },
          { label: "산 아래 마을 쪽으로 내려간다", risk: 0.08, health: 15, contrib: 0, result: "마을 근처 밤나무 밭을 찾았다. 사람과 마주칠 위험이 커졌다.", death: "마을 근처에서 올무에 걸렸다." },
        ],
      },
      {
        id: "snare", tag: "사람", tagNote: "불법 엽구", seasons: ALL, stages: GROWN, weight: 3,
        text: "짐승길 덤불 사이로 쇠 냄새가 난다. 멧돼지를 잡으려고 누군가 몰래 놓은 올무다.",
        choices: [
          { label: "늘 다니던 길로 간다", risk: 0.15, health: 0, contrib: 0, result: "무사히 지나갔다. 바로 옆 덤불에 올무가 걸려 있었다.", death: "불법 올무에 앞발이 걸렸다." },
          { label: "낯선 능선으로 돌아간다", risk: 0.03, health: -10, contrib: 0, result: "먼 길이었지만 아무 일도 없었다.", death: "낯선 능선에도 올무가 있었다." },
        ],
      },
      {
        id: "beehive", tag: "사람", seasons: ["봄", "여름", "한 해"], stages: GROWN, weight: 2,
        text: "산자락 양봉장에서 꿀 냄새가 진하게 난다.",
        choices: [
          { label: "벌통을 넘어뜨린다", risk: 0.06, health: 20, contrib: 0, result: "꿀을 실컷 먹었다. 곰 피해를 막으려고 양봉장에 전기 울타리를 지원하기도 한다.", death: "전기 울타리에 놀라 달아나다 도로로 뛰어들었다." },
          { label: "냄새만 맡고 돌아선다", risk: 0, health: -5, contrib: 0, result: "산으로 돌아갔다." },
        ],
      },
      {
        id: "hiker", tag: "사람", seasons: ["봄", "여름", "가을", "한 해"], stages: GROWN, weight: 2,
        text: "탐방로를 벗어난 등산객과 딱 마주쳤다. 사람이 얼어붙었다.",
        choices: [
          { label: "천천히 등을 돌려 숲으로 간다", risk: 0, health: 0, contrib: 0, result: "사람도 천천히 뒷걸음질 쳤다. 아무 일도 없었다." },
          { label: "일어서서 크게 소리를 낸다", outcomes: [
            { p: 85, result: "사람이 달아났다. 신고가 들어갔고, 직원들이 당신의 위치를 확인하러 왔다." },
            { p: 15, result: "사람과 너무 자주 마주친다는 이유로 포획되어 다른 곳으로 옮겨졌다.", health: -15 },
          ] },
        ],
      },
      {
        id: "wander", tag: "자연", seasons: ALL, stages: GROWN, weight: 2,
        text: "지리산이 비좁다. 다른 곰의 냄새가 사방에 있다. 지리산의 적정 곰 수는 64마리 정도라는 분석이 있는데, 이미 그보다 많다.",
        choices: [
          { label: "능선을 따라 다른 산으로 떠난다", risk: 0.12, health: -15, contrib: 0,
            result: "도로와 마을을 지나 덕유산 자락에 닿았다. 한 곰은 지리산에서 90km 넘게 떨어진 김천 수도산까지 두 번이나 갔다.",
            death: "산과 산 사이 도로를 건너다 차에 치였다." },
          { label: "지리산에 남아 영역을 다툰다", risk: 0.06, health: -10, contrib: 0, result: "골짜기 하나를 지켜 냈다.", death: "다른 곰과 싸우다 크게 다쳤다." },
        ],
      },
      {
        id: "gps", tag: "사람", seasons: ALL, stages: GROWN, weight: 1,
        text: "목에 달린 발신기가 조용해졌다. 배터리가 다 됐다.",
        choices: [
          { label: "자유롭게 산을 누빈다", risk: 0, health: 5, contrib: 0, result: "이제 사람들도 당신이 어디 있는지 모른다. 2024년 기준 지리산권 곰 93마리 중 57마리(61%)는 위치를 추적할 수 없다." },
          { label: "늘 다니던 골짜기에 머문다", risk: 0, health: 0, contrib: 0, result: "직원들이 무인 카메라로 당신을 확인했다." },
        ],
      },
      {
        id: "cubs", tag: "자연", seasons: ["겨울", "한 해"], stages: ["adult"], weight: 2,
        text: "짝짓기 철을 지나, 겨울잠 굴에서 새끼 둘이 태어났다.",
        choices: [
          { label: "굴 깊이 새끼를 품는다", risk: 0.02, health: -15, contrib: 2, result: "봄에 새끼 둘을 데리고 굴을 나섰다. 2004년 몇 마리로 시작한 복원이 이제 3세대, 4세대로 이어진다.", death: "새끼를 품다 기운이 다했다." },
          { label: "먹이를 더 찾아 나선다", risk: 0.04, health: 5, contrib: 1, result: "새끼 하나가 살아남았다.", death: "먹이를 찾다 올무에 걸렸다." },
        ],
      },
      {
        id: "hibernation", tag: "자연", seasons: ["겨울", "한 해"], turns: [4, 6, 7, 8, 9, 10, 11, 12, 13], weight: 2,
        text: "겨울잠에 들 때다. 바위 굴, 나무 구멍, 덤불 속 어디를 고를까.",
        choices: [
          { label: "깊은 바위 굴을 찾는다", risk: 0.02, health: -5, contrib: 0, result: "봄까지 깊이 잤다.", death: "겨울잠에서 깨어나지 못했다." },
          { label: "가까운 나무 구멍에 든다", risk: 0.03, health: 0, contrib: 0, result: "봄이 왔다.", death: "겨울잠에서 깨어나지 못했다." },
        ],
      },
    ],
    action: "웅담 같은 야생동물 부산물은 사지도 먹지도 말아 주세요. 국립공원에서는 탐방로를 벗어나지 말고, 음식물을 산에 남기지 마세요. 산에서 올무를 보면 국립공원공단에 신고해 주세요.",
  };

  window.ANIMALS["bear.farmed"] = {
    id: "bear.farmed",
    name: "사육곰",
    emoji: "🐻",
    peerLabel: "사육곰",
    successLabel: "철창 밖으로 나간 곰",
    flagLabels: { neutered: "중성화됨", rescued: "보호시설" },
    intro: "2010년, 곰 농장의 쇠창살 우리 안에서 태어났다. 1980년대에 정부가 농가 소득을 위해 곰 수입을 권장하면서 시작된 웅담 산업이다. 당신의 쓸개는 언젠가 '웅담'으로 팔릴 예정이다.",
    endText: (state) => state.flags.rescued
      ? "2026년, 곰 사육이 금지됐다. 당신은 처음으로 흙을 밟는다. 보호시설에서 남은 생을 산다."
      : "2026년, 곰 사육이 금지됐다. 하지만 보호시설 자리가 모자라 당신은 아직 농장 철창 안에서 갈 곳을 기다린다.",
    lifespan: {
      weeks: 1560,
      label: "약 20~30년",
      note: "사육 상태 반달가슴곰은 20년 넘게 살기도 함 (확인 필요). 10살 이상이면 웅담 채취 도살이 허용됐다",
      verified: false,
    },
    timeline: [
      { label: "2010년, 철창 속에서 태어남", season: "0살", weeks: 52 },
      { label: "2011~2013년", season: "1~3살", weeks: 156 },
      { label: "2014~2017년, 중성화 사업", season: "4~7살", weeks: 208 },
      { label: "2018~2019년", season: "8~9살", weeks: 104 },
      { label: "2020년, 열 살", season: "10살", weeks: 52 },
      { label: "2021년", season: "11살", weeks: 52 },
      { label: "2022년, 곰 사육 종식 선언", season: "12살", weeks: 52 },
      { label: "2023년", season: "13살", weeks: 52 },
      { label: "2024년", season: "14살", weeks: 52 },
      { label: "2025년", season: "15살", weeks: 52 },
      { label: "2026년, 곰 사육 금지", season: "16살", weeks: 40 },
    ],
    stages: [
      { id: "young", name: "어린 사육곰", fromTurn: 0, baseRisk: 0.02, desc: "철창 안에서 자란다." },
      { id: "adult", name: "사육곰", fromTurn: 4, baseRisk: 0.03, desc: "열 살이 넘으면 웅담 채취가 허용된다." },
    ],
    backgroundDeaths: [
      { stages: ["young", "adult"], tag: "사람", text: "열악한 철창 안에서 병에 걸려 죽었다.", when: { rescued: false } },
      { stages: ["adult"], tag: "자연", text: "병에 걸려 죽었다.", when: { rescued: true } },
    ],
    baseRiskFactor: (state) => (state.flags.rescued ? 0.3 : 1),
    healthDeath: { tag: "사람", text: "철창 안에서 몸이 약해져 숨을 거뒀다." },
    events: [
      {
        id: "cage_cub", tag: "사람", turns: [0], weight: 1,
        text: "쇠창살 바닥 사이로 발이 빠진다. 어미와는 일찍 떨어졌다.",
        choices: [
          { label: "창살을 깨문다", risk: 0.02, health: -5, contrib: 0, result: "이빨이 닳는다. 흙을 밟아 본 적은 없다.", death: "어린 나이에 병에 걸렸다." },
          { label: "구석에서 몸을 만다", risk: 0.02, health: -5, contrib: 0, result: "사료가 창살 사이로 들어온다.", death: "어린 나이에 병에 걸렸다." },
        ],
      },
      {
        id: "pacing", tag: "사람", turns: [1, 3], when: { rescued: false }, weight: 1,
        text: "좁은 우리 안을 왔다 갔다 한다. 하루에도 수백 번. 같은 자리에서 같은 동작을 되풀이한다.",
        choices: [
          { label: "멈추지 않고 걷는다", risk: 0.01, health: -10, contrib: 0, result: "좁은 공간에 갇힌 동물이 보이는 정형행동이다.", death: "몸이 약해져 숨을 거뒀다." },
          { label: "창살에 머리를 기댄다", risk: 0.01, health: -5, contrib: 0, result: "겨울이 와도 겨울잠에 들지 못했다. 철창 속 곰은 겨울잠을 자지 않는다.", death: "몸이 약해져 숨을 거뒀다." },
        ],
      },
      {
        id: "neuter", tag: "사람", turns: [2], weight: 1,
        text: "수의사들이 와서 마취총을 쐈다. 깨어나 보니 배에 수술 자국이 있다. 더 이상 사육곰이 태어나지 않도록, 2017년까지 전국 사육곰 967마리가 중성화됐다.",
        choices: [
          { label: "수술 자국을 핥는다", outcomes: [{ p: 1, result: "당신은 마지막 세대의 사육곰이 되었다.", setFlags: { neutered: true }, health: -10 }] },
          { label: "창살 밖을 본다", outcomes: [{ p: 1, result: "이제 이 농장에서 새끼 곰은 태어나지 않는다.", setFlags: { neutered: true }, health: -10 }] },
        ],
      },
      {
        id: "bile", tag: "사람", turns: [4, 5, 6, 7, 8, 9], when: { rescued: false }, weight: 3,
        text: "농장 주인이 우리 앞에 서서 당신을 오래 바라본다. 열 살이 넘은 사육곰은 웅담을 얻기 위해 도살할 수 있다.",
        choices: [
          { label: "창살 쪽으로 다가간다", outcomes: [
            { p: 88, result: "주인이 다른 우리로 갔다. 웅담 수요가 줄어 열 살이 넘은 곰도 철창에 남는 경우가 많다." },
            { p: 12, death: "웅담 채취를 위해 도살되었다." },
          ] },
          { label: "우리 안쪽 구석으로 물러선다", outcomes: [
            { p: 88, result: "오늘은 아니었다." },
            { p: 12, death: "웅담 채취를 위해 도살되었다." },
          ] },
        ],
      },
      {
        id: "rescue_chance", tag: "사람", turns: [6, 7, 8, 9], when: { rescued: false }, weight: 1,
        text: "낯선 사람들이 농장에 왔다. 동물단체 사람들이 곰들을 하나하나 살펴본다.",
        choices: [
          { label: "창살 앞으로 다가간다", outcomes: [
            { p: 15, result: "당신은 구조될 곰으로 뽑혔다. 미국과 덴마크의 보호구역, 구례의 보호시설로 곰들이 옮겨지고 있다.", setFlags: { rescued: true } },
            { p: 85, result: "이번에는 다른 곰들이 뽑혔다." },
          ] },
          { label: "구석에 웅크린다", outcomes: [
            { p: 10, result: "그래도 당신이 뽑혔다. 처음으로 철창 밖으로 나간다.", setFlags: { rescued: true } },
            { p: 90, result: "트럭이 다른 곰들을 싣고 떠났다." },
          ] },
        ],
      },
      {
        id: "sanctuary_life", tag: "사람", turns: [7, 8, 9, 10], when: { rescued: true }, weight: 1,
        text: "보호시설의 넓은 방사장. 발밑에 흙과 풀이 있다. 나무 위에 꿀이 숨겨져 있다.",
        choices: [
          { label: "흙을 판다", risk: 0, health: 15, contrib: 0, result: "처음으로 땅을 팠다." },
          { label: "웅덩이에 들어간다", risk: 0, health: 15, contrib: 0, result: "올겨울에는 겨울잠을 잘 수 있을까." },
        ],
      },
      {
        id: "ban_2026", tag: "사람", turns: [10], when: { rescued: false }, weight: 1,
        text: "2026년, 곰 사육과 웅담 채취가 법으로 금지됐다. 남은 곰들을 보호시설로 옮겨야 한다. 하지만 구례와 서천 보호시설을 다 채워도 자리가 모자라다.",
        choices: [
          { label: "트럭 소리에 귀를 기울인다", outcomes: [
            { p: 48, result: "당신의 우리 문이 열렸다. 보호시설로 간다.", setFlags: { rescued: true } },
            { p: 52, result: "트럭은 다른 곰들을 싣고 떠났다." },
          ] },
          { label: "늘 하던 대로 우리 안을 걷는다", outcomes: [
            { p: 48, result: "사람들이 와서 당신을 이동장에 실었다. 보호시설로 간다.", setFlags: { rescued: true } },
            { p: 52, result: "아직 갈 곳이 정해지지 않았다." },
          ] },
        ],
      },
    ],
    action: "웅담 같은 야생동물 부산물은 사지도 먹지도 말아 주세요. 남은 사육곰들이 보호시설로 갈 수 있도록 생추어리 건립과 구조 활동에 관심을 가져 주세요.",
  };
})();
