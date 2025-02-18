import React, { useState } from 'react';
import faqs from "../../../../public/Faqs.json"
import Heading from '../../Sharedcomponensts/Heading';

const FAQ = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const toggleFAQ = (index) => {
    if (selectedQuestion === index) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(index);
    }
  };

  return (
    <div className=" p-6 bg-white rounded-lg shadow-md">
      <Heading headtext="frequently asked questions"></Heading>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-2">
          <button
            className="w-full text-left font-semibold p-3 bg-gray-100 rounded-md focus:outline-none"
            onClick={() => toggleFAQ(index)}
          >
            {faq.question}
          </button>
          {selectedQuestion === index && (
            <div className="p-3 bg-gray-50 border-l-4 border-blue-500">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
