const dummyTripData = [
  {
    id: "location_001",
    regionName: "부산",
    travelDate: "5.5 - 5.8",
    imagePath: require("../assets/img/test.jpg"),
    tags: ["해운대", "바다", "야경"],
    details: {
      추천일정: "3일",
      방문시기: "연중"
    }
  },
  {
    id: 2,
    regionName: "서울",
    travelDate: "4.12 - 4.14",
    imagePath: require("../assets/img/test.jpg"),
    tags: ["역사", "맛집", "궁궐", "시장"],
    details: {
      추천일정: "4일",
      방문시기: "가을"
    }
  },
  {
    id: 3,
    regionName: "제주",
    travelDate: "3.20 - 3.25",
    imagePath: require("../assets/img/test.jpg"),
    tags: ["휴양", "자연", "오름"],
    details: {
      추천일정: "3일",
      방문시기: "봄봄"
    }
  },
];

export default dummyTripData;
