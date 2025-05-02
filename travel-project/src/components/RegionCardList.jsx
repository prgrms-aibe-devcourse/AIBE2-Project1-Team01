import React, { useState, useEffect } from "react";
import { RegionCard } from "./RegionCard";
import TagSelector from "./TagSelector";
import "./RegionCardList.css";

// ✅ JSON 파일 import
import data1 from "../data/regions/1.json";
import data2 from "../data/regions/2.json";
import data3 from "../data/regions/3.json";
import data4 from "../data/regions/4.json";
import data5 from "../data/regions/5.json";
import data6 from "../data/regions/6.json";

function RegionCardList() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [allCards, setAllCards] = useState([]);

  useEffect(() => {
    // ✅ 파일명 정보를 함께 넣은 데이터 배열 구성
    const allData = [
      { file: "1", data: data1 },
      { file: "2", data: data2 },
      { file: "3", data: data3 },
      { file: "4", data: data4 },
      { file: "5", data: data5 },
      { file: "6", data: data6 },
    ];

    // ✅ 각 파일별 데이터에 파일명 prefix를 붙인 id 생성
    const cardList = allData.flatMap(({ file, data }) =>
      data.locations.map((loc, index) => ({
        id: `${file}-${loc.id || `loc_${index}`}`, // 🔑 id에 파일 prefix 추가
        name: loc.name,
        description: loc.description,
        image: loc.images[0].startsWith("http")
          ? loc.images[0]
          : (() => {
              try {
                return require(`../assets/images/${loc.images[0]}`);
              } catch (e) {
                console.warn("이미지 로드 실패:", loc.images[0]);
                return require(`../assets/images/andong1.jpg`);
              }
            })(),
        tags: loc.tags,
      }))
    );

    setAllCards(cardList);
    setFilteredCards(cardList);
  }, []);

  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredCards(allCards);
    } else {
      const result = allCards.filter((card) =>
        selectedTags.every((tag) =>
          card.tags.map((t) => t.trim()).includes(tag.trim())
        )
      );
      setFilteredCards(result);
    }
  }, [selectedTags, allCards]);

  useEffect(() => {
    console.log("🔥 선택된 태그:", selectedTags);
  }, [selectedTags]);

  return (
    <div>
      <TagSelector onSubmit={setSelectedTags} />
      <div className="card-list">
        {filteredCards.map((card) => (
          <RegionCard
            key={card.id}
            imagePath={card.image}
            regionName={card.name}
            regionDescription={card.description}
            tags={card.tags}
            url={`/detail/${card.id}`} // ✅ detail 경로도 유니크 id로 유지
          />
        ))}
      </div>
    </div>
  );
}

export default RegionCardList;
