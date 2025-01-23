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
           <div><h2 className='font-bold text-3xl text-white text-center'>Statistics of Our App</h2></div>
           <StatisticsCards></StatisticsCards>
           <div><h2 className='font-bold text-3xl text-white text-center'>Top 3 Delivery-Man</h2></div>
           <DeliveryManCard></DeliveryManCard>
        </div>
    );
};

export default Home;