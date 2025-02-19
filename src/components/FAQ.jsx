
'use client';

import { useState } from 'react';
import TiltArrow from './ui/TiltArrow';
import { Button } from './ui/button';

const faqs = [
  {
    question: "How do I find the right jutti size for me?",
    answer: "Traditional juttis typically run true to size, but we recommend measuring your foot length and referring to our detailed size chart. For the perfect fit, measure your feet in the evening when they are slightly expanded. Our size guide includes both Indian and international measurements to help you make the right choice."
  },
  {
    question: "How long does it take to make one pair of juttis?",
    answer: "Traditional juttis typically run true to size, but we recommend measuring your foot length and referring to our detailed size chart. For the perfect fit, measure your feet in the evening when they are slightly expanded. Our size guide includes both Indian and international measurements to help you make the right choice."
  },
  {
    question: "Are your juttis comfortable for everyday wear?",
    answer: "Traditional juttis typically run true to size, but we recommend measuring your foot length and referring to our detailed size chart. For the perfect fit, measure your feet in the evening when they are slightly expanded. Our size guide includes both Indian and international measurements to help you make the right choice."
  },
  {
    question: "How should I care for my juttis?",
    answer: "Traditional juttis typically run true to size, but we recommend measuring your foot length and referring to our detailed size chart. For the perfect fit, measure your feet in the evening when they are slightly expanded. Our size guide includes both Indian and international measurements to help you make the right choice."
  },
  {
    question: "Do you offer customization options?",
    answer: "Traditional juttis typically run true to size, but we recommend measuring your foot length and referring to our detailed size chart. For the perfect fit, measure your feet in the evening when they are slightly expanded. Our size guide includes both Indian and international measurements to help you make the right choice."
  },
  {
    question: "How should I care for my juttis?",
    answer: "Traditional juttis typically run true to size, but we recommend measuring your foot length and referring to our detailed size chart. For the perfect fit, measure your feet in the evening when they are slightly expanded. Our size guide includes both Indian and international measurements to help you make the right choice."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full py-6 text-left flex justify-between items-center focus:outline-none"
        onClick={onClick}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <TiltArrow
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 mb-6' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

export default function Home() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white font-raleway">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-xl  text-customRed mb-2 lg:mt-16">FAQs</h1>
          <h1 className='text-center text-black font-extralight lg:text-5xl'>Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">
            These are the most commonly asked questions about gulbhahar
          </p>
        </div>

        <div className="flex lg:w-full lg:flex-nowrap flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-5 text-center">
  <button className="w-[120px] h-[40px] text-center bg-black text-white">General</button>
  <button className="w-[120px] h-[40px] text-center text-black bg-white outline outline-gray-400 hover:text-white hover:bg-black">Shipping</button>
  <button className="w-[120px] h-[40px] text-center text-black bg-white outline outline-gray-400 hover:text-white hover:bg-black">Return</button>
  <button className="w-[160px] h-[40px] text-center text-black bg-white outline outline-gray-400 hover:text-white hover:bg-black">Customization</button>
  <button className="w-[120px] h-[40px] text-center text-black bg-white outline outline-gray-400 hover:text-white hover:bg-black">About</button>
</div>


        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => handleClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}