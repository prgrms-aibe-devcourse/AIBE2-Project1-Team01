import React, { useRef, useEffect, useState, useMemo } from "react";
import "./RegionCard.css";
import testImage from "../../assets/img/test.jpg";  // ← 경로 수정

const RegionTag = React.forwardRef(({ text, startPosition }, ref) => {
  const tagTextRef = useRef(null);
  const tagWrapperRef = useRef(null);
  React.useImperativeHandle(ref, () => tagWrapperRef.current);

  useEffect(() => {
    if (tagTextRef.current && tagWrapperRef.current) {
      const width = tagTextRef.current.offsetWidth + 20;
      tagWrapperRef.current.style.width = `${width}px`;
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

export const RegionCard = ({
  imagePath = testImage,
  regionName = "지역명",
  regionDescription = "지역설명",
  tags = ["태그"]
}) => {
  const slicedTags = useMemo(() => tags.slice(0, 4), [tags]);
  const maxTagsLength = useMemo(() => {
    const count = slicedTags.length;
    return count === 1 ? 21 : count === 2 ? 18 : count === 3 ? 15 : 12;
  }, [slicedTags]);

  const displayTags = useMemo(() => {
    let arr = [...slicedTags],
        total = arr.reduce((sum, t) => sum + t.length, 0);
    while (total > maxTagsLength && arr.length) {
      arr.pop();
      total = arr.reduce((sum, t) => sum + t.length, 0);
    }
    return arr;
  }, [slicedTags, maxTagsLength]);

  const [positions, setPositions] = useState([]);
  const tagRefs = useRef([]);

  useEffect(() => {
    tagRefs.current = displayTags.map(() => React.createRef());
  }, [displayTags]);

  useEffect(() => {
    const timer = setTimeout(() => {
      let x = 6;
      const newPos = displayTags.map((_, i) => {
        const w = tagRefs.current[i]?.current?.offsetWidth || 45;
        const pos = x;
        x += w + 6;
        return pos;
      });
      setPositions(newPos);
    }, 50);
    return () => clearTimeout(timer);
  }, [displayTags]);

  const clippedTitle =
    regionName.length > 10 ? `${regionName.slice(0, 10)}...` : regionName;
  const clippedDesc =
    regionDescription.length > 80
      ? `${regionDescription.slice(0, 80)}...`
      : regionDescription;

  return (
    <div className="overlap-group">
      <div className="rectangle" />
      <div className="regioncard-img">
        <img src={imagePath} alt="지역 이미지" />
      </div>
      <div className="region-title" title={regionName}>
        {clippedTitle}
      </div>
      <div className="region-description" title={regionDescription}>
        {clippedDesc}
      </div>
      {displayTags.map((tag, i) => (
        <RegionTag
          key={i}
          text={tag}
          startPosition={positions[i] || 6}
          ref={tagRefs.current[i]}
        />
      ))}
    </div>
  );
};