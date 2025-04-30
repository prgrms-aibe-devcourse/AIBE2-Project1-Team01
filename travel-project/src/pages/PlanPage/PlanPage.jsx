import React, { useState } from 'react';
import DatePickerModal from '../../components/DatePickerModal';
import './PlanPage.css';

const PlanPage = () => {
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
                  activities: ["센소지 절 참배", "나카미세 거리 구경"]
                },
                {
                  place: "Asakusa Menchi (고로케)",
                  time: "점심",
                  activities: [],
                  isMeal: true
                },
                {
                  place: "우에노",
                  time: "오후",
                  activities: ["공원 산책", "국립박물관 구경"]
                },
                {
                  place: "아키하바라",
                  time: "저녁-야경",
                  activities: ["전자상가 구경", "규카츠 먹기"]
                }
              ]
            },
            {
              day: "Day1",
              theme: "전통 & 문화 탐방",
              plans: [
                {
                  place: "아사쿠사",
                  time: "오전",
                  activities: ["센소지 절 참배", "나카미세 거리 구경"]
                },
                {
                  place: "Asakusa Menchi (고로케)",
                  time: "점심",
                  activities: [],
                  isMeal: true
                },
                {
                  place: "우에노",
                  time: "오후",
                  activities: ["공원 산책", "국립박물관 구경"]
                },
                {
                  place: "아키하바라",
                  time: "저녁-야경",
                  activities: ["전자상가 구경", "규카츠 먹기"]
                }
              ]
            },
            {
              day: "Day1",
              theme: "전통 & 문화 탐방",
              plans: [
                {
                  place: "아사쿠사",
                  time: "오전",
                  activities: ["센소지 절 참배", "나카미세 거리 구경"]
                },
                {
                  place: "Asakusa Menchi (고로케)",
                  time: "점심",
                  activities: [],
                  isMeal: true
                },
                {
                  place: "우에노",
                  time: "오후",
                  activities: ["공원 산책", "국립박물관 구경"]
                },
                {
                  place: "아키하바라",
                  time: "저녁-야경",
                  activities: ["전자상가 구경", "규카츠 먹기"]
                }
              ]
            },
            {
              day: "Day1",
              theme: "전통 & 문화 탐방",
              plans: [
                {
                  place: "아사쿠사",
                  time: "오전",
                  activities: ["센소지 절 참배", "나카미세 거리 구경"]
                },
                {
                  place: "Asakusa Menchi (고로케)",
                  time: "점심",
                  activities: [],
                  isMeal: true
                },
                {
                  place: "우에노",
                  time: "오후",
                  activities: ["공원 산책", "국립박물관 구경"]
                },
                {
                  place: "아키하바라",
                  time: "저녁-야경",
                  activities: ["전자상가 구경", "규카츠 먹기"]
                }
              ]
            },
            {
              day: "Day1",
              theme: "전통 & 문화 탐방",
              plans: [
                {
                  place: "아사쿠사",
                  time: "오전",
                  activities: ["센소지 절 참배", "나카미세 거리 구경"]
                },
                {
                  place: "Asakusa Menchi (고로케)",
                  time: "점심",
                  activities: [],
                  isMeal: true
                },
                {
                  place: "우에노",
                  time: "오후",
                  activities: ["공원 산책", "국립박물관 구경"]
                },
                {
                  place: "아키하바라",
                  time: "저녁-야경",
                  activities: ["전자상가 구경", "규카츠 먹기"]
                }
              ]
            },
            {
              day: "Day1",
              theme: "전통 & 문화 탐방",
              plans: [
                {
                  place: "아사쿠사",
                  time: "오전",
                  activities: ["센소지 절 참배", "나카미세 거리 구경"]
                },
                {
                  place: "Asakusa Menchi (고로케)",
                  time: "점심",
                  activities: [],
                  isMeal: true
                },
                {
                  place: "우에노",
                  time: "오후",
                  activities: ["공원 산책", "국립박물관 구경"]
                },
                {
                  place: "아키하바라",
                  time: "저녁-야경",
                  activities: ["전자상가 구경", "규카츠 먹기"]
                }
              ]
            }
        ];
        setPlanData(data);
      }, []);

    return (
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