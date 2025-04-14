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
    <section className="bg-gray-200 text-black lg:py-[10em] py-[5em]">
      <div className="px-3 lg:px-[4em] lg:max-w-[90em] mx-auto lg:flex gap-20 justify-start">
        <div className="flex flex-col leading-snug">
          <div className="leading-tight flex flex-col">
            <h2 className="md:text-[2em] text-[1.5em]">Key Technologies</h2>
            <h1 className="md:text-[3em] text-[2em] font-bold">Used</h1>
          </div>
          <div className="h-[3px] w-[60px] bg-black rounded-full mt-2" />
        </div>

        <div className="flex gap-5 lg:mt-0 mt-[2em]">
          <div className="w-[1px] bg-black h-auto" />
          <div className="flex flex-col gap-5">
            {techList.map((item, idx) => (
              <div key={idx}>
                <h2 className="md:text-[1.5em] text-[1.2em]">{item.title}</h2>
                <p className="md:text-[1em] text-[0.8em]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
