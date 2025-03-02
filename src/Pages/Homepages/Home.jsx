import React from "react";
import Banner from "./Banner/Banner";
import Features from "./Features/Features";
import StatisticsCards from "./StatisticsPage/StatisticsCards";
import TopdeliveryMan from "./TopDeliveryMan/TopdeliveryMan";
import FAQ from "./Faq/Faq";
import Feedback from "./Feedback/Feedback";
import Logo from "./Logo/Logo";
import CourierChargePlans from "./CourierChargePlans/CourierChargePlans";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <div className="space-y-20 w-11/12 mx-auto">
        <Features></Features>
        <StatisticsCards></StatisticsCards>
        <CourierChargePlans></CourierChargePlans>
        <Logo></Logo>
        <TopdeliveryMan></TopdeliveryMan>
        <FAQ></FAQ>
      </div>
      <Feedback></Feedback>
    </>
  );
};

export default Home;
