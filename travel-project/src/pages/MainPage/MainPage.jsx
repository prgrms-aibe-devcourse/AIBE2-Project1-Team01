import React from "react";
import RegionCardList from "../../components/RegionCardList";
import "./MainPage.css";

export const MainPage = () => {
  // 이전 태그를 기억하기 위한 레퍼런스
  return (
    <div className="main-page">
      <RegionCardList />
    </div>
  );
};
