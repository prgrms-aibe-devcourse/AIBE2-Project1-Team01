import React, { useRef, useEffect, useState } from "react";
import "./RegionCard.css";
import testImage from "../../assets/img/test.jpg";

/* 사용예시입니다. */
/*
<RegionCard 
    regionName="서울" 
    regionDescription="대한민국의 수도이자 최대 도시입니다."
    imagePath={require("../../assets/img/test2.jpg")}
    tags={["관광", "맛집", "역사","도시"]}  // 3개만 입력하면 3개만 표시됨
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
          style={{ left: `${startPosition + 10}px` }} // 텍스트 위치 조정
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
    tags = ["태그"] // 기본값으로 1개의 태그만 표시
  }) => {
    // 최대 4개의 태그만 표시하도록 제한
    const slicedTags = tags.slice(0, 4);
    
    // 태그 개수에 따른 최대 허용 길이 설정
    const getMaxTagsLength = (tagCount) => {
      switch(tagCount) {
        case 1: return 21;
        case 2: return 18;
        case 3: return 15;
        case 4: return 12;
        default: return 12;
      }
    };
    
    // 전체 태그 길이 계산
    const maxTagsLength = getMaxTagsLength(slicedTags.length);
    
    // 태그 길이에 따라 처리
    let displayTags = [...slicedTags];
    let totalTagsLength = displayTags.reduce((total, tag) => total + tag.length, 0);
    
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
    
    return (
      <div className="overlap-group">
        <div className="rectangle" />
        
        <div className="regioncard-img">
          <img
            src={imagePath}
            alt="지역 이미지"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        
        <div className="region-title">{regionName}</div>
        <div className="region-description">
          {regionDescription}
        </div>
        
        {/* 태그들 - 동적 위치 계산 */}
        {displayTags.map((tag, index) => (
          <RegionTag
            key={`tag-${index}-${tag}`} // 고유 키 부여
            text={tag}
            index={index}
            startPosition={tagPositions[index] || (6 + index * (45 + 6))} // 초기 위치 설정
            ref={tagRefs.current[index]}
          />
        ))}
      </div>
    );
  };