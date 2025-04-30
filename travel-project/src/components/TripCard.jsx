import React from "react";
import { useNavigate } from "react-router-dom";
import "./RegionCard.css"; // 기존 스타일 재사용
import testImage from "../assets/img/test.jpg";

const RegionTag = React.forwardRef(({ text, index, startPosition }, ref) => {
  const tagTextRef = React.useRef(null);
  const tagWrapperRef = React.useRef(null);

  React.useImperativeHandle(ref, () => tagWrapperRef.current);

  React.useEffect(() => {
    if (tagTextRef.current && tagWrapperRef.current) {
      const textWidth = tagTextRef.current.offsetWidth;
      const wrapperWidth = textWidth + 20;
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
        style={{ left: `${startPosition + 10}px` }}
      >
        {text}
      </div>
    </>
  );
});

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

  const [tagPositions, setTagPositions] = React.useState([]);
  const tagRefs = React.useRef([]);

  React.useEffect(() => {
    tagRefs.current = displayTags.map(() => React.createRef());
  }, [displayTags.length]);

  React.useEffect(() => {
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
