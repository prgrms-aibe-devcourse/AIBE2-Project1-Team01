import React, { useEffect, useState } from "react";
import axios from "axios";
import { TripCard } from "./TripCard";

const MyTravelList = () => {
  const [mytrips, setMyTrips] = useState([]);

  useEffect(() => {
    const fetchMyTrips = async () => {
      try {
        const response = await axios.get("http://localhost:4000/mytrip");
        setMyTrips(response.data);
        console.log("불러온 데이터:", response.data);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
        alert("데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchMyTrips();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(227px, 1fr))",
        gap: "20px",
        justifyItems: "center",
        padding: "20px",
      }}
    >
      {mytrips.map((trip) => (
        <TripCard
          key={trip.id}
          id={trip.locationId}
          locationName={trip.locationName}
          travelPeriod={trip.period}
          image={trip.locationImage}
          tags={trip.tags}
          plans={trip.plan}
        />
      ))}
    </div>
  );
};

export default MyTravelList;
