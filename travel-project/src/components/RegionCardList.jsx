import React, { useState, useEffect } from 'react';
import { RegionCard } from './RegionCard';
import TagSelector from './TagSelector';
import './RegionCardList.css';

// 예시 JSON 데이터
const dummyCards = [
  {
    id: 1,
    name: "서울",
    description: "대한민국의 수도",
    image: require("../assets/img/seoul.jpg"),
    tags: ["맛집", "역사", "도시"]
  },
  {
    id: 2,
    name: "부산",
    description: "해운대가 있는 도시",
    image: require("../assets/img/busan.jpg"),
    tags: ["바다", "맛집", "데이트"]
  },
  {
    id: 3,
    name: "강릉",
    description: "자연과 바다의 도시",
    image: require("../assets/img/gangneung.jpg"),
    tags: ["자연", "바다", "심신안정"]
  },
  {
    id: 4,
    name: "제주도",
    description: "한국 최고의 휴양지",
    image: require("../assets/img/jeju.jpg"),
    tags: ["섬탐험", "자연", "바다", "맛집"]
  },
  {
    id: 5,
    name: "경주",
    description: "역사와 문화의 도시",
    image: require("../assets/img/gyeongju.jpg"),
    tags: ["역사", "문화", "심신안정"]
  }
];

function RegionCardList() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredCards, setFilteredCards] = useState(dummyCards);

  // 태그 선택 시 필터링 처리
  useEffect(() => {
    console.log("초기 selectedTags:", selectedTags);  // []
    console.log("dummyCards:", dummyCards);
    if (selectedTags.length === 0) {
      setFilteredCards(dummyCards);
    } else {
      const result = dummyCards.filter(card =>
        selectedTags.every(tag => card.tags.includes(tag))
      );
      setFilteredCards(result);
    }
  }, [selectedTags]);
  return (
    <div>
      <TagSelector onSubmit={setSelectedTags} />

      <div className="card-list">
        {filteredCards.length === 0 ? (
          <div className="center-text">일치하는 여행지가 없습니다.</div>
        ) : (
          filteredCards.map((card) => (
            <RegionCard
              key={card.id}
              imagePath={card.image}
              regionName={card.name}
              regionDescription={card.description}
              tags={card.tags}
              url={`/detail/${card.id}`} // 상세 페이지로 이동
            />
          ))
        )}
      </div>
    </div>
  );
}

export default RegionCardList;
