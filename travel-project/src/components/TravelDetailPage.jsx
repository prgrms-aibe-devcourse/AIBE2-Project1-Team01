import React from "react";
import { useNavigate } from "react-router-dom";
import "./TravelDetailPage.css";

// 카드 데이터를 받아 모달에 표시하는 함수
export const handleCardClick = (card, setSelectedCard, setIsModalOpen) => {
  // 카드 데이터를 모달에 표시할 형식으로 변환

  const reviewData = {
    name: card.name,
    description: card.description,
    tags: card.tags,
    photoUrl: card.image,
    regionId: card.id,
    jsonFile: card.jsonPath || `../data/regions/${card.id.split('-')[0]}.json` // 원본 JSON 경로 사용, 없으면 기본값
  };
  
  console.log('변환된 reviewData:', reviewData);
  setSelectedCard(reviewData);
  setIsModalOpen(true);
};

const TravelDetailPage = ({ reviewData, onClose }) => {
  const navigate = useNavigate();

  // TravelDetailPage 컴포넌트가 렌더링될 때 reviewData 출력
  console.log('TravelDetailPage 렌더링, reviewData:', reviewData);

  if (!reviewData) return null;

  const { name, description, tags, photoUrl, regionId, jsonFile } = reviewData;
  

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains("travel-detail-modal")) {
      onClose();
    }
  };

  

  return (
    <div className="travel-detail-modal" onClick={handleBackgroundClick}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <img src={photoUrl} alt="여행지 이미지" className="travel-image" />
        <h2 className="travel-title">{name}</h2>
        <p className="travel-description">{description}</p>

        <div className="tag-list">
          {tags.map((tag, idx) => (
            <span className="tag-item" key={idx}>#{tag}</span>
          ))}
        </div>
        <button
          className="recommend-button"
          onClick={() => {
            navigate("/plan", {
              state: { id: regionId, file: jsonFile },
            });
          }}
        >
          일정 추천 받기
        </button>
      </div>
    </div>
  );
};

export default TravelDetailPage;