import React from 'react';
import Banner from './Banner/Banner';
import Features from './Features/Features';
import StatisticsCards from './StatisticsPage/StatisticsCards';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Features></Features>
           <StatisticsCards></StatisticsCards>
        </div>
    );
};

export default Home;