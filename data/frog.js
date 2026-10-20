// 맹꽁이 (멸종위기 야생생물 2급): 도시 개발지 빈터의 웅덩이에 사는 양서류. 국내 개체 수 자료 없음
// 대부분 땅속에서 지내다 장마철에 나와 울고 알을 낳음. 개발 현장의 이주와 공사 중단 갈등이 반복됨
window.ANIMALS = window.ANIMALS || {};

(function () {
  window.ANIMALS.frog = {
    id: "frog",
    name: "맹꽁이",
    emoji: "🐸",
    peerLabel: "올챙이",
    successLabel: "다섯 살까지 산 맹꽁이",
    flagLabels: { moved: "대체서식지로 옮겨짐" },
    intro: "장맛비가 그친 밤, 도시 외곽 공터의 빗물 웅덩이에서 알을 깨고 나왔다. 이 웅덩이는 며칠 뒤면 마른다. 그 전에 다리가 나와야 한다.",
    endText: "다섯 해를 살았다. 장마철마다 '맹~꽁' 우는 소리로 아직 여기 살아 있다고 알린다.",
    lifespan: { weeks: 520, label: "몇 년~10년", note: "맹꽁이의 야생 수명 자료는 많지 않음 (확인 필요)", verified: false },
    timeline: [
      { label: "빗물 웅덩이에서 깨어난 밤", season: "여름", weeks: 1 },
      { label: "웅덩이가 마르기 전 올챙이 시절", season: "여름", weeks: 3 },
      { label: "뭍으로 올라온 새끼 맹꽁이", season: "여름", weeks: 8 },
      { label: "첫 겨울잠", season: "겨울", weeks: 40 },
      { label: "1살 → 2살", season: "한 해", weeks: 52 },
      { label: "2살 → 3살", season: "한 해", weeks: 52 },
      { label: "3살 → 4살", season: "한 해", weeks: 52 },
      { label: "4살 → 5살", season: "한 해", weeks: 52 },
    ],
    stages: [
      { id: "tadpole", name: "올챙이", fromTurn: 0, baseRisk: 0.15, desc: "웅덩이 물이 마르기 전에 자라야 한다." },
      { id: "young", name: "새끼 맹꽁이", fromTurn: 2, baseRisk: 0.1, desc: "땅을 파고 숨는 법을 익힌다." },
      { id: "adult", name: "맹꽁이", fromTurn: 4, baseRisk: 0.15, desc: "1년 대부분을 땅속에서 보낸다." },
    ],
    backgroundDeaths: [
      { stages: ["tadpole"], tag: "자연", text: "물방개 애벌레에게 잡아먹혔다." },
      { stages: ["young", "adult"], tag: "자연", text: "새에게 잡아먹혔다." },
      { stages: ["young", "adult"], tag: "사람", text: "비 오는 밤 도로를 건너다 차에 치였다." },
    ],
    healthDeath: { tag: "자연", text: "몸이 말라 기운을 잃었다." },
    events: [
      {
        id: "puddle", tag: "자연", turns: [0, 1], weight: 1,
        text: "햇볕이 쨍쨍하다. 웅덩이 물이 하루가 다르게 줄어든다. 맹꽁이 올챙이는 2~3주 안에 뭍으로 올라가야 한다.",
        choices: [
          { label: "물이 남은 가운데로 모인다", risk: 0.2, health: 5, contrib: 0, result: "마지막 물이 마르기 직전 뒷다리가 나왔다.", death: "웅덩이가 말라 버렸다." },
          { label: "먹이를 찾아 가장자리로 간다", risk: 0.25, health: 10, contrib: 0, result: "빨리 자랐다.", death: "가장자리부터 마른 진흙에 갇혔다." },
        ],
      },
      {
        id: "construction", tag: "사람", turns: [2, 4, 5, 6, 7], weight: 2,
        text: "포클레인 소리가 땅을 울린다. 공터에 아파트를 짓는 공사가 시작됐다.",
        choices: [
          { label: "땅속 깊이 파고든다", outcomes: [
            { p: 50, result: "공사 전 조사에서 맹꽁이가 발견돼 공사가 잠시 멈췄다. 사람들이 맹꽁이를 하나씩 찾아 옮기기 시작했다." },
            { p: 30, result: "사람들이 당신을 찾아 근처에 만든 대체서식지로 옮겼다. 하지만 공사 전 모든 맹꽁이를 옮기기는 어렵다.", setFlags: { moved: true } },
            { p: 20, death: "땅속에 있다가 공사 흙더미에 묻혔다." },
          ] },
          { label: "비 오는 밤 다른 공터로 옮겨 간다", risk: 0.15, health: -10, contrib: 0, result: "맹꽁이는 뒷다리가 짧아 멀리 뛰지 못한다. 겨우 옆 풀밭에 닿았다.", death: "공사장 진입로에서 트럭에 깔렸다." },
        ],
      },
      {
        id: "rain_road", tag: "사람", turns: [2, 4, 5, 6, 7], weight: 2,
        text: "장맛비가 쏟아진다. 알을 낳을 웅덩이가 길 건너편에 있다.",
        choices: [
          { label: "길을 건넌다", risk: 0.15, health: 0, contrib: 0, result: "건넜다.", death: "비 오는 밤 도로에서 차에 치였다." },
          { label: "가까운 물웅덩이를 찾는다", risk: 0.05, health: -5, contrib: 0, result: "작은 웅덩이를 찾았다. 너무 빨리 마르지 않길 바란다.", death: "웅덩이를 찾다 콘크리트 배수로에 빠졌다." },
        ],
      },
      {
        id: "chorus", tag: "자연", turns: [4, 5, 6, 7], weight: 2,
        text: "장마철 밤. 웅덩이에 모인 맹꽁이들이 '맹', '꽁' 번갈아 운다.",
        choices: [
          { label: "목주머니를 크게 부풀려 운다", risk: 0.04, health: -10, contrib: 0, result: "짝을 만났다. 웅덩이에 알이 떠 있다. 맹꽁이 소리가 들리는 것 자체가 그곳에 아직 빈터와 웅덩이가 남았다는 뜻이다.", death: "울음소리를 듣고 온 뱀에게 잡혔다." },
          { label: "조용히 땅속에 남는다", risk: 0, health: 0, contrib: 0, result: "이번 장마는 그냥 지나갔다." },
        ],
      },
      {
        id: "hibernation", tag: "자연", turns: [3], weight: 1,
        text: "날이 추워진다. 뒷다리로 땅을 파고 뒷걸음질로 흙 속에 들어간다.",
        choices: [
          { label: "깊이 판다", risk: 0.05, health: -10, contrib: 0, result: "봄까지, 아니 다음 장마까지 땅속에서 기다린다.", death: "겨울잠에서 깨어나지 못했다." },
          { label: "얕게 파고 든다", risk: 0.12, health: 0, contrib: 0, result: "봄이 왔다.", death: "얼어붙은 땅에서 깨어나지 못했다." },
        ],
      },
    ],
    action: "장마철 밤에 시골길이나 공원 근처를 지날 때는 천천히 달려 주세요. 맹꽁이 소리가 들리는 공터와 웅덩이는 도시에 남은 몇 안 되는 서식지예요. 개발 계획이 있다면 서식지 조사와 보전 방안에 관심을 가져 주세요.",
  };
})();
