import React from 'react';

const techList = [
  {
    title: "Mobile & TV Technologies",
    description: "Native Android, Native iOS, Apple TV, Roku",
  },
  {
    title: "Web Development",
    description: "ReactJS, NextJS, Typescript",
  },
  {
    title: "DevOps Technologies",
    description: "Heroku, AWS, Nginx",
  },
  {
    title: "Backend Development",
    description: "Ruby on Rails",
  },
  {
    title: "Data Engineering",
    description: "Segment, Optimizel",
  },
];

const Technologies = () => {
  return (
    <section style={{ fontFamily: 'Poppins, sans-serif' }}   className="min-h-screen    bg-gray-200 text-black lg:pt-[16em] pt-[10em]">
      <div className="px-3 lg:px-[4em] lg:max-w-[90em] mx-auto lg:flex gap-20 justify-start">
        <div className="flex flex-col leading-snug">
          <div className="leading-tight flex flex-col gap-4">
            <h2 className="md:text-[32px] text-[1.5em] font-medium leading-[38px]">Key Technologies</h2>
            <h1 className="md:text-[64px] text-[2em] font-bold">Used</h1>
          </div>
          <div className="h-[3px] w-[50px] bg-black rounded-full mt-3" />
        </div>

        <div className="flex gap-5 lg:mt-0 mt-[2em]">
          <div className="w-[0.8px] bg-[#6F6F6E] h-auto" />
          <div className="flex flex-col gap-5">
            {techList.map((item, idx) => (
              <div key={idx}>
                <h2 className="md:text-[20px] text-[1.2em] leading-[30px] font-medium">{item.title}</h2>
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
