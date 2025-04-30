"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import DOMPurify from "dompurify";
import { IoLocationOutline } from "react-icons/io5";
import { getSession, signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Declare gapi and google types
declare global {
  interface Window {
    gapi: {
      load: (api: string, callback: () => void) => void;
    };
    google: {
      picker: {
        PickerBuilder: new () => {
          addView: (view: any) => any;
          setOAuthToken: (token: string) => any;
          setDeveloperKey: (key: string | undefined) => any;
          setCallback: (callback: (data: any) => void) => any;
          build: () => { setVisible: (visible: boolean) => void };
        };
        DocsView: new () => {
          setMimeTypes: (mimeTypes: string) => any;
        };
        Action: {
          PICKED: string;
        };
      };
    };
    Dropbox: {
      choose: (options: {
        success: (files: any[]) => void;
        cancel: () => void;
        linkType: string;
        multiselect: boolean;
        extensions: string[];
      }) => void;
    };
  }
}

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
  const [jobLoading, setJobLoading] = useState(true);
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
  const [uploadLoading, setUploadLoading] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualResumeText, setManualResumeText] = useState("");
  const [isGoogleApiLoaded, setIsGoogleApiLoaded] = useState(false);
  const [isDropboxLoaded, setIsDropboxLoaded] = useState(false);
  const router = useRouter();
  const { jobId } = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      setJobLoading(true);
      try {
        const response = await fetch(`/api/jobs/${jobId}`);
        if (!response.ok) throw new Error(`Failed to fetch job: ${response.statusText}`);
        const data = await response.json();
        setJob(data);
      } catch (error: any) {
        console.error("Fetch job error:", error);
        toast.error(`Error fetching job details: ${error.message}`);
      } finally {
        setJobLoading(false);
      }
    };
    fetchJob();

    if (typeof window !== "undefined") {
      const loadApis = () => {
        // Load Google API script
        const gapiScript = document.createElement("script");
        gapiScript.src = "https://apis.google.com/js/api.js";
        gapiScript.async = true;
        gapiScript.onload = () => {
          console.log("gapi script loaded");
          if (window.gapi) {
            window.gapi.load("picker", () => {
              console.log("gapi picker loaded");
              setIsGoogleApiLoaded(true);
            });
          } else {
            console.error("gapi not available after script load");
            toast.error("Failed to initialize Google API");
          }
        };
        gapiScript.onerror = () => {
          console.error("Failed to load gapi script");
          toast.error("Failed to load Google API script");
        };
        document.head.appendChild(gapiScript);

        // Load Google Identity Services script
        const gisScript = document.createElement("script");
        gisScript.src = "https://accounts.google.com/gsi/client";
        gisScript.async = true;
        gisScript.onload = () => console.log("Google Identity Services script loaded");
        gisScript.onerror = () => console.error("Failed to load Google Identity Services script");
        document.head.appendChild(gisScript);

        // Load Dropbox SDK
        const dropboxScript = document.createElement("script");
        dropboxScript.src = "https://www.dropbox.com/static/api/2/dropins.js";
        dropboxScript.async = true;
        dropboxScript.id = "dropboxjs";
        dropboxScript.setAttribute("data-app-key", process.env.NEXT_PUBLIC_DROPBOX_CLIENT_ID || "");
        dropboxScript.onload = () => {
          console.log("Dropbox script loaded");
          setIsDropboxLoaded(true);
        };
        dropboxScript.onerror = () => {
          console.error("Failed to load Dropbox script");
          toast.error("Failed to load Dropbox SDK");
        };
        document.head.appendChild(dropboxScript);

        // Cleanup
        return () => {
          if (document.head.contains(gapiScript)) document.head.removeChild(gapiScript);
          if (document.head.contains(gisScript)) document.head.removeChild(gisScript);
          if (document.head.contains(dropboxScript)) document.head.removeChild(dropboxScript);
        };
      };

      const cleanup = loadApis();
      return () => cleanup && cleanup();
    }
  }, [jobId]);

  const handleResumeUpload = async (file: File) => {
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
      throw new Error("Cloudinary upload preset is not configured");
    }
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      throw new Error("Cloudinary cloud name is not configured");
    }

    setUploadLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_prefix", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Upload response:", data);

      if (!response.ok) {
        throw new Error(data.error || `Failed to upload resume: ${response.status}`);
      }
      if (!data.secure_url) {
        throw new Error(`No secure URL returned from Cloudinary: ${JSON.stringify(data)}`);
      }

      toast.success("Resume uploaded successfully!");
      return data.secure_url;
    } catch (error: any) {
      console.error("Resume upload error:", error, { fileName: file.name, fileSize: file.size });
      toast.error(`Resume upload failed: ${error.message}`);
      throw error;
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDropboxUpload = () => {
    if (!isDropboxLoaded || !window.Dropbox) {
      toast.error("Dropbox SDK is not loaded. Please try again.");
      return;
    }
  
    setUploadLoading(true);
  
    window.Dropbox.choose({
      success: async (files: any[]) => {
        if (!files || files.length === 0) {
          toast.error("No file selected from Dropbox.");
          setUploadLoading(false);
          return;
        }
  
        try {
          const fileUrl = files[0].link;
          const response = await fetch(fileUrl);
  
          if (!response.ok) throw new Error("Failed to fetch Dropbox file");
  
          const blob = await response.blob();
          const file = new File([blob], files[0].name, { type: blob.type });
  
          setResumeFile(file);
          setShowManualEntry(false);
          toast.success("Dropbox file selected successfully!");
        } catch (error: any) {
          console.error("Dropbox upload error:", error);
          toast.error(`Dropbox upload failed: ${error.message}`);
        } finally {
          setUploadLoading(false);
        }
      },
      cancel: () => {
        console.log("Dropbox Chooser cancelled");
        setUploadLoading(false);
      },
      linkType: "direct",
      multiselect: false,
      extensions: [".pdf", ".doc", ".docx", ".txt"],
    });
  };
  

  const handleGoogleDriveUpload = async () => {
    if (!isGoogleApiLoaded) {
      toast.error("Google API is loading. Please wait and try again.");
      return;
    }

    const session = await getSession();
    if (!session || !("accessToken" in session)) {
      signIn("google", { callbackUrl: window.location.href });
      return;
    }

    if (!window.gapi || !window.google) {
      toast.error("Google API failed to load. Please use local file upload or Dropbox.");
      return;
    }

    setUploadLoading(true);
    try {
      console.log("Google API Key:", process.env.NEXT_PUBLIC_GOOGLE_DEVELOPER_KEY);
      console.log("Access Token:", (session as any).accessToken);

      const picker = new window.google.picker.PickerBuilder()
        .addView(
          new window.google.picker.DocsView().setMimeTypes(
            "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
          )
        )
        .setOAuthToken((session as any).accessToken)
        .setDeveloperKey(process.env.NEXT_PUBLIC_GOOGLE_DEVELOPER_KEY)
        .setCallback(async (data: any) => {
          if (data.action === window.google.picker.Action.PICKED) {
            try {
              const fileId = data.docs[0].id;
              const fileName = data.docs[0].name;
              const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
                headers: { Authorization: `Bearer ${(session as any).accessToken}` },
              });
              if (!response.ok) {
                throw new Error(`Failed to fetch Google Drive file: ${response.statusText}`);
              }
              const blob = await response.blob();
              const file = new File([blob], fileName, { type: blob.type });
              setResumeFile(file);
              setShowManualEntry(false);
              toast.success("Google Drive file selected successfully!");
            } catch (error: any) {
              console.error("Google Drive upload error:", error, {
                fileId: data.docs[0]?.id,
                status: error.response?.status,
              });
              toast.error(
                "Failed to upload from Google Drive. Since this app is running on localhost, you may see an 'unverified app' warning. Click 'Advanced' and 'Go to Rootstrap Job Application (unsafe)' to proceed, or use local file upload or Dropbox."
              );
            } finally {
              setUploadLoading(false);
            }
          }
        })
        .build();
      picker.setVisible(true);
    } catch (error: any) {
      console.error("Google Drive initialization error:", error);
      toast.error(
        "Google Drive initialization failed. Since this app is running on localhost, you may see an 'unverified app' warning. Click 'Advanced' and 'Go to Rootstrap Job Application (unsafe)' to proceed, or use local file upload or Dropbox."
      );
      setUploadLoading(false);
    }
  };

  const handleManualEntry = () => {
    setShowManualEntry(true);
    setResumeFile(null);
  };

  const handleManualResumeSubmit = () => {
    if (!manualResumeText.trim()) {
      toast.error("Please enter some text for the resume.");
      return;
    }
    setUploadLoading(true);
    try {
      const blob = new Blob([manualResumeText], { type: "text/plain" });
      const file = new File([blob], "resume.txt", { type: "text/plain" });
      setResumeFile(file);
      setShowManualEntry(false);
      toast.success("Manual resume submitted successfully!");
    } catch (error: any) {
      console.error("Manual resume error:", error);
      toast.error("Failed to submit manual resume.");
    } finally {
      setUploadLoading(false);
    }
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^\+?[\d\s-]{7,}$/.test(phone);
  const validateUrl = (url: string) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    const missingFields = [];
    if (!firstName.trim()) missingFields.push("First Name");
    if (!lastName.trim()) missingFields.push("Last Name");
    if (!email.trim()) missingFields.push("Email");
    if (!phone.trim()) missingFields.push("Phone");
    if (!resumeFile) missingFields.push("Resume/CV");
    if (!country) missingFields.push("Country");
    if (!knewRootstrap) missingFields.push("Knew Rootstrap");
    if (knewRootstrap === "Yes" && !heardFrom) missingFields.push("Heard From");
    if (["Job Fair", "Meetup", "Social Network"].includes(heardFrom) && !heardFromDetails.trim()) {
      missingFields.push("Heard From Details");
    }
    if (missingFields.length > 0) {
      toast.error(`Please fill all required fields: ${missingFields.join(", ")}`);
      setLoading(false);
      return;
    }

    // Validate formats
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    if (!validatePhone(phone)) {
      toast.error("Please enter a valid phone number.");
      setLoading(false);
      return;
    }
    if (linkedIn && !validateUrl(linkedIn)) {
      toast.error("Please enter a valid LinkedIn URL.");
      setLoading(false);
      return;
    }
    if (website && !validateUrl(website)) {
      toast.error("Please enter a valid website URL.");
      setLoading(false);
      return;
    }

    try {
      // Upload resume
      if (!resumeFile) throw new Error("Resume file is missing");
      const resume = await handleResumeUpload(resumeFile);

      // Prepare application data
      const applicationData = {
        jobId,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        resume,
        linkedIn: linkedIn.trim() || "",
        website: website.trim() || "",
        country,
        knewRootstrap,
        heardFrom: knewRootstrap === "Yes" ? heardFrom : "",
        heardFromDetails: ["Job Fair", "Meetup", "Social Network"].includes(heardFrom) ? heardFromDetails.trim() : "",
      };

      console.log("Submitting to /api/applications:", applicationData);

      // Submit application
      const applicationResponse = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });

      if (!applicationResponse.ok) {
        const errorData = await applicationResponse.json();
        console.error("Application submission error:", errorData, { status: applicationResponse.status });
        if (applicationResponse.status === 405) {
          throw new Error(
            "Method Not Allowed: The server does not support POST requests to /api/applications. Please check the backend configuration."
          );
        }
        throw new Error(errorData.error || `Failed to submit application: ${applicationResponse.status}`);
      }

      // Send email
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_title: job?.title,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          resume,
          linkedin: linkedIn.trim() || "N/A",
          website: website.trim() || "N/A",
          country,
          knew_rootstrap: knewRootstrap,
          heard_from: heardFrom || "N/A",
          heard_from_details: heardFromDetails.trim() || "N/A",
        }),
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        throw new Error(errorData.error || `Failed to send email: ${emailResponse.status}`);
      }

      toast.success("Application submitted successfully!");
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }} className="min-h-screen bg-white p-4 sm:p-6 lg:pt-24 text-black">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover />
      <div className="max-w-full sm:max-w-3xl md:max-w-4xl mx-auto">
        {jobLoading ? (
          <p className="text-gray-500 text-sm sm:text-base">Loading job details...</p>
        ) : job ? (
          <>
            <div className="mb-6">
              <Link
                href="/jobs"
                className="text-sm sm:text-base font-normal pb-4 sm:pb-6 leading-6 text-black underline inline-block"
              >
                {"<"} Back to Jobs
              </Link>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-normal mb-2">{job.title}</h1>
                  <div className="flex items-start gap-2">
                    <div>
                      <IoLocationOutline size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <p className="text-sm sm:text-base font-normal mb-2">
                      {job.location} · {job.employmentType}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" })}
                  className="py-1.5 sm:py-2 px-3 sm:px-4 bg-[#FFC83F] text-black text-sm sm:text-base rounded hover:bg-[#FFDC1A] min-w-[100px]"
                >
                  Apply
                </button>
              </div>
              <div
                className="prose prose-sm text-gray-700 pt-4 sm:pt-6"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description) }}
              />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-normal mb-2">Apply for this job</h2>
            <p className="text-xs sm:text-sm font-normal mb-4 sm:mb-6">
              <span className="text-red-500">*</span> indicates a required field
            </p>
            <form id="application-form" onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="w-full sm:w-3/4 md:w-2/3">
                <label className="block text-xs sm:text-sm font-medium mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={loading}
                  className="p-1.5 sm:p-2 w-full min-w-0 border focus:border-b-2 focus:outline-none focus:border-b-[#FFC83F] border-gray-400 rounded text-sm sm:text-base transition-all duration-300 placeholder-gray-500 disabled:opacity-50"
                />
              </div>
              <div className="w-full sm:w-3/4 md:w-2/3">
                <label className="block text-xs sm:text-sm font-medium mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={loading}
                  className="p-1.5 sm:p-2 w-full min-w-0 border focus:border-b-2 focus:outline-none focus:border-b-[#FFC83F] border-gray-400 rounded text-sm sm:text-base transition-all duration-300 placeholder-gray-500 disabled:opacity-50"
                />
              </div>
              <div className="w-full sm:w-3/4 md:w-2/3">
                <label className="block text-xs sm:text-sm font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="p-1.5 sm:p-2 w-full min-w-0 border focus:border-b-2 focus:outline-none focus:border-b-[#FFC83F] border-gray-400 rounded text-sm sm:text-base transition-all duration-300 placeholder-gray-500 disabled:opacity-50"
                />
              </div>
              <div className="w-full sm:w-3/4 md:w-2/3">
                <label className="block text-xs sm:text-sm font-medium mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  disabled={loading}
                  className="p-1.5 sm:p-2 w-full min-w-0 border focus:border-b-2 focus:outline-none focus:border-b-[#FFC83F] border-gray-400 rounded text-sm sm:text-base transition-all duration-300 placeholder-gray-500 disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">
                  Resume/CV <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col gap-2 sm:gap-3 lg:w-[35%] mb-2">
                  <label htmlFor="resume-upload" className="flex-1">
                    <div
                      className={`p-1.5 sm:p-2 border border-gray-400 rounded text-center text-sm sm:text-base cursor-pointer hover:bg-gray-100 ${
                        uploadLoading || loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {uploadLoading ? "Uploading..." : "Attach"}
                    </div>
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={(e) => {
                        setResumeFile(e.target.files?.[0] || null);
                        setShowManualEntry(false);
                      }}
                      className="hidden"
                      disabled={uploadLoading || loading}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleDropboxUpload}
                    disabled={uploadLoading || loading || !isDropboxLoaded}
                    className="p-1.5 sm:p-2 border border-gray-400 rounded text-center text-sm sm:text-base hover:bg-gray-100 disabled:opacity-50"
                  >
                    {uploadLoading ? "Uploading..." : "Dropbox"}
                  </button>
                  <button
                    type="button"
                    onClick={handleGoogleDriveUpload}
                    disabled={!isGoogleApiLoaded || uploadLoading || loading}
                    className="p-1.5 sm:p-2 border border-gray-400 rounded text-center text-sm sm:text-base hover:bg-gray-100 disabled:opacity-50"
                  >
                    {uploadLoading ? "Uploading..." : "Google Drive"}
                  </button>
                  <button
                    type="button"
                    onClick={handleManualEntry}
                    disabled={uploadLoading || loading}
                    className="p-1.5 sm:p-2 border border-gray-400 rounded text-center text-sm sm:text-base hover:bg-gray-100 disabled:opacity-50"
                  >
                    Enter Manually
                  </button>
                </div>
                {showManualEntry && (
                  <div className="w-full sm:w-3/4 md:w-2/3 mt-2">
                    <textarea
                      value={manualResumeText}
                      onChange={(e) => setManualResumeText(e.target.value)}
                      disabled={uploadLoading || loading}
                      className="p-1.5 sm:p-2 w-full min-w-0 border focus:border-b-2 focus:outline-none focus:border-b-[#FFC83F] border-gray-400 rounded text-sm sm:text-base h-32 sm:h-40 transition-all duration-300 placeholder-gray-500 disabled:opacity-50"
                      placeholder="Enter your resume text here..."
                    />
                    <button
                      type="button"
                      onClick={handleManualResumeSubmit}
                      disabled={uploadLoading || loading}
                      className="mt-2 p-1.5 sm:p-2 bg-[#FFC83F] text-black text-sm sm:text-base rounded hover:bg-[#FFDC1A] disabled:opacity-50"
                    >
                      {uploadLoading ? "Submitting..." : "Submit Manual Resume"}
                    </button>
                  </div>
                )}
                {resumeFile && <p className="text-xs sm:text-sm text-gray-500">Selected file: {resumeFile.name}</p>}
                <p className="text-xs sm:text-sm text-gray-500">Accepted file types: pdf, doc, docx, txt</p>
              </div>
              <div className="w-full sm:w-3/4 md:w-2/3">
                <label className="block text-xs sm:text-sm font-medium mb-1">LinkedIn Profile</label>
                <input
                  type="url"
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                  disabled={loading}
                  className="p-1.5 sm:p-2 w-full min-w-0 border focus:border-b-2 focus:outline-none focus:border-b-[#FFC83F] border-gray-400 rounded text-sm sm:text-base transition-all duration-300 placeholder-gray-500 disabled:opacity-50"
                />
              </div>
              <div className="w-full sm:w-3/4 md:w-2/3">
                <label className="block text-xs sm:text-sm font-medium mb-1">Website</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  disabled={loading}
                  className="p-1.5 sm:p-2 w-full min-w-0 border focus:border-b-2 focus:outline-none focus:border-b-[#FFC83F] border-gray-400 rounded text-sm sm:text-base transition-all duration-300 placeholder-gray-500 disabled:opacity-50"
                />
              </div>
              <div className="w-full sm:w-3/4 md:w-2/3">
                <label className="block text-xs sm:text-sm font-medium mb-1">
                  Country of Residence <span className="text-red-500">*</span>
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  disabled={loading}
                  className="p-1.5 sm:p-2 w-full min-w-0 border focus:border-b-2 focus:outline-none focus:border-b-[#FFC83F] border-gray-400 rounded text-sm sm:text-base transition-all duration-300 placeholder-gray-500 disabled:opacity-50"
                >
                  <option value="">Select...</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="United States">United States</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="w-full sm:w-3/4 md:w-2/3">
                <label className="block text-xs sm:text-sm font-medium mb-1">
                  Before applying, did you know about Rootstrap? <span className="text-red-500">*</span>
                </label>
                <select
                  value={knewRootstrap}
                  onChange={(e) => setKnewRootstrap(e.target.value)}
                  required
                  disabled={loading}
                  className="p-1.5 sm:p-2 w-full min-w-0 border focus:border-b-2 focus:outline-none focus:border-b-[#FFC83F] border-gray-400 rounded text-sm sm:text-base transition-all duration-300 placeholder-gray-500 disabled:opacity-50"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              {knewRootstrap === "Yes" && (
                <>
                  <div className="w-full sm:w-3/4 md:w-2/3">
                    <label className="block text-xs sm:text-sm font-medium mb-1">
                      If yes, where did you hear about us? <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={heardFrom}
                      onChange={(e) => setHeardFrom(e.target.value)}
                      required
                      disabled={loading}
                      className="p-1.5 sm:p-2 w-full min-w-0 border focus:border-b-2 focus:outline-none focus:border-b-[#FFC83F] border-gray-400 rounded text-sm sm:text-base transition-all duration-300 placeholder-gray-500 disabled:opacity-50"
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
                  {["Job Fair", "Meetup", "Social Network"].includes(heardFrom) && (
                    <div className="w-full sm:w-3/4 md:w-2/3">
                      <label className="block text-xs sm:text-sm font-medium mb-1">
                        If you heard about us from a job fair, meetup, or social network, please specify{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={heardFromDetails}
                        onChange={(e) => setHeardFromDetails(e.target.value)}
                        required
                        disabled={loading}
                        className="p-1.5 sm:p-2 w-full min-w-0 border focus:border-b-2 focus:outline-none focus:border-b-[#FFC83F] border-gray-400 rounded text-sm sm:text-base transition-all duration-300 placeholder-gray-500 disabled:opacity-50"
                        placeholder="Specify details"
                      />
                    </div>
                  )}
                </>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading || uploadLoading}
                  className="py-1.5 sm:py-2 px-3 sm:px-4 text-black font-semibold bg-[#FFC83F] rounded text-sm sm:text-base hover:bg-[#FFDC1A] disabled:opacity-50 min-w-[120px]"
                >
                  {loading ? "Submitting..." : "Submit application"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <p className="text-gray-500 text-sm sm:text-base">Failed to load job details.</p>
        )}
      </div>
    </div>
  );
};

export default JobApplication;