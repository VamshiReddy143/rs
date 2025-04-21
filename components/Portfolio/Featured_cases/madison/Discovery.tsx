import React from 'react';

const Discovery = () => {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className="text-black">
      {/* Bottom 80% section */}
      <div className="bg-gray-200">
        <div className="lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:pt-[15em] pt-[6em]">
          <h1 className="lg:text-[48px] text-[2em] font-medium lg:leading-[58px] leading-[38px] lg:w-[85%]">
            Rootstrap began with a comprehensive{' '}
            <span className="text-[#720058]">discovery phase</span>, challenging
            the status quo and prioritizing ideas to meet Madison Reed's
            objectives.
          </h1>
          <h1 className="lg:text-[48px] text-[2em] font-medium lg:leading-[58px] leading-[38px] lg:w-[85%] pt-10">
            This process focused on three key features of the mobile app:
          </h1>
        </div>
        <div className="lg:max-w-[90em] mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-7 lg:px-[6em] px-3 relative">
          <div className="border-2 border-[#720058] p-10  flex flex-col gap-7 bg-gray-200 translate-y-[40%]">
            <h2 className="text-[32px] leading-[38px] lg:text-[40px] lg:leading-[48px] font-medium  text-[#720058] ">
              Subscription Management
            </h2>
            <div className="w-[60px] h-[2px] bg-[#720058]" />
            <p className="lg:text-[20px] text-[16px] leading-[25px] font-normal lg:leading-[30px]">
              <span className="font-semibold">Ecommerce solution</span> for order
              management and product discovery
            </p>
          </div>

          <div className="border-2 border-[#720058] p-10 flex flex-col gap-7 bg-gray-200 translate-y-[40%]">
          <h2 className="text-[32px] leading-[38px] lg:text-[40px] lg:leading-[48px] font-medium  text-[#720058] ">
              Color Bar Companion
            </h2>
            <div className="w-[60px] h-[2px] bg-[#720058]" />
            <p className="lg:text-[20px] text-[16px] leading-[25px] font-normal lg:leading-[30px]">
              An intuitive interface to{' '}
              <span className="font-semibold">manage appointments.</span>
            </p>
          </div>

          <div className="border-2 border-[#720058] p-10 flex flex-col gap-7 bg-gray-200 translate-y-[40%]">
          <h2 className="text-[32px] leading-[38px] lg:text-[40px] lg:leading-[48px] font-medium  text-[#720058] ">
              Loyalty Membership
            </h2>
            <div className="w-[60px] h-[2px] bg-[#720058]" />
            <p className="lg:text-[20px] text-[16px] leading-[25px] font-normal lg:leading-[30px]">
              Designed to foster{' '}
              <span className="font-semibold">brand relationship</span> and
              emotional connection.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#720058] lg:h-[40vh] h-[25vh]" />
    </div>
  );
};

export default Discovery;