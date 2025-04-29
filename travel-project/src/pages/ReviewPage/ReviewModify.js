import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal';
import './ReviewWrite.css';

const Star = ({ filled, half }) => (
  <svg className="star-svg" width="32" height="32" viewBox="0 0 24 24" style={{display:'inline-block', verticalAlign:'middle'}}>
    {half ? (
      <>
        <defs>
          <linearGradient id="half-grad-modify">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9" fill="url(#half-grad-modify)" stroke="currentColor" strokeWidth="1.5" />
      </>
    ) : (
      <polygon points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" />
    )}
  </svg>
);

function ReviewModify({ reviews, onUpdateReview, setReviews }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const reviewId = Number(id);
  const review = reviews.find(r => r.id === reviewId);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    content: '',
    photo: '',
    photoFile: null
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
      photoFile: null
    });
    setMyStarRate(review.rating || 0);
    setPhotoPreview(review.photo || '');
  }, [review]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateReview({
      ...review,
      content: formData.content,
      rating: myStarRate,
      photo: photoPreview || '',
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
          style={{position:'relative', display:'inline-block'}}
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
          <Star filled={filled} half={half} />
        </span>
      );
    });
  };

  if (!review) return <div>리뷰를 찾을 수 없습니다.</div>;

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
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <label className="file-label" style={{alignSelf:'flex-start', margin:'8px 0 0 0'}}>
            파일 선택
            <input type="file" accept="image/*" style={{display:'none'}} onChange={handlePhotoChange} />
          </label>
          <span style={{marginTop: '8px', color: '#666'}}>{fileName}</span>
        </div>
        <div className="review-rating-select" style={{display:'flex', alignItems:'center', gap:'2px'}}>
          {renderStars()}
        </div>
        <textarea
          className="review-content-input"
          name="content"
          value={formData.content}
          onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
          placeholder="리뷰 내용을 입력하세요."
          required
        />
        <div className="review-write-actions">
          <button type="submit">수정하기</button>
          <button type="button" onClick={() => setShowDeleteModal(true)} style={{background:'#f66'}}>삭제하기</button>
        </div>
      </form>
      {showDeleteModal && (
        <ConfirmModal
          message="정말 삭제하시겠습니까?"
          onConfirm={() => {
            setReviews(reviews.filter(r => r.id !== reviewId));
            navigate('/reviews');
          }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

export default ReviewModify;