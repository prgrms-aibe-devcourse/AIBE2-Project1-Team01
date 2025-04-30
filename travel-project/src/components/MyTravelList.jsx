import React from "react";
import { TripCard } from "./TripCard";
import dummyTripData from "../data/dummyTripData";

const MyTravelList = () => {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(227px, 1fr))",
      gap: "20px",
      justifyItems: "center",
      padding: "20px"
    }}>
      {dummyTripData.map((trip) => (
        <TripCard
          key={trip.id}
          id={trip.id}
          regionName={trip.regionName}
          travelDate={trip.travelDate}
          imagePath={trip.imagePath}
          tags={trip.tags}
        />
      ))}
    </div>
  );
};

export default MyTravelList;
