// 삶마다 한 번 나오는 미니게임
// 종류: mash(연타), timing(타이밍), whack(사냥: 잠깐 나타나는 먹이 잡기, decoy는 피해야 하는 가짜), simon(순서 따라 하기)
// turns 중 조건(when)이 맞는 첫 시기에 꼭 나옴(force), 한 삶에 한 번(once)
// 성공하면 win, 실패하면 lose 결과. 동료 시뮬레이션에서는 성공·실패가 반반
// 결말이 사람에 의해 정해진 삶(가축 등)은 미니게임을 잘해도 결말이 바뀌지 않음
(function () {
  const ANTS_WORKER = ["formica.worker", "camponotus.minor", "camponotus.major", "solenopsis.worker", "nylanderia.worker"];
  const ANTS_QUEEN = ["formica.queen", "polyergus.queen", "camponotus.queen", "solenopsis.queen"];
  const DOGS_HOME = ["dog.petshop", "dog.home", "dog.yard"];

  // 도로 건너기 (고라니·너구리): 실패하면 다치거나 죽을 수 있음
  const roadLose = (who) => ({
    outcomes: [
      { p: 60, result: "헤드라이트가 코앞을 스쳤다. 겨우 건넜지만 다리를 다쳤다.", health: -25 },
      { p: 40, death: `도로를 건너다 차에 치였다. 한국의 도로에서 ${who}는 해마다 수없이 목숨을 잃는다.` },
    ],
  });

  window.MINIGAMES = [
    // ---------- 개미 ----------
    {
      lives: ANTS_WORKER, turns: [2, 3], tag: "자연", type: "mash", title: "장맛비! 번데기 옮기기",
      text: "장맛비에 아랫방이 잠기고 있다. 물이 차오르기 전에 동생 번데기들을 윗방으로 옮겨야 한다!",
      params: { icon: "🐛", button: "옮기기!", target: 22, seconds: 6 },
      win: { result: "마지막 번데기까지 윗방으로 옮겼다. 자매들이 더듬이로 당신을 두드린다.", health: 5, contrib: 5 },
      lose: { result: "몇 개는 끝내 물에 잠겼다. 지쳐서 다리가 후들거린다.", health: -15, contrib: 1 },
    },
    {
      lives: ["polyergus.worker"], turns: [4, 5], tag: "자연", type: "mash", title: "습격 대열 달리기",
      text: "늦은 오후, 습격 신호다. 수백 마리가 한 줄로 곰개미 집을 향해 달린다. 대열에서 뒤처지면 길을 잃는다!",
      params: { icon: "🐜", button: "달리기!", target: 24, seconds: 6 },
      win: { result: "대열 앞쪽에서 곰개미 집에 닿았다. 번데기 하나를 물고 돌아왔다.", health: 5, contrib: 5 },
      lose: { result: "대열을 놓쳐 한참 헤맨 끝에 겨우 집으로 돌아왔다.", health: -15 },
    },
    {
      lives: ANTS_QUEEN, turns: [1], tag: "자연", type: "timing", title: "결혼비행: 바람 타기",
      text: "비 온 뒤 맑은 날, 수천 마리가 날아오른다. 바람이 위로 불어 올리는 순간에 날개를 펴야 높이 오를 수 있다!",
      params: { icon: "🪽", button: "날아오르기!", zone: [0.42, 0.62], speed: 0.9, label: ["새가 기다리는 낮은 하늘", "위로 부는 바람", "새가 기다리는 낮은 하늘"] },
      win: { result: "높은 하늘에서 짝짓기를 마치고 무사히 내려왔다. 평생 쓸 정자를 몸에 담았다.", health: 5 },
      lose: { outcomes: [
        { p: 40, result: "낮게 날았지만 운 좋게 짝짓기를 마쳤다.", health: -10 },
        { p: 60, death: "낮게 날다 잠자리에게 잡아먹혔다. 결혼비행에 나선 여왕 후보 대부분이 이렇게 사라진다." },
      ] },
    },

    // ---------- 곤충 ----------
    {
      lives: ["bee"], turns: [4], tag: "자연", type: "simon", title: "8자 춤 따라 하기",
      text: "동료가 벌집 위에서 8자 춤을 춘다. 춤의 방향이 꽃밭의 방향이다. 순서를 기억해서 따라가자!",
      params: { symbols: ["⬆️", "➡️", "⬇️", "⬅️"], length: 4 },
      win: { result: "춤이 알려 준 대로 날아가니 아까시꽃이 가득했다. 꿀주머니가 가득 찼다.", health: 10, contrib: 200 },
      lose: { result: "방향을 잘못 읽어 한참 헤맸다. 꽃밭을 겨우 찾았다.", health: -15, contrib: 50 },
    },
    {
      lives: ["cricket"], turns: [3], tag: "자연", type: "mash", title: "날개 비벼 노래하기",
      text: "날개가 돋았다. 날개를 비벼 소리를 내야 짝이 온다. 사육 상자 속 수천 마리가 함께 운다!",
      params: { icon: "🦗", button: "찌르르!", target: 25, seconds: 6 },
      win: { result: "가장 큰 소리로 울었다. 상자 안이 노래로 가득하다. 하지만 출하 날은 정해져 있다.", health: 5 },
      lose: { result: "다른 수컷들의 소리에 묻혔다.", health: -5 },
    },
    {
      lives: ["firefly"], turns: [4], tag: "사람", type: "simon", title: "짝의 빛 신호 따라 하기",
      text: "어둠 속에서 짝이 빛으로 신호를 보낸다. 같은 순서로 빛을 내야 짝을 만날 수 있다. 그런데 개울 건너 가로등이 너무 밝다!",
      params: { symbols: ["✨", "💛", "🟢", "🌟"], length: 4 },
      win: { result: "가로등 불빛 사이에서도 짝의 신호를 알아보았다. 짝을 만났다." },
      lose: { death: "가로등 불빛에 신호가 묻혀 짝을 찾지 못한 채 짧은 날들이 끝났다. 빛으로 대화하는 반딧불이에게 인공 불빛은 치명적이다." },
    },
    {
      lives: ["cicada"], turns: [5], tag: "자연", type: "mash", title: "허물 벗기",
      text: "어느 여름밤, 땅 위로 나와 나무를 기어올랐다. 날이 밝기 전에 허물을 벗어야 한다!",
      params: { icon: "🪲", button: "밀어내기!", target: 22, seconds: 6 },
      win: { result: "등이 갈라지고 날개가 활짝 펴졌다. 5년 만에 처음 보는 하늘이다.", health: 10 },
      lose: { outcomes: [
        { p: 70, result: "날개 끝이 조금 구겨진 채로 허물을 벗었다.", health: -15 },
        { p: 30, death: "날이 밝을 때까지 허물을 다 벗지 못해 개미 떼에게 잡혔다." },
      ] },
    },

    // ---------- 가축 ----------
    {
      lives: ["chicken.broiler"], turns: [1], tag: "사람", type: "mash", title: "사료통까지 비집고 가기",
      text: "수만 마리 병아리 사이로 사료통이 멀다. 비집고 들어가 먹이를 먹어야 한다!",
      params: { icon: "🐥", button: "비집기!", target: 20, seconds: 6 },
      win: { result: "사료통을 차지했다. 몸이 빠르게 자란다. 출하 날은 그만큼 빨리 온다.", health: 10 },
      lose: { result: "밀려나 덜 먹었다.", health: -10 },
    },
    {
      lives: ["chicken.layer"], turns: [3], tag: "사람", type: "whack", title: "모이 쪼기",
      text: "철망 너머 모이통으로 모이가 흘러간다. 케이지 사이로 목을 빼서 모이를 쪼자! 철망은 쪼면 안 된다.",
      params: { target: "🌽", decoy: "⛓️", need: 8, seconds: 10, showMs: 1000 },
      win: { result: "배가 찼다. 오늘도 알 하나를 낳았다.", health: 10 },
      lose: { result: "부리가 철망에 부딪혔다.", health: -10 },
    },
    {
      lives: ["pig.fattening"], turns: [0], tag: "자연", type: "mash", title: "젖꼭지 차지하기",
      text: "형제 열 마리가 어미 젖으로 몰려든다. 새끼 돼지는 처음 차지한 젖꼭지를 계속 쓴다. 좋은 자리를 차지하자!",
      params: { icon: "🐷", button: "파고들기!", target: 20, seconds: 6 },
      win: { result: "앞쪽 젖꼭지를 차지했다. 형제들 중 가장 통통하다.", health: 15 },
      lose: { result: "뒤쪽 젖꼭지밖에 남지 않았다.", health: -10 },
    },
    {
      lives: ["pig.sow"], turns: [2], tag: "사람", type: "timing", title: "새끼를 깔지 않게 눕기",
      text: "분만틀 안. 새끼들이 발밑을 오간다. 새끼들이 비켜난 순간에 천천히 몸을 눕혀야 한다!",
      params: { icon: "🐖", button: "눕기", zone: [0.4, 0.6], speed: 0.8, label: ["새끼가 있음", "비었음", "새끼가 있음"] },
      win: { result: "새끼를 하나도 깔지 않았다. 4주 뒤 새끼들은 모두 떠났다.", contrib: 1 },
      lose: { result: "새끼 하나가 깔렸다. 좁은 분만틀에서는 어미가 몸을 돌리기도 어렵다.", health: -10 },
    },
    {
      lives: ["cow.dairy", "cow.bull"], turns: [0], tag: "사람", type: "mash", title: "젖병 빨기",
      text: "어미와 떨어진 뒤 처음 받은 젖병. 힘껏 빨아야 기운이 난다!",
      params: { icon: "🍼", button: "쪽쪽!", target: 20, seconds: 6 },
      win: { result: "젖병을 다 비웠다. 어미 냄새는 이제 나지 않는다.", health: 15 },
      lose: { result: "반쯤 남겼다. 기운이 없다.", health: -10 },
    },
    {
      lives: ["duck"], turns: [2], tag: "사람", type: "timing", title: "물통에 머리 담그기",
      text: "물새인 오리는 물로 눈과 깃털을 씻고 싶다. 축사엔 좁은 물통 하나뿐. 다른 오리가 비켜난 순간을 노리자!",
      params: { icon: "🦆", button: "첨벙!", zone: [0.45, 0.6], speed: 1, label: ["다른 오리", "빈자리", "다른 오리"] },
      win: { result: "물통에 머리를 담가 눈과 깃털을 씻었다. 헤엄칠 물은 끝내 없었다.", health: 10 },
      lose: { result: "밀려났다. 눈이 따갑다.", health: -10 },
    },
    {
      lives: ["fish.flounder"], turns: [2], tag: "사람", type: "whack", title: "사료 받아먹기",
      text: "수조 위에서 사료가 떨어진다. 수천 마리가 몰려든다. 바닥에 닿기 전에 받아먹자!",
      params: { target: "🟤", need: 8, seconds: 10, showMs: 900 },
      win: { result: "배불리 먹었다. 출하 무게까지 빨리 자란다.", health: 10 },
      lose: { result: "덜 먹었다.", health: -10 },
    },

    // ---------- 반려동물 ----------
    {
      lives: DOGS_HOME, turns: [4, 5, 6, 7, 8, 9], when: { shelter: false, stray: false }, tag: "사람", type: "whack", title: "공원에서 공 잡기",
      text: "주말 아침, 가족과 공원에 왔다. 가족이 공을 던진다. 공을 잡아 오자! 비둘기는 쫓지 말 것.",
      params: { target: "🎾", decoy: "🐦", need: 7, seconds: 10, showMs: 1000 },
      win: { result: "공을 몇 번이고 물어 왔다. 가족이 웃으며 머리를 쓰다듬는다. 최고의 하루.", health: 15 },
      lose: { result: "비둘기를 쫓다 목줄이 팽팽해졌다. 그래도 즐거웠다.", health: 5 },
    },
    {
      lives: ["dog.feral"], turns: [2, 3, 4, 5, 6], when: { stray: true }, tag: "사람", type: "whack", title: "등산로에서 먹이 찾기",
      text: "등산객이 떠난 저녁, 등산로 곳곳에 먹다 남긴 음식이 있다. 사람 냄새가 나는 덫은 피하자!",
      params: { target: "🍙", decoy: "🪤", need: 7, seconds: 10, showMs: 950 },
      win: { result: "배를 채웠다. 무리에게도 나눠 주었다.", health: 15 },
      lose: { result: "덫 냄새에 놀라 달아났다. 배가 고프다.", health: -15 },
    },
    {
      lives: ["cat"], turns: [3, 4, 5], tag: "자연", type: "whack", title: "날벌레 사냥",
      text: "풀숲 위로 나방이 팔랑거린다. 앞발로 잡아 보자! 벌은 건드리지 말 것.",
      params: { target: "🦋", decoy: "🐝", need: 7, seconds: 10, showMs: 900 },
      win: { result: "사냥에 성공했다. 길에서 사는 법을 하나 더 배웠다.", health: 15 },
      lose: { result: "벌에게 앞발을 쏘였다. 퉁퉁 부었다.", health: -10 },
    },
    {
      lives: ["hamster"], turns: [3, 5, 6], when: { abandoned: false }, tag: "사람", type: "mash", title: "쳇바퀴 달리기",
      text: "밤이 되었다. 햄스터는 밤에 몇 km를 달린다. 쳇바퀴를 힘껏 돌리자!",
      params: { icon: "🐹", button: "달리기!", target: 28, seconds: 6 },
      win: { result: "밤새 달렸다. 소리를 들은 가족이 웃으며 물을 갈아 주었다.", health: 15 },
      lose: { result: "쳇바퀴가 삐걱거렸다. 몇 바퀴 못 돌았다.", health: -5 },
    },
    {
      lives: ["slider"], turns: [3], tag: "자연", type: "timing", title: "볕 쬐는 바위 차지하기",
      text: "봄볕이 따뜻하다. 바위 위 볕 좋은 자리가 비는 순간을 노리자. 토종 거북 남생이도 그 자리를 노린다.",
      params: { icon: "🐢", button: "올라가기!", zone: [0.4, 0.6], speed: 0.9, label: ["다른 거북", "빈자리", "다른 거북"] },
      win: { result: "볕 좋은 자리를 차지했다. 몸이 따뜻해진다. 외래 거북이 토종 거북의 자리를 빼앗는 일은 호수마다 일어난다.", health: 15 },
      lose: { result: "자리를 놓쳤다. 물속에서 몸을 떨었다.", health: -10 },
    },

    // ---------- 도시·하늘 ----------
    {
      lives: ["pigeon"], turns: [2], tag: "사람", type: "whack", title: "광장 빵 부스러기 쪼기",
      text: "광장에 과자 부스러기가 흩어져 있다. 비둘기 떼가 몰려든다. 담배꽁초는 먹으면 안 된다!",
      params: { target: "🥖", decoy: "🚬", need: 8, seconds: 10, showMs: 900 },
      win: { result: "배를 채웠다. 사람들 발 사이에서 먹이 찾는 법을 익혔다.", health: 15 },
      lose: { result: "담배꽁초를 삼켰다가 뱉어 냈다. 속이 불편하다.", health: -15 },
    },
    {
      lives: ["sparrow", "swallow"], turns: [2], tag: "자연", type: "whack", title: "날벌레 잡기",
      text: "처음 혼자 먹이를 잡는 날. 날벌레가 날아다닌다. 투명한 유리창에는 부딪히지 말자!",
      params: { target: "🦟", decoy: "🪟", need: 7, seconds: 10, showMs: 850 },
      win: { result: "배불리 잡았다. 이제 혼자서도 살 수 있다.", health: 15 },
      lose: { outcomes: [
        { p: 75, result: "유리창에 부딪혀 잠시 정신을 잃었다가 깨어났다.", health: -20 },
        { p: 25, death: "투명한 유리창에 부딪혔다. 국내에선 해마다 수많은 새가 유리창에 부딪혀 죽는다." },
      ] },
    },
    {
      lives: ["magpie"], turns: [3], tag: "사람", type: "mash", title: "둥지 짓기",
      text: "12월, 짝과 함께 둥지를 지을 때다. 봄이 오기 전에 나뭇가지를 잔뜩 모으자!",
      params: { icon: "🪵", button: "물어 오기!", target: 24, seconds: 6 },
      win: { result: "아파트 큰 나무 위에 튼튼한 둥지를 지었다. 전봇대가 아니라 나무라서 철거될 걱정도 없다.", health: 5 },
      lose: { result: "나뭇가지가 모자라 전봇대 위 낡은 둥지를 고쳐 쓰기로 했다.", health: -10 },
    },

    // ---------- 야생 동물 ----------
    {
      lives: ["waterdeer"], turns: [6, 7, 8, 9], tag: "사람", type: "timing", title: "새벽 도로 건너기",
      text: "물을 마시러 가려면 도로를 건너야 한다. 차들이 지나간다. 차 사이가 비는 순간에 달리자! 고속도로 동물 사고의 84%가 고라니다.",
      params: { icon: "🦌", button: "달리기!", zone: [0.44, 0.58], speed: 1.1, label: ["🚗", "빈틈", "🚚"] },
      win: { result: "차 사이 빈틈으로 무사히 건넜다." },
      lose: roadLose("고라니"),
    },
    {
      lives: ["raccoondog"], turns: [4], tag: "사람", type: "timing", title: "6차선 도로 건너기",
      text: "공원과 하천 사이 6차선 도로. 차 사이가 비는 순간을 노리자!",
      params: { icon: "🦝", button: "건너기!", zone: [0.44, 0.58], speed: 1.1, label: ["🚗", "빈틈", "🚌"] },
      win: { result: "무사히 건넜다. 하천에서 가재를 잡았다.", health: 10 },
      lose: roadLose("너구리"),
    },
    {
      lives: ["goral"], turns: [1], tag: "자연", type: "timing", title: "절벽 뛰어오르기",
      text: "어미가 거의 수직인 바위벽을 뛰어오른다. 발 디딜 바위 틈이 보이는 순간에 뛰자!",
      params: { icon: "🐐", button: "뛰기!", zone: [0.4, 0.56], speed: 0.9, label: ["미끄러운 바위", "바위 틈", "미끄러운 바위"] },
      win: { result: "발굽이 바위 틈을 단단히 붙잡았다. 산양은 천적이 오기 힘든 절벽에서 산다.", health: 10 },
      lose: { outcomes: [
        { p: 80, result: "미끄러졌지만 어미가 받아 주었다. 다리가 욱신거린다.", health: -20 },
        { p: 20, death: "절벽에서 떨어졌다." },
      ] },
    },
    {
      lives: ["boar"], turns: [1], tag: "자연", type: "mash", title: "칡뿌리 캐기",
      text: "어미가 코로 땅을 파헤친다. 흙 속에 굵은 칡뿌리가 있다. 힘껏 파 보자!",
      params: { icon: "🐗", button: "파기!", target: 22, seconds: 6 },
      win: { result: "커다란 칡뿌리를 캐냈다. 줄무늬 형제들과 나눠 먹었다.", health: 15 },
      lose: { result: "흙만 잔뜩 묻었다.", health: -10 },
    },
    {
      lives: ["bear.wild"], turns: [2], tag: "자연", type: "whack", title: "산딸기 따기",
      text: "어미를 따라 지리산 숲으로. 덤불에 산딸기가 익었다. 벌집은 아직 건드리지 말 것!",
      params: { target: "🍓", decoy: "🐝", need: 8, seconds: 10, showMs: 950 },
      win: { result: "입 주변이 빨개지도록 먹었다. 겨울잠 전에 살을 찌워야 한다.", health: 15 },
      lose: { result: "벌에게 코를 쏘였다. 어미 뒤로 숨었다.", health: -10 },
    },
    {
      lives: ["bear.farmed"], turns: [1], tag: "사람", type: "mash", title: "우리 안을 걷기",
      text: "좁은 쇠창살 우리. 걸어도, 걸어도 몇 걸음이면 벽이다. 그래도 걷는다.",
      params: { icon: "🐻", button: "걷기", target: 30, seconds: 6 },
      win: { result: "수백 번을 왔다 갔다 했다. 아무리 걸어도 우리는 넓어지지 않는다. 좁은 곳에 갇힌 곰이 같은 동작을 되풀이하는 정형행동이다.", health: -5 },
      lose: { result: "지쳐서 창살에 기대앉았다. 아무리 걸어도 달라지는 건 없다.", health: -10 },
    },
    {
      lives: ["fox.released"], turns: [5], tag: "자연", type: "whack", title: "눈 밑 들쥐 사냥",
      text: "방사 후 첫 가을. 풀숲 아래에서 들쥐 소리가 들린다. 소리가 나는 곳으로 뛰어들자!",
      params: { target: "🐭", need: 7, seconds: 10, showMs: 850 },
      win: { result: "8개월 훈련이 헛되지 않았다. 혼자 힘으로 들쥐를 잡았다.", health: 20 },
      lose: { result: "들쥐를 놓쳤다. 마을 쪽 밭으로 내려가 볼까.", health: -15 },
    },
    {
      lives: ["fox.wild"], turns: [4], tag: "자연", type: "whack", title: "눈 밑 들쥐 사냥",
      text: "첫 겨울. 눈 덮인 풀밭 아래에서 들쥐가 바스락거린다. 소리를 듣고 머리부터 뛰어들자!",
      params: { target: "🐭", need: 7, seconds: 10, showMs: 850 },
      win: { result: "눈 속으로 뛰어들어 들쥐를 잡았다. 여우는 소리만으로 눈 밑 먹이를 찾는다.", health: 20 },
      lose: { result: "눈만 한가득 먹었다.", health: -15 },
    },
    {
      lives: ["otter"], turns: [1], tag: "자연", type: "whack", title: "물고기 사냥",
      text: "어미가 지켜보는 여울. 피라미가 반짝인다. 물속의 비닐은 물면 안 된다!",
      params: { target: "🐟", decoy: "🛍️", need: 7, seconds: 10, showMs: 900 },
      win: { result: "피라미를 잡았다. 어미가 칭찬하듯 몸을 비빈다.", health: 15 },
      lose: { result: "비닐을 물었다가 뱉었다. 물고기는 놓쳤다.", health: -10 },
    },
    {
      lives: ["toad"], turns: [3], tag: "자연", type: "whack", title: "개미 잡아먹기",
      text: "숲에 닿았다. 낙엽 사이로 개미들이 지나간다. 혀를 내밀어 잡자!",
      params: { target: "🐜", need: 8, seconds: 10, showMs: 850 },
      win: { result: "배불리 먹었다. 0.1%의 확률을 뚫고 숲까지 온 보람이 있다.", health: 15 },
      lose: { result: "덜 먹었다. 몸이 마를까 걱정이다.", health: -10 },
    },
    {
      lives: ["frog"], turns: [2], tag: "자연", type: "mash", title: "땅 파고 숨기",
      text: "웅덩이가 말랐다. 뭍으로 올라온 새끼 맹꽁이. 해가 뜨기 전에 흙을 파고 숨어야 한다!",
      params: { icon: "🐸", button: "파기!", target: 22, seconds: 6 },
      win: { result: "촉촉한 흙 속에 몸을 묻었다. 맹꽁이는 1년 대부분을 땅속에서 보낸다.", health: 10 },
      lose: { result: "얕게밖에 못 팠다. 몸이 마른다.", health: -15 },
    },
    {
      lives: ["stork"], turns: [1], tag: "사람", type: "whack", title: "논에서 미꾸라지 잡기",
      text: "처음 혼자 논에 내려앉았다. 미꾸라지가 꿈틀거린다. 농약병은 피하자!",
      params: { target: "🐟", decoy: "🧴", need: 7, seconds: 10, showMs: 950 },
      win: { result: "미꾸라지를 실컷 잡았다. 생물이 사는 논이 황새를 돌아오게 했다.", health: 15 },
      lose: { result: "먹이가 적은 논이었다.", health: -10 },
    },
    {
      lives: ["spoonbill"], turns: [2], tag: "사람", type: "whack", title: "갯벌에서 부리 젓기",
      text: "송도 갯벌. 주걱 같은 부리를 물속에 넣고 좌우로 저으며 작은 물고기를 찾는다. 쓰레기는 물지 말자!",
      params: { target: "🦐", decoy: "🛍️", need: 7, seconds: 10, showMs: 900 },
      win: { result: "배불리 먹었다. 남은 갯벌이 저어새의 식탁이다.", health: 15 },
      lose: { result: "갯벌에 쓰레기가 많았다. 덜 먹었다.", health: -10 },
    },
    {
      lives: ["dolphin.finless"], turns: [3], tag: "사람", type: "whack", title: "멸치 떼 사냥",
      text: "멸치 떼가 몰려온다. 재빨리 잡아먹자! 그물은 피해야 한다.",
      params: { target: "🐟", decoy: "🥅", need: 8, seconds: 10, showMs: 850 },
      win: { result: "그물을 피해 배불리 먹었다.", health: 15 },
      lose: { outcomes: [
        { p: 80, result: "그물에 걸릴 뻔하다 빠져나왔다.", health: -15 },
        { p: 20, death: "그물에 감겨 숨을 쉬러 올라가지 못했다. 상괭이 사망 원인 1위는 혼획이다." },
      ] },
    },
    {
      lives: ["dolphin.jeju"], turns: [2], tag: "사람", type: "whack", title: "제주 바다 물고기 사냥",
      text: "무리와 함께 물고기를 몰았다. 잡아먹자! 갯바위 아래 낚싯바늘은 물면 안 된다.",
      params: { target: "🐟", decoy: "🪝", need: 8, seconds: 10, showMs: 850 },
      win: { result: "무리와 함께 배불리 먹었다.", health: 15 },
      lose: { result: "낚싯바늘에 입가를 찔렸다. 낚싯줄이 남았다.", health: -20 },
    },
    {
      lives: ["seal"], turns: [5, 6], tag: "사람", type: "whack", title: "백령도 물고기 사냥",
      text: "백령도 앞바다. 물고기 떼를 쫓는다. 그물은 피하자!",
      params: { target: "🐟", decoy: "🥅", need: 8, seconds: 10, showMs: 850 },
      win: { result: "배불리 먹고 물범바위에 올라 쉬었다.", health: 15 },
      lose: { result: "그물에 걸릴 뻔했다. 지느러미에 상처가 났다.", health: -15 },
    },
    {
      lives: ["turtle"], turns: [2], tag: "사람", type: "whack", title: "해파리 먹기",
      text: "물속에 하늘하늘한 것들이 떠 있다. 해파리만 골라 먹자! 비닐봉지는 해파리와 닮았다.",
      params: { target: "🪼", decoy: "🛍️", need: 7, seconds: 10, showMs: 950 },
      win: { result: "해파리만 골라 먹었다. 국내에서 발견된 바다거북 폐사체 10마리 중 8마리의 배 속에서 플라스틱이 나왔다.", health: 15 },
      lose: { result: "비닐봉지를 삼켰다. 배 속에 쌓인다.", health: -25 },
    },
  ];

  // 각 삶의 사건 목록에 미니게임을 넣음
  for (const mg of window.MINIGAMES) {
    const lose = mg.lose.outcomes
      ? { label: `미니게임 실패 · ${mg.title}`, outcomes: mg.lose.outcomes }
      : { label: `미니게임 실패 · ${mg.title}`, risk: mg.lose.death ? 1 : 0, health: mg.lose.health || 0, contrib: mg.lose.contrib || 0, result: mg.lose.result || "", death: mg.lose.death };
    for (const id of mg.lives) {
      const life = window.ANIMALS[id];
      if (!life) throw new Error(`미니게임: 삶 "${id}"이 없음`);
      life.events.push({
        id: "minigame", tag: mg.tag, turns: mg.turns, when: mg.when, weight: 1, once: true, force: true,
        text: mg.text,
        minigame: { type: mg.type, title: mg.title, params: mg.params },
        choices: [
          { label: `미니게임 성공 · ${mg.title}`, risk: 0, health: mg.win.health || 0, contrib: mg.win.contrib || 0, result: mg.win.result },
          lose,
        ],
      });
    }
  }
})();
