import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/base.css';

function ReviewEditPage() {
  const [photo, setPhoto] = useState(null);
  const [fileName, setFileName] = useState('이미지를 선택하세요');
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const photoInputRef = useRef(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // 파일 이름 업데이트
      const reader = new FileReader();
      reader.onload = (e) => setPhoto(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleStarClick = (index) => {
    setRating(index);
  };

  const handleSubmit = () => {
    const updatedReview = {
      id: 1,
      destination: {
        name: "제주도",
        description: "제주도는 아름다운 섬입니다.",
        photoUrl: photo
      },
      review: {
        rating: rating,
        content: content
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem('reviewData', JSON.stringify(updatedReview));
      // TODO: 나중에 팀원과 합치면 여기 이동 경로 수정할 것
      // 현재는 테스트용으로 /review/detail로 이동
    navigate('/review/detail');
  };

  const handleDelete = () => {
    setShowPopup(true);
  };

  const confirmDelete = () => {
    localStorage.removeItem('reviewData');
    setShowPopup(false);
    navigate('/');
  };

  const cancelDelete = () => {
    setShowPopup(false);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="review-edit">
      {/* 뒤로가기 버튼 */}
      {/* 뒤로가기 리뷰페이지로 돌아가게 하기 지금은 임시 goback임임 */}
      <button className="button back-button" onClick={goBack}>← 뒤로가기</button>

      {/* 사진 업로드 영역 */}
      <div className="photo-upload" style={{ marginTop: '20px' }}>
        {photo ? (
          <img
            src={photo}
            alt="업로드한 사진"
            style={{
              width: '100%',
              height: '250px',
              objectFit: 'contain',
              borderRadius: '10px',
              marginBottom: '10px'
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '250px',
            backgroundColor: '#E0E0E0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            marginBottom: '10px'
          }}>
            <span>사진</span>
          </div>
        )}

        {/* 파일 선택 (윈도우 기본 버튼 스타일) */}
        <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center' }}>
          {/* 파일 선택 버튼 (label) */}
          <label
            htmlFor="photo-input"
            style={{
              padding: '4px 10px',
              backgroundColor: '#E0E0E0',
              border: '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '15px', // ★ 버튼과 파일명 사이 넉넉한 간격
              fontSize: '14px'
            }}
          >
            파일 선택
          </label>

          {/* 파일명 출력 */}
          <span style={{ fontSize: '14px', color: '#666' }}>
            {fileName}
          </span>

          {/* 숨겨진 input */}
          <input
            type="file"
            id="photo-input"
            ref={photoInputRef}
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {/* 별점 선택 */}
      <div className="rating" id="rating" style={{ margin: '10px 0', textAlign: 'center' }}>
        {[1, 2, 3, 4, 5].map((index) => (
          <span
            key={index}
            className="star"
            onClick={() => handleStarClick(index)}
            style={{ fontSize: '24px', cursor: 'pointer' }}
          >
            {index <= rating ? '★' : '☆'}
          </span>
        ))}
      </div>

      {/* 리뷰 작성 텍스트 영역 */}
      <textarea
        id="review-content"
        className="review-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="리뷰 내용을 입력하세요"
        style={{
          width: '100%',
          height: '120px',
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '10px',
          border: '1px solid #ccc'
        }}
      />

      {/* 수정/삭제 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className="button submit-button"
          onClick={handleSubmit}
          style={{ marginRight: '10px' }}
        >
          수정하기
        </button>
        <button className="button delete-button" onClick={handleDelete}>
          삭제
        </button>
      </div>

      {/* 삭제 확인 팝업 */}
      {showPopup && (
        <div className="popup">
          <p>정말 삭제하시겠습니까?</p>
          <button className="button submit-button" onClick={confirmDelete}>예</button>
          <button className="button back-button" onClick={cancelDelete}>아니오</button>
        </div>
      )}
    </div>
  );
}

export default ReviewEditPage;
