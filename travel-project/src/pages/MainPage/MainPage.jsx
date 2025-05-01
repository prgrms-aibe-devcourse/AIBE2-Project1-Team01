import React from "react";
import { RegionCard } from "../../components/RegionCard";
import "./MainPage.css";

export const MainPage = () => {
  // 이전 태그를 기억하기 위한 레퍼런스
  return (
    <div className="main-page">
      <div className="main-cardlist">
        <RegionCard
          regionName="서울"
          regionDescription="대한민국의 수도이자 최대 도시입니다."
          imagePath={require("../../assets/img/test.jpg")}
          tags={["관광", "맛집", "역사", "도시"]}
          url="/region/seoul" // 클릭 시 이동할 URL
        />
        <RegionCard
          regionName="서울"
          regionDescription="대한민국의 수도이자 최대 도시입니다."
          imagePath={require("../../assets/img/test.jpg")}
          tags={["관광", "맛집", "역사", "도시"]}
          url="/region/seoul2" // 클릭 시 이동할 URL
        />
      </div>
    </div>
  );
};
