import React, {
    useState,
    useEffect,
    useRef,
    createRef
  } from "react";
  import { useNavigate } from "react-router-dom";
  import RegionTag from "./RegionTag"; // 실제 위치에 따라 경로 조정
  import "./RegionCard.css";
  import testImage from "../assets/img/test.jpg";
  
  export const TripCard = ({
    id,
    imagePath = testImage,
    regionName = "지역명",
    travelDate = "5.5 - 5.8",
    tags = ["태그"]
  }) => {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate(`/trip/${id}`);
    };
  
    const slicedTags = tags.slice(0, 4);
  
    const getMaxTagsLength = (tagCount) => {
      switch (tagCount) {
        case 1: return 21;
        case 2: return 18;
        case 3: return 15;
        case 4: return 12;
        default: return 12;
      }
    };
  
    const maxTagsLength = getMaxTagsLength(slicedTags.length);
    let displayTags = [...slicedTags];
    let totalTagsLength = displayTags.reduce((t, tag) => t + tag.length, 0);
    while (totalTagsLength > maxTagsLength && displayTags.length > 0) {
      displayTags.pop();
      totalTagsLength = displayTags.reduce((t, tag) => t + tag.length, 0);
    }
  
    const [tagPositions, setTagPositions] = useState([]);
    const tagRefs = useRef([]);
  
    useEffect(() => {
      tagRefs.current = displayTags.map(() => createRef());
    }, [displayTags.length]);
  
    useEffect(() => {
      const calculatePositions = () => {
        const positions = [];
        let currentPos = 6;
  
        displayTags.forEach((_, index) => {
          positions.push(currentPos);
          const ref = tagRefs.current[index];
          if (ref && ref.current) {
            const width = ref.current.offsetWidth || 45;
            currentPos += width + 6;
          } else {
            currentPos += 45 + 6;
          }
        });
  
        setTagPositions(positions);
      };
  
      const timer = setTimeout(calculatePositions, 100);
      return () => clearTimeout(timer);
    }, [displayTags]);
  
    return (
      <div
        className="overlap-group card-hover"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <div className="rectangle" />
        <div className="regioncard-img">
          <img
            src={imagePath}
            alt="여행 이미지"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="region-title">{regionName}</div>
        <div className="region-description">{travelDate}</div>
        {displayTags.map((tag, index) => (
          <RegionTag
            key={`tag-${index}-${tag}`}
            text={tag}
            index={index}
            startPosition={tagPositions[index] || (6 + index * (45 + 6))}
            ref={tagRefs.current[index]}
          />
        ))}
      </div>
    );
  };  