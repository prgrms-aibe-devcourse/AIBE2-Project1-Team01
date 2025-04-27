import React from "react";
import { Star } from "./Star";
import "./style.css";

export const RegionCard = () => {
  return (
    <div className="overlap-group">
      <div className="rectangle" />

      {/*이미지 삽입 필요*/}
      <div className="regioncard-img" />
      
      <div className="region-title">지역명</div>
      <div className="region-description">
      지역설명지역설명지역설명지역설명지역설명
      </div>
      <div className="tag-wrapper-1" />
      <div className="region-tag1">태그</div>

      <div className="tag-wrapper-2" />
      <div className="region-tag2">태그</div>

      <div className="tag-wrapper-3" />
      <div className="region-tag3">태그</div>

      <div className="tag-wrapper-4" />
      <div className="region-tag4">태그</div>
      
      <Star className="Star" color="#757575" />
    </div>
  );
};