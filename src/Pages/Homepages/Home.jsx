import React from 'react';
import Banner from './Banner/Banner';
import Features from './Features/Features';
import StatisticsCards from './StatisticsPage/StatisticsCards';
import DeliveryManCard from './TopDeliveryMan/DeliveryManCard';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Features></Features>
           <StatisticsCards></StatisticsCards>
           <DeliveryManCard></DeliveryManCard>
        </div>
    );
};

export default Home;