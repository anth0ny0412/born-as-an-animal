// 고라니 (Hydropotes inermis argyropus)의 삶
// 첫 여름은 잘게, 이후 2년은 계절 단위, 3년차부터는 1년 단위로 진행 (야생 최대 수명 약 7~8년)
// 확률 값은 게임용 가정값. 사실 문구의 출처는 기획 문서 참고
window.ANIMALS = window.ANIMALS || {};

(function () {
  const GROWN = ["young", "adult", "veteran", "old"];
  const ALL_SEASONS = ["봄", "여름", "가을", "겨울", "한 해"];

  window.ANIMALS.waterdeer = {
    id: "waterdeer",
    name: "고라니",
    emoji: "🦌",
    peerLabel: "고라니",
    successLabel: "야생 최대 수명까지 산 고라니",
    intro: "6월, 하천변 풀숲에서 태어났다. 당신은 고라니. 사슴이지만 뿔이 없고, 수컷은 뿔 대신 긴 송곳니가 자란다. 이 땅에는 이제 당신을 사냥할 호랑이도 표범도 없다.",
    endText: "일곱 해를 살았다. 야생 고라니로서는 아주 드물게 긴 삶이다.",
    lifespan: {
      weeks: 363,
      label: "7~8년 (야생 최대)",
      note: "사육 상태에서는 12~13년, 야생에서는 대부분 5년을 넘기지 못한다는 추정도 있음 (Animal Diversity Web 등)",
      verified: false,
    },

    timeline: [
      { label: "6월, 태어난 날", season: "여름", weeks: 1 },
      { label: "6~7월, 풀숲에 숨어 지내는 시기", season: "여름", weeks: 4 },
      { label: "7~8월, 어미를 따라다니는 시기", season: "여름", weeks: 7 },
      { label: "첫 가을 (9~11월)", season: "가을", weeks: 13 },
      { label: "첫 겨울 (12~2월)", season: "겨울", weeks: 13 },
      { label: "첫 봄 (3~5월)", season: "봄", weeks: 13 },
      { label: "두 번째 여름", season: "여름", weeks: 13 },
      { label: "두 번째 가을", season: "가을", weeks: 13 },
      { label: "두 번째 겨울", season: "겨울", weeks: 13 },
      { label: "세 번째 봄", season: "봄", weeks: 13 },
      { label: "3년째 한 해", season: "한 해", weeks: 52 },
      { label: "4년째 한 해", season: "한 해", weeks: 52 },
      { label: "5년째 한 해", season: "한 해", weeks: 52 },
      { label: "6년째 한 해", season: "한 해", weeks: 52 },
      { label: "7년째 한 해", season: "한 해", weeks: 52 },
    ],

    stages: [
      { id: "fawn", name: "새끼", fromTurn: 0, baseRisk: 0.04, desc: "어미 젖을 먹으며 풀숲에 숨어 지낸다." },
      { id: "young", name: "어린 고라니", fromTurn: 3, baseRisk: 0.04, desc: "어미 곁을 떠나 혼자 살아가기 시작했다." },
      { id: "adult", name: "어른 고라니", fromTurn: 6, baseRisk: 0.04, desc: "자기 영역을 갖고 짝짓기 철을 맞는다." },
      { id: "veteran", name: "자리 잡은 고라니", fromTurn: 10, baseRisk: 0.12, desc: "이제 한 해 한 해가 하나의 고비다." },
      { id: "old", name: "나이 든 고라니", fromTurn: 12, baseRisk: 0.18, desc: "몸이 예전 같지 않다. 야생에서 이 나이까지 사는 고라니는 많지 않다." },
    ],

    backgroundDeaths: [
      { stages: ["fawn"], tag: "자연", text: "추위를 이기지 못하고 체온을 잃었다." },
      { stages: ["fawn"], tag: "자연", text: "병으로 약해져 죽었다." },
      { stages: GROWN, tag: "사람", text: "새벽에 도로를 건너다 차에 치였다." },
      { stages: GROWN, tag: "사람", text: "유해야생동물 포획 중 총에 맞았다." },
      { stages: GROWN, tag: "사람", text: "콘크리트 농수로에 빠져 나오지 못했다." },
      { stages: GROWN, tag: "자연", text: "병에 걸려 죽었다." },
      { stages: ["veteran", "old"], tag: "자연", text: "나이 들어 약해진 몸으로 겨울을 넘기지 못했다." },
    ],

    healthDeath: { tag: "자연", text: "굶주림과 추위에 힘이 다해 쓰러졌다." },

    events: [
      // ---------- 새끼 ----------
      {
        id: "birth_rain", turns: [0], tag: "자연", seasons: ["여름"], stages: ["fawn"], weight: 2,
        text: "태어난 첫날 밤, 차가운 비가 내린다. 젖은 털 사이로 한기가 스민다.",
        choices: [
          { label: "어미 곁에 바짝 붙는다", risk: 0.2, health: -10, contrib: 0,
            result: "어미의 체온 덕에 밤을 넘겼다. 새끼 고라니의 약 40%가 생후 4주 안에 죽는다는 보고가 있는데, 사냥보다 추위와 저체온이 주된 원인이다.",
            death: "차가운 비에 체온을 잃었다." },
          { label: "마른 덤불 속으로 기어든다", risk: 0.25, health: -5, contrib: 0,
            result: "덤불 아래는 그나마 말라 있었다.",
            death: "덤불 속에서 체온을 잃었다." },
        ],
      },
      {
        id: "birth_siblings", turns: [0], tag: "자연", seasons: ["여름"], stages: ["fawn"], weight: 2,
        text: "형제가 둘 더 있다. 고라니는 한 번에 보통 1~3마리를 낳는다. 어미의 젖은 한정돼 있다.",
        choices: [
          { label: "먼저 파고들어 젖을 먹는다", risk: 0.08, health: 15, contrib: 0,
            result: "배가 든든하다. 다리에 힘이 들어간다.",
            death: "젖을 먹었지만 타고난 몸이 너무 약했다." },
          { label: "형제에게 양보한다", risk: 0.15, health: -10, contrib: 0,
            result: "형제들이 먼저 먹었다. 남은 젖은 많지 않았다.",
            death: "젖을 충분히 먹지 못해 약해져 죽었다." },
        ],
      },
      {
        id: "kidnap", turns: [1], tag: "사람", seasons: ["여름"], stages: ["fawn"], weight: 2,
        text: "어미가 먹이를 찾으러 간 사이, 산책하던 사람이 혼자 엎드린 당신을 발견했다. \"어미한테 버려졌나 봐\" 하며 손을 뻗는다.",
        choices: [
          { label: "숨는 본능대로 가만히 엎드려 있는다", risk: 0.35, health: 0, contrib: 0,
            result: "사람이 망설이다 사진만 찍고 떠났다. 어미는 근처에 있었다.",
            death: "사람의 품에 안겨 구조센터로 옮겨졌다. 어미는 바로 근처에 있었는데. 이렇게 '납치'되는 새끼 고라니가 봄마다 끊이지 않는다." },
          { label: "비틀거리며 풀숲 안쪽으로 달아난다", risk: 0.1, health: -10, contrib: 0,
            result: "사람이 따라오지 않았다. 밤이 되자 어미가 돌아왔다.",
            death: "달아나다 어미가 찾을 수 없는 곳까지 가 버렸다." },
        ],
      },
      {
        id: "hide_alone", turns: [1], tag: "자연", seasons: ["여름"], stages: ["fawn"], weight: 2,
        text: "어미는 하루에 몇 번만 와서 젖을 먹인다. 그 사이 혼자 풀숲에서 기다린다.",
        choices: [
          { label: "울음소리로 어미를 부른다", risk: 0.12, health: 5, contrib: 0,
            result: "어미가 더 자주 들렀다.",
            death: "울음소리를 듣고 다가온 포식자에게 물려 갔다." },
          { label: "소리 없이 웅크려 기다린다", risk: 0.04, health: -10, contrib: 0,
            result: "배가 고팠지만 아무도 당신을 찾지 못했다.",
            death: "기다리다 기운이 다했다." },
        ],
      },
      {
        id: "mower", turns: [1], tag: "사람", seasons: ["여름"], stages: ["fawn"], weight: 1,
        text: "풀숲에 엎드려 숨어 있는데, 예초기 소리가 점점 가까워진다.",
        choices: [
          { label: "끝까지 엎드려 있는다", risk: 0.15, health: 0, contrib: 0,
            result: "예초기 날이 바로 옆을 스쳐 지나갔다.",
            death: "예초기 날에 다쳤다." },
          { label: "일어나 도망친다", risk: 0.1, health: -10, contrib: 0,
            result: "풀숲 밖으로 뛰쳐나왔다. 어미를 찾는 데 한참 걸렸다.",
            death: "도망치다 어미를 영영 잃었다." },
        ],
      },
      {
        id: "follow_mother", turns: [2], tag: "자연", seasons: ["여름"], stages: ["fawn"], weight: 2,
        text: "다리에 힘이 붙었다. 처음으로 어미를 따라 논두렁을 걷는다.",
        choices: [
          { label: "어미 바로 뒤를 따른다", risk: 0.03, health: 10, contrib: 0,
            result: "어디에 먹을 풀이 있고 어디가 위험한지 하나씩 배운다.",
            death: "어미를 따라가다 수로 둑에서 미끄러졌다." },
          { label: "혼자 냄새를 맡으며 돌아다닌다", risk: 0.12, health: 0, contrib: 0,
            result: "혼자서도 연한 풀을 찾아냈다.",
            death: "어미를 놓쳐 혼자가 되었고, 살아남지 못했다." },
        ],
      },

      // ---------- 자란 뒤 ----------
      {
        id: "road", tag: "사람", seasons: ALL_SEASONS, stages: GROWN, weight: 3,
        text: "물을 마시러 가려면 도로를 건너야 한다. 새벽, 눈부신 불빛이 다가온다.",
        choices: [
          { label: "불빛 앞에서 얼어붙는다", risk: 0.3, health: 0, contrib: 0,
            result: "차가 경적을 울리며 속도를 줄였다. 정신을 차리고 길 밖으로 뛰었다.",
            death: "그 자리에 멈춰 선 채 차에 치였다. 상향등 불빛은 동물의 눈을 순간 멀게 해 멈춰 서게 만든다." },
          { label: "있는 힘껏 달려 건넌다", risk: 0.2, health: -5, contrib: 0,
            result: "건넜다. 고속도로 동물 사고의 84%가 고라니다(2019~2023, 한국도로공사). 사고는 5~6월 새벽에 가장 많다.",
            death: "달려 나간 순간 반대편 차에 치였다." },
          { label: "멀리 돌아 생태통로를 찾는다", risk: 0.03, health: -10, contrib: 0,
            result: "한참을 돌아 도로 위를 가로지르는 생태통로로 건넜다. 이런 통로는 아직 많지 않다.",
            death: "통로를 찾아 헤매다 다른 도로를 만났다." },
        ],
      },
      {
        id: "channel", tag: "사람", seasons: ["봄", "여름", "가을", "한 해"], stages: GROWN, weight: 1,
        text: "어둠 속에서 발을 헛디뎌 콘크리트 농수로에 빠졌다. 벽이 직각이라 발 디딜 곳이 없다.",
        choices: [
          { label: "벽을 따라 걸으며 빠져나갈 곳을 찾는다", risk: 0.2, health: -15, contrib: 0,
            result: "한참 걸어 무너진 벽 틈으로 빠져나왔다. 탈출로가 없는 농수로에서 해마다 야생동물 9만 마리 이상이 죽는다(환경부 2023).",
            death: "끝내 농수로를 빠져나오지 못했다." },
          { label: "온 힘을 다해 뛰어오른다", risk: 0.3, health: -20, contrib: 0,
            result: "몇 번 미끄러진 끝에 겨우 벽을 넘었다.",
            death: "뛰어오르다 지쳐 농수로 안에서 쓰러졌다." },
        ],
      },
      {
        id: "crop", tag: "사람", seasons: ["봄", "여름", "한 해"], stages: GROWN, weight: 2,
        text: "밭에 콩잎과 고구마순이 막 올라왔다. 산기슭 풀보다 훨씬 연하고 달다.",
        choices: [
          { label: "밭으로 내려간다", risk: 0.08, health: 15, contrib: 0,
            result: "배불리 먹었다. 농민에게 고라니는 골칫거리다. 2018~2022년 고라니로 인한 농작물 피해는 약 90억 원으로 집계됐다.",
            death: "밭 둘레 철망에 걸려 빠져나오지 못했다." },
          { label: "산기슭 풀을 뜯는다", risk: 0.03, health: 5, contrib: 0,
            result: "질기지만 안전하다.",
            death: "산기슭 오솔길에서 올무에 걸렸다." },
        ],
      },
      {
        id: "cull", tag: "사람", seasons: ["가을", "한 해"], stages: GROWN, weight: 5,
        text: "수확철이다. 멀리서 총소리가 들린다. 유해야생동물 피해방지단이 들판을 돌고 있다.",
        choices: [
          { label: "익숙한 들판에 머문다", risk: 0.3, health: 5, contrib: 0,
            result: "총소리가 멀어졌다. 고라니는 유해야생동물로 지정돼 해마다 15만~21만 마리가 포획된다고 알려져 있다.",
            death: "피해방지단의 총에 맞았다." },
          { label: "산 깊이 올라간다", risk: 0.08, health: -15, contrib: 0,
            result: "먹을 것은 적지만 총소리는 들리지 않는다.",
            death: "산에서도 사냥꾼과 마주쳤다." },
        ],
      },
      {
        id: "snare", tag: "사람", tagNote: "불법 엽구", seasons: ALL_SEASONS, stages: GROWN, weight: 2,
        text: "늘 다니던 덤불 사이 오솔길에서 낯선 쇠 냄새가 난다.",
        choices: [
          { label: "평소 다니던 길로 간다", risk: 0.2, health: 0, contrib: 0,
            result: "무사히 지나갔다. 바로 옆 덤불에 철사 올무가 걸려 있었다.",
            death: "불법 올무에 목이 걸렸다." },
          { label: "낯선 길로 돌아간다", risk: 0.04, health: -5, contrib: 0,
            result: "길은 험했지만 아무 일도 없었다.",
            death: "낯선 길에도 올무가 있었다." },
        ],
      },
      {
        id: "dogs", tag: "사람", tagNote: "버려진 개", seasons: ALL_SEASONS, stages: GROWN, weight: 2,
        text: "개 짖는 소리. 목줄 없는 개 무리가 냄새를 맡고 쫓아온다.",
        choices: [
          { label: "하천으로 뛰어든다", risk: 0.08, health: -10, contrib: 0,
            result: "고라니는 헤엄을 잘 친다. 개들은 물 건너까지 따라오지 못했다.",
            death: "물가에서 개들에게 따라잡혔다." },
          { label: "숲으로 달린다", risk: 0.2, health: -10, contrib: 0,
            result: "덤불 속으로 따돌렸다.",
            death: "개 무리에게 물려 죽었다." },
        ],
      },
      {
        id: "habitat", tag: "사람", seasons: ["봄", "여름", "가을", "한 해"], stages: GROWN, weight: 2,
        text: "살던 하천변 풀숲이 공사로 밀려 나갔다.",
        choices: [
          { label: "근처 농경지로 옮긴다", risk: 0.06, health: 5, contrib: 0,
            result: "먹을 것은 많지만 도로도 많다. 고라니는 산보다 평지와 물가를 좋아한다. 그런 땅은 사람도 좋아한다.",
            death: "새 터전 옆 도로에서 차에 치였다." },
          { label: "산으로 올라간다", risk: 0.03, health: -15, contrib: 0,
            result: "조용하지만 먹을 풀이 적다. 산지의 고라니 밀도는 평지의 3분의 1도 안 된다.",
            death: "낯선 산에서 먹이를 찾지 못했다." },
        ],
      },
      {
        id: "flood", tag: "자연", seasons: ["여름", "한 해"], stages: GROWN, weight: 2,
        text: "장맛비에 하천이 불어나 풀숲이 물에 잠긴다.",
        choices: [
          { label: "헤엄쳐 건너편으로 간다", risk: 0.08, health: -5, contrib: 0,
            result: "물살을 가르고 건넜다. 고라니의 영어 이름은 '물사슴(water deer)'이다.",
            death: "불어난 물살에 휩쓸렸다." },
          { label: "높은 둔치로 올라간다", risk: 0.03, health: -10, contrib: 0,
            result: "물이 빠질 때까지 둔치에서 버텼다.",
            death: "둔치까지 물이 차올랐다." },
        ],
      },
      {
        id: "snow", tag: "자연", seasons: ["겨울", "한 해"], stages: GROWN, weight: 3,
        text: "눈이 쌓여 풀이 보이지 않는다.",
        choices: [
          { label: "눈을 헤쳐 마른 풀을 찾는다", risk: 0.05, health: -15, contrib: 0,
            result: "마른 풀과 나무껍질로 버텼다.",
            death: "추위와 굶주림에 쓰러졌다." },
          { label: "마을 근처 밭둑까지 내려간다", risk: 0.1, health: 5, contrib: 0,
            result: "밭둑에 남은 배추 잎을 찾았다.",
            death: "얼어붙은 밭에서 힘이 다했다." },
        ],
      },
      {
        id: "rut", tag: "자연", seasons: ["겨울", "한 해"], stages: ["adult", "veteran", "old"], weight: 2,
        text: "짝짓기 철이다. 고라니들이 긴 송곳니를 드러내고 영역을 다툰다.",
        choices: [
          { label: "다툼에 뛰어든다", risk: 0.08, health: -15, contrib: 0,
            result: "영역을 지켜 냈다. 고라니는 뿔 대신 송곳니로 겨룬다.",
            death: "다툼에서 깊은 상처를 입었다." },
          { label: "조용히 비켜난다", risk: 0.02, health: 0, contrib: 0,
            result: "다툼을 피해 다른 풀숲으로 옮겼다.",
            death: "옮겨 간 곳에서 길을 잃었다." },
        ],
      },
      {
        id: "fawns", tag: "자연", seasons: ["봄", "한 해"], stages: ["adult", "veteran", "old"], weight: 2,
        text: "올해도 근처 풀숲에서 새끼들이 태어났다. 몇 마리나 첫 여름을 넘길까.",
        choices: [
          { label: "새끼들이 숨은 풀숲 근처에 머문다", risk: 0.04, health: -5, contrib: 0,
            result: "풀숲은 조용했다. 당신이 태어난 해처럼.",
            death: "풀숲 근처 도로에서 차에 치였다." },
          { label: "멀리서 먹이를 찾는다", risk: 0.02, health: 10, contrib: 0,
            result: "새 풀이 돋는 계절이다.",
            death: "먹이를 찾다 수로에 빠졌다." },
        ],
      },
    ],

    action: "밤에 시골길을 달릴 땐 속도를 줄이고, 도로 위 동물을 보면 상향등 대신 경적으로 길 밖으로 보내 주세요. 풀숲에 혼자 있는 새끼 고라니는 대부분 어미가 근처에 있어요. 다친 게 아니라면 데려오지 말고 멀리서 지켜봐 주세요.",
  };
})();
