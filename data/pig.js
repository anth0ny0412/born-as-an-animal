// 돼지: 국내 약 1,072만 마리 (2026년 1분기, 돼지이력제 기반 조사 이후 최저)
// 이유 후 육성률 약 85.2% (2024) — 젖을 뗀 새끼의 약 15%가 죽고, 유럽(약 6.5%)의 2배가 넘음
// 2019년 아프리카돼지열병(ASF) 첫 발생, 한 달 동안 15만 4,548마리 살처분
window.ANIMALS = window.ANIMALS || {};

(function () {
  const asf = {
    id: "asf", tag: "사람", tagNote: "아프리카돼지열병", weight: 1,
    text: "근처 농장에서 아프리카돼지열병이 나왔다는 소식. 방역복을 입은 사람들이 축사를 오간다.",
    choices: [
      { label: "구석에 몸을 웅크린다", outcomes: [
        { p: 96, result: "이번에는 이 농장까지 오지 않았다." },
        { p: 4, death: "발생 농장 근처라 예방적 살처분되었다. 2019년 가을에는 한 달 만에 15만 마리가 넘는 돼지가 살처분됐다." },
      ] },
      { label: "평소처럼 사료통으로 간다", outcomes: [
        { p: 96, result: "방역차가 지나갔다. 농장은 무사했다." },
        { p: 4, death: "발생 농장 근처라 예방적 살처분되었다." },
      ] },
    ],
  };
  const heat = {
    id: "heat", tag: "사람", tagNote: "폭염", weight: 1,
    text: "폭염. 돼지는 땀을 거의 흘리지 못한다. 축사 안 공기가 무겁다.",
    choices: [
      { label: "시멘트 바닥에 배를 깔고 눕는다", risk: 0.01, health: -10, contrib: 0, result: "해가 지고서야 숨이 돌아왔다.", death: "더위를 이기지 못했다." },
      { label: "물꼭지 앞을 차지한다", risk: 0.01, health: -5, contrib: 0, result: "물을 뒤집어쓰며 버텼다.", death: "더위를 이기지 못했다." },
    ],
  };

  const common = {
    emoji: "🐖",
    successLabel: "자연 수명까지 산 돼지",
    endText: "",
    lifespan: {
      weeks: 780,
      label: "약 15~20년",
      note: "돼지의 자연 수명은 흔히 15~20년으로 알려져 있음 (확인 필요)",
      verified: false,
    },
    healthDeath: { tag: "사람", text: "몸이 약해져 일어나지 못했다." },
    action: "돼지고기를 고를 때 동물복지 인증 표시를 확인해 보세요. 돼지는 거울로 숨겨진 먹이를 찾을 만큼 영리한 동물이에요. 좁은 틀과 밀집 사육을 줄이는 농장을 고르는 소비가 돼지의 삶을 바꿉니다.",
  };

  window.PIG_ORIGINS = [
    {
      id: "fattening", name: "비육돈", weight: 90, life: "pig.fattening",
      desc: "고기를 얻기 위해 기르는 돼지. 약 6개월 만에 출하된다.",
      popNote: "사육 돼지 대부분이 비육돈. 모돈과의 비율 9:1은 가정값 (확인 필요)",
    },
    {
      id: "sow", name: "어미 돼지(모돈)", weight: 10, life: "pig.sow",
      desc: "새끼를 낳기 위해 기르는 암퇘지. 임신과 출산을 되풀이한다.",
      popNote: "모돈 비율 약 10%로 가정 (확인 필요)",
    },
  ];

  window.ANIMALS["pig.fattening"] = Object.assign({}, common, {
    id: "pig.fattening",
    name: "비육돈",
    peerLabel: "새끼 돼지",
    intro: "분만사의 좁은 틀 옆에서 형제 열 마리와 함께 태어났다. 어미는 몸을 돌릴 수 없는 쇠틀 안에 누워 있다.",
    timeline: [
      { label: "태어난 날", season: "분만사", weeks: 1 },
      { label: "생후 1~3주, 젖 먹는 시기", season: "분만사", weeks: 3 },
      { label: "젖을 떼는 날", season: "생후 약 4주", weeks: 1 },
      { label: "젖 뗀 뒤 자돈사", season: "~10주령", weeks: 6 },
      { label: "육성기", season: "~16주령", weeks: 6 },
      { label: "비육기", season: "~24주령", weeks: 8 },
      { label: "출하 날", season: "약 6개월", weeks: 1 },
    ],
    stages: [
      { id: "piglet", name: "새끼 돼지", fromTurn: 0, baseRisk: 0.02, desc: "어미 젖을 먹는다." },
      { id: "weaner", name: "젖 뗀 돼지", fromTurn: 3, baseRisk: 0.04, desc: "어미 없이 또래들과 산다." },
      { id: "finisher", name: "비육돈", fromTurn: 4, baseRisk: 0.01, desc: "출하 무게까지 살을 찌운다." },
    ],
    backgroundDeaths: [
      { stages: ["piglet"], tag: "사람", text: "분만틀 안에서 몸을 뒤척인 어미에게 깔렸다." },
      { stages: ["weaner"], tag: "사람", text: "젖을 뗀 뒤 설사병으로 기운을 잃었다." },
      { stages: ["finisher"], tag: "사람", text: "밀집된 돈사에서 호흡기병이 퍼져 죽었다." },
    ],
    events: [
      {
        id: "crate_birth", tag: "사람", turns: [0], weight: 1,
        text: "어미는 쇠틀 안에 갇혀 있고, 새끼들은 틀 사이로 젖을 찾아 파고든다.",
        choices: [
          { label: "젖꼭지 하나를 먼저 차지한다", risk: 0.03, health: 15, contrib: 0, result: "새끼 돼지는 처음 차지한 젖꼭지를 계속 쓴다. 좋은 자리를 얻었다.", death: "어미가 몸을 뒤척일 때 깔렸다." },
          { label: "보온등 밑에서 잔다", risk: 0.04, health: -5, contrib: 0, result: "따뜻하지만 배가 고프다.", death: "젖을 충분히 먹지 못해 약해졌다." },
        ],
      },
      {
        id: "processing", tag: "사람", turns: [1], weight: 1,
        text: "사람이 새끼들을 하나씩 들어 올린다. 송곳니를 갈고 꼬리를 자른다. 수컷 새끼들은 거세된다. 좁은 곳에서 서로 물어뜯지 않게 하려는 처치다.",
        choices: [
          { label: "몸부림치며 비명을 지른다", risk: 0.01, health: -15, contrib: 0, result: "꼬리 끝이 사라졌다. 며칠 동안 아팠다.", death: "상처가 덧났다." },
          { label: "얼어붙는다", risk: 0.01, health: -10, contrib: 0, result: "끝났다. 다시 어미 곁으로 돌아왔다.", death: "상처가 덧났다." },
        ],
      },
      {
        id: "weaning", tag: "사람", turns: [2], weight: 1,
        text: "생후 4주쯤, 어미와 떨어져 트럭에 실렸다. 낯선 또래들과 한 우리에 섞인다.",
        choices: [
          { label: "서열 다툼에 끼어든다", risk: 0.02, health: -10, contrib: 0, result: "서열이 정해졌다. 귀에 상처가 남았다.", death: "다툼에서 다친 곳이 덧났다." },
          { label: "구석에서 버틴다", risk: 0.02, health: -15, contrib: 0, result: "며칠 동안 사료를 제대로 먹지 못했다.", death: "젖을 뗀 충격으로 기운을 잃었다." },
        ],
      },
      {
        id: "nursery", tag: "사람", turns: [3], weight: 1,
        text: "젖을 뗀 뒤의 몇 주가 가장 위험하다. 설사와 호흡기병이 우리 안을 돈다.",
        choices: [
          { label: "사료통에서 떠나지 않는다", risk: 0.06, health: 10, contrib: 0,
            result: "살아남았다. 2024년 국내 이유 후 육성률은 약 85.2%로, 젖 뗀 새끼의 약 15%가 죽는다. 유럽의 2배가 넘는다.",
            death: "설사병으로 기운을 잃었다." },
          { label: "보온등 밑에 웅크린다", risk: 0.06, health: 0, contrib: 0, result: "열이 내렸다.", death: "호흡기병이 깊어졌다." },
        ],
      },
      {
        id: "tail_biting", tag: "사람", turns: [4, 5], weight: 2,
        text: "콘크리트 바닥에 할 일이 없다. 흙을 파고 싶은데 팔 흙이 없다. 옆 돼지가 남은 꼬리를 물어뜯는다.",
        choices: [
          { label: "같이 물어뜯는다", risk: 0.02, health: -10, contrib: 0, result: "따분함과 스트레스가 쌓이면 돼지는 서로의 꼬리를 문다.", death: "물린 상처가 덧났다." },
          { label: "쇠 울타리를 씹는다", risk: 0, health: -5, contrib: 0, result: "같은 동작을 하루 종일 되풀이했다." },
        ],
      },
      {
        id: "crowded", tag: "사람", turns: [4, 5], weight: 2,
        text: "몸이 커지면서 우리가 좁아졌다. 분뇨 냄새와 암모니아에 눈이 따갑다.",
        choices: [
          { label: "사료를 더 먹는다", risk: 0.01, health: 10, contrib: 0, result: "몸무게가 빠르게 늘었다. 출하 무게가 가까워진다.", death: "밀집된 돈사에서 호흡기병이 퍼졌다." },
          { label: "누워서 잔다", risk: 0.01, health: 0, contrib: 0, result: "하루 대부분을 누워서 보낸다.", death: "호흡기병이 깊어졌다." },
        ],
      },
      Object.assign({ turns: [3, 4, 5] }, asf),
      Object.assign({ turns: [4, 5] }, heat),
      {
        id: "shipping", tag: "사람", turns: [6], weight: 1,
        text: "새벽, 우리 문이 열리고 트럭이 들어왔다. 태어난 지 약 6개월이다.",
        choices: [
          { label: "뒷걸음질 친다", outcomes: [{ p: 1, death: "도축장으로 옮겨져 도축되었다. 태어난 지 약 6개월. 돼지의 자연 수명은 15~20년이다." }] },
          { label: "앞 돼지를 따라 걷는다", outcomes: [{ p: 1, death: "도축장으로 옮겨져 도축되었다. 처음 본 바깥 하늘이 마지막이었다." }] },
        ],
      },
    ],
  });

  // 모돈: 임신 약 16주(114일) → 분만·포유 약 4주 → 다시 교배를 되풀이
  const sowCycle = (n) => ({ label: `${n}번째 임신과 분만`, season: `${n}산`, weeks: 21, contrib: 11 });
  window.ANIMALS["pig.sow"] = Object.assign({}, common, {
    id: "pig.sow",
    name: "어미 돼지(모돈)",
    peerLabel: "암퇘지",
    contribLabel: "낳은 새끼",
    intro: "분만사에서 태어났다. 몇 달 뒤, 당신은 고기가 아니라 새끼를 낳을 돼지로 골라졌다.",
    timeline: [
      { label: "태어난 날", season: "분만사", weeks: 1 },
      { label: "후보돈으로 자라는 시기", season: "~8개월", weeks: 32 },
      sowCycle(1), sowCycle(2), sowCycle(3), sowCycle(4), sowCycle(5),
      { label: "도태", season: "약 3년", weeks: 1 },
    ],
    stages: [
      { id: "gilt", name: "후보돈", fromTurn: 0, baseRisk: 0.02, desc: "아직 새끼를 낳지 않았다." },
      { id: "sow", name: "모돈", fromTurn: 2, baseRisk: 0.03, desc: "임신틀과 분만틀을 오가며 산다." },
    ],
    backgroundDeaths: [
      { stages: ["gilt"], tag: "사람", text: "밀집된 돈사에서 병에 걸려 죽었다." },
      { stages: ["sow"], tag: "사람", text: "다리가 약해져 일어나지 못했다." },
      { stages: ["sow"], tag: "사람", text: "분만 중 난산으로 죽었다." },
    ],
    events: [
      {
        id: "gilt_select", tag: "사람", turns: [0, 1], weight: 1,
        text: "또래들은 비육돈으로 팔려 갔다. 당신은 남겨져 새끼를 낳을 준비를 한다.",
        choices: [
          { label: "넓은 우리를 뛰어다닌다", risk: 0, health: 10, contrib: 0, result: "이 정도로 넓은 곳은 다시 없을 것이다." },
          { label: "또래 냄새를 찾는다", risk: 0, health: 0, contrib: 0, result: "아무도 남지 않았다." },
        ],
      },
      {
        id: "stall", tag: "사람", turns: [2, 3, 4, 5, 6], weight: 2,
        text: "인공수정 뒤 임신틀(스톨)로 옮겨졌다. 앞뒤로 한 걸음, 몸을 돌릴 수 없는 쇠틀이다. 임신 기간은 약 16주다.",
        choices: [
          { label: "쇠막대를 계속 씹는다", risk: 0.01, health: -10, contrib: 0, result: "같은 동작을 끝없이 되풀이한다. 좁은 틀 속 돼지에게 흔한 정형행동이다.", death: "다리가 약해져 일어나지 못했다." },
          { label: "엎드려 시간을 보낸다", risk: 0.01, health: -15, contrib: 0, result: "근육이 빠지고 다리가 약해진다.", death: "다리가 약해져 일어나지 못했다." },
        ],
      },
      {
        id: "farrowing", tag: "사람", turns: [2, 3, 4, 5, 6], weight: 2,
        text: "분만틀로 옮겨져 새끼 열한 마리를 낳았다. 새끼를 핥아 줄 수도, 둥지를 지을 수도 없다.",
        choices: [
          { label: "몸을 아주 천천히 눕힌다", risk: 0.01, health: -10, contrib: 0, result: "새끼를 깔지 않았다. 4주 뒤, 새끼들은 모두 떠났다.", death: "난산으로 죽었다." },
          { label: "바닥을 앞발로 긁는다", risk: 0.01, health: -10, contrib: 0, result: "둥지를 짓는 본능이다. 쇠바닥에는 아무것도 생기지 않는다.", death: "난산으로 죽었다." },
        ],
      },
      Object.assign({ turns: [1, 2, 3, 4, 5, 6] }, asf),
      {
        id: "cull", tag: "사람", turns: [7], weight: 1,
        text: "새끼 수가 줄었다. 사람이 당신의 귀 표를 확인하고 무언가를 적는다.",
        choices: [
          { label: "틀 안에서 뒤척인다", outcomes: [{ p: 1, death: "더 이상 새끼를 많이 낳지 못해 도태되었다. 약 3년 동안 다섯 번 출산했다." }] },
          { label: "가만히 있는다", outcomes: [{ p: 1, death: "트럭에 실려 도태되었다. 틀 밖으로 걸어 나온 것은 처음이었다." }] },
        ],
      },
    ],
  });
})();
