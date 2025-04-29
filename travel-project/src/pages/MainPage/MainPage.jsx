import React from "react";
import { RegionCard } from "../../components/RegionCard";
import "./MainPage.css";

export const MainPage = () => {
  return (
    <div className="main-page">
      <div className="main-page-header">
        <div className="label-logo">
          {/* 다 지우고 다시시작ㅠ */}
          메인페이지
          <RegionCard 
            regionName="서울" 
            regionDescription="대한민국의 수도이자 최대 도시입니다."
            imagePath={require("../../assets/img/test.jpg")}
            tags={["관광", "맛집", "역사","도시"]}  // 3개만 입력하면 3개만 표시됨
          />

        </div>

      </div>
    </div>
  );
};
