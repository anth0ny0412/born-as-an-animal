// 야생 동물 3차 확장: 산양, 수달, 너구리, 두꺼비, 점박이물범
// 확률 값은 게임용 가정값. 사실 문구의 출처는 data/sources.js
window.ANIMALS = window.ANIMALS || {};

(function () {
  const ALL = ["봄", "여름", "가을", "겨울", "한 해"];
  const yearly = (from, to) => Array.from({ length: to - from }, (_, i) => ({ label: `${from + i}살 → ${from + i + 1}살`, season: "한 해", weeks: 52 }));

  // ---------- 산양 ----------
  // 2023~24년 겨울 약 1,022마리 폐사 (전국 추정 약 2,000마리). 원인: 폭설(환경부) vs ASF 차단 울타리(환경단체)
  window.ANIMALS.goral = {
    id: "goral",
    name: "산양",
    emoji: "🐐",
    peerLabel: "아기 산양",
    successLabel: "일곱 살까지 산 산양",
    intro: "2023년 초여름, 강원도 설악산의 가파른 바위 절벽에서 태어났다. 당신은 천연기념물이자 멸종위기 1급인 산양이다. 태어나자마자 바위를 딛고 일어선다.",
    endText: "일곱 해를 살았다. 그 겨울을 넘긴 산양 중 하나로, 지금도 바위 절벽을 오른다.",
    lifespan: { weeks: 780, label: "10~15년", note: "산양의 야생 수명은 10년 넘게로 알려져 있음 (확인 필요)", verified: false },
    timeline: [
      { label: "2023년 초여름, 절벽에서 태어남", season: "여름", weeks: 4 },
      { label: "첫 여름", season: "여름", weeks: 9 },
      { label: "첫 가을", season: "가을", weeks: 13 },
      { label: "2023~24년, 첫 겨울", season: "겨울", weeks: 17 },
      { label: "첫 봄", season: "봄", weeks: 9 },
    ].concat(yearly(1, 7)),
    stages: [
      { id: "kid", name: "아기 산양", fromTurn: 0, baseRisk: 0.03, desc: "어미 곁에서 절벽 오르는 법을 배운다." },
      { id: "adult", name: "산양", fromTurn: 4, baseRisk: 0.06, desc: "바위 능선을 따라 혼자 산다." },
    ],
    backgroundDeaths: [
      { stages: ["kid"], tag: "자연", text: "절벽에서 미끄러졌다." },
      { stages: ["adult"], tag: "자연", text: "병에 걸려 죽었다." },
      { stages: ["adult"], tag: "자연", text: "겨울 추위에 쓰러졌다." },
    ],
    healthDeath: { tag: "자연", text: "먹이를 찾지 못해 탈진했다." },
    events: [
      {
        id: "cliff", tag: "자연", turns: [0, 1, 2], weight: 1,
        text: "어미가 거의 수직인 바위벽을 가볍게 뛰어오른다.",
        choices: [
          { label: "어미를 따라 뛰어오른다", risk: 0.03, health: 10, contrib: 0, result: "발굽이 바위 틈을 단단히 붙잡았다. 산양은 천적이 오기 힘든 절벽에서 산다.", death: "발을 헛디뎌 떨어졌다." },
          { label: "낮은 바위에서 연습한다", risk: 0.01, health: 5, contrib: 0, result: "조금씩 높이 올라간다.", death: "바위에서 미끄러졌다." },
        ],
      },
      {
        id: "the_winter", tag: "사람", tagNote: "폭설과 차단 울타리", turns: [3], weight: 1,
        text: "눈이 계속 내린다. 높은 곳엔 눈이 몸높이까지 쌓였다. 먹이를 찾아 낮은 곳으로 내려가야 하는데, 능선 아래로 철망 울타리가 끝없이 이어져 있다. 멧돼지의 아프리카돼지열병을 막으려고 친 울타리다.",
        choices: [
          { label: "울타리를 따라 내려갈 길을 찾는다", outcomes: [
            { p: 45, result: "울타리가 끊긴 계곡을 찾아 내려갔다. 이 겨울 산양 약 1,000마리가 죽었다. 전국 산양의 절반 가까이다. 폭설 탓인지 울타리 탓인지를 두고 논쟁이 이어졌다.", health: -30 },
            { p: 10, result: "탈진해 쓰러져 있다가 국립공원 직원들에게 구조됐다. 치료를 받고 봄에 산으로 돌아갔다.", health: -20 },
            { p: 45, death: "울타리에 막혀 눈 속에서 탈진해 죽었다. 이 겨울에만 산양 약 1,000마리가 이렇게 죽었다." },
          ] },
          { label: "어미와 바위 그늘에서 버틴다", outcomes: [
            { p: 50, result: "바위 그늘 아래 드러난 이끼와 나무껍질로 버텼다. 봄이 왔다.", health: -35 },
            { p: 50, death: "눈 속에서 먹이를 찾지 못해 굶주려 쓰러졌다." },
          ] },
        ],
      },
      {
        id: "feeding", tag: "사람", seasons: ["겨울", "한 해"], stages: ["adult"], weight: 2,
        text: "다시 눈 많은 겨울. 그런데 그 겨울 뒤로 산 곳곳에 먹이 급이대와 쉼터가 생겼다. 울타리 일부도 열렸다.",
        choices: [
          { label: "급이대를 찾아간다", risk: 0.04, health: 10, contrib: 0, result: "건초를 먹으며 버텼다. 그 겨울이 남긴 대책이다.", death: "급이대로 가는 길에 미끄러졌다." },
          { label: "바위 능선에 머문다", risk: 0.06, health: -10, contrib: 0, result: "바위 틈 이끼로 버텼다.", death: "깊은 눈 속에서 쓰러졌다." },
        ],
      },
      {
        id: "hikers", tag: "사람", seasons: ["봄", "여름", "가을", "한 해"], stages: ["adult"], weight: 1,
        text: "탐방로 근처 바위에서 쉬는데, 등산객들이 휴대폰을 들고 다가온다.",
        choices: [
          { label: "절벽 위로 피한다", risk: 0.01, health: 0, contrib: 0, result: "등산객들이 멀어졌다.", death: "급히 피하다 미끄러졌다." },
          { label: "가만히 서 있는다", risk: 0, health: -5, contrib: 0, result: "사진이 수십 장 찍혔다. 산양은 쉽게 놀라 서식지를 떠나기도 한다." },
        ],
      },
      {
        id: "mating", tag: "자연", seasons: ["가을", "한 해"], stages: ["adult"], weight: 1,
        text: "가을, 짝짓기 철이다. 이듬해 초여름이면 절벽에서 새끼가 태어난다.",
        choices: [
          { label: "능선을 따라 짝을 찾는다", risk: 0.03, health: -10, contrib: 0, result: "짝을 만났다.", death: "능선을 넘다 미끄러졌다." },
          { label: "익숙한 절벽에 머문다", risk: 0.01, health: 0, contrib: 0, result: "조용한 가을이었다.", death: "병에 걸렸다." },
        ],
      },
    ],
    action: "산양 서식지 근처에서는 탐방로를 벗어나지 말고, 산양을 만나면 다가가지 말고 지켜봐 주세요. 야생동물의 이동 통로를 막는 울타리와 개발에 관심을 가져 주세요.",
  };

  // ---------- 수달 ----------
  // 서울 중랑천 등 도심 하천으로 돌아옴 (2011년 이후 수질 개선). 배설물에서 플라스틱·스티로폼 검출 (민간 단체)
  window.ANIMALS.otter = {
    id: "otter",
    name: "수달",
    emoji: "🦦",
    peerLabel: "새끼 수달",
    successLabel: "여섯 살까지 산 수달",
    intro: "서울 중랑천, 콘크리트 둑 아래 바위 틈 굴에서 태어났다. 한때 이 강은 물고기도 살기 힘든 강이었다. 물이 맑아지자 수달이 돌아왔다.",
    endText: "여섯 해를 살았다. 도시 한가운데 하천에서 수달이 산다는 건, 그 강이 살아났다는 뜻이다.",
    lifespan: { weeks: 520, label: "약 10년", note: "수달의 야생 수명은 10년 안팎으로 알려져 있음 (확인 필요)", verified: false },
    timeline: [
      { label: "봄, 둑 아래 굴에서 태어남", season: "봄", weeks: 8 },
      { label: "어미에게 헤엄 배우기", season: "여름", weeks: 13 },
      { label: "첫 가을", season: "가을", weeks: 13 },
      { label: "첫 겨울", season: "겨울", weeks: 18 },
    ].concat(yearly(1, 6)),
    stages: [
      { id: "cub", name: "새끼 수달", fromTurn: 0, baseRisk: 0.05, desc: "어미를 따라 물에 들어간다." },
      { id: "adult", name: "수달", fromTurn: 4, baseRisk: 0.12, desc: "하천 몇 km를 자기 영역으로 삼는다." },
    ],
    backgroundDeaths: [
      { stages: ["cub"], tag: "자연", text: "장맛비에 불어난 물에 휩쓸렸다." },
      { stages: ["adult"], tag: "사람", text: "하천 옆 도로를 건너다 차에 치였다." },
      { stages: ["adult"], tag: "자연", text: "영역 다툼에서 다친 상처가 덧났다." },
      { stages: ["adult"], tag: "자연", text: "병에 걸려 죽었다." },
    ],
    healthDeath: { tag: "자연", text: "먹이를 찾지 못해 쇠약해졌다." },
    events: [
      {
        id: "swim", tag: "자연", turns: [0, 1], weight: 1,
        text: "어미가 물고기를 물고 와서 물가에 놓는다. 직접 잡아 보라는 뜻이다.",
        choices: [
          { label: "물속으로 뛰어든다", risk: 0.03, health: 10, contrib: 0, result: "붕어 한 마리를 잡았다.", death: "물살에 휩쓸렸다." },
          { label: "물가에서 지켜본다", risk: 0.01, health: 0, contrib: 0, result: "어미가 몇 번 더 보여 주었다.", death: "물가에서 들개에게 쫓겼다." },
        ],
      },
      {
        id: "trash", tag: "사람", seasons: ALL, weight: 2,
        text: "물풀 사이에 스티로폼 조각과 비닐이 걸려 있다. 물고기 냄새가 밴 비닐도 있다.",
        choices: [
          { label: "냄새나는 비닐을 물어뜯는다", risk: 0.08, health: -10, contrib: 0, result: "뱉어 냈다. 중랑천 수달의 배설물에서는 플라스틱, 스티로폼, 방습제가 나왔다.", death: "삼킨 비닐이 배 속을 막았다." },
          { label: "피해서 헤엄친다", risk: 0, health: 0, contrib: 0, result: "깨끗한 여울로 갔다." },
        ],
      },
      {
        id: "trap", tag: "사람", seasons: ["봄", "여름", "가을", "한 해"], stages: ["adult"], weight: 2,
        text: "물속에 그물 상자가 있다. 안에 물고기가 가득하다. 누군가 몰래 놓은 통발이다.",
        choices: [
          { label: "들어가서 물고기를 꺼낸다", outcomes: [
            { p: 75, result: "물고기를 물고 빠져나왔다." },
            { p: 25, death: "통발 입구에 갇혀 숨을 쉬러 올라가지 못했다." },
          ] },
          { label: "직접 사냥한다", risk: 0.01, health: -5, contrib: 0, result: "여울에서 피라미를 잡았다.", death: "사냥 중 다쳤다." },
        ],
      },
      {
        id: "walkers", tag: "사람", seasons: ALL, stages: ["adult"], weight: 2,
        text: "밤인데도 하천 산책로에 사람과 개가 많다. 목줄 없는 개가 물가로 달려온다.",
        choices: [
          { label: "물속 깊이 잠수한다", risk: 0.02, health: -5, contrib: 0, result: "개가 짖다 돌아갔다.", death: "물가에서 개에게 물렸다." },
          { label: "둑 아래 굴로 숨는다", risk: 0.03, health: 0, contrib: 0, result: "조용해질 때까지 기다렸다.", death: "굴로 가다 개에게 물렸다." },
        ],
      },
      {
        id: "construction", tag: "사람", seasons: ["봄", "가을", "한 해"], stages: ["adult"], weight: 1,
        text: "하천 정비 공사가 시작됐다. 굴이 있던 둑에 콘크리트를 붓는다.",
        choices: [
          { label: "상류로 옮겨 간다", risk: 0.05, health: -10, contrib: 0, result: "새 굴을 찾았다. 시민들은 수달 보호구역을 지정해 달라고 요구하고 있다.", death: "상류로 가다 도로에서 차에 치였다." },
          { label: "공사장 근처에 남는다", risk: 0.06, health: -15, contrib: 0, result: "공사가 끝나길 기다렸다.", death: "먹이가 줄어 쇠약해졌다." },
        ],
      },
    ],
    action: "하천에 쓰레기와 낚싯줄을 버리지 말고, 밤 산책 때 반려견은 목줄을 해 주세요. 불법 통발을 보면 지자체에 신고해 주세요. 수달이 돌아온 하천은 우리가 지켜 낸 강이에요.",
  };

  // ---------- 너구리 ----------
  // 서울 25개 구 중 16곳 출몰, 서울시 야생동물구조센터 구조 2018년 49건 → 2021년 81건 (서울연구원). 개선충 감염 보도. 2021 로드킬 3위
  window.ANIMALS.raccoondog = {
    id: "raccoondog",
    name: "너구리",
    emoji: "🦝",
    peerLabel: "새끼 너구리",
    successLabel: "다섯 살까지 산 너구리",
    intro: "봄, 도시 공원 가장자리 덤불 아래 굴에서 형제 다섯과 태어났다. 이 공원 너머엔 아파트와 도로가 있다. 천적은 거의 없고, 사람이 남긴 먹이는 많다.",
    endText: "다섯 해를 살았다. 도시는 너구리에게 위험하지만, 먹을 것이 많은 곳이기도 하다.",
    lifespan: { weeks: 416, label: "야생 몇 년, 사육 시 10년 이상", note: "너구리의 야생 수명은 대개 몇 년으로 알려져 있음 (확인 필요)", verified: false },
    timeline: [
      { label: "봄, 덤불 굴에서 태어남", season: "봄", weeks: 8 },
      { label: "첫 여름", season: "여름", weeks: 13 },
      { label: "첫 가을", season: "가을", weeks: 13 },
      { label: "첫 겨울", season: "겨울", weeks: 18 },
    ].concat(yearly(1, 5)),
    stages: [
      { id: "cub", name: "새끼 너구리", fromTurn: 0, baseRisk: 0.06, desc: "형제들과 굴 근처를 맴돈다." },
      { id: "adult", name: "너구리", fromTurn: 3, baseRisk: 0.15, desc: "밤마다 공원과 골목을 돈다." },
    ],
    backgroundDeaths: [
      { stages: ["cub"], tag: "자연", text: "병에 걸려 죽었다." },
      { stages: ["adult"], tag: "사람", text: "밤길을 건너다 차에 치였다." },
      { stages: ["adult"], tag: "자연", text: "병에 걸려 죽었다." },
    ],
    healthDeath: { tag: "자연", text: "몸이 약해져 쓰러졌다." },
    events: [
      {
        id: "den", tag: "자연", turns: [0, 1], weight: 1,
        text: "부모가 번갈아 먹이를 물어 온다. 너구리는 부부가 함께 새끼를 키운다.",
        choices: [
          { label: "굴 밖을 탐험한다", risk: 0.05, health: 5, contrib: 0, result: "공원 연못가까지 다녀왔다.", death: "굴 밖에서 들고양이에게 물렸다." },
          { label: "형제들과 굴에 있는다", risk: 0.02, health: 5, contrib: 0, result: "따뜻하고 안전하다.", death: "병이 형제들 사이에 돌았다." },
        ],
      },
      {
        id: "handouts", tag: "사람", seasons: ALL, weight: 2,
        text: "산책하던 사람이 과자를 던져 준다. 사람 냄새가 이제 무섭지 않다.",
        choices: [
          { label: "다가가 받아먹는다", outcomes: [
            { p: 80, result: "배가 찼다. 먹이를 주면 너구리가 사람과 도로 가까이 오게 된다. 광견병 등 질병 전파 우려로 공존 수칙이 필요하다는 지적이 나온다.", health: 10 },
            { p: 20, result: "놀란 주민이 신고했다. 구조센터로 옮겨졌다가 다른 곳에 풀려났다. 서울시 너구리 구조는 2018년 49건에서 2021년 81건으로 늘었다.", health: -10 },
          ] },
          { label: "덤불로 숨는다", risk: 0, health: -5, contrib: 0, result: "곤충과 열매를 찾아 먹었다." },
        ],
      },
      {
        id: "mange", tag: "자연", tagNote: "개선충", seasons: ALL, stages: ["adult"], weight: 2,
        text: "몸이 가렵다. 털이 빠지고 피부에 딱지가 앉는다. 진드기의 일종인 개선충이다.",
        choices: [
          { label: "그래도 먹이를 찾아 돌아다닌다", outcomes: [
            { p: 60, result: "가려움이 조금씩 가라앉았다.", health: -20 },
            { p: 20, result: "털 빠진 모습을 본 주민이 신고했다. 구조센터에서 치료받고 풀려났다.", health: 10 },
            { p: 20, death: "털이 빠진 몸으로 겨울을 넘기지 못했다." },
          ] },
          { label: "굴에서 웅크린다", outcomes: [
            { p: 60, result: "버텼다.", health: -25 },
            { p: 40, death: "개선충이 온몸에 퍼져 쇠약해졌다." },
          ] },
        ],
      },
      {
        id: "road", tag: "사람", seasons: ALL, stages: ["adult"], weight: 3,
        text: "공원과 하천 사이에 6차선 도로가 있다. 밤이 깊었다.",
        choices: [
          { label: "곧장 건넌다", risk: 0.15, health: 5, contrib: 0, result: "건넜다. 2021년 로드킬 통계에서 너구리는 고양이, 고라니 다음으로 많았다.", death: "차에 치였다." },
          { label: "하천 밑 배수로로 돌아간다", risk: 0.03, health: -5, contrib: 0, result: "어둡고 좁지만 안전했다.", death: "배수로에서 길을 잃었다." },
        ],
      },
      {
        id: "winter", tag: "자연", seasons: ["겨울", "한 해"], weight: 2,
        text: "추운 겨울. 너구리는 개과 동물 중 드물게 겨울에 활동을 줄이고 깊이 잠을 잔다.",
        choices: [
          { label: "굴에서 겨울잠처럼 지낸다", risk: 0.04, health: -10, contrib: 0, result: "봄까지 버텼다.", death: "겨울을 넘기지 못했다." },
          { label: "따뜻한 날엔 먹이를 찾아 나간다", risk: 0.06, health: 0, contrib: 0, result: "음식물 쓰레기통에서 먹이를 찾았다.", death: "밤길에서 차에 치였다." },
        ],
      },
    ],
    action: "너구리에게 먹이를 주지 마세요. 사람에게 익숙해지면 도로와 사람 가까이 오게 되고, 질병도 옮기 쉬워요. 털이 빠진 너구리를 보면 만지지 말고 야생동물구조센터에 알려 주세요.",
  };

  // ---------- 두꺼비 ----------
  // 대구 망월지: 국내 최대 두꺼비 산란지. 새끼 두꺼비 대이동 생존율 약 0.1% (2016 보도), 구청 직원이 도로에서 구조
  window.ANIMALS.toad = {
    id: "toad",
    name: "두꺼비",
    emoji: "🐸",
    peerLabel: "새끼 두꺼비",
    successLabel: "다섯 살까지 산 두꺼비",
    intro: "대구 망월지의 물속, 끈처럼 길게 이어진 알 줄 속에서 깨어났다. 이 저수지는 국내에서 가장 큰 두꺼비 산란지다. 같은 날 깨어난 형제가 수십만 마리다.",
    endText: "다섯 해를 살았다. 0.1%의 확률을 뚫고 살아남아, 이제 봄마다 망월지로 돌아와 알을 낳는다.",
    lifespan: { weeks: 520, label: "약 10년", note: "두꺼비는 10년 가까이 살 수 있는 것으로 알려져 있음 (확인 필요)", verified: false },
    timeline: [
      { label: "봄, 알에서 깨어난 올챙이", season: "봄", weeks: 4 },
      { label: "다리가 나오는 올챙이", season: "봄", weeks: 6 },
      { label: "5월, 새끼 두꺼비 대이동", season: "봄", weeks: 2 },
      { label: "첫 여름, 욱수산 숲", season: "여름", weeks: 14 },
      { label: "첫 겨울잠", season: "겨울", weeks: 26 },
    ].concat(yearly(1, 5)),
    stages: [
      { id: "tadpole", name: "올챙이", fromTurn: 0, baseRisk: 0.15, desc: "저수지 물속에서 자란다." },
      { id: "toadlet", name: "새끼 두꺼비", fromTurn: 2, baseRisk: 0.15, desc: "손톱만 한 몸으로 숲을 향해 간다." },
      { id: "adult", name: "두꺼비", fromTurn: 5, baseRisk: 0.12, desc: "봄마다 태어난 저수지로 돌아간다." },
    ],
    backgroundDeaths: [
      { stages: ["tadpole"], tag: "자연", text: "물고기와 물자라에게 잡아먹혔다." },
      { stages: ["toadlet"], tag: "자연", text: "햇볕에 몸이 말라 버렸다." },
      { stages: ["toadlet"], tag: "자연", text: "새에게 잡아먹혔다." },
      { stages: ["adult"], tag: "자연", text: "뱀에게 잡아먹혔다." },
    ],
    healthDeath: { tag: "자연", text: "몸이 말라 기운을 잃었다." },
    events: [
      {
        id: "pond", tag: "자연", turns: [0, 1], weight: 1,
        text: "수십만 마리의 올챙이가 물가를 까맣게 덮었다. 물고기들이 몰려온다.",
        choices: [
          { label: "무리 한가운데로 파고든다", risk: 0.2, health: 5, contrib: 0, result: "옆의 올챙이들이 대신 잡아먹혔다.", death: "물고기에게 잡아먹혔다." },
          { label: "물풀 사이에 숨는다", risk: 0.2, health: 0, contrib: 0, result: "물풀 그늘에서 살아남았다.", death: "물자라에게 잡아먹혔다." },
        ],
      },
      {
        id: "migration", tag: "사람", turns: [2], weight: 1,
        text: "비가 와서 땅이 촉촉하다. 손톱만 한 새끼 두꺼비 수만 마리가 숲을 향해 기어간다. 그런데 저수지와 숲 사이에 도로가 있다.",
        choices: [
          { label: "도로를 곧장 건넌다", outcomes: [
            { p: 35, result: "구청 직원들이 도로 위 새끼 두꺼비를 쓸어 담아 숲 쪽으로 옮겨 주었다. 하루에 2,000마리를 옮긴 날도 있다." },
            { p: 15, result: "차가 지나가지 않는 틈에 건넜다." },
            { p: 50, death: "도로 위에서 바퀴에 깔렸다. 숲까지 가서 살아남는 새끼 두꺼비는 약 0.1%라는 추정이 있다." },
          ] },
          { label: "유도 울타리를 따라 생태통로로 간다", outcomes: [
            { p: 55, result: "울타리를 따라가니 도로 밑 통로가 나왔다. 숲에 닿았다." },
            { p: 45, death: "통로까지 가는 동안 햇볕에 몸이 말라 버렸다." },
          ] },
        ],
      },
      {
        id: "forest", tag: "자연", turns: [3], weight: 1,
        text: "숲에 닿았다. 낙엽 밑은 축축하고 작은 벌레가 많다.",
        choices: [
          { label: "낙엽 밑에서 개미를 잡아먹는다", risk: 0.1, health: 10, contrib: 0, result: "조금씩 자란다.", death: "새에게 잡아먹혔다." },
          { label: "돌 밑에 숨어 지낸다", risk: 0.08, health: 0, contrib: 0, result: "안전하지만 먹이가 적다.", death: "뱀에게 잡아먹혔다." },
        ],
      },
      {
        id: "hibernate", tag: "자연", turns: [4], seasons: ["겨울"], weight: 1,
        text: "날이 추워진다. 흙을 파고 들어가 겨울잠을 잔다.",
        choices: [
          { label: "깊이 판다", risk: 0.08, health: -10, contrib: 0, result: "봄이 왔다.", death: "겨울잠에서 깨어나지 못했다." },
          { label: "얕게 판다", risk: 0.15, health: 0, contrib: 0, result: "봄이 왔다.", death: "얼어붙은 흙 속에서 깨어나지 못했다." },
        ],
      },
      {
        id: "breeding_trip", tag: "사람", stages: ["adult"], weight: 3,
        text: "2월 말, 짝을 찾아 태어난 저수지로 돌아간다. 산에서 저수지로 가는 길에 도로가 있다.",
        choices: [
          { label: "보호 울타리 쪽 길로 간다", risk: 0.05, health: -10, contrib: 0, result: "울타리 덕분에 안전하게 저수지에 닿았다. 짝과 함께 알을 낳았다.", death: "저수지에 가다 지쳐 쓰러졌다." },
          { label: "가장 가까운 길로 간다", risk: 0.15, health: -5, contrib: 0, result: "도로를 건너 저수지에 닿았다.", death: "산란하러 가다 차에 치였다." },
        ],
      },
      {
        id: "development", tag: "사람", stages: ["adult"], weight: 1,
        text: "저수지 주변에 개발 계획이 있다는 소문이 돈다. 시민들이 저수지를 지키자며 모였다.",
        choices: [
          { label: "올해도 저수지로 간다", risk: 0.03, health: -5, contrib: 0, result: "저수지는 지켜졌다. 시민과 구청이 해마다 울타리를 치고 새끼 두꺼비를 옮기며 지켜 온 산란지다.", death: "공사 차량에 깔렸다." },
          { label: "숲에 머문다", risk: 0.02, health: 0, contrib: 0, result: "올봄은 알을 낳지 않았다.", death: "숲에서 뱀에게 잡혔다." },
        ],
      },
    ],
    action: "봄에 두꺼비가 도로를 건너는 곳에서는 천천히 운전해 주세요. 새끼 두꺼비 이동 철에 구조 자원봉사에 참여할 수도 있어요. 산란지인 저수지와 습지가 사라지지 않도록 관심을 가져 주세요.",
  };

  // ---------- 점박이물범 ----------
  // 백령도 최대 324마리 관찰 (2024 주민 모니터링). 서해 1940년대 약 8,000 → 약 1,500마리. 겨울엔 중국 랴오둥만 유빙에서 번식
  window.ANIMALS.seal = {
    id: "seal",
    name: "점박이물범",
    emoji: "🦭",
    peerLabel: "새끼 물범",
    successLabel: "여섯 살까지 산 물범",
    intro: "1월, 중국 랴오둥만의 떠다니는 얼음 위에서 태어났다. 하얀 배내털에 싸여 있다. 봄이 되면 한국 백령도로 내려가 여름을 보낼 것이다.",
    endText: "여섯 해 동안 랴오둥만과 백령도를 오갔다. 1940년대 서해에 8,000마리였던 물범은 이제 1,500마리 남짓이다.",
    lifespan: { weeks: 1560, label: "20년 이상", note: "점박이물범은 20~30년을 사는 것으로 알려져 있음 (확인 필요)", verified: false },
    timeline: [
      { label: "1월, 유빙 위에서 태어남", season: "겨울", weeks: 4 },
      { label: "젖을 떼고 바다로", season: "겨울", weeks: 8 },
      { label: "봄, 백령도로 남하", season: "봄", weeks: 12 },
      { label: "백령도의 여름", season: "여름", weeks: 14 },
      { label: "가을, 북쪽으로", season: "가을", weeks: 14 },
    ].concat(yearly(1, 6)),
    stages: [
      { id: "pup", name: "새끼 물범", fromTurn: 0, baseRisk: 0.05, desc: "얼음 위에서 어미 젖을 먹는다." },
      { id: "young", name: "어린 물범", fromTurn: 2, baseRisk: 0.04, desc: "처음으로 먼 바다를 건넌다." },
      { id: "adult", name: "물범", fromTurn: 5, baseRisk: 0.07, desc: "해마다 같은 길을 오간다." },
    ],
    backgroundDeaths: [
      { stages: ["pup"], tag: "자연", text: "얼음이 갈라져 어미와 떨어졌다." },
      { stages: ["young", "adult"], tag: "사람", text: "그물에 걸려 숨을 쉬지 못했다." },
      { stages: ["young", "adult"], tag: "자연", text: "병에 걸려 죽었다." },
    ],
    healthDeath: { tag: "자연", text: "먹이를 찾지 못해 쇠약해졌다." },
    events: [
      {
        id: "ice", tag: "자연", turns: [0, 1], weight: 1,
        text: "얼음 위에서 어미 젖을 먹는다. 그런데 올겨울은 따뜻해서 얼음이 일찍 녹고 있다.",
        choices: [
          { label: "어미 곁에 꼭 붙어 있는다", risk: 0.08, health: 10, contrib: 0, result: "얼음이 버텨 주었다. 물범은 떠다니는 얼음이 있어야 새끼를 낳고 키울 수 있다.", death: "얼음이 녹아 갈라지며 어미와 떨어졌다." },
          { label: "일찍 헤엄을 배운다", risk: 0.1, health: 0, contrib: 0, result: "차가운 물에 적응했다.", death: "헤엄치기엔 너무 일렀다." },
        ],
      },
      {
        id: "journey", tag: "자연", turns: [2, 4], weight: 1,
        text: "수백 km 바다를 건넌다.",
        choices: [
          { label: "무리를 따라간다", risk: 0.05, health: -10, contrib: 0, result: "도착했다.", death: "먼 바다에서 길을 잃었다." },
          { label: "해안을 따라 천천히 간다", risk: 0.06, health: -5, contrib: 0, result: "도착했다.", death: "해안 그물에 걸렸다." },
        ],
      },
      {
        id: "rock", tag: "사람", turns: [3], seasons: ["여름"], weight: 1,
        text: "백령도 물범바위. 썰물 때 드러나는 바위에 올라 쉰다. 자리가 모자라 바위 위가 비좁다.",
        choices: [
          { label: "사람이 만든 인공 쉼터 바위로 간다", risk: 0.01, health: 10, contrib: 0, result: "새 쉼터에서 편히 쉬었다. 물범이 쉴 바위를 늘리려고 인공 쉼터를 만들었다.", death: "쉼터로 가다 그물에 걸렸다." },
          { label: "원래 바위 틈을 비집고 올라간다", risk: 0.02, health: 5, contrib: 0, result: "옆 물범과 몸을 붙이고 쉬었다. 2024년 백령도에서 최대 324마리가 한꺼번에 관찰됐다.", death: "자리 다툼에 다쳤다." },
        ],
      },
      {
        id: "fishing", tag: "사람", tagNote: "혼획", seasons: ["봄", "여름", "가을", "한 해"], stages: ["young", "adult"], weight: 2,
        text: "물고기 떼를 쫓는데 앞에 그물이 쳐져 있다.",
        choices: [
          { label: "그물 사이로 물고기를 노린다", risk: 0.1, health: 10, contrib: 0, result: "물고기만 빼 왔다.", death: "그물에 감겨 숨을 쉬지 못했다." },
          { label: "먼 바다에서 사냥한다", risk: 0.02, health: -5, contrib: 0, result: "덜 먹었지만 안전하다.", death: "먼 바다에서 길을 잃었다." },
        ],
      },
      {
        id: "tour", tag: "사람", seasons: ["여름", "한 해"], stages: ["adult"], weight: 1,
        text: "관광선이 물범바위로 다가온다. 사람들이 사진을 찍는다.",
        choices: [
          { label: "물속으로 들어간다", risk: 0, health: -5, contrib: 0, result: "배가 떠날 때까지 쉬지 못했다." },
          { label: "바위에 그대로 있는다", risk: 0.01, health: 0, contrib: 0, result: "배가 멀찍이서 멈췄다.", death: "놀라 뛰어들다 다쳤다." },
        ],
      },
      {
        id: "breeding_ice", tag: "자연", seasons: ["겨울", "한 해"], stages: ["adult"], weight: 2,
        text: "다시 랴오둥만의 겨울. 새끼를 낳을 얼음을 찾는다.",
        choices: [
          { label: "두꺼운 얼음을 찾아 북쪽으로 간다", risk: 0.04, health: -10, contrib: 0, result: "새끼를 낳았다.", death: "얼음을 찾아 헤매다 지쳤다." },
          { label: "가까운 얼음에 오른다", risk: 0.06, health: 0, contrib: 0, result: "얇은 얼음이었지만 버텼다.", death: "얼음이 갈라졌다." },
        ],
      },
    ],
    action: "물범바위 근처에서는 배가 너무 가까이 가지 않도록 해 주세요. 바다에 그물과 쓰레기를 버리지 않는 것, 기후 변화를 늦추는 것이 물범이 새끼를 낳을 얼음을 지키는 일이에요.",
  };
})();
