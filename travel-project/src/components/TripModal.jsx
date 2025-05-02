import React from "react";
import "./TripModal.css";

const TripModal = ({
  locationName,
  locaionDescription,
  locationImage,
  onClose,
}) => {
  console.log("locationImage", locationImage);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{locationName}</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-content">
          <div className="modal-text">
            <p>
              <strong>대한민국 {locationName}</strong>
            </p>
            <p className="trip-description">{locaionDescription}</p>
            {/* <ul>
              {Object.entries().map(([label, value]) => (
                <li key={label}>
                  📌 {label}: {value}
                </li>
              ))}
            </ul> */}
          </div>
          <div className="modal-image">
            <img
              src={require(`../assets/images/${locationImage}`)}
              alt={locationName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripModal;
