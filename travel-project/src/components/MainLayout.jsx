import React from "react";
import { RegionCard } from "./RegionCard";
import "./style.css";

export const MainLayout = () => {
  return (
    <div className="main-layout">
      <RegionCard/>
      <RegionCard 
        regionName="서울" 
        regionDescription="대한민국의 수도이자 최대 도시입니다."
        imagePath={require("../assets/img/test2.jpg")}
        tags={["봄","도시","당일치기","맛집"]}
      />
    </div>
  );
};