import { useState, useRef, useEffect } from "react";
import "./TagSelector.css";

const TagSelector = ({ onSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState({});
  const [appliedTags, setAppliedTags] = useState({});
  const modalRef = useRef(null);
  const searchRef = useRef(null);

  const categories = {
    계절: ["봄", "여름", "가을", "겨울"],
    지역: [
      "서울", "경기", "강원", "충청", "경상", "전라", "제주", "부산", "인천",
    ],
    테마: [
      "문화", "자연", "역사", "바다", "산", "심신안정", "대한민국관광100선",
    ],
    엑티비티: [
      "하이킹", "워킹", "일출구경", "섬탐험", "캠핑", "요트", "서핑", "맛집탕방",
    ],
    동반자: [
      "혼자가기좋음", "친구와", "데이트", "가족여행", "반려동물가능", "단체여행",
    ],
    여행기간: ["당일치기", "1박2일", "2박3일", "장기여행"],
  };

  // 태그 선택 시 상태 업데이트
  const handleTagSelect = (category, tag) => {
    setSelectedTags((prev) => {
      const newTags = JSON.parse(JSON.stringify(prev));
      if (!newTags[category]) newTags[category] = [];

      const index = newTags[category].indexOf(tag);
      if (index >= 0) {
        newTags[category].splice(index, 1);
        if (newTags[category].length === 0) delete newTags[category];
      } else {
        newTags[category].push(tag);
      }

      setAppliedTags(newTags);
      return newTags;
    });
  };

  const handleRemoveTag = (category, tag) => {
    setSelectedTags((prev) => {
      const newTags = JSON.parse(JSON.stringify(prev));
      const index = newTags[category]?.indexOf(tag);
      if (index >= 0) {
        newTags[category].splice(index, 1);
        if (newTags[category].length === 0) delete newTags[category];
      }

      setAppliedTags(newTags);
      return newTags;
    });
  };

  // ✅ selectedTags 변경 시 onSubmit 호출
  useEffect(() => {
    const allTags = Object.values(selectedTags).flat();
    onSubmit(allTags); // 무조건 여기에만 두자
  }, [selectedTags]);
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isTagSelected = (category, tag) =>
    selectedTags[category]?.includes(tag) || false;

  return (
    <div className="tag-selector-container">
      <div
        ref={searchRef}
        onClick={() => {
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
                        e.stopPropagation();
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
            e.stopPropagation();
            setIsModalOpen(false);
          }}
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </div>

      {isModalOpen && (
        <div ref={modalRef} className="tag-modal">
          <div className="modal-header">
            <h3 className="modal-title">태그를 추가해보세요</h3>
            <button onClick={() => setIsModalOpen(false)} className="close-button">×</button>
          </div>

          {Object.entries(categories).map(([category, tags]) => (
            <div key={category} className="category-section">
              <div className="category-title">{category}</div>
              <div className="tags-container">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={(e) => {
                      e.stopPropagation();
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
        </div>
      )}
    </div>
  );
};

export default TagSelector;
