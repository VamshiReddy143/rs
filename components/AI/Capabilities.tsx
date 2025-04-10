import React from 'react';

const Capabilities = () => {
  return (
    <div className="mt-10 lg:mt-20 min-h-[auto] lg:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-0">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-[1.8em] sm:text-[2.2em] lg:text-[2.4em] font-bold">
          Our Capabilities
        </h1>
        <p className="text-gray-400 text-[0.9em] sm:text-[1em] lg:text-[1.5em] max-w-2xl">
          We&apos;re proud to offer exceptional talent across a variety of digital disciplines.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 lg:mt-20 w-full max-w-7xl">
        {/* Card 1: Artificial Intelligence */}
        <div
          className="card h-[450px] w-full max-w-[380px] mx-auto group rounded-[1.5em] relative overflow-hidden transition-all duration-500"
          style={{
            backgroundImage: "url('/lineimg1.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 transition-all duration-500 group-hover:scale-110" />
          <div className="flex flex-col items-center justify-end bg-gray-800 absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10">
            <div className="text-white font-nunito flex flex-col gap-3 text-center sm:text-left">
              <h2 className="text-[1.2em] sm:text-[1.5em] lg:text-[1.9em] font-bold">
                Artificial Intelligence
              </h2>
              <p className="text-[0.875em] sm:text-[0.9em] lg:text-[1em]">
                Gen AI, Custom LLMs, Machine Learning & Computer Vision
              </p>
            </div>
            <div className="relative overflow-hidden h-[auto] sm:h-[12em] lg:h-0 lg:group-hover:h-[12em] transition-all duration-500 w-full mt-6">
              <ul className="flex flex-col items-start gap-3 text-[0.875em] sm:text-[0.9em]">
                <div className="flex flex-wrap gap-2">
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">OpenAI</li>
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Claude</li>
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Llama</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">LongChain</li>
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">TensorFlow</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Python</li>
                </div>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 2: Data */}
        <div
          className="card h-[450px] w-full max-w-[380px] mx-auto group rounded-[1.5em] relative overflow-hidden transition-all duration-500"
          style={{
            backgroundImage: "url('/lineimg2.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 transition-all duration-500 group-hover:scale-110" />
          <div className="flex flex-col items-center justify-end bg-gray-800 absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10">
            <div className="text-white font-nunito flex flex-col gap-3 text-center sm:text-left">
              <h2 className="text-[1.2em] sm:text-[1.5em] lg:text-[1.9em] font-bold">
                Data
              </h2>
              <p className="text-[0.875em] sm:text-[0.9em] lg:text-[1em]">
                ETL & Storage, Visualization, Processing & Enrichment
              </p>
            </div>
            <div className="relative overflow-hidden h-[auto] sm:h-[12em] lg:h-0 lg:group-hover:h-[12em] transition-all duration-500 w-full mt-6">
              <ul className="flex flex-col items-start gap-3 text-[0.875em] sm:text-[0.9em]">
                <div className="flex flex-wrap gap-2">
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">AWS Redshift</li>
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Snowflake</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Databricks</li>
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Apache</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Google BigQuery</li>
                </div>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 3: Cloud */}
        <div
          className="card h-[450px] w-full max-w-[380px] mx-auto group rounded-[1.5em] relative overflow-hidden transition-all duration-500"
          style={{
            backgroundImage: "url('/lineimg3.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 transition-all duration-500 group-hover:scale-110" />
          <div className="flex flex-col items-center justify-end bg-gray-800 absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10">
            <div className="text-white font-nunito flex flex-col gap-3 text-center sm:text-left">
              <h2 className="text-[1.2em] sm:text-[1.5em] lg:text-[1.9em] font-bold">
                Cloud
              </h2>
              <p className="text-[0.875em] sm:text-[0.9em] lg:text-[1em]">
                Infrastructure, DevOps, APIs Automation & Scalability
              </p>
            </div>
            <div className="relative overflow-hidden h-[auto] sm:h-[12em] lg:h-0 lg:group-hover:h-[12em] transition-all duration-500 w-full mt-6">
              <ul className="flex flex-col items-start gap-3 text-[0.875em] sm:text-[0.9em]">
                <div className="flex flex-wrap gap-2">
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">AWS</li>
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Heroku</li>
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">GCP</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Azure</li>
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Vercel</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Contentful</li>
                </div>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 4: Web Development */}
        <div
          className="card h-[450px] w-full max-w-[380px] mx-auto group rounded-[1.5em] relative overflow-hidden transition-all duration-500"
          style={{
            backgroundImage: "url('/lineimg4.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 transition-all duration-500 group-hover:scale-110" />
          <div className="flex flex-col items-center justify-end bg-gray-800 absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10">
            <div className="text-white font-nunito flex flex-col gap-3 text-center sm:text-left">
              <h2 className="text-[1.2em] sm:text-[1.5em] lg:text-[1.9em] font-bold">
                Web Development
              </h2>
              <p className="text-[0.875em] sm:text-[0.9em] lg:text-[1em]">
                Content, Media & Video, Ecommerce, SaaS, & Websites
              </p>
            </div>
            <div className="relative overflow-hidden h-[auto] sm:h-[12em] lg:h-0 lg:group-hover:h-[12em] transition-all duration-500 w-full mt-6">
              <ul className="flex flex-col items-start gap-3 text-[0.875em] sm:text-[0.9em]">
                <div className="flex flex-wrap gap-2">
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">React & NextJS</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Ruby on Rails</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">NodeJS</li>
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Shopify</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Webflow</li>
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Wordpress</li>
                </div>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 5: Mobile Development */}
        <div
          className="card h-[450px] w-full max-w-[380px] mx-auto group rounded-[1.5em] relative overflow-hidden transition-all duration-500"
          style={{
            backgroundImage: "url('/lineimg5.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 transition-all duration-500 group-hover:scale-110" />
          <div className="flex flex-col items-center justify-end bg-gray-800 absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10">
            <div className="text-white font-nunito flex flex-col gap-3 text-center sm:text-left">
              <h2 className="text-[1.2em] sm:text-[1.5em] lg:text-[1.9em] font-bold">
                Mobile Development
              </h2>
              <p className="text-[0.875em] sm:text-[0.9em] lg:text-[1em]">
                Native iOS, Android & Hybrid Mobile Apps, Wearables & IoT
              </p>
            </div>
            <div className="relative overflow-hidden h-[auto] sm:h-[8em] lg:h-0 lg:group-hover:h-[8em] transition-all duration-500 w-full mt-6">
              <ul className="flex flex-col items-start gap-3 text-[0.875em] sm:text-[0.9em]">
                <div className="flex flex-wrap gap-2">
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">IOS</li>
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Kotlin</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">React Native</li>
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Flutter</li>
                </div>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 6: UX/UI Design */}
        <div
          className="card h-[450px] w-full max-w-[380px] mx-auto group rounded-[1.5em] relative overflow-hidden transition-all duration-500"
          style={{
            backgroundImage: "url('/lineimg6.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 transition-all duration-500 group-hover:scale-110" />
          <div className="flex flex-col items-center justify-end bg-gray-800 absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10">
            <div className="text-white font-nunito flex flex-col gap-3 text-center sm:text-left">
              <h2 className="text-[1.2em] sm:text-[1.5em] lg:text-[1.9em] font-bold">
                UX/UI Design
              </h2>
              <p className="text-[0.875em] sm:text-[0.9em] lg:text-[1em]">
                User Research, Wireframes, Prototypes & User Validation
              </p>
            </div>
            <div className="relative overflow-hidden h-[auto] sm:h-[12em] lg:h-0 lg:group-hover:h-[12em] transition-all duration-500 w-full mt-6">
              <ul className="flex flex-col items-start gap-3 text-[0.875em] sm:text-[0.9em]">
                <div className="flex flex-wrap gap-2">
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Figma</li>
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Adobe InDesign</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Material Design</li>
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Tailwind</li>
                </div>
                <div className="flex flex-wrap gap-2">
                  <li className="bg-gray-700 px-3 py-2 rounded-xl">Sketch</li>
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