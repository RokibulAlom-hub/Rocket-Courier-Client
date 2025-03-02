import React from 'react';

const Heading = ({headtext}) => {
    return (
        <h2 className="font-bold text-2xl md:text-4xl text-center text-black mb-6 md:mb-12 underline     uppercase">{headtext}</h2>
    );
};

export default Heading;