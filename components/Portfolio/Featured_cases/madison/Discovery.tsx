import React from 'react';

const Discovery = () => {
  return (
    <div className="text-black">
      {/* Bottom 80% section */}
      <div className="bg-white">
        <div className="lg:max-w-[90em] mx-auto lg:px-[6em] px-3 lg:pt-[15em] pt-[6em]">
          <h1 className="lg:text-[3em] text-[2em] font-semibold leading-tight lg:w-[70%]">
            Rootstrap began with a comprehensive{' '}
            <span className="text-[#720058]">discovery phase</span>, challenging
            the status quo and prioritizing ideas to meet Madison Reed's
            objectives.
          </h1>
          <h1 className="lg:text-[3em] text-[2em] font-semibold leading-tight lg:w-[70%] pt-10">
            This process focused on three key features of the mobile app:
          </h1>
        </div>
        <div className="lg:max-w-[90em] mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-7 lg:px-[6em] px-3 relative">
          <div className="border-2 border-[#720058] p-10 flex flex-col gap-7 bg-white translate-y-[40%]">
            <h2 className="text-[3em] font-semibold text-[#720058] leading-tight">
              Subscription Management
            </h2>
            <div className="w-[80px] h-[2px] bg-[#720058]" />
            <p className="text-[1.4em]">
              <span className="font-semibold">Ecommerce solution</span> for order
              management and product discovery
            </p>
          </div>

          <div className="border-2 border-[#720058] p-10 flex flex-col gap-7 bg-white translate-y-[40%]">
            <h2 className="text-[3em] font-semibold text-[#720058] leading-tight">
              Color Bar Companion
            </h2>
            <div className="w-[80px] h-[2px] bg-[#720058]" />
            <p className="text-[1.4em]">
              An intuitive interface to{' '}
              <span className="font-semibold">manage appointments.</span>
            </p>
          </div>

          <div className="border-2 border-[#720058] p-10 flex flex-col gap-7 bg-white translate-y-[40%]">
            <h2 className="text-[3em] font-semibold text-[#720058] leading-tight">
              Loyalty Membership
            </h2>
            <div className="w-[80px] h-[2px] bg-[#720058]" />
            <p className="text-[1.4em]">
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