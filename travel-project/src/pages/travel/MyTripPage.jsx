import React from "react";
import MyTravelList from "../../components/MyTravelList";

export const MyTripPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>나의 여행</h2>
      <MyTravelList />
    </div>
  );
};
