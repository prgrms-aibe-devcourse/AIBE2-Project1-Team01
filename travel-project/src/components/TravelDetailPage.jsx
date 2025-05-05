import React from "react";
import { useNavigate } from "react-router-dom";
import "./TravelDetailPage.css";

// 카드 데이터를 받아 모달에 표시하는 함수
export const handleCardClick = (card, setSelectedCard, setIsModalOpen) => {
  const origId = card.originalId || card.id;
  let trueOriginalId = origId;
  
  if (typeof origId === "string" && origId.includes("location_")) {
    trueOriginalId = origId;
  } else if (typeof origId === "string" && origId.includes("-")) {
    trueOriginalId = origId.split("-")[1];
  }

  const reviewData = {
    name: card.name,
    description: card.description,
    tags: card.tags,
    photoUrl: card.image,
    regionId: card.id,
    jsonIndex: card.id.split("-")[0],
    locationId: card.id.split("-")[1] || "loc_0",
    originalId: trueOriginalId,
  };

  setSelectedCard(reviewData);
  setIsModalOpen(true);
};

const TravelDetailPage = ({ reviewData, onClose }) => {
  const navigate = useNavigate();

  if (!reviewData) return null;
  const { name, description, tags, photoUrl, jsonIndex, locationId } = reviewData;

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains("travel-detail-modal")) {
      onClose();
    }
  };

  return (
    <div className="travel-detail-modal" onClick={handleBackgroundClick}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <img src={photoUrl} alt={name} className="travel-image" />
        <h2 className="travel-title">{name}</h2>
        <p className="travel-description">{description}</p>
        <div className="tag-list">
          {tags.map((t, i) => (
            <span key={i} className="tag-item">#{t}</span>
          ))}
        </div>
        <button
          className="recommend-button"
          onClick={() =>
            navigate("/plan", {
              state: { jsonIndex, locationId },
            })
          }
        >
          일정 추천
        </button>
      </div>
    </div>
  );
};

export default TravelDetailPage;