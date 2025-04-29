import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReviewWrite.css';

const BigStar = () => (
  <svg className="star-svg" width="32" height="32" viewBox="0 0 24 24" style={{display:'inline-block', verticalAlign:'middle'}}>
    <polygon
      points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const EmptyStar = () => (
  <svg className="star-svg star-outline" width="32" height="32" viewBox="0 0 24 24" style={{display:'inline-block', verticalAlign:'middle'}}>
    <polygon
      points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9"
    />
  </svg>
);

const HalfStar = () => (
  <svg className="star-svg" width="32" height="32" viewBox="0 0 24 24" style={{display:'inline-block', verticalAlign:'middle'}}>
    <defs>
      <linearGradient id="half-gradient" x1="0" x2="1" y1="0" y2="0">
        <stop offset="50%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
    <polygon
      points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9"
      fill="url(#half-gradient)"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <polygon
      points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9"
      className="star-outline"
    />
  </svg>
);

function ReviewWrite({ onAddReview }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    content: '',
    photo: '',
    photoFile: null
  });
  // 별점 상태
  const [starRate, setStarRate] = useState(0); // hover/선택 중
  const [myStarRate, setMyStarRate] = useState(0); // 최종 선택
  const [photoPreview, setPhotoPreview] = useState('');

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
    };
    onAddReview(newReview);
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
      <form onSubmit={handleSubmit} className="review-form" style={{display:'flex', flexDirection:'column', gap:'16px'}}>
        <div className="review-photo-upload">
          {photoPreview ? (
            <img src={photoPreview} alt="미리보기" className="photo-preview" />
          ) : (
            <div className="photo-placeholder">사진</div>
          )}
        </div>
        <label className="file-label" style={{alignSelf:'flex-start', margin:'8px 0 0 0'}}>
          파일선택
          <input type="file" accept="image/*" style={{display:'none'}} onChange={handlePhotoChange} />
        </label>
        <div className="review-rating-select" style={{display:'flex', alignItems:'center', gap:'2px'}}>
          {Array(5).fill(1).map((_, index) => (
            <span
              key={index}
              style={{position:'relative', display:'inline-block'}}
              onMouseMove={e => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              onClick={handleStarClick}
            >
              {renderStarIcons()[index]}
            </span>
          ))}
          <span style={{marginLeft:'8px', fontSize:'1rem'}}></span>
        </div>
        <textarea
          className="review-content-input"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="리뷰 내용"
          required
        />
        <div className="review-write-actions">
          <button type="submit">저장하기</button>
          <button type="button" onClick={() => navigate('/reviews')} style={{background:'#f66'}}>취소</button>
        </div>
      </form>
    </div>
  );
}

export default ReviewWrite; 