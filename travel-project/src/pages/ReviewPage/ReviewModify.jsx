import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BigStar, EmptyStar } from '../../components/StarRating';
import ConfirmModal from '../../components/ConfirmModal';
import { useReview } from '../../contexts/ReviewContext';
import './ReviewWrite.css';

function ReviewModify() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { reviews, handleUpdateReview, handleDeleteReview } = useReview();
  const reviewId = Number(id);
  const review = reviews.find(r => r.id === reviewId);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // form state
  const [location, setLocation] = useState(review?.location || '');
  const [rating, setRating] = useState(review?.rating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewContent, setReviewContent] = useState(review?.content || '');
  const [startDate, setStartDate] = useState(review?.startDate || '');
  const [endDate, setEndDate] = useState(review?.endDate || '');
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(review?.photo || '');
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (!review) return;
    setLocation(review.location || '');
    setRating(review.rating || 0);
    setReviewContent(review.content || '');
    setStartDate(review.startDate || '');
    setEndDate(review.endDate || '');
    setPhotoUrl(review.photo || '');
  }, [review]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 사진 업로드
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handlePhotoRemove = () => {
    setPhoto(null);
    setPhotoUrl('');
  };

  // 드래그 앤 드롭 핸들러
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePhotoChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleStarHover = (value) => {
    setHoveredRating(value);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleStarClick = (value) => {
    if (rating === value) {
      setRating(0);
    } else {
      setRating(value);
    }
  };

  const getRatingText = (rating) => {
    switch (rating) {
      case 1:
        return "최악";
      case 2:
        return "형편없음";
      case 3:
        return "보통";
      case 4:
        return "좋음";
      case 5:
        return "훌륭함";
      default:
        return "";
    }
  };

  // 별점 렌더링
  const renderStarIcons = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <div
        key={index}
        className="star-container"
        onMouseEnter={() => handleStarHover(index + 1)}
        onMouseLeave={handleStarLeave}
        onClick={() => handleStarClick(index + 1)}
      >
        {index < (hoveredRating || rating) ? <BigStar /> : <EmptyStar />}
        {rating === index + 1 && (
          <div className="tooltip">취소하기</div>
        )}
      </div>
    ));
  };

  // 저장
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedReview = {
      ...review,
      content: reviewContent,
      rating: rating,
      photo: photoUrl,
      startDate: startDate,
      endDate: endDate,
      location: location,
    };
    handleUpdateReview(updatedReview);
    navigate('/reviews');
  };

  if (!review) return <div>리뷰를 찾을 수 없습니다.</div>;

  return (
    <div className="reviewwrite-container">
      {/* 좌측: 안내문구 + 사진 미리보기 */}
      <div className="reviewwrite-left" style={{justifyContent: 'center'}}>
        <div className="reviewwrite-title">여행지에 대한 리뷰를 <br />남겨주세요!</div>
        <div className="location-photo-box">
          {photoUrl ? (
            <div className="location-photo-preview">
              <img src={photoUrl} alt="여행지 사진" className="location-photo" />
              <button 
                type="button" 
                className="location-photo-remove-btn"
                onClick={handlePhotoRemove}
              >
                ×
              </button>
            </div>
          ) : (
            <div className="location-photo-empty">사진</div>
          )}
        </div>
      </div>
      {/* 세로 구분선 */}
      <div className="vertical-divider" />
      {/* 우측: 리뷰 폼 */}
      <form className="reviewwrite-right" onSubmit={handleSubmit}>
        <button className="reviewwrite-close-btn" onClick={() => navigate('/reviews')} type="button">
          ←
          <span className="tooltip">뒤로 가기</span>
        </button>
        {/* 1. 별점 선택 */}
        <div className="form-section">
          <div className="form-label main">별점을 선택해주세요.</div>
          <div className="review-rating-select">
            {renderStarIcons()}
            <span className="rating-text">
              {hoveredRating ? getRatingText(hoveredRating) : rating ? getRatingText(rating) : ""}
            </span>
          </div>
        </div>
        {/* 2. 여행 일자 */}
        <div className="form-section">
          <div className="form-label">여행 일자</div>
          <div className="date-inputs">
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              required
              className="date-input"
            />
            <span>~</span>
            <input
              type="date"
              name="endDate"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              required
              className="date-input"
            />
          </div>
        </div>
        {/* 3. 여행 지역 */}
        <div className="form-section">
          <div className="form-label">여행 지역</div>
          <div className="location-input-container">
            <input
              id="location-input"
              className="location-input"
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="여행 지역을 입력하세요."
              required
            />
          </div>
        </div>        
        <div className="form-section">
          <div className="form-label">리뷰를 수정해주세요.</div>
          <textarea
            className="review-textarea"
            value={reviewContent}
            onChange={e => setReviewContent(e.target.value)}
            maxLength={150}
            placeholder="리뷰 내용을 입력하세요."
          />
        </div>        
        <div className="form-section">
          <div className="form-label">사진 수정하기</div>
          <label
            className={`photo-upload-label${dragActive ? ' drag-active' : ''}`}
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input type="file" accept="image/*" onChange={handlePhotoChange} style={{display:'none'}} />
            <div className="photo-upload-box">
              클릭하여 사진 추가하기<br/>또는 끌어오기
            </div>
          </label>
        </div>
        <div className="review-write-actions">
          <button type="submit" className="common-btn blue">수정</button>
          <button type="button" onClick={() => setShowDeleteModal(true)} className="common-btn red">삭제</button>
        </div>
      </form>
      {showDeleteModal && (
        <ConfirmModal
          message="정말 삭제하시겠습니까?"
          onConfirm={() => {
            handleDeleteReview(reviewId);
            navigate('/reviews');
          }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

export default ReviewModify;