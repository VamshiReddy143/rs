
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import DOMPurify from "dompurify";
import { IoLocationOutline } from "react-icons/io5";

interface Job {
  _id: string;
  title: string;
  location: string;
  description: string;
  employmentType: string;
  postedDate: string;
}

const JobApplication: React.FC = () => {
  const [job, setJob] = useState<Job | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [linkedIn, setLinkedIn] = useState("");
  const [website, setWebsite] = useState("");
  const [country, setCountry] = useState("");
  const [knewRootstrap, setKnewRootstrap] = useState("");
  const [heardFrom, setHeardFrom] = useState("");
  const [heardFromDetails, setHeardFromDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const router = useRouter();
  const { jobId } = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${jobId}`);
        if (!response.ok) throw new Error("Failed to fetch job");
        const data = await response.json();
        setJob(data);
      } catch (error: any) {
        alert(`Error fetching job: ${error.message}`);
      }
    };
    fetchJob();
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");
  }, [jobId]);

  const handleResumeUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");
    try {
      const response = await fetch(`/api/upload`, { method: "POST", body: formData });
      if (!response.ok) throw new Error("Failed to upload resume");
      const data = await response.json();
      return data.secure_url;
    } catch (error: any) {
      throw new Error(`Resume upload failed: ${error.message}`);
    }
  };

  const handleDropboxUpload = () => {
    console.log("Dropbox upload placeholder - implement OAuth integration here");
    alert("Dropbox integration not implemented. Please use the 'Attach' option.");
  };

  const handleGoogleDriveUpload = () => {
    console.log("Google Drive upload placeholder - implement OAuth integration here");
    alert("Google Drive integration not implemented. Please use the 'Attach' option.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormStatus(null);

    if (!firstName || !lastName || !email || !phone || !resumeFile || !country || !knewRootstrap || (knewRootstrap === "Yes" && !heardFrom) || (["Job Fair", "Meetup", "Social Network"].includes(heardFrom) && !heardFromDetails)) {
      setFormStatus({ type: "error", message: "Please fill all required fields." });
      setLoading(false);
      return;
    }

    try {
      const resume = await handleResumeUpload(resumeFile);

      const applicationData = {
        jobId,
        firstName,
        lastName,
        email,
        phone,
        resume,
        linkedIn: linkedIn || undefined,
        website: website || undefined,
        country,
        knewRootstrap,
        heardFrom: knewRootstrap === "Yes" ? heardFrom : undefined,
        heardFromDetails: ["Job Fair", "Meetup", "Social Network"].includes(heardFrom) ? heardFromDetails : undefined,
      };

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });
      if (!response.ok) throw new Error("Failed to submit application");

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          job_title: job?.title,
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          resume,
          linkedin: linkedIn || "N/A",
          website: website || "N/A",
          country,
          knew_rootstrap: knewRootstrap,
          heard_from: heardFrom || "N/A",
          heard_from_details: heardFromDetails || "N/A",
        }
      );

      setFormStatus({ type: "success", message: "Application submitted successfully!" });
      setTimeout(() => router.push("/success"), 5000);
    } catch (error: any) {
      setFormStatus({ type: "error", message: `Failed to submit application: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "p-2 w-full border focus:border-b-3 focus:outline-none focus:border-b-[#FFC83F] border-gray-400 rounded   transition-all duration-300 placeholder-gray-500";

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }} className="min-h-screen bg-white p-5 lg:pt-[7em] text-black">
      <div className="max-w-4xl mx-auto">
        {job ? (
          <>
            <div className="mb-6">
              <Link href="/jobs" className="text-[16px] font-normal pb-[3em] leading-[24px] text-black mb-2 underline inline-block">{"<"}Back to Jobs</Link>
              <div className="flex justify-between items-center">
                <div>
                 
                  <h1 className="lg:text-[32px] lg:leading-[40px] font-normal mb-2">{job.title}</h1>
             <div className="flex items-start gap-2">
             <div>
                  <IoLocationOutline size={25}/>
                  </div>
                  <p className="lg:text-[16px] lg:leading-[24px] font-normal mb-2">{job.location} · {job.employmentType}</p>
             </div>
                </div>
                <button
                  type="button"
                  onClick={() => document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-4 py-2 bg-[#FFC83F] text-black rounded hover:bg-[#FFDC1A]"
                >
                  Apply
                </button>
              </div>
              <div
                className="prose prose-sm text-gray-700 pt-[2em]"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description) }}
              />
              <div className="mt-6 flex justify-between items-center">
                {/* <Link href="/jobs" className="text-sm text-blue-500">Back to Jobs</Link> */}
              </div>
            </div>
            <h2 className="lg:text-[24px] lg:leading-[32px] font-normal mb-2">Apply for this job</h2>
            <p className="lg:text-[14px] lg:leading-[20px] font-normal mb-6"><span className="text-red-500">*</span> indicates a required field</p>
            <form id="application-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="w-[70%]">
                <label className="block text-sm font-medium mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className={inputStyle}
                
                  
                />
              </div>
              <div className="w-[70%]">
                <label className="block text-sm font-medium mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className={inputStyle}
                  
                />
              </div>
              <div className="w-[70%]">
                <label className="block text-sm font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputStyle}
                  
                />
              </div>
              <div className="w-[70%]">
                <label className="block text-sm font-medium mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className={inputStyle}
                
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Resume/CV <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col w-[35%] gap-2 mb-2">
                  <label htmlFor="resume-upload" className="flex-1">
                    <div className="p-2 border border-gray-400 rounded text-center cursor-pointer hover:bg-gray-100">
                      Attach
                    </div>
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleDropboxUpload}
                    className="flex-1 p-2 border border-gray-400 rounded text-center hover:bg-gray-100"
                  >
                    Dropbox
                  </button>
                  <button
                    type="button"
                    onClick={handleGoogleDriveUpload}
                    className="flex-1 p-2 border border-gray-400 rounded text-center hover:bg-gray-100"
                  >
                    Google Drive
                  </button>
                  <button
                    type="button"
                    onClick={handleGoogleDriveUpload}
                    className="flex-1 p-2 border border-gray-400 rounded text-center hover:bg-gray-100"
                  >
                    Entermanually
                  </button>
                </div>
                {resumeFile && (
                  <p className="text-sm text-gray-500">
                    Selected file: {resumeFile.name}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  Accepted file types: pdf, doc, docx, txt
                </p>
              </div>
              <div className="w-[70%]">
                <label className="block text-sm font-medium mb-1">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                  className={inputStyle}
                 
                />
              </div>
              <div className="w-[70%]">
                <label className="block text-sm font-medium mb-1">
                  Website
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className={inputStyle}
                 
                />
              </div>
              <div className="w-[70%]">
                <label className="block text-sm font-medium mb-1">
                  Country of Residence <span className="text-red-500">*</span>
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className={inputStyle}
                >
                  <option value="">Select...</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="United States">United States</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="w-[70%]">
                <label className="block text-sm font-medium mb-1">
                  Before applying, did you know about Rootstrap?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  value={knewRootstrap}
                  onChange={(e) => setKnewRootstrap(e.target.value)}
                  required
                  className={inputStyle}
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              {knewRootstrap === "Yes" && (
                <>
                  <div className="w-[70%]">
                    <label className="block text-sm font-medium mb-1 ">
                      If yes, where did you hear about us?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={heardFrom}
                      onChange={(e) => setHeardFrom(e.target.value)}
                      required
                      className={inputStyle}
                    >
                      <option value="">Select...</option>
                      <option value="Job Board">Job Board</option>
                      <option value="Social Network">Social Network</option>
                      <option value="Job Fair">Job Fair</option>
                      <option value="Meetup">Meetup</option>
                      <option value="Friend/Colleague">Friend/Colleague</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {["Job Fair", "Meetup", "Social Network"].includes(
                    heardFrom
                  ) && (
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        If you heard about us from a job fair, meetup, or social
                        network, please specify{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={heardFromDetails}
                        onChange={(e) => setHeardFromDetails(e.target.value)}
                        required
                        className={inputStyle}
                        placeholder="Specify details"
                      />
                    </div>
                  )}
                </>
              )}
              {formStatus && (
                <p
                  className={`text-sm ${
                    formStatus.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formStatus.message}
                </p>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="py-2 px-4 text-black font-semibold bg-[#FFC83F] rounded hover:bg-[#FFDC1A] disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit application"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <p className="text-gray-500 text-sm">Loading job details...</p>
        )}
      </div>
    </div>
  );
};

export default JobApplication;
