import { useState, useRef } from "react";
import "./SearchArea.css";

function SearchArea({ onSearch }) {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      addTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    onSearch(newTags);
  };

  const addTag = () => {
    if (
      inputValue.trim() !== "" &&
      !tags.includes(inputValue.trim()) &&
      tags.length < 5
    ) {
      const newTags = [...tags, inputValue.trim()];
      setTags(newTags);
      onSearch(newTags);
      setInputValue("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleIconClick = () => {
    addTag();
  };

  return (
    <div className="search-area">
      <form className="tag-form" onSubmit={(e) => e.preventDefault()}>
        <div className="tag-input-wrapper">
          <img src="../../images/tagimg.png" alt="tagImg" className="tag-img" />
          <div className="tags-container">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="tag-item"
                onClick={() => handleRemoveTag(tag)}
              >
                #{tag} 🅧
              </span>
            ))}
            {tags.length < 5 && (
              <input
                ref={inputRef}
                type="text"
                placeholder="#태그 작성 ex)바다"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="tag-input"
              />
            )}
          </div>
        </div>

        <img
          src="../../images/searchicon.png"
          alt="searchIcon"
          className="search-icon"
          onClick={handleIconClick}
        />
      </form>
    </div>
  );
}

export default SearchArea;
