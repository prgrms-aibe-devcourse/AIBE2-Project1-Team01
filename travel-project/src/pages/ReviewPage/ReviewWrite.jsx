import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BigStar, EmptyStar, HalfStar } from '../../components/StarRating';
import { useReview } from '../../contexts/ReviewContext';
import './ReviewWrite.css';

function ReviewWrite() {
  const navigate = useNavigate();
  const { handleAddReview } = useReview();
  const [formData, setFormData] = useState({
    content: '',
    photo: '',
    photoFile: null,
    startDate: '',
    endDate: '',
    location: ''
  });
  // 별점 상태
  const [starRate, setStarRate] = useState(0); // hover/선택 중
  const [myStarRate, setMyStarRate] = useState(0); // 최종 선택
  const [photoPreview, setPhotoPreview] = useState('');
  const [fileName, setFileName] = useState(''); // 파일 이름 상태 추가

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photoFile: file }));
      setFileName(file.name); // 파일 이름 설정
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 별점 마우스 이동(반개/한개)
  const handleMouseMove = (e, index) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    if (x < width / 2) {
      setStarRate(index + 0.5);
    } else {
      setStarRate(index + 1);
    }
  };

  // 별점 마우스 아웃
  const handleMouseLeave = () => {
    setStarRate(0);
  };

  // 별점 클릭(저장)
  const handleStarClick = () => {
    setMyStarRate(starRate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      id: Date.now(),
      content: formData.content,
      rating: myStarRate,
      photo: photoPreview || '',
      startDate: formData.startDate,
      endDate: formData.endDate,
      location: formData.location
    };
    handleAddReview(newReview);
    navigate('/reviews');
  };

  // 별점 렌더링
  const renderStarIcons = () => {
    const rate = starRate || myStarRate;
    return Array(5).fill(1).map((_, index) => {
      if (rate >= index + 1) {
        return <span key={index}><BigStar /></span>;
      } else if (rate >= index + 0.5) {
        return <span key={index}><HalfStar /></span>;
      } else {
        return <span key={index}><EmptyStar /></span>;
      }
    });
  };

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
            파일선택
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </label>
          <span className="file-name">{fileName}</span>
        </div>
        <div className="review-rating-select">
          {Array(5).fill(1).map((_, index) => (
            <span
              key={index}
              className="star-container"
              onMouseMove={e => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              onClick={handleStarClick}
            >
              {renderStarIcons()[index]}
            </span>
          ))}
          <span className="rating-text"></span>
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
          placeholder="리뷰 내용"
          required
        />
        <div className="review-write-actions">
          <button type="submit" className="common-btn blue">저장하기</button>
          <button type="button" onClick={() => navigate('/reviews')} className="common-btn red">취소</button>
        </div>
      </form>
    </div>
  );
}

export default ReviewWrite; 