import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BigStar, EmptyStar, HalfStar } from '../../components/StarRating';
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
  const [formData, setFormData] = useState({
    content: '',
    photo: '',
    photoFile: null,
    startDate: '',
    endDate: '',
    location: ''
  });
  const [starRate, setStarRate] = useState(0);
  const [myStarRate, setMyStarRate] = useState(0);
  const [photoPreview, setPhotoPreview] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (!review) return;
    
    setFormData({
      content: review.content || '',
      photo: review.photo || '',
      photoFile: null,
      startDate: review.startDate || '',
      endDate: review.endDate || '',
      location: review.location || ''
    });
    setMyStarRate(review.rating || 0);
    setPhotoPreview(review.photo || '');
  }, [review]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData(prev => ({ ...prev, photoFile: file }));
    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleStarInteraction = (index, isClick, x, width) => {
    const rating = x < width / 2 ? index + 0.5 : index + 1;
    if (isClick) {
      setMyStarRate(rating);
    } else {
      setStarRate(rating);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateReview({
      ...review,
      content: formData.content,
      rating: myStarRate,
      photo: photoPreview || '',
      startDate: formData.startDate,
      endDate: formData.endDate,
      location: formData.location
    });
    navigate('/reviews');
  };

  const renderStars = () => {
    const rate = starRate || myStarRate;
    return Array(5).fill(null).map((_, index) => {
      const filled = rate >= index + 1;
      const half = !filled && rate >= index + 0.5;
      
      return (
        <span
          key={index}
          className="star-container"
          onMouseMove={e => {
            const { left, width } = e.currentTarget.getBoundingClientRect();
            handleStarInteraction(index, false, e.clientX - left, width);
          }}
          onMouseLeave={() => setStarRate(0)}
          onClick={e => {
            const { left, width } = e.currentTarget.getBoundingClientRect();
            handleStarInteraction(index, true, e.clientX - left, width);
          }}
        >
          {filled ? <BigStar /> : half ? <HalfStar /> : <EmptyStar />}
        </span>
      );
    });
  };

  if (!review) return <div>리뷰를 찾을 수 없습니다.</div>;

  return (
    <div className="review-write-page">
      <button className="back-btn" onClick={() => navigate('/reviews')}>뒤로가기</button>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="review-photo-upload">
          {photoPreview ? (
            <img src={photoPreview} alt="미리보기" className="photo-preview" />
          ) : (
            <div className="photo-placeholder">사진</div>
          )}
        </div>
        <div className="file-input-container">
          <label className="file-label">
            파일 선택
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </label>
          <span className="file-name">{fileName}</span>
        </div>
        <div className="review-rating-select">
          {renderStars()}
        </div>
        <div className="date-inputs">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="date-input"
          />
          <span>~</span>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="date-input"
          />
        </div>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="여행지"
          required
          className="location-input"
        />
        <textarea
          className="review-content-input"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="리뷰 내용을 입력하세요."
          required
        />
        <div className="review-write-actions">
          <button type="submit" className="common-btn blue">수정하기</button>
          <button type="button" onClick={() => setShowDeleteModal(true)} className="common-btn red">삭제하기</button>
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