import React from "react";
import "./TravelPlanList.css"; // 스타일 따로 분리 가능

const TravelPlanList = ({ planData }) => {
  return (
    <div className="day-scroll-wrapper">
      <div className="day-grid-horizontal">
        {planData.map((dayItem) => (
          <div key={dayItem.day} className="day-card">
            <h2>
              {dayItem.day}: {dayItem.theme}
            </h2>
            {dayItem.plans.map((plan, idx) => (
              <div key={idx} className="plan-block">
                <div className="plan-place">
                  <span className="location-icon">📍</span>
                  <span className="place-name">
                    {plan.place}{" "}
                    <span className="time-label">({plan.time})</span>
                  </span>
                </div>
                {(plan.activities || []).length > 0 && (
                  <ul className="activity-list">
                    {plan.activities.map((activity, i) => (
                      <li key={i} className="activity-item">
                        {activity}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelPlanList;
