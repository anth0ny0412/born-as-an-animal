// 스미드개미 (Nylanderia flavipes, 스미스개미라고도 부름): 국내 조사에서 가장 흔하게 나오는 작은 개미
// 서울 남산 조사(1989~1990)에서 상대밀도 0.422로 1위. 미국에서는 침입종 (Wetterer 2011, Ivanov et al. 2011)
// 여왕 후보의 삶은 군체를 세우는 방식을 확인한 뒤 추가
window.ANT_SPECIES.push({
  id: "nylanderia",
  name: "스미드개미",
  sciName: "Nylanderia flavipes",
  desc: "낙엽 밑과 흙 속에 사는 작고 노란 다리의 개미. 국내 숲과 공원 조사에서 가장 흔하게 나오는 종이다.",
  koreaPopulation: 4.2e12,
  popNote: "국내 개미의 약 42%로 가정 (서울 남산 조사 상대밀도 0.422를 전국에 적용)",
  worldNote: "한국에서는 평범한 토종 개미지만, 미국에서는 침입종이에요. 1939년 필라델피아에서 처음 발견된 뒤 퍼져서, 오하이오의 한 조사지에서는 개미의 약 87%를 차지했어요.",
  castes: [
    { id: "worker", name: "일개미", weight: 1, life: "nylanderia.worker" },
  ],
});

window.ANIMALS["nylanderia.worker"] = ANT.makeWorkerLife({
  name: "스미드개미 일개미",
  intro: "5월의 어느 날, 공원 낙엽 더미 아래 스미드개미 집에서 태어났다. 몸길이는 쌀알보다 작다. 당신은 한국에서 가장 흔한 개미 중 하나다.",
  events: ANT.pick(ANT.ALL_COMMON).concat([
    {
      id: "litter_forage",
      tag: "자연",
      seasons: ["봄", "여름", "가을"],
      stages: ["forager"],
      weight: 3,
      text: "젖은 낙엽 사이로 작은 톡토기들이 튀어 다닌다.",
      choices: [
        { label: "낙엽 깊숙이 들어가 사냥한다", risk: 0.05, health: 5, contrib: 4,
          result: "작은 몸이라 낙엽 틈 어디든 들어갈 수 있다. 먹이를 물고 돌아왔다.",
          death: "낙엽 밑에서 지네와 마주쳤다." },
        { label: "낙엽 위쪽만 살핀다", risk: 0.02, health: 0, contrib: 1,
          result: "작은 부스러기를 몇 개 찾았다.",
          death: "낙엽 위에서 새에게 들켰다." },
      ],
    },
    {
      id: "flowerpot",
      tag: "사람",
      seasons: ["봄", "가을"],
      stages: ["nurse", "builder", "forager"],
      weight: 2,
      text: "사람들이 화단의 흙과 나무를 통째로 파서 트럭에 싣는다. 개미집 한쪽이 같이 실려 간다.",
      choices: [
        { label: "실려 가는 흙 속에 남는다", risk: 0.15, health: -10, contrib: 2,
          result: "낯선 곳에 내려졌다. 사람의 흙과 화물에 섞여 바다를 건넌 스미드개미들이 미국에서 침입종이 되었다.",
          death: "낯선 곳에 내려졌지만 동료들을 찾지 못했다." },
        { label: "남은 집 쪽으로 도망친다", risk: 0.05, health: 0, contrib: 1,
          result: "집의 일부를 잃었지만 동료들 곁에 남았다.",
          death: "도망치다 무너진 흙에 깔렸다." },
      ],
    },
  ]),
  action: "가장 흔한 개미는 눈에 띄지 않게 낙엽을 분해하고 흙을 갈아요. 공원 낙엽을 모두 쓸어 내기보다 일부를 남겨 두면 이런 작은 생물들의 집이 돼요. 그리고 흙과 식물을 옮길 때는 그 안에 사는 생물도 함께 옮겨진다는 걸 기억해 주세요.",
});
