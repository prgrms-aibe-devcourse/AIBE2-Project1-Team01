import React from "react";
import "./TripModal.css";

const TripModal = ({ trip, onClose }) => {
  if (!trip) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{trip.regionName}</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-content">
          <div className="modal-text">
            <p><strong>대한민국 {trip.regionName}</strong></p>
            <p className="trip-description">{trip.description}</p>
            <ul>
              {Object.entries(trip.details).map(([label, value]) => (
                <li key={label}>📌 {label}: {value}</li>
              ))}
            </ul>
          </div>
          <div className="modal-image">
            <img src={trip.imagePath} alt={trip.regionName} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripModal;