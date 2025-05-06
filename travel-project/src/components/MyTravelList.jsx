import React, { useEffect, useState } from "react";
import axios from "axios";
import { TripCard } from "./TripCard";
import "./MyTravelList.css";

const MyTravelList = () => {
  const [mytrips, setMyTrips] = useState([]);

  useEffect(() => {
    const fetchMyTrips = async () => {
      try {
        const response = await axios.get("http://localhost:4000/mytrip");
        setMyTrips(response.data);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
        alert("데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchMyTrips();
  }, []);

  if (mytrips.length === 0) {
    return <div className="no-trip-message">저장된 여행이 없어요</div>;
  }

  return (
    <div className="main-cardlist">
      {mytrips.map((trip) => (
        <div
          key={trip.id}
          style={{ width: "227px", height: "370px", position: "relative" }}
        >
          <TripCard
            id={trip.locationId}
            locationName={trip.locationName}
            locationDescription={trip.locationDescription}
            travelPeriod={trip.period}
            image={trip.locationImage}
            tags={trip.tags}
            plans={trip.plan}
          />
        </div>
      ))}
    </div>
  );
};

export default MyTravelList;