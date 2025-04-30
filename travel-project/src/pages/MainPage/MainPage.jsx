import React, { useState, useEffect } from "react";
import { RegionCard } from "../../components/RegionCard/RegionCard"; 
import ReviewDetailPage from "../travel/ReviewDetailPage";
import reviewDataJson from "../../data/reviewData.json";
import "./MainPage.css";

export const MainPage = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    setReviewList([reviewDataJson]);
  }, []);

  const handleCardClick = (reviewData) => {
    setSelectedRegion(reviewData);
  };

  const handleCloseModal = () => {
    setSelectedRegion(null);
  };

  return (
    <div className="main-page">
      <div className="main-page-header">
        <div className="label-logo">
          메인페이지
          {reviewList.map((review, index) => (
            <div key={index} onClick={() => handleCardClick(review)}>
              <RegionCard 
                regionName={review.destination.name} 
                regionDescription={review.destination.description}
                imagePath={review.destination.photoUrl}
                tags={["관광", "맛집", "역사", "도시"]} // 태그 데이터와 연결 필요시수정
              />
            </div>
          ))}
        </div>
      </div>

      {selectedRegion && (
        <ReviewDetailPage reviewData={selectedRegion} onClose={handleCloseModal} />
      )}
    </div>
  );
};