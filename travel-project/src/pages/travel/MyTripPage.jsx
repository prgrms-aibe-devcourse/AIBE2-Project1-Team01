import React from "react";
import MyTravelList from "../../components/MyTravelList";
import "./MyTripPage.css"; // 외부 스타일시트 import

export const MyTripPage = () => {
  return (
    <div className="mytrip-container">
      <h2 className="mytrip-title">나의 여행</h2>
      <MyTravelList />
    </div>
  );
};