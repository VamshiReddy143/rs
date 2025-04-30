'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IProjectFormData } from '@/types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateTemplate1() {
  const [formData, setFormData] = useState<IProjectFormData>({
    name: '',
    about: '',
    services: { projectType: '', industries: [] },
    year: '',
    team: [],
    clientAbout: '',
    quote: { text: '', author: '', position: '' },
    projectMotive: '',
    companyDetails: [],
    capabilities: { title: '', description: '' },
    technologies: [],
    images: { hero: null, team: null },
    thumbnailText: '',
    thumbnailImage: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newIndustry, setNewIndustry] = useState('');
  const [newTeamMember, setNewTeamMember] = useState('');
  const [newCompanyDetail, setNewCompanyDetail] = useState('');
  const [newTechnology, setNewTechnology] = useState({ title: '', description: '' });

  // Project type options
  const projectTypeOptions = [
    'AI',
    'Data Science',
    'Cloud',
    'React',
    'React Native',
    'Node.js',
    'Ruby on Rails',
  ];

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: '',
      about: '',
      services: { projectType: '', industries: [] },
      year: '',
      team: [],
      clientAbout: '',
      quote: { text: '', author: '', position: '' },
      projectMotive: '',
      companyDetails: [],
      capabilities: { title: '', description: '' },
      technologies: [],
      images: { hero: null, team: null },
      thumbnailText: '',
      thumbnailImage: null,
    });
    setNewIndustry('');
    setNewTeamMember('');
    setNewCompanyDetail('');
    setNewTechnology({ title: '', description: '' });
    setErrors({});
    // Reset file inputs
    document.querySelectorAll('input[type="file"]').forEach((input) => {
      (input as HTMLInputElement).value = '';
    });
  };

  // Validate form fields
  const validateField = (name: string, value: any): string => {
    if (['name', 'about', 'projectType', 'year', 'clientAbout', 'projectMotive', 'capabilitiesTitle', 'capabilitiesDescription', 'thumbnailText'].includes(name)) {
      return value.trim() ? '' : `${name.replace(/([A-Z])/g, ' $1')} is required`;
    }
    if (name === 'industries' || name === 'team' || name === 'companyDetails') {
      return value.length > 0 ? '' : `${name} must have at least one entry`;
    }
    if (name === 'technologies') {
      return value.every((t: any) => t.title && t.description) ? '' : 'Each technology must have a title and description';
    }
    return '';
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {
      name: validateField('name', formData.name),
      about: validateField('about', formData.about),
      projectType: validateField('projectType', formData.services.projectType),
      industries: validateField('industries', formData.services.industries),
      year: validateField('year', formData.year),
      team: validateField('team', formData.team),
      clientAbout: validateField('clientAbout', formData.clientAbout),
      projectMotive: validateField('projectMotive', formData.projectMotive),
      companyDetails: validateField('companyDetails', formData.companyDetails),
      capabilitiesTitle: validateField('capabilitiesTitle', formData.capabilities.title),
      capabilitiesDescription: validateField('capabilitiesDescription', formData.capabilities.description),
      technologies: validateField('technologies', formData.technologies),
      thumbnailText: validateField('thumbnailText', formData.thumbnailText),
      hero: formData.images.hero ? '' : 'Hero image is required',
      teamImage: formData.images.team ? '' : 'Team image is required',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      toast.error('Please fix the errors in the form');
      return;
    }

    const data = new FormData();
    data.append('data', JSON.stringify(formData));
    if (formData.images.hero) data.append('hero', formData.images.hero);
    if (formData.images.team) data.append('team', formData.images.team);
    if (formData.thumbnailImage) data.append('thumbnailImage', formData.thumbnailImage);

    try {
      const res = await fetch('/api/projects/template1', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        toast.success('Project created successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
        resetForm();
      } else {
        setErrors({ form: 'Failed to create project' });
        toast.error('Failed to create project');
      }
    } catch (err) {
      setErrors({ form: 'An unexpected error occurred' });
      toast.error('An unexpected error occurred');
    }
  };

  // Animation variants
  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
  };

  return (
    <div
      style={{ fontFamily: 'Poppins, sans-serif' }}
      className="min-h-screen bg-[#191a1b] text-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <ToastContainer />
      {errors.form && (
        <motion.div
          className="bg-red-600 text-white p-4 rounded-lg mb-6 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {errors.form}
        </motion.div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto flex flex-col gap-6"
        aria-label="Create Template 1 Project Form"
      >
        {/* Project Type Select */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Project Type</span>
            <select
              value={formData.services.projectType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  services: { ...formData.services, projectType: e.target.value },
                })
              }
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white appearance-none cursor-pointer bg-gradient-to-r from-[#f6ff7a] to-[#AAB418] bg-[length:0%_2px] bg-no-repeat bg-bottom hover:bg-[length:100%_2px] focus:bg-[length:100%_2px]"
              required
              aria-invalid={!!errors.projectType}
              aria-describedby={errors.projectType ? "projectType-error" : undefined}
            >
              <option value="" disabled>
                Select a project type
              </option>
              {projectTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.projectType && (
              <span id="projectType-error" className="text-red-400 text-sm mt-1">{errors.projectType}</span>
            )}
          </label>
        </motion.div>

        {/* Project Name */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Project Name</span>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Masterclass"
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white"
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <span id="name-error" className="text-red-400 text-sm mt-1">{errors.name}</span>
            )}
          </label>
        </motion.div>

        {/* Thumbnail Text */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Thumbnail Text</span>
            <input
              type="text"
              value={formData.thumbnailText}
              onChange={(e) => setFormData({ ...formData, thumbnailText: e.target.value })}
              placeholder="e.g., Building The Most Premium Learning Experience"
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white"
              required
              aria-invalid={!!errors.thumbnailText}
              aria-describedby={errors.thumbnailText ? "thumbnailText-error" : undefined}
            />
            {errors.thumbnailText && (
              <span id="thumbnailText-error" className="text-red-400 text-sm mt-1">{errors.thumbnailText}</span>
            )}
          </label>
        </motion.div>

        {/* Thumbnail Image */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Thumbnail Image (Optional)</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  thumbnailImage: e.target.files![0] || null,
                })
              }
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#f6ff7a] file:text-black hover:file:bg-[#AAB418]"
              aria-describedby="thumbnailImage-note"
            />
            <span id="thumbnailImage-note" className="text-gray-400 text-sm mt-1">
              Optional image for project thumbnail (defaults to placeholder if not provided).
            </span>
          </label>
        </motion.div>

        {/* About */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">About</span>
            <textarea
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              placeholder="e.g., A Dynamic Partnership Shaping the Future of Online Education"
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white min-h-[100px]"
              required
              aria-invalid={!!errors.about}
              aria-describedby={errors.about ? "about-error" : undefined}
            />
            {errors.about && (
              <span id="about-error" className="text-red-400 text-sm mt-1">{errors.about}</span>
            )}
          </label>
        </motion.div>

        {/* Industries */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Industries</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={newIndustry}
                onChange={(e) => setNewIndustry(e.target.value)}
                placeholder="e.g., Education"
                className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white flex-1"
              />
              <button
                type="button"
                onClick={() => {
                  if (newIndustry.trim()) {
                    setFormData({
                      ...formData,
                      services: {
                        ...formData.services,
                        industries: [...formData.services.industries, newIndustry.trim()],
                      },
                    });
                    setNewIndustry('');
                  }
                }}
                className="bg-[#f6ff7a] hover:bg-[#AAB418] text-black px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
            <AnimatePresence>
              {formData.services.industries.map((industry, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-2 mt-2 bg-[#242425] p-2 rounded-lg"
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <span className="flex-1 text-gray-200">{industry}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        services: {
                          ...formData.services,
                          industries: formData.services.industries.filter((_, i) => i !== idx),
                        },
                      })
                    }
                    className="text-red-400 hover:text-red-600"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {errors.industries && (
              <span className="text-red-400 text-sm mt-1">{errors.industries}</span>
            )}
          </label>
        </motion.div>

        {/* Year */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Year</span>
            <input
              type="text"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              placeholder="e.g., 2018-Present"
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white"
              required
              aria-invalid={!!errors.year}
              aria-describedby={errors.year ? "year-error" : undefined}
            />
            {errors.year && (
              <span id="year-error" className="text-red-400 text-sm mt-1">{errors.year}</span>
            )}
          </label>
        </motion.div>

        {/* Team */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Team Roles</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTeamMember}
                onChange={(e) => setNewTeamMember(e.target.value)}
                placeholder="e.g., Product Designer"
                className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white flex-1"
              />
              <button
                type="button"
                onClick={() => {
                  if (newTeamMember.trim()) {
                    setFormData({
                      ...formData,
                      team: [...formData.team, newTeamMember.trim()],
                    });
                    setNewTeamMember('');
                  }
                }}
                className="bg-[#f6ff7a] hover:bg-[#AAB418] text-black px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
            <AnimatePresence>
              {formData.team.map((member, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-2 mt-2 bg-[#242425] p-2 rounded-lg"
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <span className="flex-1 text-gray-200">{member}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        team: formData.team.filter((_, i) => i !== idx),
                      })
                    }
                    className="text-red-400 hover:text-red-600"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {errors.team && (
              <span className="text-red-400 text-sm mt-1">{errors.team}</span>
            )}
          </label>
        </motion.div>

        {/* Client About */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">About the Client</span>
            <textarea
              value={formData.clientAbout}
              onChange={(e) => setFormData({ ...formData, clientAbout: e.target.value })}
              placeholder="e.g., MasterClass is a streaming platform..."
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white min-h-[100px]"
              required
              aria-invalid={!!errors.clientAbout}
              aria-describedby={errors.clientAbout ? "clientAbout-error" : undefined}
            />
            {errors.clientAbout && (
              <span id="clientAbout-error" className="text-red-400 text-sm mt-1">{errors.clientAbout}</span>
            )}
          </label>
        </motion.div>

        {/* Quote */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Quote (Optional)</span>
            <textarea
              value={formData.quote.text}
              onChange={(e) =>
                setFormData({ ...formData, quote: { ...formData.quote, text: e.target.value } })
              }
              placeholder="e.g., We don't treat them like an outsourced team..."
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white min-h-[100px]"
            />
          </label>
        </motion.div>
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Quote Author (Optional)</span>
            <input
              type="text"
              value={formData.quote.author}
              onChange={(e) =>
                setFormData({ ...formData, quote: { ...formData.quote, author: e.target.value } })
              }
              placeholder="e.g., Mandar Bapaye"
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white"
            />
          </label>
        </motion.div>
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Quote Author Position (Optional)</span>
            <input
              type="text"
              value={formData.quote.position}
              onChange={(e) =>
                setFormData({ ...formData, quote: { ...formData.quote, position: e.target.value } })
              }
              placeholder="e.g., VP of Engineering at MasterClass"
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white"
            />
          </label>
        </motion.div>

        {/* Project Motive */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Project Motive</span>
            <textarea
              value={formData.projectMotive}
              onChange={(e) => setFormData({ ...formData, projectMotive: e.target.value })}
              placeholder="e.g., Helping MasterClass build new features..."
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white min-h-[100px]"
              required
              aria-invalid={!!errors.projectMotive}
              aria-describedby={errors.projectMotive ? "projectMotive-error" : undefined}
            />
            {errors.projectMotive && (
              <span id="projectMotive-error" className="text-red-400 text-sm mt-1">{errors.projectMotive}</span>
            )}
          </label>
        </motion.div>

        {/* Company Details */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Company Details</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCompanyDetail}
                onChange={(e) => setNewCompanyDetail(e.target.value)}
                placeholder="e.g., Needed to scale engineering function"
                className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white flex-1"
              />
              <button
                type="button"
                onClick={() => {
                  if (newCompanyDetail.trim()) {
                    setFormData({
                      ...formData,
                      companyDetails: [...formData.companyDetails, newCompanyDetail.trim()],
                    });
                    setNewCompanyDetail('');
                  }
                }}
                className="bg-[#f6ff7a] hover:bg-[#AAB418] text-black px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
            <AnimatePresence>
              {formData.companyDetails.map((detail, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-2 mt-2 bg-[#242425] p-2 rounded-lg"
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <span className="flex-1 text-gray-200">{detail}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        companyDetails: formData.companyDetails.filter((_, i) => i !== idx),
                      })
                    }
                    className="text-red-400 hover:text-red-600"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {errors.companyDetails && (
              <span className="text-red-400 text-sm mt-1">{errors.companyDetails}</span>
            )}
          </label>
        </motion.div>

        {/* Capabilities */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Capabilities Title</span>
            <input
              type="text"
              value={formData.capabilities.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  capabilities: { ...formData.capabilities, title: e.target.value },
                })
              }
              placeholder="e.g., Elevates Front-End Capabilities..."
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white"
              required
              aria-invalid={!!errors.capabilitiesTitle}
              aria-describedby={errors.capabilitiesTitle ? "capabilitiesTitle-error" : undefined}
            />
            {errors.capabilitiesTitle && (
              <span id="capabilitiesTitle-error" className="text-red-400 text-sm mt-1">{errors.capabilitiesTitle}</span>
            )}
          </label>
        </motion.div>
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Capabilities Description</span>
            <textarea
              value={formData.capabilities.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  capabilities: { ...formData.capabilities, description: e.target.value },
                })
              }
              placeholder="e.g., Our team seamlessly integrated with MasterClass..."
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white min-h-[100px]"
              required
              aria-invalid={!!errors.capabilitiesDescription}
              aria-describedby={errors.capabilitiesDescription ? "capabilitiesDescription-error" : undefined}
            />
            {errors.capabilitiesDescription && (
              <span id="capabilitiesDescription-error" className="text-red-400 text-sm mt-1">{errors.capabilitiesDescription}</span>
            )}
          </label>
        </motion.div>

        {/* Technologies */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Technologies</span>
            <div className="flex flex-col gap-2 bg-[#242425] p-4 rounded-lg">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTechnology.title}
                  onChange={(e) =>
                    setNewTechnology({ ...newTechnology, title: e.target.value })
                  }
                  placeholder="e.g., Mobile & TV Technologies"
                  className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white flex-1"
                />
                <input
                  type="text"
                  value={newTechnology.description}
                  onChange={(e) =>
                    setNewTechnology({ ...newTechnology, description: e.target.value })
                  }
                  placeholder="e.g., Native Android, Native iOS"
                  className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white flex-1"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newTechnology.title.trim() && newTechnology.description.trim()) {
                      setFormData({
                        ...formData,
                        technologies: [...formData.technologies, newTechnology],
                      });
                      setNewTechnology({ title: '', description: '' });
                    }
                  }}
                  className="bg-[#f6ff7a] hover:bg-[#AAB418] text-black px-4 py-2 rounded-lg"
                >
                  Add
                </button>
              </div>
              <AnimatePresence>
                {formData.technologies.map((tech, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-2 mt-2 bg-[#3d3d3f] p-2 rounded-lg"
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <span className="flex-1 text-gray-200">{tech.title}: {tech.description}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          technologies: formData.technologies.filter((_, i) => i !== idx),
                        })
                      }
                      className="text-red-400 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {errors.technologies && (
              <span className="text-red-400 text-sm mt-1">{errors.technologies}</span>
            )}
          </label>
        </motion.div>

        {/* Images */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Hero Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  images: { ...formData.images, hero: e.target.files![0] },
                })
              }
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#f6ff7a] file:text-black hover:file:bg-[#AAB418]"
              required
              aria-invalid={!!errors.hero}
              aria-describedby={errors.hero ? "hero-error" : undefined}
            />
            {errors.hero && (
              <span id="hero-error" className="text-red-400 text-sm mt-1">{errors.hero}</span>
            )}
          </label>
        </motion.div>
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Team Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  images: { ...formData.images, team: e.target.files![0] },
                })
              }
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#f6ff7a] file:text-black hover:file:bg-[#AAB418]"
              required
              aria-invalid={!!errors.teamImage}
              aria-describedby={errors.teamImage ? "teamImage-error" : undefined}
            />
            {errors.teamImage && (
              <span id="teamImage-error" className="text-red-400 text-sm mt-1">{errors.teamImage}</span>
            )}
          </label>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="bg-[#f6ff7a] text-black py-3 px-6 rounded-lg hover:bg-[#AAB418] focus:outline-none mt-6 font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create
        </motion.button>
      </form>
    </div>
  );
}