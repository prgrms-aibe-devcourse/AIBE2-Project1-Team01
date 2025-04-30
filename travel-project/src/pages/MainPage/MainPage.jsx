import React from "react";
import { RegionCard } from "../../components/RegionCard";
import TagSelector from "../../components/TagSelector";
import "./MainPage.css";

export const MainPage = () => {
  // 이전 태그를 기억하기 위한 레퍼런스
  const prevTagsRef = React.useRef([]);
  
  const handleTagsSubmitted = (selectedTags) => { // 선택된 태그 처리할 수 있는 함수입니다.
    // 이전 태그와 현재 태그를 비교하여 변경이 있을 때만 처리
    const prevTagsString = JSON.stringify(prevTagsRef.current.sort());
    const currentTagsString = JSON.stringify([...selectedTags].sort());
    
    if (prevTagsString !== currentTagsString) {
      console.log("선택된 태그:", selectedTags);
      prevTagsRef.current = selectedTags;
    }
  };

  return (
    <div className="main-page">
      <div className="TagSelector-container">
        <TagSelector onSubmit={handleTagsSubmitted} />
      </div>


      <RegionCard
        regionName="서울"
        regionDescription="대한민국의 수도이자 최대 도시입니다."
        imagePath={require("../../assets/img/test.jpg")}
        tags={["관광", "맛집", "역사", "도시"]} // 3개만 입력하면 3개만 표시됨
      />
    </div>
  );
};
