import { useState, useRef, useEffect } from "react";
import "./TagSelector.css";

// // 사용예시
// const handleTagsSubmitted = (selectedTags) => { // 선택된 태그 처리할 수 있는 함수입니다.
//     console.log("선택된 태그:", selectedTags);
// };

// <TagSelector onSubmit={handleTagsSubmitted} />

// 태그 선택기 컴포넌트
const TagSelector = ({ onSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState({});
  const [appliedTags, setAppliedTags] = useState({});
  const modalRef = useRef(null);
  const searchRef = useRef(null);

  // 카테고리별 태그 정의
  const categories = {
    계절: ["봄", "여름", "가을", "겨울"],
    지역: [
      "서울",
      "경기",
      "강원",
      "충청",
      "경상",
      "전라",
      "제주",
      "부산",
      "인천",
    ],
    테마: [
      "문화",
      "자연",
      "역사",
      "바다",
      "산",
      "심신안정",
      "대한민국관광100선",
    ],
    엑티비티: [
      "하이킹",
      "워킹",
      "일출구경",
      "섬탐험",
      "캠핑",
      "요트",
      "서핑",
      "맛집탕방",
    ],
    동반자: [
      "혼자가기좋음",
      "친구와",
      "데이트",
      "가족여행",
      "반려동물가능",
      "단체여행",
    ],
    여행기간: ["당일치기", "1박2일", "2박3일", "장기여행"],
  };

  // 태그 선택 토글 핸들러 - 여러 태그 선택 가능
  const handleTagSelect = (category, tag) => {
    // 태그 선택 상태 업데이트
    setSelectedTags((prev) => {
      // 이전 상태를 깊은 복사
      const newTags = JSON.parse(JSON.stringify(prev));

      // 카테고리가 존재하지 않으면 생성
      if (!newTags[category]) {
        newTags[category] = [];
      }

      // 태그 선택 토글
      const tagIndex = newTags[category].indexOf(tag);
      if (tagIndex >= 0) {
        // 이미 선택된 태그라면 제거
        newTags[category].splice(tagIndex, 1);
        // 카테고리가 비어있으면 삭제
        if (newTags[category].length === 0) {
          delete newTags[category];
        }
      } else {
        // 선택되지 않은 태그라면 추가 (여러 태그 선택 가능)
        newTags[category].push(tag);
      }

      // 즉시 변경사항 적용
      setAppliedTags(newTags);

      // onSubmit prop이 제공되었다면 부모 컴포넌트로 선택된 태그 전달
      const allTags = Object.values(newTags).flat();
      if (onSubmit && typeof onSubmit === "function") {
        onSubmit(allTags);
      }

      return newTags;
    });
  };

  // 모달의 선택된 태그에서 태그 제거 핸들러
  const handleRemoveTag = (category, tag) => {
    // 상태 업데이트
    setSelectedTags((prev) => {
      const newTags = JSON.parse(JSON.stringify(prev));

      if (newTags[category]) {
        const tagIndex = newTags[category].indexOf(tag);
        if (tagIndex >= 0) {
          newTags[category].splice(tagIndex, 1);
          // 카테고리가 비어있으면 삭제
          if (newTags[category].length === 0) {
            delete newTags[category];
          }
        }
      }

      // 즉시 변경사항 적용
      setAppliedTags(newTags);

      // onSubmit 호출
      const allTags = Object.values(newTags).flat();
      if (onSubmit && typeof onSubmit === "function") {
        onSubmit(allTags);
      }

      return newTags;
    });
  };

  // 모달 외부 클릭 처리
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        // 모달 닫기
        setIsModalOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 태그가 선택되었는지 확인 - 여러 태그 선택 가능
  const isTagSelected = (category, tag) => {
    if (!selectedTags[category]) return false;
    return selectedTags[category].includes(tag);
  };

  return (
    <div className="tag-selector-container">
      {/* 검색창 */}
      <div
        ref={searchRef}
        onClick={() => {
          // 모달이 열리면 이전에 적용된 태그로 선택 상태 초기화
          setSelectedTags({ ...appliedTags });
          setIsModalOpen(true);
        }}
        className="search-bar"
      >
        <div className="search-content">
          {Object.values(appliedTags).flat().length > 0 ? (
            <div className="search-tags-container">
              {Object.entries(appliedTags).flatMap(([category, tags]) =>
                tags.map((tag) => (
                  <div key={`search-${category}-${tag}`} className="search-tag">
                    {tag}
                    <span
                      onClick={(e) => {
                        e.stopPropagation(); // 이벤트 버블링 방지
                        // 해당 태그 즉시 제거 - handleRemoveTag 함수 사용
                        handleRemoveTag(category, tag);
                      }}
                      className="remove-tag"
                    >
                      ×
                    </span>
                  </div>
                ))
              )}
            </div>
          ) : (
            <span className="search-placeholder">
              가고싶은 여행태그를 선택해주세요
            </span>
          )}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="18"
          fill="#4b7bec"
          viewBox="0 0 16 16"
          className="search-icon"
          onClick={(e) => {
            e.stopPropagation(); // 상위 div 클릭 이벤트 막기
            setIsModalOpen(false); // 모달 닫기
          }}
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </div>

      {/* 태그 선택 모달 */}
      {isModalOpen && (
        <div ref={modalRef} className="tag-modal">
          <div className="modal-header">
            <h3 className="modal-title">태그를 추가해보세요</h3>
            <button
              onClick={() => setIsModalOpen(false)}
              className="close-button"
            >
              ×
            </button>
          </div>

          {/* 각 카테고리와 태그 렌더링 */}
          {Object.entries(categories).map(([category, tags]) => (
            <div key={category} className="category-section">
              <div className="category-title">{category}</div>
              <div className="tags-container">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={(e) => {
                      e.stopPropagation(); // 이벤트 버블링 방지
                      handleTagSelect(category, tag);
                    }}
                    className={`tag-button ${
                      isTagSelected(category, tag) ? "selected" : ""
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* 모달 닫기 버튼
          <div className="modal-footer">
            <button
              onClick={handleCloseModal}
              className="close-modal-button"
            >
              닫기
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default TagSelector;
