// 양식 물고기 (광어·넙치): 국내 양식 물고기 약 3억 3,800만 마리 (2024, 통계청 어류양식동향)
// 2024년 고수온으로 양식 어류 6,855만 마리 폐사 (2022~2026년 중 최대)
window.ANIMALS = window.ANIMALS || {};

(function () {
  const hotWater = {
    id: "hot_water", tag: "사람", tagNote: "고수온", weight: 3,
    text: "한여름, 수조로 끌어오는 바닷물이 뜨겁다. 물속 산소가 줄어 모두 수면 가까이 몰린다.",
    choices: [
      { label: "바닥에 납작 붙어 움직이지 않는다", risk: 0.12, health: -15, contrib: 0,
        result: "버텼다. 2024년 여름 고수온으로 양식 물고기 6,855만 마리가 죽었다. 바다가 뜨거워지면서 해마다 피해가 커지고 있다.",
        death: "뜨거운 물속에서 숨이 막혀 죽었다." },
      { label: "산소가 나오는 쪽으로 헤엄친다", risk: 0.1, health: -10, contrib: 0,
        result: "산소 기포 가까이에서 숨을 쉬었다.", death: "뜨거운 물속에서 숨이 막혀 죽었다." },
    ],
  };

  window.FISH_ORIGINS = [
    {
      id: "flounder", name: "양식 광어", weight: 1, life: "fish.flounder",
      desc: "국내에서 가장 많이 기르는 양식 물고기 중 하나. 육상 수조에서 자라 횟감이 된다.",
      popNote: "양식 물고기 전체 중 광어를 대표로 체험 (어종별 비율은 확인 필요)",
    },
  ];

  window.ANIMALS["fish.flounder"] = {
    id: "fish.flounder",
    name: "양식 광어",
    emoji: "🐟",
    peerLabel: "치어",
    successLabel: "자연 수명까지 산 광어",
    intro: "종자 생산장의 수조에서 알을 깨고 나왔다. 쌀알보다 작다. 같은 날 깨어난 형제가 수십만 마리다.",
    endText: "",
    lifespan: {
      weeks: 520,
      label: "10년 이상",
      note: "넙치는 야생에서 10년 넘게 살 수 있는 것으로 알려져 있음 (확인 필요). 양식 광어는 1년 남짓에 출하된다 (확인 필요)",
      verified: false,
    },
    timeline: [
      { label: "알에서 깨어난 날", season: "종자 생산장", weeks: 1 },
      { label: "치어 시절", season: "~2개월", weeks: 8 },
      { label: "양식장 수조로 옮겨진 날", season: "~3개월", weeks: 4 },
      { label: "첫 여름", season: "여름", weeks: 13 },
      { label: "가을과 겨울", season: "겨울", weeks: 26 },
      { label: "두 번째 봄", season: "봄", weeks: 13 },
      { label: "두 번째 여름", season: "여름", weeks: 13 },
      { label: "출하 날", season: "약 1년 반", weeks: 1 },
    ],
    stages: [
      { id: "fry", name: "치어", fromTurn: 0, baseRisk: 0.08, desc: "아직 다른 물고기처럼 똑바로 헤엄친다." },
      { id: "grower", name: "양식 광어", fromTurn: 2, baseRisk: 0.03, desc: "수조 바닥에 납작 엎드려 산다." },
    ],
    backgroundDeaths: [
      { stages: ["fry"], tag: "사람", text: "밀집된 수조에서 병이 돌아 죽었다." },
      { stages: ["grower"], tag: "사람", text: "수조에 퍼진 기생충성 질병으로 죽었다." },
      { stages: ["grower"], tag: "사람", text: "비좁은 수조에서 몸에 상처가 나 덧났다." },
    ],
    healthDeath: { tag: "사람", text: "기운을 잃고 수조 바닥에서 움직이지 않게 되었다." },
    events: [
      {
        id: "hatch", tag: "사람", turns: [0], weight: 1,
        text: "수조 가득 투명한 새끼 물고기들이 떠다닌다. 사람이 넣어 주는 작은 먹이 생물을 먹는다.",
        choices: [
          { label: "먹이 쪽으로 헤엄친다", risk: 0.05, health: 10, contrib: 0, result: "첫 먹이를 먹었다.", death: "첫 먹이를 먹지 못하고 가라앉았다." },
          { label: "물살에 몸을 맡긴다", risk: 0.08, health: 0, contrib: 0, result: "운 좋게 먹이가 입 앞으로 흘러왔다.", death: "첫 먹이를 먹지 못하고 가라앉았다." },
        ],
      },
      {
        id: "metamorphosis", tag: "자연", turns: [1], weight: 1,
        text: "몸이 이상하다. 한쪽 눈이 머리 위를 넘어 반대쪽으로 옮겨 간다. 광어는 자라면서 두 눈이 한쪽으로 모이고 바닥에 눕는다.",
        choices: [
          { label: "바닥에 몸을 눕혀 본다", risk: 0.05, health: 10, contrib: 0, result: "이제 몸의 한쪽은 바닥, 한쪽은 하늘이다.", death: "모습이 바뀌는 시기를 넘기지 못했다." },
          { label: "계속 똑바로 헤엄친다", risk: 0.08, health: -5, contrib: 0, result: "결국 몸이 기울었다. 남들보다 조금 늦었다.", death: "모습이 바뀌는 시기를 넘기지 못했다." },
        ],
      },
      {
        id: "grading", tag: "사람", turns: [2], weight: 1,
        text: "사람이 그물로 떠서 크기별로 나눈다. 큰 물고기와 작은 물고기를 다른 수조에 넣는다.",
        choices: [
          { label: "그물 안에서 퍼덕인다", risk: 0.02, health: -10, contrib: 0, result: "큰 물고기 수조로 갔다. 자라는 속도가 비슷한 물고기끼리 모였다.", death: "그물 안에서 다쳐 죽었다." },
          { label: "가만히 있는다", risk: 0.01, health: -5, contrib: 0, result: "작은 물고기 수조로 갔다.", death: "옮겨지는 충격을 이기지 못했다." },
        ],
      },
      {
        id: "crowded_tank", tag: "사람", turns: [3, 4, 5, 6], weight: 2,
        text: "수조 바닥이 빈틈없이 광어로 덮여 있다. 다른 광어 등 위에 겹쳐 눕는다.",
        choices: [
          { label: "사료가 떨어지는 쪽으로 파고든다", risk: 0.02, health: 10, contrib: 0, result: "빨리 자랐다. 출하 무게에 가까워진다.", death: "몸싸움에 지느러미가 찢겨 덧났다." },
          { label: "구석에 엎드려 있는다", risk: 0.02, health: -5, contrib: 0, result: "덜 먹었다.", death: "구석에서 병에 걸렸다." },
        ],
      },
      {
        id: "disease", tag: "사람", turns: [4, 5], weight: 2,
        text: "수조 안에 병이 돈다. 몸에 하얀 반점이 생긴 광어들이 하나둘 뒤집힌다. 사람이 약을 푼다.",
        choices: [
          { label: "약이 풀린 물속에서 버틴다", risk: 0.08, health: -10, contrib: 0, result: "병이 잦아들었다.", death: "병을 이기지 못했다." },
          { label: "아픈 물고기들에게서 멀어진다", risk: 0.06, health: -5, contrib: 0, result: "살아남았다. 좁은 수조에선 멀리 갈 곳이 없다.", death: "병을 이기지 못했다." },
        ],
      },
      {
        id: "blackout", tag: "사람", turns: [3, 4, 5, 6], weight: 1,
        text: "태풍이 지나간 밤, 양식장에 정전이 났다. 바닷물을 끌어오는 펌프와 산소 공급기가 멈췄다.",
        choices: [
          { label: "숨을 아낀다", outcomes: [
            { p: 85, result: "몇 시간 뒤 발전기가 돌아갔다." },
            { p: 15, death: "산소가 바닥나 수조의 물고기 대부분과 함께 죽었다." },
          ] },
          { label: "수면으로 올라간다", outcomes: [
            { p: 85, result: "전기가 돌아왔다." },
            { p: 15, death: "산소가 바닥나 죽었다." },
          ] },
        ],
      },
      Object.assign({ turns: [3, 6] }, hotWater),
      {
        id: "shipping", tag: "사람", turns: [7], weight: 1,
        text: "약 1kg이 됐다. 그물에 떠져 활어차의 물탱크에 실렸다. 며칠 뒤 횟집 유리 수족관에 도착했다.",
        choices: [
          { label: "수족관 바닥에 엎드린다", outcomes: [{ p: 1, death: "손님의 주문을 받은 주방에서 회가 되었다. 물고기도 고통을 느낀다는 연구가 늘고 있다." }] },
          { label: "유리벽을 따라 헤엄친다", outcomes: [{ p: 1, death: "뜰채에 떠서 주방으로 옮겨졌다. 태어난 지 1년 반 남짓이었다." }] },
        ],
      },
    ],
    action: "물고기도 통증을 느낀다는 연구가 늘고 있어요. 물고기를 먹는다면 덜 고통스럽게 다루는 방법(빠른 기절 처리 등)과 지속 가능한 양식 인증에 관심을 가져 주세요. 바다 수온 상승을 늦추는 일도 양식장 물고기를 지키는 일이에요.",
  };
})();
