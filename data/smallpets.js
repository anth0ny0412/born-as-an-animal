// 작은 반려동물 3차 확장: 붉은귀거북(버려져 생태계교란종이 됨), 햄스터(쉽게 받고 쉽게 버려짐)
window.ANIMALS = window.ANIMALS || {};

(function () {
  const ALL = ["봄", "여름", "가을", "겨울", "한 해"];
  const yearly = (from, to) => Array.from({ length: to - from }, (_, i) => ({ label: `${from + i}살 → ${from + i + 1}살`, season: "한 해", weeks: 52 }));

  // ---------- 붉은귀거북 ----------
  // '청거북'으로 팔리다 방생·유기돼 2001년 생태계교란종 지정·수입 금지. 이미 국내에서 번식, 포획해도 줄지 않음 (경기일보 등)
  window.ANIMALS.slider = {
    id: "slider",
    name: "붉은귀거북",
    emoji: "🐢",
    peerLabel: "새끼 거북",
    successLabel: "열 살까지 산 붉은귀거북",
    flagLabels: { caught: "포획됨" },
    intro: "도시 호수공원 물가 모래 속 알에서 깨어났다. 부모는 20여 년 전 '청거북'이라는 이름으로 팔리던 손바닥만 한 반려거북이었다. 누군가 이 호수에 놓아주었다.",
    endText: (state) => state.flags.caught
      ? "열 해를 살았다. 포획된 뒤로는 보호시설 수조에서 지낸다."
      : "열 해를 살았다. 호수의 바위 위는 이제 붉은귀거북 차지다. 토종 거북 남생이는 보기 어려워졌다.",
    lifespan: { weeks: 1560, label: "20~30년 이상", note: "붉은귀거북은 수십 년을 사는 것으로 알려져 있음 (확인 필요)", verified: false },
    timeline: [
      { label: "여름, 모래 속 알에서 깨어남", season: "여름", weeks: 4 },
      { label: "첫 가을", season: "가을", weeks: 9 },
      { label: "첫 겨울잠", season: "겨울", weeks: 20 },
      { label: "첫 봄", season: "봄", weeks: 19 },
    ].concat(yearly(1, 10)),
    stages: [
      { id: "hatchling", name: "새끼 거북", fromTurn: 0, baseRisk: 0.1, desc: "동전만 한 크기. 새와 물고기가 노린다." },
      { id: "adult", name: "붉은귀거북", fromTurn: 4, baseRisk: 0.03, desc: "등딱지가 단단해졌다. 천적이 거의 없다." },
    ],
    backgroundDeaths: [
      { stages: ["hatchling"], tag: "자연", text: "왜가리에게 잡아먹혔다." },
      { stages: ["adult"], tag: "자연", text: "병에 걸려 죽었다." },
    ],
    healthDeath: { tag: "자연", text: "기운을 잃었다." },
    events: [
      {
        id: "to_water", tag: "자연", turns: [0], weight: 1,
        text: "모래를 헤치고 나와 물로 기어간다. 왜가리가 물가에 서 있다.",
        choices: [
          { label: "곧장 물로 달린다", risk: 0.15, health: 0, contrib: 0, result: "물에 닿았다. 이 호수에서 태어난 붉은귀거북은 이미 수없이 많다.", death: "왜가리에게 잡혔다." },
          { label: "풀숲에 숨어 밤을 기다린다", risk: 0.1, health: -5, contrib: 0, result: "밤에 물로 들어갔다.", death: "풀숲에서 들고양이에게 잡혔다." },
        ],
      },
      {
        id: "first_food", tag: "사람", turns: [1], weight: 1,
        text: "물가 산책로에서 사람들이 빵 부스러기를 던진다. 잉어와 오리가 몰려든다.",
        choices: [
          { label: "틈을 비집고 빵을 먹는다", risk: 0.04, health: 10, contrib: 0, result: "배가 찼다. 호수공원의 먹이 주기는 외래 거북이 살기 좋은 환경도 만든다.", death: "잉어 떼에 밀려 다쳤다." },
          { label: "물풀 사이 작은 벌레를 찾는다", risk: 0.06, health: 5, contrib: 0, result: "물벌레를 잡아먹었다.", death: "물풀 사이에서 큰 물고기에게 잡혔다." },
        ],
      },
      {
        id: "hibernate", tag: "자연", turns: [2], weight: 1,
        text: "물이 차가워진다. 호수 바닥 진흙 속에 파고든다.",
        choices: [
          { label: "깊은 진흙에 묻힌다", risk: 0.05, health: -10, contrib: 0, result: "봄이 왔다. 남쪽이 고향인 거북이지만, 한국의 겨울도 견디고 번식까지 한다.", death: "겨울을 넘기지 못했다." },
          { label: "얕은 곳에 머문다", risk: 0.12, health: -5, contrib: 0, result: "봄이 왔다.", death: "얼음 아래서 깨어나지 못했다." },
        ],
      },
      {
        id: "basking", tag: "자연", seasons: ["봄", "여름", "한 해"], weight: 2,
        text: "햇볕 좋은 바위. 토종 거북 남생이도 이 바위에서 볕을 쬐고 싶어 한다.",
        choices: [
          { label: "남생이를 밀어내고 자리를 차지한다", risk: 0, health: 10, contrib: 0, result: "볕을 실컷 쬐었다. 몸집이 크고 많이 낳는 외래 거북이 토종 남생이의 자리를 빼앗는다." },
          { label: "옆 나무토막에 오른다", risk: 0, health: 5, contrib: 0, result: "볕을 쬐었다." },
        ],
      },
      {
        id: "capture", tag: "사람", tagNote: "생태계교란종 관리", seasons: ["봄", "여름", "가을", "한 해"], stages: ["adult"], when: { caught: false }, weight: 2,
        text: "호수에 통발과 그물이 들어왔다. 생태계교란종 붉은귀거북을 잡아내는 사업이다.",
        choices: [
          { label: "통발 속 먹이를 노린다", outcomes: [
            { p: 50, result: "통발에 갇혔다. 보호시설로 옮겨졌다. 지자체가 포획해도 호수의 거북은 쉽게 줄지 않는다.", setFlags: { caught: true } },
            { p: 50, result: "먹이만 빼 먹고 빠져나왔다." },
          ] },
          { label: "물 깊이 숨는다", risk: 0, health: -5, contrib: 0, result: "그물이 지나갔다." },
        ],
      },
      {
        id: "release", tag: "사람", seasons: ["봄", "여름", "한 해"], stages: ["adult"], when: { caught: false }, weight: 1,
        text: "누군가 물가에 쪼그려 앉아 상자를 연다. 안에서 낯선 거북 몇 마리가 나온다. 이번엔 다른 외래 거북이다.",
        choices: [
          { label: "새 거북을 쫓아낸다", risk: 0.01, health: -5, contrib: 0, result: "붉은귀거북 수입이 막히자 대신 다른 외래 거북들이 팔리고, 또 버려지고 있다.", death: "다툼에서 다쳤다." },
          { label: "무시한다", risk: 0, health: 0, contrib: 0, result: "호수의 거북이 또 늘었다." },
        ],
      },
      {
        id: "tank_life", tag: "사람", stages: ["adult"], when: { caught: true }, weight: 1,
        text: "보호시설의 수조. 먹이는 꼬박꼬박 나온다. 다른 거북 수십 마리와 함께 산다.",
        choices: [
          { label: "수조 바위에 오른다", risk: 0, health: 5, contrib: 0, result: "버려진 거북들이 모인 곳이다. 다시 자연으로 돌아갈 수는 없다." },
          { label: "물속에서 잔다", risk: 0, health: 5, contrib: 0, result: "조용한 하루." },
        ],
      },
    ],
    action: "반려동물은 끝까지 책임져 주세요. 거북이나 물고기를 하천이나 호수에 '방생'하면 토종 생물을 위협하는 생태계교란종이 될 수 있어요. 키울 수 없게 되면 지자체나 보호단체에 문의해 주세요.",
  };

  // ---------- 햄스터 ----------
  // 학원 사은품·무료 나눔으로 쉽게 배포, 6~7월·12~1월 집단 유기 주장 (노컷뉴스). 팬데믹 중 충동 구매 뒤 유기 증가 (해외 사례)
  window.ANIMALS.hamster = {
    id: "hamster",
    name: "햄스터",
    emoji: "🐹",
    peerLabel: "새끼 햄스터",
    successLabel: "두 살까지 산 햄스터",
    flagLabels: { abandoned: "버려짐" },
    intro: "번식장에서 태어나 마트 진열장으로 왔다. 어느 날 학원에서 등록 사은품으로 아이에게 건네졌다. 당신은 손바닥만 한 햄스터다.",
    endText: "두 해를 살았다. 햄스터에게는 긴 삶이다. 마지막까지 돌봐 준 가족이 있었다.",
    lifespan: { weeks: 120, label: "약 2~3년", note: "햄스터의 수명은 2~3년 정도로 알려져 있음 (확인 필요)", verified: false },
    timeline: [
      { label: "번식장에서 태어남", season: "0개월", weeks: 4 },
      { label: "마트 진열장", season: "1개월", weeks: 2 },
      { label: "새 집에 온 첫 달", season: "2개월", weeks: 4 },
      { label: "3~6개월", season: "어린 햄스터", weeks: 14 },
      { label: "첫 겨울", season: "겨울", weeks: 13 },
      { label: "1살", season: "어른 햄스터", weeks: 26 },
      { label: "1살 반", season: "어른 햄스터", weeks: 26 },
      { label: "2살", season: "늙은 햄스터", weeks: 10 },
    ],
    stages: [
      { id: "pup", name: "새끼 햄스터", fromTurn: 0, baseRisk: 0.04, desc: "아직 아주 작다." },
      { id: "adult", name: "햄스터", fromTurn: 3, baseRisk: 0.05, desc: "밤마다 쳇바퀴를 돈다." },
    ],
    backgroundDeaths: [
      { stages: ["pup"], tag: "사람", text: "번식장의 비좁은 상자에서 병에 걸렸다." },
      { stages: ["adult"], tag: "자연", text: "작은 몸에 병이 찾아왔다." },
    ],
    healthDeath: { tag: "사람", text: "제대로 돌봄을 받지 못해 몸이 약해졌다." },
    events: [
      {
        id: "store", tag: "사람", turns: [0, 1], weight: 1,
        text: "마트 진열장의 작은 플라스틱 통. 아이들이 유리를 두드린다.",
        choices: [
          { label: "톱밥 속에 숨는다", risk: 0.03, health: 0, contrib: 0, result: "며칠 뒤 학원 사은품으로 상자에 담겼다. 햄스터는 싸고 쉽게 구할 수 있어 충동적으로 데려가기 쉽다.", death: "진열장에서 병이 들었다." },
          { label: "쳇바퀴를 돈다", risk: 0.02, health: 0, contrib: 0, result: "한 아이가 당신을 골랐다.", death: "진열장에서 병이 들었다." },
        ],
      },
      {
        id: "new_home", tag: "사람", turns: [2], weight: 1,
        text: "아이 방 책상 위 작은 통. 아이가 하루에도 몇 번씩 꺼내 만진다.",
        choices: [
          { label: "아이 손 냄새를 맡는다", outcomes: [
            { p: 85, result: "아이 손이 따뜻하다." },
            { p: 15, death: "아이 손에서 미끄러져 떨어졌다. 햄스터는 작은 높이에서 떨어져도 크게 다친다." },
          ] },
          { label: "손을 문다", outcomes: [
            { p: 90, result: "아이가 놀라 울었다. 이제 덜 꺼내 준다." },
            { p: 10, result: "가족이 '무는 햄스터는 못 키운다'며 공원 풀숲에 놓아주었다.", setFlags: { abandoned: true } },
          ] },
        ],
      },
      {
        id: "interest", tag: "사람", turns: [3, 5, 6], when: { abandoned: false }, weight: 2,
        text: "아이가 학원과 게임에 바빠졌다. 톱밥은 며칠째 그대로고 물병이 비어 간다.",
        choices: [
          { label: "쳇바퀴를 소리 나게 돈다", outcomes: [
            { p: 75, result: "엄마가 소리를 듣고 물을 채워 주었다." },
            { p: 15, result: "'시끄럽다'는 말이 나온 며칠 뒤, 당신은 아파트 화단에 놓였다.", setFlags: { abandoned: true } },
            { p: 10, death: "물이 떨어진 채 며칠이 지났다." },
          ] },
          { label: "집 안에서 웅크린다", outcomes: [
            { p: 75, result: "주말에 가족이 통 청소를 해 주었다.", health: -10 },
            { p: 15, result: "방학이 끝날 무렵, 상자째 공원에 놓였다. 활동가들은 여름과 겨울 방학 무렵 햄스터 유기가 몰린다고 말한다.", setFlags: { abandoned: true } },
            { p: 10, death: "물과 먹이가 떨어진 채 며칠이 지났다." },
          ] },
        ],
      },
      {
        id: "winter_cold", tag: "사람", turns: [4], when: { abandoned: false }, weight: 1,
        text: "겨울. 창가에 둔 통이 차갑다. 몸이 굳어 온다.",
        choices: [
          { label: "톱밥을 모아 몸을 묻는다", outcomes: [
            { p: 80, result: "가족이 통을 따뜻한 곳으로 옮겼다." },
            { p: 20, death: "추위에 몸이 굳어 깨어나지 못했다. 햄스터는 너무 추우면 깊은 잠에 빠졌다가 깨어나지 못하기도 한다." },
          ] },
          { label: "쳇바퀴로 몸을 데운다", risk: 0.05, health: -10, contrib: 0, result: "버텼다.", death: "추위를 이기지 못했다." },
        ],
      },
      {
        id: "outside", tag: "사람", when: { abandoned: true }, weight: 1,
        text: "풀숲. 처음 맡는 흙냄새. 밤이 되자 고양이 눈이 빛난다.",
        choices: [
          { label: "땅을 파서 숨는다", outcomes: [
            { p: 20, result: "지나가던 사람이 발견해 데려갔다. 다시 집이 생겼다.", setFlags: { abandoned: false } },
            { p: 80, death: "밤사이 길고양이에게 잡혔다. 집에서 자란 햄스터는 밖에서 오래 살지 못한다." },
          ] },
          { label: "사람 소리 쪽으로 간다", outcomes: [
            { p: 30, result: "산책하던 사람이 당신을 주워 들었다. 다시 집이 생겼다.", setFlags: { abandoned: false } },
            { p: 70, death: "추위와 굶주림을 이기지 못했다." },
          ] },
        ],
      },
      {
        id: "old", tag: "자연", turns: [7], when: { abandoned: false }, weight: 1,
        text: "두 살. 털이 푸석해지고 쳇바퀴를 덜 돈다. 햄스터에게 두 살은 노년이다.",
        choices: [
          { label: "따뜻한 톱밥 속에서 잔다", risk: 0.1, health: -5, contrib: 0, result: "가족이 조용히 지켜본다.", death: "잠든 채 깨어나지 못했다." },
          { label: "해바라기씨를 모은다", risk: 0.1, health: 0, contrib: 0, result: "볼주머니가 가득 찼다.", death: "잠든 채 깨어나지 못했다." },
        ],
      },
    ],
    action: "햄스터는 작아도 2~3년을 함께하는 생명이에요. 사은품이나 무료 나눔으로 받기 전에 끝까지 돌볼 수 있는지 생각해 주세요. 키울 수 없게 되면 밖에 놓아주지 말고 새 가족을 찾아 주세요.",
  };
})();
