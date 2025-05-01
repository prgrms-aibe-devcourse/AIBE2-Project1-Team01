import React from "react";
import planData from '../data/PlanTest.json'; // TODO: locations.json으로 변경 
import "./TripModal.css";

const TripModal = ({ id, onClose }) => {
  const tripData = planData.locations.find(location => location.id === id);
  console.log("tripData", tripData);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{tripData.name}</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-content">
          <div className="modal-text">
            <p>
              <strong>대한민국 {tripData.name}</strong>
            </p>
            <p className="trip-description">{tripData.description}</p>
            {/* <ul>
              {Object.entries().map(([label, value]) => (
                <li key={label}>
                  📌 {label}: {value}
                </li>
              ))}
            </ul> */}
          </div>
          <div className="modal-image">
            <img src={require(`../assets/img/${tripData.images?.[0]}`)} alt={tripData.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripModal;
