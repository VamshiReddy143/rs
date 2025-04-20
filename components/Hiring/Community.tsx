import React from 'react';

const Community = () => {
  return (
    <>
      <style>
        {`
          .btn-slide {
            position: relative;
            overflow: hidden;
            transition: color 0.3s ease;
            z-index: 1;
          }
          .btn-slide::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 100%;
            background-color: #ffc83f;
            transition: width 0.3s ease;
            z-index: -1;
          }
          .btn-slide:hover::before {
            width: 100%;
          }
          .btn-slide:hover {
            color: #000;
          }
        `}
      </style>
      <div
        style={{ fontFamily: 'Poppins, sans-serif' }}
        className="bg-[#1b1b1b] text-white min-h-screen mt-10 pb-10 lg:pl-[11%] px-5 bg-no-repeat
        bg-none
        md:bg-[position:center_top]
        lg:bg-[position:center_bottom]
        md:bg-[length:1700px_auto]
        md:bg-[url('https://cdn.prod.website-files.com/63f902d79a33f71d496cde07/65ef0c28b34fbaf07ae56ceb_careers-banner-bg-ezgif.com-png-to-webp-converter.webp')]"
      >
        <div className="flex flex-col justify-center h-screen lg:w-[45%]">
          <div className="leading-tight">
            <h1 className="lg:text-[80px] text-[#ffc83f] text-[3em] leading-[96px]">
              Talent <span className="text-[#ffc83f]">✩</span>
            </h1>
            <h1 className="lg:text-[80px] text-[3em] leading-[96px]">
              Community!
            </h1>
          </div>
          <p className="lg:text-[32px] text-[1.5em] mt-5 font-medium leading-[48px]">
            Subscribe to our community and be the first to hear about our news and
            special updates from our team.
          </p>
          <div>
            <button
              className="text-[1.5em] border border-[#ffc83f] text-[#ffc83f] px-7 py-2 mt-[3.5em] btn-slide cursor-pointer"
            >
              Join the community &#10230;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Community;