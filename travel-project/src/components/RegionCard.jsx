import React, { useRef, useEffect, useState } from "react";
import "./RegionCard.css";
import testImage from "../assets/img/test.jpg";
import TravelDetailPage, { handleCardClick } from "./TravelDetailPage";

/* 사용예시입니다. */
/*
<RegionCard 
    id="location_001" // 원본 json 경로의 id 값
    regionName="서울" 
    regionDescription="대한민국의 수도이자 최대 도시입니다."
    imagePath={require("../../assets/img/test2.jpg")}
    tags={["관광", "맛집", "역사","도시"]}  // 3개만 입력하면 3개만 표시됨
    url="/region/seoul"  // 클릭 시 이동할 URL
    jsonPath="../data/regions/1.json"  // 원본 JSON 파일 경로
/>
*/

// 태그 컴포넌트 생성
const RegionTag = React.forwardRef(({ text, index, startPosition }, ref) => {
  const tagTextRef = useRef(null);
  const tagWrapperRef = useRef(null);

  // 외부 ref가 있는 경우 같은 요소를 가리키도록 설정
  React.useImperativeHandle(ref, () => tagWrapperRef.current);

  useEffect(() => {
    if (tagTextRef.current && tagWrapperRef.current) {
      // 텍스트 너비 측정 후 패딩 추가
      const textWidth = tagTextRef.current.offsetWidth;
      const wrapperWidth = textWidth + 20; // 좌우 10px 패딩

      // 래퍼 너비 설정 - 길이 제한 없음
      tagWrapperRef.current.style.width = `${wrapperWidth}px`;
    }
  }, [text]);

  return (
    <>
      <div
        ref={tagWrapperRef}
        className="tag-wrapper"
        style={{ left: `${startPosition}px` }}
      />
      <div
        ref={tagTextRef}
        className="region-tag"
        style={{
          left: `${startPosition}px`,  // tag-wrapper와 동일한 위치
          width: `${tagWrapperRef.current ? tagWrapperRef.current.style.width : 'auto'}`  // wrapper와 동일한 너비
        }}
      >
        {text}
      </div>
    </>
  );
});

export const RegionCard = ({
  imagePath = testImage,
  regionName = "지역명(regionName)",
  regionDescription = "지역설명(regionDescription)",
  tags = ["태그"], // 기본값으로 1개의 태그만 표시
  url = "/", // 클릭 시 이동할 URL, 기본값은 홈페이지
  id,
  jsonPath, // 원본 JSON 파일 경로 추가
}) => {
  // 최대 4개의 태그만 표시하도록 제한
  const slicedTags = tags.slice(0, 4);

  // 태그 개수에 따른 최대 허용 길이 설정
  const getMaxTagsLength = (tagCount) => {
    switch (tagCount) {
      case 1:
        return 21;
      case 2:
        return 18;
      case 3:
        return 15;
      case 4:
        return 12;
      default:
        return 12;
    }
  };

  // 전체 태그 길이 계산
  const maxTagsLength = getMaxTagsLength(slicedTags.length);

  // 태그 길이에 따라 처리
  let displayTags = [...slicedTags];
  let totalTagsLength = displayTags.reduce(
    (total, tag) => total + tag.length,
    0
  );

  while (totalTagsLength > maxTagsLength && displayTags.length > 0) {
    displayTags.pop(); // 마지막 태그 제거
    totalTagsLength = displayTags.reduce((total, tag) => total + tag.length, 0); // 다시 계산
  }

  // 태그 위치 및 너비 계산을 위한 상태
  const [tagPositions, setTagPositions] = useState([]);
  const tagRefs = useRef([]);

  // 컴포넌트 마운트 시 tagRefs 초기화
  useEffect(() => {
    tagRefs.current = displayTags.map(() => React.createRef());
  }, [displayTags.length]); // 오직 태그 개수가 변경될 때만 재실행

  // 태그 위치 계산을 위한 효과
  useEffect(() => {
    // 모든 태그의 너비를 측정하고 위치 계산
    const calculatePositions = () => {
      const positions = [];
      let currentPos = 6; // 첫 태그의 시작 위치 (왼쪽 여백)

      // 각 태그에 대해 순차적으로 위치 계산
      displayTags.forEach((_, index) => {
        // 현재 위치 저장
        positions.push(currentPos);

        // 다음 태그의 위치 계산 (현재 태그의 너비 + 간격)
        const ref = tagRefs.current[index];
        if (ref && ref.current) {
          const width = ref.current.offsetWidth || 45;
          currentPos += width + 6; // 태그 너비 + 간격(6px)
        } else {
          currentPos += 45 + 6; // 기본 너비 + 간격
        }
      });

      setTagPositions(positions);
    };

    // DOM 업데이트 후에 계산 실행
    const timer = setTimeout(calculatePositions, 100);
    return () => clearTimeout(timer);
  }, [displayTags]); // 태그 내용이 변경될 때마다 위치 재계산

  // 카드 스타일
  const cardStyle = {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
    display: "block",
    width: "227px", // overlap-group과 동일한 너비
    height: "370px", // overlap-group과 동일한 높이
    position: "relative",
  };

  // 모달 관련 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // 카드 클릭 이벤트 핸들러 -> 상세페이지 모달로 연결
  const onCardClick = () => {
    // 원본 id 값 확인 (id에 location_001과 같은 원본 id가 있는 경우)
    const originalLocationId = id && typeof id === 'string' && id.includes('location_') ? id : null;
    
    // 카드 데이터 생성
    const cardData = {
      id: id || "default", // id 값 사용
      originalId: originalLocationId || id, // 원본 json의 id 값을 별도로 저장
      name: regionName,
      description: regionDescription,
      tags: tags,
      image: imagePath,
      jsonPath: jsonPath, // 원본 JSON 파일 경로 추가
    };

    // 모달 열기 //
    handleCardClick(cardData, setSelectedCard, setIsModalOpen); // 여기서 TravelDetailPage.jsx를 호출합니다.
    // 전달되는 데이터 예시
    // const cardData = {
    //   id: 3,  // 지역 ID 번호
    //   name: "강릉",  // 지역 이름
    //   description: "자연과 바다의 도시", // 지역 설명
    //   tags: ["자연", "바다", "심신안정"], // 태그 배열
    //   image: require("../assets/img/gangneung.jpg") // 이미지 경로
    // };




  };

  // 모달 닫기 이벤트 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ width: "227px", height: "370px", position: "relative" }}>
      <div onClick={onCardClick} style={cardStyle}>
        <div className="region-overlap-group">
          <div className="region-rectangle" />

          <div className="regioncard-img">
            <img
              src={imagePath}
              alt="지역 이미지"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div className="region-title">{regionName}</div>
          <div className="region-description">{regionDescription}</div>

          {/* 태그들 - 동적 위치 계산 */}
          {displayTags.map((tag, index) => (
            <RegionTag
              key={`tag-${index}-${tag}`} // 고유 키 부여
              text={tag}
              index={index}
              startPosition={tagPositions[index] || 6 + index * (45 + 6)} // 초기 위치 설정
              ref={tagRefs.current[index]}
            />
          ))}
        </div>
      </div>

      {/* 모달 컴포넌트 추가 */}
      {isModalOpen && (
        <TravelDetailPage
          reviewData={selectedCard}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
