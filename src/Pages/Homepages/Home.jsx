import React from "react";
import Banner from "./Banner/Banner";
import Features from "./Features/Features";
import StatisticsCards from "./StatisticsPage/StatisticsCards";
import TopdeliveryMan from "./TopDeliveryMan/TopdeliveryMan";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="space-y-20 w-11/12 mx-auto">
        <Features></Features>
        <StatisticsCards></StatisticsCards>
        <TopdeliveryMan></TopdeliveryMan>
      </div>
    </div>
  );
};

export default Home;
