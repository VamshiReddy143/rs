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
    <div className="lg:p-[10%] p-5 lg:min-h-screen flex flex-col lg:flex-row justify-between px-2 bg-gray-200 text-black">
      <div className="w-full lg:w-[40%] mb-6 lg:mb-0">
        <h2 className="text-[1.5rem] md:text-[2.5rem] font-semibold">Are you up for these</h2>
        <h1 className="text-[2rem] md:text-[4rem] font-bold">challenges?</h1>
        <div className="h-[3px] w-[20%] bg-black rounded-full mt-3" />
      </div>

      <div className="w-full lg:w-[60%]">
        {jobs.map((job, index) => (
          <div key={index}>
            <div className="lg:flex justify-between items-center p-3 pt-5">
              <div>
                <h2 className="text-[1.5rem] md:text-[2rem] font-semibold">{job.title}</h2>
                <p className="text-gray-400 text-[1rem] md:text-[1.2rem]">{job.location}</p>
              </div>
              <div>
                <h3 className="apply-now bg-[#FFC83F] py-1 px-1 lg:bg-transparent  text-[1.2rem] md:text-[1.6rem] font-semibold cursor-pointer">
                  Apply now
                </h3>
              </div>
            </div>
            <div className="h-[3px] w-full bg-gray-400 rounded-full mt-3" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;