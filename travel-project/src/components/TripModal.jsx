import React from "react";
import "./TripModal.css";

const TripModal = ({ locationName, locaionDescription, locationImage, tags = [], onClose }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-image-wrapper">
          <img
            className="modal-main-image"
            src={require(`../assets/images/${locationImage}`)}
            alt={locationName}
          />
        </div>
        <div className="modal-body">
          <h2 className="modal-title">{locationName}</h2>
          <p className="modal-description">
            {locaionDescription}
          </p>
          <div className="modal-tags">
            {tags.map((tag, i) => (
              <span className="tag" key={i}>#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripModal;