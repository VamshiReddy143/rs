import React from 'react';

const Capabilities = () => {
  return (
    <div className=" lg:mt-4 min-h-[auto] lg:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-0">
      <div className="flex flex-col items-center justify-center gap-2 pt-[6em] text-center w-full">
        <h1  style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[48px] sm:text-[2.2em] lg:text-[36px]  font-semibold leading-tight">
          Our Capabilities
        </h1>
        <p className="text-[#bcbcc0] text-[21px] sm:text-[21px] font-normal lg:text-[16px] ">
        We're proud to offer exceptional talent across a variety of digital disciplines.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-y-5 items-center !important w-full mt-[5em]  gap-3 max-w-5xl">
        {/* Card 1: Artificial Intelligence */}
        <div
          className="card h-[450px] w-full max-w-[350px] bg-[#242425] group rounded-[1.5em] relative overflow-hidden transition-all duration-500"
        >
          <div
            className="absolute inset-0 bg-center bg-no-repeat mb-[14em] h-[16em] transition-transform  duration-500 group-hover:scale-110"
            style={{
              backgroundImage: "url('/lineimg1.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />

          <div className="absolute inset-0 transition-all  duration-500 group-hover:scale-110" />
          <div className="flex flex-col items-center justify-end bg-[#242425] absolute bottom-0 left-0 right-0 p-4 sm:p-10 z-10">
            <div className="text-white  flex flex-col gap-3 sm:text-left">
              <h2 className="text-[1.2em] sm:text-[1.5em] lg:text-[24px] font-semibold">
                Artificial Intelligence
              </h2>
              <p className="text-[0.875em] text-[#bcbcc0] sm:text-[0.9em] font-normal lg:text-[16px]">
                Gen AI, Custom LLMs, Machine Learning & Computer Vision
              </p>
            </div>
            <div className="relative overflow-hidden h-[auto] sm:h-[12em] lg:h-0 lg:group-hover:h-[9em] transition-all duration-300 w-full mt-6">
              <ul className="flex flex-col items-start gap-3 text-[0.875em] sm:text-[0.9em]">
                <div className="flex flex-wrap gap-2">
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">OpenAI</li>
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Claude</li>
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Llama</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">LongChain</li>
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">TensorFlow</li>
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Python</li>
                </div>
                <div className="flex flex-wrap gap-2">
                </div>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 2: Data */}
        <div
          className="card h-[450px] w-full max-w-[350px] group rounded-[1.5em]  bg-[#242425] relative overflow-hidden transition-all duration-500"
        >
          <div
            className="absolute inset-0 bg-center bg-no-repeat mb-[14em] h-[16em] transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundImage: "url('/lineimg2.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 transition-all duration-500 group-hover:scale-110" />
          <div className="flex flex-col items-center justify-end bg-[#242425] absolute bottom-0 left-0 right-0 p-4 sm:p-10 z-10">
            <div className="text-white font-nunito flex flex-col gap-3 sm:text-left">
              <h2 className="text-[1.2em] sm:text-[1.5em] lg:text-[24px] font-semibold">
                Data
              </h2>
              <p className="text-[0.875em] text-[#bcbcc0] sm:text-[0.9em] font-normal lg:text-[16px]">
                ETL & Storage, Visualization, Processing & Enrichment
              </p>
            </div>
            <div className="relative overflow-hidden h-[auto] sm:h-[12em] lg:h-0 lg:group-hover:h-[10em] transition-all duration-500 w-full mt-6">
              <ul className="flex flex-col items-start gap-3 text-[0.875em] sm:text-[0.9em]">
                <div className="flex flex-wrap gap-2">
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">AWS Redshift</li>
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Snowflake</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Databricks</li>
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Apache</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Google BigQuery</li>
                </div>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 3: Cloud */}
        <div
          className="card h-[450px] w-full max-w-[350px] group rounded-[1.5em] relative overflow-hidden transition-all duration-500"
        >
         <div
            className="absolute inset-0 bg-center bg-no-repeat mb-[16em] h-[16em] bg-[#242425]  transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundImage: "url('/lineimg3.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 transition-all duration-500 group-hover:scale-110" />
          <div className="flex flex-col items-center justify-end bg-[#242425]  absolute bottom-0 left-0 right-0 p-4 sm:p-10 z-10">
            <div className="text-white font-nunito flex flex-col gap-3 sm:text-left">
              <h2 className="text-[1.2em] sm:text-[1.5em] lg:text-[24px] font-semibold">
                Cloud
              </h2>
              <p className="text-[0.875em] text-[#bcbcc0] sm:text-[0.9em] font-normal lg:text-[16px]">
                Infrastructure, DevOps, APIs Automation & Scalability
              </p>
            </div>
            <div className="relative overflow-hidden h-[auto] sm:h-[12em] lg:h-0 lg:group-hover:h-[12em] transition-all duration-500 w-full mt-6">
              <ul className="flex flex-col items-start gap-3 text-[0.875em] sm:text-[0.9em]">
                <div className="flex flex-wrap gap-2">
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">AWS</li>
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Heroku</li>
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">GCP</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Azure</li>
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Vercel</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Contentful</li>
                </div>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 4: Web Development */}
        <div
          className="card h-[450px] w-full max-w-[350px] group rounded-[1.5em] relative overflow-hidden transition-all duration-500"
        >
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-[#242425] mb-[16em] h-[16em] transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundImage: "url('/lineimg4.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 transition-all duration-500 group-hover:scale-110" />
          <div className="flex flex-col items-center justify-end bg-[#242425]  absolute bottom-0 left-0 right-0 p-4 sm:p-10 z-10">
            <div className="text-white font-nunito flex flex-col gap-3 sm:text-left">
              <h2 className="text-[1.2em] sm:text-[1.5em] lg:text-[24px] font-semibold">
                Web Development
              </h2>
              <p className="text-[0.875em] text-[#bcbcc0] sm:text-[0.9em] font-normal lg:text-[16px]">
                Content, Media & Video, Ecommerce, SaaS, & Websites
              </p>
            </div>
            <div className="relative overflow-hidden h-[auto] sm:h-[12em] lg:h-0 lg:group-hover:h-[12em] transition-all duration-500 w-full mt-6">
              <ul className="flex flex-col items-start gap-3 text-[0.875em] sm:text-[0.9em]">
                <div className="flex flex-wrap gap-2">
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">React & NextJS</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Ruby on Rails</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">NodeJS</li>
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Shopify</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Webflow</li>
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Wordpress</li>
                </div>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 5: Mobile Development */}
        <div
          className="card h-[450px] w-full max-w-[350px] group rounded-[1.5em] relative overflow-hidden transition-all duration-500"
        >
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-[#242425] mb-[16em] h-[16em] transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundImage: "url('/lineimg5.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 transition-all duration-500 group-hover:scale-110" />
          <div className="flex flex-col items-center justify-end bg-[#242425]  absolute bottom-0 left-0 right-0 p-4 sm:p-10 z-10">
            <div className="text-white font-nunito flex flex-col gap-3 sm:text-left">
              <h2 className="text-[1.2em] sm:text-[1.5em] lg:text-[24px] font-semibold">
                Mobile Development
              </h2>
              <p className="text-[0.875em] text-[#bcbcc0] sm:text-[0.9em] font-normal lg:text-[16px]">
                Native iOS, Android & Hybrid Mobile Apps, Wearables & IoT
              </p>
            </div>
            <div className="relative overflow-hidden h-[auto] sm:h-[8em] lg:h-0 lg:group-hover:h-[8em] transition-all duration-500 w-full mt-6">
              <ul className="flex flex-col items-start gap-3 text-[0.875em] sm:text-[0.9em]">
                <div className="flex flex-wrap gap-2">
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">IOS</li>
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Kotlin</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">React Native</li>
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Flutter</li>
                </div>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 6: UX/UI Design */}
        <div
          className="card h-[450px] w-full max-w-[350px] group rounded-[1.5em] relative overflow-hidden transition-all duration-500"
        >
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-[#242425] mb-[16em] h-[16em]  object-cover  transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundImage: "url('/lineimg6.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 transition-all duration-500 group-hover:scale-110" />
          <div className="flex flex-col items-center justify-end bg-[#242425]  absolute bottom-0 left-0 right-0 p-4 sm:p-10 z-10">
            <div className="text-white font-nunito flex flex-col gap-3 sm:text-left">
              <h2 className="text-[1.2em] sm:text-[1.5em] lg:text-[24px] font-semibold">
                UX/UI Design
              </h2>
              <p className="text-[0.875em] text-[#bcbcc0] sm:text-[0.9em] font-normal lg:text-[16px]">
                User Research, Wireframes, Prototypes & User Validation
              </p>
            </div>
            <div className="relative overflow-hidden h-[auto] sm:h-[12em] lg:h-0 lg:group-hover:h-[10em] transition-all duration-500 w-full mt-6">
              <ul className="flex flex-col items-start gap-3 text-[0.875em] sm:text-[0.9em]">
                <div className="flex flex-wrap gap-2">
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Figma</li>
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Adobe InDesign</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Material Design</li>
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Tailwind</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-[#3d3d3f] px-3 py-2 font-semibold rounded-lg">Sketch</li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Capabilities;