// 토종 돌고래 두 갈래
// 상괭이: 서해·남해의 작은 토종 돌고래. 2004년 약 3.6만 → 2016년 약 1.7만 마리 (시민단체 자료), 고래연구소는 서해 약 2만 마리 추정
//         혼획·좌초로 해마다 약 800마리 폐사, 혼획이 사망 원인 1위, 안강망에서 가장 많이 걸림
// 남방큰돌고래: 제주 연안 약 110~120마리. 2013년 제돌이 방류 (아시아 최초)
window.ANIMALS = window.ANIMALS || {};

(function () {
  const yearly = (from, to) => Array.from({ length: to - from }, (_, i) => ({ label: `${from + i}살 → ${from + i + 1}살`, season: "한 해", weeks: 52 }));

  window.DOLPHIN_ORIGINS = [
    {
      id: "finless", name: "상괭이", weight: 17000, life: "dolphin.finless",
      desc: "등지느러미가 없고 웃는 얼굴을 한 작은 토종 돌고래. 서해와 남해 얕은 바다에 산다.",
      popNote: "국내 해역 약 1만 7천 마리 (2016년 추정, 시민단체 자료)",
    },
    {
      id: "bottlenose", name: "제주 남방큰돌고래", weight: 120, life: "dolphin.jeju",
      desc: "제주 바닷가를 따라 무리 지어 다니는 돌고래. 한국에서는 제주에만 산다.",
      popNote: "제주 연안 약 110~120마리",
    },
  ];

  window.ANIMALS["dolphin.finless"] = {
    id: "dolphin.finless",
    name: "상괭이",
    emoji: "🐬",
    peerLabel: "새끼 상괭이",
    successLabel: "열 살까지 산 상괭이",
    intro: "서해의 탁한 바닷물 속에서 태어났다. 어미가 당신을 수면 위로 밀어 올려 첫 숨을 쉬게 한다. 당신은 등지느러미가 없는 작은 돌고래, 상괭이다.",
    endText: "열 해를 살았다. 그물을 피하는 법을 아는 상괭이는 많지 않다.",
    lifespan: { weeks: 1040, label: "약 20년", note: "상괭이 수명은 20년 안팎으로 알려져 있음 (확인 필요)", verified: false },
    timeline: [
      { label: "태어난 날", season: "봄", weeks: 1 },
      { label: "어미 곁 첫 여름", season: "여름", weeks: 25 },
      { label: "어미 곁 첫 겨울", season: "겨울", weeks: 26 },
    ].concat(yearly(1, 10)),
    stages: [
      { id: "calf", name: "새끼 상괭이", fromTurn: 0, baseRisk: 0.04, desc: "어미 곁을 떠나지 않는다." },
      { id: "adult", name: "상괭이", fromTurn: 3, baseRisk: 0.02, desc: "혼자 물고기를 사냥한다." },
    ],
    backgroundDeaths: [
      { stages: ["calf"], tag: "자연", text: "어미와 떨어져 살아남지 못했다." },
      { stages: ["adult"], tag: "사람", text: "안강망 그물에 걸려 숨을 쉬지 못했다." },
      { stages: ["adult"], tag: "자연", text: "병에 걸려 해안에 좌초했다." },
    ],
    healthDeath: { tag: "자연", text: "먹이를 구하지 못해 쇠약해졌다." },
    events: [
      {
        id: "first_breath", tag: "자연", turns: [0], weight: 1,
        text: "어미 옆에 바짝 붙어 헤엄친다. 숨을 쉬려면 수면으로 올라가야 한다.",
        choices: [
          { label: "어미를 따라 함께 올라간다", risk: 0.03, health: 10, contrib: 0, result: "숨 쉬는 박자를 익혔다.", death: "첫 며칠을 넘기지 못했다." },
          { label: "혼자 올라가 본다", risk: 0.05, health: 5, contrib: 0, result: "어미가 금세 따라왔다.", death: "첫 며칠을 넘기지 못했다." },
        ],
      },
      {
        id: "calf_net", tag: "사람", turns: [1, 2], weight: 1,
        text: "어미를 따라 물고기 떼를 쫓는데 앞에 거대한 그물 입구가 열려 있다. 물살을 따라 물고기를 쓸어 담는 안강망이다.",
        choices: [
          { label: "어미 뒤에 바짝 붙는다", risk: 0.05, health: 0, contrib: 0, result: "어미가 그물 옆으로 비켜 갔다.", death: "어미와 함께 그물에 휩쓸려 들어갔다." },
          { label: "물고기 떼를 따라간다", risk: 0.15, health: 5, contrib: 0, result: "그물 입구 앞에서 겨우 몸을 돌렸다.", death: "그물 안으로 빨려 들어가 숨을 쉬지 못했다." },
        ],
      },
      {
        id: "stow_net", tag: "사람", tagNote: "혼획", stages: ["adult"], weight: 3,
        text: "멸치 떼가 그물 쪽으로 몰린다. 배가 고프다.",
        choices: [
          { label: "멸치 떼를 쫓아 들어간다", risk: 0.05, health: 15, contrib: 0,
            result: "그물 입구에서 몸을 돌렸다. 상괭이는 해마다 약 800마리가 그물에 걸리거나 좌초해 죽고, 혼획이 사망 원인 1위다.",
            death: "안강망에 걸려 숨을 쉬지 못했다. 그물을 걷던 어민이 죽은 상괭이를 발견했다." },
          { label: "그물을 피해 먼 바다로 간다", risk: 0.02, health: -10, contrib: 0, result: "배는 덜 찼지만 그물은 없다.", death: "먼 바다에서 길을 잃었다." },
        ],
      },
      {
        id: "escape_device", tag: "사람", stages: ["adult"], weight: 1,
        text: "그물 안에 갇혔다. 그런데 그물 한쪽에 빛이 들어오는 구멍이 보인다. 상괭이 탈출 장치다.",
        choices: [
          { label: "구멍으로 몸을 밀어 넣는다", outcomes: [
            { p: 90, result: "빠져나왔다. 정부는 안강망 어선에 상괭이 탈출 장치를 보급하고 있다. 아직은 일부 어선뿐이다." },
            { p: 10, death: "구멍을 찾기 전에 숨이 다했다." },
          ] },
          { label: "그물 벽을 들이받는다", outcomes: [
            { p: 60, result: "그물이 찢어져 빠져나왔다." },
            { p: 40, death: "그물에 몸이 감겨 숨을 쉬지 못했다." },
          ] },
        ],
      },
      {
        id: "construction", tag: "사람", stages: ["adult"], weight: 1,
        text: "늘 사냥하던 얕은 바다에 커다란 구조물이 들어선다. 바다 공사 소음이 귀를 때린다.",
        choices: [
          { label: "다른 바다로 옮긴다", risk: 0.03, health: -10, contrib: 0, result: "새 사냥터를 찾았다. 돌고래는 소리로 세상을 본다.", death: "낯선 바다에서 길을 잃고 좌초했다." },
          { label: "참고 머문다", risk: 0.02, health: -15, contrib: 0, result: "소음 때문에 사냥이 어려웠다.", death: "먹이를 찾지 못해 쇠약해졌다." },
        ],
      },
      {
        id: "plastic", tag: "사람", stages: ["adult"], weight: 1,
        text: "물속에 비닐과 끊어진 그물 조각이 떠다닌다.",
        choices: [
          { label: "피해서 헤엄친다", risk: 0.01, health: 0, contrib: 0, result: "무사히 지나갔다.", death: "끊어진 그물에 감겼다." },
          { label: "장난치듯 물어 본다", risk: 0.06, health: -5, contrib: 0, result: "뱉어 냈다.", death: "삼킨 비닐이 배 속을 막았다." },
        ],
      },
      {
        id: "calf_birth", tag: "자연", stages: ["adult"], weight: 1,
        text: "봄, 무리 안에서 새끼가 태어났다. 모두 새끼 곁을 지킨다.",
        choices: [
          { label: "새끼 곁을 함께 헤엄친다", risk: 0, health: 5, contrib: 0, result: "작은 무리가 조금 커졌다." },
          { label: "멀리 사냥을 나간다", risk: 0.02, health: 10, contrib: 0, result: "배가 찼다.", death: "사냥 중 그물에 걸렸다." },
        ],
      },
    ],
    action: "상괭이는 해양보호생물이에요. 해안에서 죽거나 다친 돌고래를 보면 해양경찰(122)에 신고해 주세요. 바다에 쓰레기와 낚싯줄을 버리지 않는 것도 돌고래를 지키는 일이에요.",
  };

  window.ANIMALS["dolphin.jeju"] = {
    id: "dolphin.jeju",
    name: "제주 남방큰돌고래",
    emoji: "🐬",
    peerLabel: "새끼 돌고래",
    successLabel: "열 살까지 산 돌고래",
    intro: "제주 바닷가 가까운 바다에서 태어났다. 무리에는 수족관에서 쇼를 하다 2013년 바다로 돌아온 '제돌이'의 친구들도 있다.",
    endText: "열 해를 살았다. 제주 바다를 따라 오늘도 무리와 함께 헤엄친다.",
    lifespan: { weeks: 2080, label: "약 40년", note: "남방큰돌고래는 수십 년을 살 수 있는 것으로 알려져 있음 (확인 필요)", verified: false },
    timeline: [
      { label: "태어난 날", season: "여름", weeks: 1 },
      { label: "어미 곁 첫 해", season: "한 해", weeks: 51 },
    ].concat(yearly(1, 10)),
    stages: [
      { id: "calf", name: "새끼 돌고래", fromTurn: 0, baseRisk: 0.04, desc: "어미 곁을 떠나지 않는다." },
      { id: "adult", name: "남방큰돌고래", fromTurn: 2, baseRisk: 0.02, desc: "무리와 함께 제주 연안을 돈다." },
    ],
    backgroundDeaths: [
      { stages: ["calf"], tag: "자연", text: "어미와 떨어져 살아남지 못했다." },
      { stages: ["adult"], tag: "자연", text: "병에 걸려 죽었다." },
      { stages: ["adult"], tag: "사람", text: "버려진 낚싯줄에 감겨 상처가 덧났다." },
    ],
    healthDeath: { tag: "자연", text: "먹이를 구하지 못해 쇠약해졌다." },
    events: [
      {
        id: "pod", tag: "자연", turns: [0, 1], weight: 1,
        text: "무리 수십 마리가 바닷가를 따라 헤엄친다. 어미 옆에 바짝 붙어 따라간다.",
        choices: [
          { label: "어미의 물살을 타고 헤엄친다", risk: 0.03, health: 10, contrib: 0, result: "새끼는 어미가 만드는 물살을 타고 힘을 아낀다.", death: "무리를 놓쳤다." },
          { label: "다른 새끼들과 장난친다", risk: 0.04, health: 5, contrib: 0, result: "어미가 금세 불러들였다.", death: "무리를 놓쳤다." },
        ],
      },
      {
        id: "tour_boats", tag: "사람", stages: ["adult"], weight: 3,
        text: "관광선 여러 척이 무리를 바짝 뒤쫓는다. 사람들이 환호성을 지르며 사진을 찍는다.",
        choices: [
          { label: "깊은 바다로 피한다", risk: 0.01, health: -10, contrib: 0, result: "사냥을 멈추고 한참 피해 다녔다. 가까이 쫓아오는 배는 돌고래의 휴식과 사냥을 방해한다.", death: "피하다 지쳐 쇠약해졌다." },
          { label: "배 옆에서 헤엄친다", risk: 0.04, health: -5, contrib: 0, result: "배가 너무 가까웠다.", death: "배의 스크루에 다쳤다." },
        ],
      },
      {
        id: "fishing_line", tag: "사람", stages: ["adult"], weight: 1,
        text: "입가에 무언가가 걸렸다. 갯바위 낚시꾼이 버린 낚싯줄과 바늘이다.",
        choices: [
          { label: "몸을 비틀어 떼어 내려 한다", outcomes: [
            { p: 60, result: "겨우 떨어져 나갔다." },
            { p: 35, result: "낚싯줄이 꼬리지느러미에 감긴 채 남았다. 구조팀이 몇 달째 당신을 지켜보고 있다.", health: -25 },
            { p: 5, death: "낚싯줄에 감긴 상처가 깊어져 죽었다." },
          ] },
          { label: "참고 무리를 따라간다", outcomes: [
            { p: 40, result: "시간이 지나 줄이 끊어졌다." },
            { p: 55, result: "줄이 살을 파고든다. 구조팀이 줄을 끊어 주었다.", health: -20 },
            { p: 5, death: "낚싯줄에 감긴 상처가 깊어져 죽었다." },
          ] },
        ],
      },
      {
        id: "coast", tag: "사람", stages: ["adult"], weight: 1,
        text: "늘 다니던 얕은 바다에 항구와 해상 시설 공사가 시작됐다.",
        choices: [
          { label: "다른 해안으로 돌아간다", risk: 0.02, health: -10, contrib: 0, result: "먼 길을 돌았다. 제주 바다에서만 사는 돌고래에게 갈 곳은 많지 않다.", death: "낯선 곳에서 그물에 걸렸다." },
          { label: "공사장 근처를 지난다", risk: 0.03, health: -10, contrib: 0, result: "소음에 귀가 먹먹했다.", death: "소음 속에서 방향을 잃었다." },
        ],
      },
      {
        id: "net", tag: "사람", stages: ["adult"], weight: 1,
        text: "어민이 쳐 둔 그물에 몸이 걸렸다.",
        choices: [
          { label: "버둥거린다", outcomes: [
            { p: 92, result: "어민이 그물을 풀어 주었다. 제돌이 방류 이후 제주 어민들은 그물에 걸린 돌고래를 풀어 주고 있다." },
            { p: 8, death: "그물을 풀기 전에 숨이 다했다." },
          ] },
          { label: "숨을 참고 기다린다", outcomes: [
            { p: 95, result: "어민이 다가와 그물을 잘라 주었다." },
            { p: 5, death: "그물을 풀기 전에 숨이 다했다." },
          ] },
        ],
      },
      {
        id: "calf_birth", tag: "자연", stages: ["adult"], weight: 1,
        text: "무리에 새끼가 태어났다. 2016년에는 바다로 돌아간 쇼 돌고래가 새끼를 낳기도 했다.",
        choices: [
          { label: "새끼 곁을 지킨다", risk: 0, health: 5, contrib: 0, result: "무리가 조금 커졌다." },
          { label: "사냥을 나간다", risk: 0.01, health: 10, contrib: 0, result: "배가 찼다.", death: "사냥 중 그물에 걸렸다." },
        ],
      },
    ],
    action: "돌고래 관광을 할 때는 배가 돌고래에게 가까이 다가가지 않는 업체를 골라 주세요. 낚시를 한다면 끊어진 낚싯줄과 바늘을 꼭 가져와 주세요. 돌고래 쇼를 보러 가지 않는 것도 돌고래를 지키는 방법이에요.",
  };
})();
