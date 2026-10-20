// 바다거북: 남쪽 바다에서 태어나 해류를 타고 한국 바다에 오는 멸종위기종 (국내 개체 수 자료 없음)
// 국내 폐사체 34마리 중 28마리(82.3%)에서 플라스틱 1,280개 발견 (해양과학기술원), 제주 북서부 연안 좌초 빈도 높음
window.ANIMALS = window.ANIMALS || {};

(function () {
  window.ANIMALS.turtle = {
    id: "turtle",
    name: "푸른바다거북",
    emoji: "🐢",
    peerLabel: "새끼 거북",
    successLabel: "열 살까지 산 바다거북",
    intro: "먼 남쪽 바닷가 모래 속 알에서 깨어나, 수백 마리 형제와 함께 달빛 쪽 바다로 기어갔다. 몇 해 뒤, 해류를 타고 한국 남쪽 바다까지 왔다.",
    endText: "열 해를 살았다. 바다거북은 수십 년을 산다. 언젠가 태어난 바닷가로 돌아가 알을 낳을 것이다.",
    lifespan: { weeks: 3120, label: "수십 년", note: "푸른바다거북은 수십 년을 사는 것으로 알려져 있음 (확인 필요)", verified: false },
    timeline: [
      { label: "모래 속 알에서 깨어난 밤", season: "여름", weeks: 1 },
      { label: "첫 해, 먼 바다를 떠돌다", season: "한 해", weeks: 51 },
      { label: "1~3살, 해류를 타고", season: "한 해", weeks: 104 },
      { label: "3살, 한국 바다에 닿다", season: "여름", weeks: 52 },
      { label: "4살", season: "한 해", weeks: 52 },
      { label: "5살", season: "한 해", weeks: 52 },
      { label: "6살", season: "한 해", weeks: 52 },
      { label: "7살", season: "한 해", weeks: 52 },
      { label: "8살", season: "한 해", weeks: 52 },
      { label: "9살 → 10살", season: "한 해", weeks: 52 },
    ],
    stages: [
      { id: "hatchling", name: "새끼 거북", fromTurn: 0, baseRisk: 0.15, desc: "손바닥보다 작다. 바다의 모든 것이 천적이다." },
      { id: "juvenile", name: "어린 바다거북", fromTurn: 2, baseRisk: 0.04, desc: "등딱지가 단단해졌다." },
    ],
    backgroundDeaths: [
      { stages: ["hatchling"], tag: "자연", text: "물고기와 바닷새에게 잡아먹혔다." },
      { stages: ["juvenile"], tag: "사람", text: "배 속에 쌓인 플라스틱 때문에 먹이를 소화하지 못했다." },
      { stages: ["juvenile"], tag: "자연", text: "병에 걸려 해안으로 떠밀려 왔다." },
    ],
    healthDeath: { tag: "사람", text: "배 속에 쌓인 쓰레기 때문에 굶주려 쇠약해졌다." },
    events: [
      {
        id: "to_the_sea", tag: "사람", turns: [0], weight: 1,
        text: "모래를 헤치고 나왔다. 바다 쪽으로 가야 하는데, 반대편 해변 호텔의 불빛이 더 밝다.",
        choices: [
          { label: "달빛이 비치는 파도 쪽으로 기어간다", risk: 0.2, health: 0, contrib: 0, result: "바다에 닿았다. 새끼 바다거북은 밝은 쪽을 바다로 알고 기어간다.", death: "바다에 닿기 전에 게와 새에게 잡혔다." },
          { label: "밝은 불빛 쪽으로 기어간다", risk: 0.35, health: -10, contrib: 0, result: "길을 잃었다가 겨우 파도 소리를 찾았다.", death: "인공 불빛을 따라 육지로 기어가다 말라 죽었다." },
        ],
      },
      {
        id: "drift", tag: "자연", turns: [1, 2], weight: 1,
        text: "해조류 더미에 몸을 숨기고 해류를 따라 떠다닌다.",
        choices: [
          { label: "해조류 더미에 숨는다", risk: 0.05, health: 10, contrib: 0, result: "작은 먹이가 많다.", death: "큰 물고기에게 잡아먹혔다." },
          { label: "넓은 바다로 헤엄쳐 나간다", risk: 0.1, health: 5, contrib: 0, result: "해류를 타고 북쪽으로 왔다.", death: "넓은 바다에서 잡아먹혔다." },
        ],
      },
      {
        id: "plastic_bag", tag: "사람", stages: ["juvenile"], weight: 3,
        text: "물속에 하늘하늘한 것이 떠 있다. 해파리처럼 보인다.",
        choices: [
          { label: "물어서 삼킨다", outcomes: [
            { p: 70, result: "비닐봉지였다. 배 속에 쌓인다. 국내에서 발견된 바다거북 폐사체 10마리 중 8마리의 배 속에서 플라스틱이 나왔다.", health: -25 },
            { p: 30, result: "진짜 해파리였다.", health: 10 },
          ] },
          { label: "그냥 지나친다", risk: 0, health: -5, contrib: 0, result: "배가 고프다." },
        ],
      },
      {
        id: "net", tag: "사람", tagNote: "혼획", stages: ["juvenile"], weight: 2,
        text: "해초 사이에서 먹이를 찾다 버려진 그물에 앞발이 걸렸다.",
        choices: [
          { label: "버둥거려 빠져나가려 한다", outcomes: [
            { p: 50, result: "그물이 끊어져 빠져나왔다." },
            { p: 30, result: "어민에게 발견되어 구조됐다. 치료를 받고 바다로 돌아갔다. 해양생물 구조치료기관이 다친 바다거북을 치료해 방류한다.", health: -15 },
            { p: 20, death: "그물에 감긴 채 숨을 쉬러 올라가지 못했다." },
          ] },
          { label: "힘을 아끼며 기다린다", outcomes: [
            { p: 40, result: "물살에 그물이 풀렸다." },
            { p: 30, result: "어민이 그물을 걷다 당신을 발견해 풀어 주었다." },
            { p: 30, death: "그물에 감긴 채 숨을 쉬러 올라가지 못했다." },
          ] },
        ],
      },
      {
        id: "fishing_gear", tag: "사람", stages: ["juvenile"], weight: 2,
        text: "제주 바닷가 갯바위 근처. 바닥에 반짝이는 루어와 낚싯줄이 엉켜 있다.",
        choices: [
          { label: "반짝이는 것을 물어 본다", risk: 0.15, health: -10, contrib: 0, result: "뱉어 냈다. 제주 북서부 연안은 바다거북 좌초가 잦고, 버려진 낚시 도구가 위협으로 꼽힌다.", death: "낚싯바늘을 삼켰다." },
          { label: "해초밭으로 돌아간다", risk: 0.01, health: 5, contrib: 0, result: "해초를 뜯어 먹었다. 다 자란 푸른바다거북은 해초를 먹는다.", death: "해초밭에도 낚싯줄이 있었다." },
        ],
      },
      {
        id: "boat", tag: "사람", stages: ["juvenile"], weight: 1,
        text: "숨을 쉬러 수면에 올라왔는데, 엔진 소리가 빠르게 다가온다.",
        choices: [
          { label: "급히 잠수한다", risk: 0.05, health: 0, contrib: 0, result: "배가 머리 위를 지나갔다.", death: "배에 부딪혀 등딱지가 깨졌다." },
          { label: "그대로 숨을 쉰다", risk: 0.15, health: 0, contrib: 0, result: "배가 비켜 갔다.", death: "배에 부딪혀 등딱지가 깨졌다." },
        ],
      },
      {
        id: "cold_stun", tag: "자연", stages: ["juvenile"], weight: 1,
        text: "가을이 깊어지자 바닷물이 차가워진다. 몸이 굳어 온다.",
        choices: [
          { label: "따뜻한 남쪽 바다로 내려간다", risk: 0.03, health: -10, contrib: 0, result: "따뜻한 해류를 찾았다.", death: "차가운 바다에서 몸이 굳어 떠밀려 왔다." },
          { label: "익숙한 바다에 머문다", risk: 0.1, health: -15, contrib: 0, result: "추위를 버텼다.", death: "차가운 바다에서 몸이 굳어 떠밀려 왔다." },
        ],
      },
    ],
    action: "비닐봉지와 일회용 플라스틱을 줄이고, 바닷가에 쓰레기를 남기지 마세요. 낚시를 한다면 낚싯줄과 바늘을 꼭 가져와 주세요. 해안에서 다친 바다거북을 보면 해양경찰(122)에 신고해 주세요.",
  };
})();
