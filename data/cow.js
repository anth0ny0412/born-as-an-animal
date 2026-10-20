// 젖소: 국내 36만 5천 마리 (2026년 2분기 가축동향)
// 암송아지는 젖소가 되어 2~3번 출산 뒤 도태 (국립축산과학원 2022: 기존 2산 → 개량으로 3산 도태 가능)
// 수송아지는 젖을 짤 수 없어 고기용 소(육우)로 팔려 간다
window.ANIMALS = window.ANIMALS || {};

(function () {
  const heat = {
    id: "heat", tag: "사람", tagNote: "폭염", weight: 1,
    text: "폭염. 젖소는 더위에 약하다. 축사 지붕 아래 공기가 끓는다.",
    choices: [
      { label: "선풍기 바람 아래 눕는다", risk: 0.01, health: -10, contrib: 0, result: "더위에 우유량이 줄었다.", death: "더위를 이기지 못했다." },
      { label: "물통 앞을 떠나지 않는다", risk: 0.01, health: -5, contrib: 0, result: "하루를 버텼다.", death: "더위를 이기지 못했다." },
    ],
  };

  const common = {
    emoji: "🐄",
    successLabel: "자연 수명까지 산 소",
    endText: "",
    lifespan: {
      weeks: 1040,
      label: "약 20년",
      note: "소의 자연 수명은 20년 가까이로 알려져 있음 (확인 필요). 해외 농장 연구에서 도태된 젖소의 평균 나이는 약 5.9세",
      verified: false,
    },
    healthDeath: { tag: "사람", text: "몸이 약해져 일어나지 못했고, 도태되었다." },
    action: "우유와 유제품 뒤에는 해마다 태어나는 송아지가 있어요. 동물복지 인증 목장 제품을 찾아보고, 젖소가 더 오래 건강하게 살 수 있는 목장을 응원해 주세요.",
  };

  window.COW_ORIGINS = [
    {
      id: "heifer", name: "젖소 암송아지", weight: 50, life: "cow.dairy",
      desc: "자라서 우유를 짤 젖소가 될 암송아지.",
      popNote: "송아지의 암수 비율을 반반으로 둠",
    },
    {
      id: "bull_calf", name: "젖소 수송아지", weight: 50, life: "cow.bull",
      desc: "젖을 짤 수 없어 태어나자마자 고기용으로 팔려 가는 수송아지.",
      popNote: "송아지의 암수 비율을 반반으로 둠",
    },
  ];

  window.ANIMALS["cow.dairy"] = Object.assign({}, common, {
    id: "cow.dairy",
    name: "젖소",
    peerLabel: "암송아지",
    contribLabel: "낳은 송아지",
    intro: "목장의 축사에서 태어났다. 어미가 몇 번 핥아 주자마자 사람들이 당신을 송아지 우리로 옮겼다. 어미의 젖은 사람이 마실 우유가 된다.",
    timeline: [
      { label: "태어난 날", season: "0개월", weeks: 1 },
      { label: "송아지 시절", season: "~6개월", weeks: 25 },
      { label: "육성우, 첫 인공수정", season: "~15개월", weeks: 40 },
      { label: "첫 임신", season: "~24개월", weeks: 38 },
      { label: "첫 출산과 착유", season: "1산", weeks: 50, contrib: 1 },
      { label: "두 번째 출산과 착유", season: "2산", weeks: 56, contrib: 1 },
      { label: "세 번째 출산과 착유", season: "3산", weeks: 56, contrib: 1 },
      { label: "네 번째 출산과 착유", season: "4산", weeks: 56, contrib: 1 },
      { label: "도태", season: "약 6~7살", weeks: 1 },
    ],
    stages: [
      { id: "calf", name: "송아지", fromTurn: 0, baseRisk: 0.03, desc: "어미 없이 우유 대용 먹이를 먹고 자란다." },
      { id: "heifer", name: "육성우", fromTurn: 2, baseRisk: 0.01, desc: "아직 젖을 짜지 않는다." },
      { id: "cow", name: "착유우", fromTurn: 4, baseRisk: 0.03, desc: "하루 두 번 젖을 짠다." },
    ],
    backgroundDeaths: [
      { stages: ["calf"], tag: "사람", text: "송아지 설사병으로 죽었다." },
      { stages: ["heifer"], tag: "사람", text: "병에 걸려 죽었다." },
      { stages: ["cow"], tag: "사람", text: "유방염이 낫지 않아 도태되었다." },
      { stages: ["cow"], tag: "사람", text: "발굽병으로 걷지 못하게 되어 도태되었다." },
    ],
    events: [
      {
        id: "separation", tag: "사람", turns: [0], weight: 1,
        text: "송아지 우리 안. 멀리서 어미 소가 우는 소리가 며칠째 들린다.",
        choices: [
          { label: "울음소리 쪽으로 계속 운다", risk: 0.02, health: -10, contrib: 0, result: "사람이 젖병으로 우유 대용 먹이를 주었다.", death: "기운을 잃고 쓰러졌다." },
          { label: "젖병을 빤다", risk: 0.01, health: 5, contrib: 0, result: "배가 찼다. 어미의 냄새는 점점 잊혀 간다.", death: "설사병에 걸렸다." },
        ],
      },
      {
        id: "dehorning", tag: "사람", turns: [1], weight: 1,
        text: "사람이 머리를 붙잡고 뿔이 날 자리를 지진다. 나중에 서로 다치지 않게 하려는 '제각'이다.",
        choices: [
          { label: "몸부림친다", risk: 0.01, health: -15, contrib: 0, result: "며칠 동안 머리가 아팠다.", death: "상처가 덧났다." },
          { label: "참는다", risk: 0.01, health: -10, contrib: 0, result: "뿔은 자라지 않을 것이다.", death: "상처가 덧났다." },
        ],
      },
      {
        id: "insemination", tag: "사람", turns: [2], weight: 1,
        text: "15개월쯤, 사람이 인공수정을 했다. 우유를 짜려면 먼저 송아지를 낳아야 한다.",
        choices: [
          { label: "풀을 뜯는다", risk: 0, health: 5, contrib: 0, result: "임신이 확인됐다." },
          { label: "축사 밖을 바라본다", risk: 0, health: 0, contrib: 0, result: "임신이 확인됐다." },
        ],
      },
      {
        id: "first_calf", tag: "사람", turns: [3, 4], weight: 1,
        text: "첫 송아지를 낳았다. 핥아 주고 있는데 사람들이 송아지를 데려간다.",
        choices: [
          { label: "송아지를 따라가려 한다", risk: 0.01, health: -10, contrib: 0, result: "울타리가 막았다. 며칠 동안 송아지를 부르며 울었다.", death: "출산 뒤 기운을 회복하지 못했다." },
          { label: "그 자리에 서서 운다", risk: 0.01, health: -10, contrib: 0, result: "다음 날부터 하루 두 번 착유기 앞에 섰다.", death: "출산 뒤 기운을 회복하지 못했다." },
        ],
      },
      {
        id: "milking", tag: "사람", turns: [4, 5, 6, 7], weight: 2,
        text: "하루 두 번, 착유실로 줄지어 들어간다. 한 번 출산하면 약 10개월 동안 젖을 짠다.",
        choices: [
          { label: "순서대로 들어간다", risk: 0.02, health: -5, contrib: 0, result: "익숙해졌다. 젖을 짜는 동안 다음 임신이 시작된다.", death: "유방염이 깊어져 도태되었다." },
          { label: "착유기를 피하려 버틴다", risk: 0.03, health: -10, contrib: 0, result: "결국 착유기에 들어갔다.", death: "유방염이 깊어져 도태되었다." },
        ],
      },
      {
        id: "hooves", tag: "사람", turns: [5, 6, 7], weight: 1,
        text: "콘크리트 바닥에서 오래 서 있다 보니 발굽이 아프다.",
        choices: [
          { label: "절뚝이며 걷는다", outcomes: [
            { p: 85, result: "발굽을 다듬어 주었다. 조금 나아졌다.", health: -5 },
            { p: 15, death: "다리를 절게 되어 우유량이 줄었고, 도태되었다." },
          ] },
          { label: "누워만 있는다", outcomes: [
            { p: 85, result: "며칠 쉬자 나아졌다.", health: -10 },
            { p: 15, death: "일어나지 못하게 되어 도태되었다." },
          ] },
        ],
      },
      {
        id: "keep_or_cull", tag: "사람", turns: [6, 7], weight: 2,
        text: "우유량을 기록하던 사람이 고개를 갸웃한다. 몇 번 더 출산할지, 여기서 멈출지 정하는 때다.",
        choices: [
          { label: "착유실로 묵묵히 걸어간다", outcomes: [
            { p: 60, result: "한 번 더 임신하게 되었다. 국내 젖소는 예전엔 2번 출산 뒤 도태됐지만, 개량으로 3번까지 늘었다." },
            { p: 40, death: "우유량이 기준보다 낮아 도태되었다." },
          ] },
          { label: "축사 구석에 서 있는다", outcomes: [
            { p: 60, result: "한 번 더 임신하게 되었다." },
            { p: 40, death: "우유량이 기준보다 낮아 도태되었다." },
          ] },
        ],
      },
      Object.assign({ turns: [3, 4, 5, 6, 7] }, heat),
      {
        id: "last_day", tag: "사람", turns: [8], weight: 1,
        text: "네 번째 착유가 끝났다. 트럭이 축사 앞에 섰다.",
        choices: [
          { label: "착유실 쪽을 돌아본다", outcomes: [{ p: 1, death: "도태되어 고기용으로 도축되었다. 약 6~7살. 소의 자연 수명은 20년 가까이 된다." }] },
          { label: "트럭에 오른다", outcomes: [{ p: 1, death: "도태되어 도축되었다. 송아지 넷을 낳았지만 한 마리도 키워 보지 못했다." }] },
        ],
      },
    ],
  });

  window.ANIMALS["cow.bull"] = Object.assign({}, common, {
    id: "cow.bull",
    name: "젖소 수송아지",
    peerLabel: "수송아지",
    intro: "목장에서 태어났다. 수컷은 젖을 짤 수 없다. 며칠 뒤 당신은 고기용 소를 키우는 농장으로 팔려 간다.",
    timeline: [
      { label: "태어난 날", season: "0개월", weeks: 1 },
      { label: "팔려 가는 날", season: "생후 며칠", weeks: 1 },
      { label: "육우 송아지 시절", season: "~6개월", weeks: 24 },
      { label: "비육기", season: "~20개월", weeks: 60 },
      { label: "출하 날", season: "약 1년 반~2년", weeks: 1 },
    ],
    stages: [
      { id: "calf", name: "송아지", fromTurn: 0, baseRisk: 0.04, desc: "어미 곁에 오래 있지 못한다." },
      { id: "steer", name: "육우", fromTurn: 3, baseRisk: 0.01, desc: "고기용으로 살을 찌운다." },
    ],
    backgroundDeaths: [
      { stages: ["calf"], tag: "사람", text: "송아지 설사병으로 죽었다." },
      { stages: ["calf"], tag: "사람", text: "이동 스트레스로 기운을 잃었다." },
      { stages: ["steer"], tag: "사람", text: "병에 걸려 죽었다." },
    ],
    events: [
      {
        id: "born_male", tag: "사람", turns: [0], weight: 1,
        text: "사람이 다리 사이를 확인하더니 '수컷'이라고 적는다.",
        choices: [
          { label: "어미 젖을 찾는다", risk: 0.02, health: 10, contrib: 0, result: "처음이자 마지막 초유를 먹었다.", death: "태어날 때부터 몸이 약했다." },
          { label: "비틀거리며 일어선다", risk: 0.02, health: 0, contrib: 0, result: "어미가 코로 밀어 주었다.", death: "태어날 때부터 몸이 약했다." },
        ],
      },
      {
        id: "sold", tag: "사람", turns: [1], weight: 1,
        text: "트럭에 실렸다. 같은 날 태어난 다른 목장의 수송아지들이 섞여 있다.",
        choices: [
          { label: "다른 송아지에게 몸을 붙인다", risk: 0.03, health: -5, contrib: 0, result: "육우 농장에 도착했다. 육우는 젖소 수송아지를 키운 고기용 소다.", death: "이동 중에 기운을 잃었다." },
          { label: "어미를 부르며 운다", risk: 0.04, health: -10, contrib: 0, result: "육우 농장에 도착했다.", death: "이동 중에 기운을 잃었다." },
        ],
      },
      {
        id: "calf_pen", tag: "사람", turns: [2], weight: 1,
        text: "젖병 대신 사료를 먹기 시작한다. 송아지 설사병이 우리를 돈다.",
        choices: [
          { label: "사료를 열심히 먹는다", risk: 0.03, health: 10, contrib: 0, result: "몸이 자랐다.", death: "설사병으로 기운을 잃었다." },
          { label: "물만 마신다", risk: 0.05, health: -10, contrib: 0, result: "며칠 뒤 입맛이 돌아왔다.", death: "설사병으로 기운을 잃었다." },
        ],
      },
      {
        id: "fattening", tag: "사람", turns: [3], weight: 2,
        text: "넓지 않은 우리에서 곡물 사료를 먹으며 살을 찌운다.",
        choices: [
          { label: "사료통 앞을 지킨다", risk: 0.01, health: 10, contrib: 0, result: "출하 무게가 가까워진다.", death: "과식으로 탈이 났다." },
          { label: "우리 밖 풀 냄새를 맡는다", risk: 0, health: 0, contrib: 0, result: "풀밭을 밟아 본 적은 없다." },
        ],
      },
      Object.assign({ turns: [3] }, heat),
      {
        id: "shipping", tag: "사람", turns: [4], weight: 1,
        text: "출하 날. 트럭이 우리 앞에 섰다.",
        choices: [
          { label: "뒷걸음질 친다", outcomes: [{ p: 1, death: "도축되었다. 태어난 지 2년이 채 안 됐다. 소의 자연 수명은 20년 가까이 된다." }] },
          { label: "앞 소를 따라간다", outcomes: [{ p: 1, death: "도축되었다. 우유를 얻기 위해 태어난 수많은 수송아지 중 하나였다." }] },
        ],
      },
    ],
  });
})();
