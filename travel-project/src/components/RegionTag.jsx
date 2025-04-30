import React, {
    useRef,
    useEffect,
    forwardRef,
    useImperativeHandle
  } from "react";
  
  const RegionTag = forwardRef(({ text, index, startPosition }, ref) => {
    const tagTextRef = useRef(null);
    const tagWrapperRef = useRef(null);
  
    useImperativeHandle(ref, () => tagWrapperRef.current);
  
    useEffect(() => {
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
  
  export default RegionTag;
  