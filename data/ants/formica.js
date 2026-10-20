// 곰개미 (Formica japonica): 가장 평범한 개미의 삶. 사무라이개미에게 습격당하는 쪽
window.ANT_SPECIES.push({
  id: "formica",
  name: "곰개미",
  sciName: "Formica japonica",
  desc: "풀밭과 공원에서 흔히 보이는 검은 개미. 사무라이개미가 노리는 상대이기도 하다.",
  koreaPopulation: 2e12,
  popNote: "국내 개미의 약 20%로 가정 (흔한 종, 비율 자료 없음)",
  worldNote: "곰개미는 한국, 일본, 중국 등 동아시아에 사는 개미예요.",
  // 계급 비율은 가정값 (확인 필요)
  castes: [
    { id: "worker", name: "일개미", weight: 99, life: "formica.worker" },
    { id: "queen", name: "여왕 후보", weight: 1, life: "formica.queen" },
  ],
});

window.ANIMALS["formica.worker"] = ANT.makeWorkerLife({
  name: "곰개미 일개미",
  intro: "5월의 어느 날, 풀밭 아래 곰개미 집에서 번데기 껍질을 벗고 나왔다. 당신은 수천 마리 자매 중 하나인 일개미다.",
  events: ANT.pick(ANT.ALL_COMMON).concat([
    {
      id: "samurai_raid",
      tag: "자연",
      seasons: ["여름"],
      stages: ["nurse", "builder", "forager"],
      weight: 2,
      text: "여름 늦은 오후, 붉은 개미 떼가 줄지어 집으로 쏟아져 들어온다. 사무라이개미의 습격이다! 그들은 번데기만 노린다.",
      choices: [
        { label: "번데기를 물고 땅속 깊이 숨는다", risk: 0.04, health: -5, contrib: 4,
          result: "번데기 몇 개를 지켜 냈다. 습격당한 곰개미 집도 대부분은 살아남지만, 2~3주 동안은 바깥 활동을 멈추고 숨죽여 지낸다.",
          death: "사무라이개미의 낫 같은 턱에 찔렸다." },
        { label: "입구에서 맞선다", risk: 0.15, health: -15, contrib: 3,
          result: "몇 마리를 밀어냈지만 동생 번데기 여럿을 빼앗겼다. 그 번데기들은 저 집에서 사무라이개미를 위해 일하게 될 것이다.",
          death: "사무라이개미의 낫 같은 턱에 찔렸다." },
      ],
    },
  ]),
});

window.ANIMALS["formica.queen"] = ANT.makeQueenLife({
  name: "곰개미 여왕 후보",
  intro: "곰개미 집에서 날개 달린 공주개미로 태어났다. 수천 마리 일개미 자매와 달리, 당신은 언젠가 집을 떠나 새 군체를 세워야 한다.",
  events: ANT.pickQueen(ANT.QUEEN_DEFAULT),
});
