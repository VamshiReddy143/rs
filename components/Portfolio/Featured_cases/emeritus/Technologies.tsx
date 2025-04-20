import React from 'react';

const techList = [

  {
    title: "Web Development",
    description: "ReactJS, NextJS, Typescript",
  },

  {
    title: "Backend Development",
    description: "Ruby on Rails",
  },

];

const Technologies = () => {
  return (
    <section style={{ fontFamily: 'Poppins, sans-serif' }} className="bg-gray-200 text-black lg:py-[10em] py-[5em]">
      <div className="px-3 lg:px-[4em] lg:max-w-[90em] mx-auto lg:flex gap-20 justify-start">
        <div className="flex flex-col leading-snug">
          <div className="leading-tight flex flex-col">
            <h2 className="md:text-[32px] leading-[38px] font-medium text-[1.5em]">Key Technologies</h2>
            <h1 className="md:text-[64px] leading-[77px] text-[2em] font-semibold">Used</h1>
          </div>
          <div className="h-[3px] w-[50px] bg-black rounded-full mt-4" />
        </div>

        <div className="flex gap-5 lg:mt-0 mt-[2em]">
          <div className="w-[1px] bg-[#6F6F6E] h-auto" />
          <div className="flex flex-col gap-5">
            {techList.map((item, idx) => (
              <div key={idx}>
                <h2 className="md:text-[20px] font-medium leding-[30px] text-[1.2em]">{item.title}</h2>
                <p className="md:text-[16px] text-[0.8em] text-[#6F6F6E] leading-[24px]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
