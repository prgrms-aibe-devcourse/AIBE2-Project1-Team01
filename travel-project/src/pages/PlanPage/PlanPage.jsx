import React, { useState, useEffect } from "react";
// import DatePickerModal from "../../components/DatePickerModal";
import "./PlanPage.css";

export const PlanPage = () => {
  const [planData, setPlanData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    const data = [
      {
        day: "Day1",
        theme: "전통 & 문화 탐방",
        plans: [
          {
            place: "아사쿠사",
            time: "오전",
            activities: ["센소지 절 참배", "나카미세 거리 구경"],
          },
          {
            place: "Asakusa Menchi (고로케)",
            time: "점심",
            activities: [],
            isMeal: true,
          },
          {
            place: "우에노",
            time: "오후",
            activities: ["공원 산책", "국립박물관 구경"],
          },
          {
            place: "아키하바라",
            time: "저녁-야경",
            activities: ["전자상가 구경", "규카츠 먹기"],
          },
        ],
      },
      {
        day: "Day1",
        theme: "전통 & 문화 탐방",
        plans: [
          {
            place: "아사쿠사",
            time: "오전",
            activities: ["센소지 절 참배", "나카미세 거리 구경"],
          },
          {
            place: "Asakusa Menchi (고로케)",
            time: "점심",
            activities: [],
            isMeal: true,
          },
          {
            place: "우에노",
            time: "오후",
            activities: ["공원 산책", "국립박물관 구경"],
          },
          {
            place: "아키하바라",
            time: "저녁-야경",
            activities: ["전자상가 구경", "규카츠 먹기"],
          },
        ],
      },
      {
        day: "Day1",
        theme: "전통 & 문화 탐방",
        plans: [
          {
            place: "아사쿠사",
            time: "오전",
            activities: ["센소지 절 참배", "나카미세 거리 구경"],
          },
          {
            place: "Asakusa Menchi (고로케)",
            time: "점심",
            activities: [],
            isMeal: true,
          },
          {
            place: "우에노",
            time: "오후",
            activities: ["공원 산책", "국립박물관 구경"],
          },
          {
            place: "아키하바라",
            time: "저녁-야경",
            activities: ["전자상가 구경", "규카츠 먹기"],
          },
        ],
      },
      {
        day: "Day1",
        theme: "전통 & 문화 탐방",
        plans: [
          {
            place: "아사쿠사",
            time: "오전",
            activities: ["센소지 절 참배", "나카미세 거리 구경"],
          },
          {
            place: "Asakusa Menchi (고로케)",
            time: "점심",
            activities: [],
            isMeal: true,
          },
          {
            place: "우에노",
            time: "오후",
            activities: ["공원 산책", "국립박물관 구경"],
          },
          {
            place: "아키하바라",
            time: "저녁-야경",
            activities: ["전자상가 구경", "규카츠 먹기"],
          },
        ],
      },
      {
        day: "Day1",
        theme: "전통 & 문화 탐방",
        plans: [
          {
            place: "아사쿠사",
            time: "오전",
            activities: ["센소지 절 참배", "나카미세 거리 구경"],
          },
          {
            place: "Asakusa Menchi (고로케)",
            time: "점심",
            activities: [],
            isMeal: true,
          },
          {
            place: "우에노",
            time: "오후",
            activities: ["공원 산책", "국립박물관 구경"],
          },
          {
            place: "아키하바라",
            time: "저녁-야경",
            activities: ["전자상가 구경", "규카츠 먹기"],
          },
        ],
      },
      {
        day: "Day1",
        theme: "전통 & 문화 탐방",
        plans: [
          {
            place: "아사쿠사",
            time: "오전",
            activities: ["센소지 절 참배", "나카미세 거리 구경"],
          },
          {
            place: "Asakusa Menchi (고로케)",
            time: "점심",
            activities: [],
            isMeal: true,
          },
          {
            place: "우에노",
            time: "오후",
            activities: ["공원 산책", "국립박물관 구경"],
          },
          {
            place: "아키하바라",
            time: "저녁-야경",
            activities: ["전자상가 구경", "규카츠 먹기"],
          },
        ],
      },
    ];
    setPlanData(data);
  }, []);

  return (
    <div className="plan-page-container">
      <div className="plan-page-header">
        <div className="plan-title">제주도</div>
        {/* TODO: DatePickerModal 선택한 일정 표시 */}
        <div className="plan-dates">2025.04.25 ~ 2025.05.01</div>
      </div>

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

                  {plan.activities.length > 0 && (
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

      <div className="footer">
        <button className="save-button">저장하기</button>
      </div>
    </div>

    //TODO: modal 순서대로 나타나게 수정
    // <div>
    //     {isModalOpen && (
    //         <div className="modal-overlay">
    //             <div className="modal-wrapper">
    //                 <DatePickerModal  />
    //             </div>
    //         </div>
    //     )}
    // </div>
  );
};
