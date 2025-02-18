import React from 'react';

const Heading = ({headtext}) => {
    return (
        <h2 className="font-bold text-4xl text-center text-black my-6 uppercase">{headtext}</h2>
    );
};

export default Heading;