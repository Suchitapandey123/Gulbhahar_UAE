import React from 'react';

const CultureImageText = () => {
  return (
    <h1 
      className="
        font-['Anton'] 
        font-[900] 
        tracking-[0.1em] 
        m-0 
        bg-[url('https://gulbahar-backend.s3.ap-south-1.amazonaws.com/gulbhahar-6.png')] 
        bg-cover 
        bg-center 
        bg-no-repeat 
        bg-clip-text 
        text-transparent 
        [-webkit-text-fill-color:transparent] 
        [-webkit-background-clip:text] 
        uppercase 
        leading-none 
        lg:text-9xl
        md:text-8xl
        sm:text-7xl
        text-6xl
        inline-block
      "
    >
      CULTURE
    </h1>
  );
};

export default CultureImageText;