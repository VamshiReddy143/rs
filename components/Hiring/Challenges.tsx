import React from 'react';

const Challenges: React.FC = () => {
  const jobs = [
    {
      title: 'Data Engineer',
      location: 'Argentina/Colombia/Uruguay · Full-Time',
    },
    {
      title: 'Data Tech Lead',
      location: 'LATAM · Full-Time',
    },
    {
      title: 'Data Engineer',
      location: 'Argentina/Colombia/Uruguay · Full-Time',
    },
    {
      title: 'Future Opportunities',
      location: 'Argentina/Colombia/Uruguay · Full-Time',
    },
    {
      title: 'Sr DevOps',
      location: 'Argentina/Colombia/Uruguay · Full-Time',
    },
    {
      title: 'Sr Node Developer',
      location: 'Argentina/Colombia/Uruguay · Full-Time',
    },
    {
      title: 'Sr Product Manager',
      location: 'Argentina/Colombia/Uruguay · Full-Time',
    },
    {
      title: 'Sr React Developer',
      location: 'Argentina/Colombia/Uruguay · Full-Time',
    },
    {
      title: 'Sr React Native Developer',
      location: 'Argentina/Colombia/Uruguay · Full-Time',
    },
    {
      title: 'Sr Ruby on Rails Developer',
      location: 'Argentina/Colombia/Uruguay · Full-Time',
    },
    {
      title: 'Ssr Data Scientist',
      location: 'Argentina/Colombia/Uruguay · Full-Time',
    },
    {
      title: 'Ssr. Node Developer',
      location: 'Argentina/Colombia/Uruguay · Full-Time',
    },
  ];

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className="lg:p-[10%] p-5 lg:min-h-screen flex flex-col lg:flex-row justify-between px-2 bg-gray-100 text-black">
      <div className="w-full lg:w-[40%] mb-6 lg:mb-0">
        <h2 className="text-[1.5rem] md:text-[32px] font-medium leading-[38px]">Are you up for these</h2>
        <h1 className="text-[2rem] md:text-[64px] font-semibold leading-[77px]">challenges?</h1>
        <div className="h-[3px] w-[60px] bg-black rounded-full mt-4" />
      </div>

      <div className="w-full lg:w-[60%]">
        {jobs.map((job, index) => (
          <div key={index}>
            <div className="lg:flex justify-between items-center p-3 pt-5">
              <div>
                <h2 className="text-[1.5rem] md:text-[32px] font-medium leading-[48px]">{job.title}</h2>
                <p className="text-[#6f6f6e] text-[1rem] md:text-[20px] leading-[30px]">{job.location}</p>
              </div>
              <div>
                <h3 className="apply-now bg-[#FFC83F] py-1 px-1 lg:bg-transparent  text-[1.2rem] md:text-[24px] font-semibold cursor-pointer leading-[36px]">
                  Apply now
                </h3>
              </div>
            </div>
            <div className="h-[1px] w-full bg-[#6f6f6e]  rounded-full mt-3 ml-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;