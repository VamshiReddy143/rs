import React from 'react';



const Technologies = () => {
  return (
    <section style={{ fontFamily: 'Poppins, sans-serif' }} className="bg-gray-200 text-black lg:py-[10em] py-[5em]">
      <div className="px-3 lg:px-[4em] lg:max-w-[90em] mx-auto lg:flex gap-20 justify-start">
        <div className="flex flex-col leading-snug">
          <div className="leading-tight flex flex-col ">
            <h2 className="md:text-[32px] leading-[38px] font-medium  flex gap-3  text-[1.5em]"><span>Key</span><span> Technologies</span></h2>
            <h1 className="md:text-[64px] font-medium leading-[77px] text-[2em] font-bold">Used</h1>
          </div>
          {/* <div className="h-[3px] w-[60px] bg-black rounded-full mt-2" /> */}
        </div>

       <div className='grid lg:grid-cols-4 grid-cols-1 lg:gap-[5em] gap-[1em]'>
       <div className="flex gap-5 lg:mt-0 mt-[2em]">
          <div className="w-[1px] bg-black h-auto" />
          <div className="flex flex-col gap-5">
                <h2 className="md:text-[16px] leading-[23px]  text-[1.2em] font-semibold">Web development</h2>
                <p className="md:text-[21px] font-normal leading-[31px] text-[0.8em]">ReactJS</p>
                <p className="md:text-[21px] font-normal leading-[31px] text-[0.8em]">Typescript</p>   
          </div>
        </div>


        <div className="flex gap-5 lg:mt-0 mt-[2em]">
          <div className="w-[1px] bg-black h-auto" />
          <div className="flex flex-col gap-5">
                <h2 className="md:text-[16px] leading-[23px] text-[1.2em] font-semibold">DevOps</h2>
                <p className="md:text-[21px] font-normal leading-[31px] text-[0.8em]">AWS</p>
              
          </div>
        </div>



        <div className="flex gap-5 lg:mt-0 mt-[2em]">
          <div className="w-[1px] bg-black h-auto" />
          <div className="flex flex-col gap-5">
                <h2 className="md:text-[16px] leading-[23px] text-[1.2em] font-semibold">Data Engineering</h2>
                <p className="md:text-[21px] font-normal leading-[31px] text-[0.8em]">Segment</p>
                <p className="md:text-[21px] font-normal leading-[31px] text-[0.8em]">SplitIO</p>
          </div>
        </div>



        <div className="flex gap-5 lg:mt-0 mt-[2em]">
          <div className="w-[1px] bg-black h-auto" />
          <div className="flex flex-col gap-5">
                <h2 className="md:text-[16px] leading-[23px] text-[1.2em] font-semibold">Backend Development</h2>
                <p className="md:text-[21px] font-normal leading-[31px] text-[0.8em]">NodeJs</p>
                <p className="md:text-[21px] font-normal leading-[31px] text-[0.8em]">GraphQL</p>
                <p className="md:text-[21px] font-normal leading-[31px] text-[0.8em]">Postgres</p>
                <p className="md:text-[21px] font-normal leading-[31px] text-[0.8em]">DynamoDB</p>
          </div>
        </div>
       </div>
      </div>
    </section>
  );
};

export default Technologies;
