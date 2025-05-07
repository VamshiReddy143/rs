"use client";

import React, { useState, useEffect } from 'react';
import { FaBell, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { projectTemplates, availableAnimations } from '@/app/templates';
import { Template, Project as ProjectType, CustomField } from '@/app/types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'blogs' | 'team' | 'jobs' | 'projects'>('projects');
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [projectFields, setProjectFields] = useState<{ [key: string]: string | File | null }>({});
  const [projectImagePreviews, setProjectImagePreviews] = useState<{ [key: string]: string }>({});
  const [selectedAnimation, setSelectedAnimation] = useState<string>('fadeInUp');
  const [showBroadcastForm, setShowBroadcastForm] = useState<boolean>(false);
  const [broadcastSubject, setBroadcastSubject] = useState<string>('');
  const [broadcastMessage, setBroadcastMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [newField, setNewField] = useState<CustomField>({
    name: '',
    type: 'text',
    label: '',
    required: false,
    options: [],
  });

  useEffect(() => {
    const fetchProjects = async () => {
      if (activeTab === 'projects') {
        try {
          const response = await fetch('/api/projects');
          if (!response.ok) throw new Error('Failed to fetch projects');
          const data = await response.json();
          setProjects(data);
        } catch (error: any) {
          alert(`Error fetching projects: ${error.message}`);
        }
      }
    };
    fetchProjects();
  }, [activeTab]);

  const handleProjectFieldChange = (fieldName: string, value: string | File | null) => {
    setProjectFields((prev) => ({ ...prev, [fieldName]: value }));
    if (value instanceof File) {
      setProjectImagePreviews((prev) => ({ ...prev, [fieldName]: URL.createObjectURL(value) }));
    }
  };

  const handleAddCustomField = () => {
    if (!newField.name || !newField.label) {
      alert('Please provide field name and label');
      return;
    }
    if (newField.type === 'select' && (!newField.options || newField.options.length === 0)) {
      alert('Please provide options for select field');
      return;
    }
    setCustomFields([...customFields, { ...newField }]);
    setNewField({ name: '', type: 'text', label: '', required: false, options: [] });
  };

  const handleProjectSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!selectedTemplate) throw new Error('Please select a template');
      const template = projectTemplates.find((t) => t.id === selectedTemplate);
      if (!template) throw new Error('Invalid template');
      if (selectedAnimation === 'creativeWave' && selectedTemplate !== 'creative') {
        throw new Error('Creative Wave animation is only available for Creative Grid template');
      }

      const formData = new FormData();
      formData.append('templateId', selectedTemplate);
      formData.append('animation', selectedAnimation);
      formData.append('fields', JSON.stringify(projectFields));

      for (const [key, value] of Object.entries(projectFields)) {
        if (value instanceof File) {
          formData.append(key, value);
        }
      }

      const response = await fetch('/api/projects', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      alert(data.message);
      setSelectedTemplate('');
      setCustomFields([]);
      setProjectFields({});
      setProjectImagePreviews({});
      setSelectedAnimation('fadeInUp');
      setActiveTab('projects');
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    'bg-[#3d3d3f] p-4 w-full rounded-t-lg border-b-2 border-transparent focus:outline-none focus:border-[#f6ff7a] text-white placeholder-gray-400';

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className="min-h-screen bg-[#191a1b] text-white pt-[7em]">
      <div className="max-w-7xl mx-auto bg-[#191a1b] rounded-xl shadow-2xl p-8 relative">
        <button
          onClick={() => setShowBroadcastForm(true)}
          className="absolute top-4 right-4 text-[#f6ff7a] hover:text-yellow-500"
          title="Send Broadcast Message"
        >
          <FaBell size={24} />
        </button>

        {showBroadcastForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#3d3d3f] p-6 rounded-lg w-96">
              <h2 className="text-xl font-semibold text-[#f6ff7a] mb-4">Send Update to Subscribers</h2>
              <form onSubmit={(e) => { e.preventDefault(); alert('Broadcast sent'); }} className="space-y-4">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-200">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={broadcastSubject}
                    onChange={(e) => setBroadcastSubject(e.target.value)}
                    required
                    className={inputStyle}
                    placeholder="Enter email subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-200">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    required
                    rows={5}
                    className={`${inputStyle} rounded-lg`}
                    placeholder="Enter your message"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2 bg-[#f6ff7a] text-black font-bold rounded-lg hover:bg-yellow-500 disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBroadcastForm(false)}
                    className="flex-1 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="container">
          <div className="wrap">
            <input
              type="radio"
              id="rd-1"
              name="radio"
              className="rd-1"
              checked={activeTab === 'create'}
              onChange={() => setActiveTab('create')}
            />
            <label htmlFor="rd-1" className="label">
              <span>Create</span>
            </label>
            <input
              type="radio"
              id="rd-2"
              name="radio"
              className="rd-2"
              checked={activeTab === 'blogs'}
              onChange={() => setActiveTab('blogs')}
            />
            <label htmlFor="rd-2" className="label">
              <span>Blogs</span>
            </label>
            <input
              type="radio"
              id="rd-3"
              name="radio"
              className="rd-3"
              checked={activeTab === 'team'}
              onChange={() => setActiveTab('team')}
            />
            <label htmlFor="rd-3" className="label">
              <span>Team</span>
            </label>
            <input
              type="radio"
              id="rd-4"
              name="radio"
              className="rd-4"
              checked={activeTab === 'jobs'}
              onChange={() => setActiveTab('jobs')}
            />
            <label htmlFor="rd-4" className="label">
              <span>Jobs</span>
            </label>
            <input
              type="radio"
              id="rd-5"
              name="radio"
              className="rd-5"
              checked={activeTab === 'projects'}
              onChange={() => setActiveTab('projects')}
            />
            <label htmlFor="rd-5" className="label">
              <span>Projects</span>
            </label>
            <div className="bar"></div>
            <div className="slidebar"></div>
          </div>
        </div>

        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 mt-6"
          >
            <h2 className="text-2xl font-bold text-[#f6ff7a]">Manage Projects</h2>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-200 mb-4">Select a Template</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {projectTemplates.map((template) => (
                  <motion.div
                    key={template.id}
                    className={`cursor-pointer p-4 rounded-lg border-2 ${selectedTemplate === template.id ? 'border-[#f6ff7a]' : 'border-gray-600'} ${template.style.cardClass}`}
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      setCustomFields([]);
                      setProjectFields({});
                      setProjectImagePreviews({});
                      setSelectedAnimation(template.id === 'creative' ? 'creativeWave' : 'fadeInUp');
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src={template.style.previewImage}
                      width={300}
                      height={200}
                      alt={template.name}
                      className={template.style.imageClass}
                    />
                    <h4 className={template.style.titleClass}>{template.name}</h4>
                    <p className={template.style.descriptionClass}>Sample description for {template.name.toLowerCase()}.</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {selectedTemplate && (
              <form onSubmit={handleProjectSubmit} className="space-y-8">
                <div>
                  <label htmlFor="animation" className="block text-lg font-medium mb-2 text-gray-200">
                    Select Animation
                  </label>
                  <select
                    id="animation"
                    value={selectedAnimation}
                    onChange={(e) => setSelectedAnimation(e.target.value)}
                    className={inputStyle}
                  >
                    {availableAnimations
                      .filter((anim) => anim.id !== 'creativeWave' || selectedTemplate === 'creative')
                      .map((anim) => (
                        <option key={anim.id} value={anim.id}>
                          {anim.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-200">Template Fields</h3>
                  {projectTemplates
                    .find((t) => t.id === selectedTemplate)
                    ?.fields.map((field) => (
                      <div key={field.name}>
                        <label htmlFor={field.name} className="block text-lg font-medium mb-2 text-gray-200">
                          {field.label} {field.required && <span className="text-red-400">*</span>}
                        </label>
                        {field.type === 'text' && (
                          <input
                            type="text"
                            id={field.name}
                            value={(projectFields[field.name] as string) || ''}
                            onChange={(e) => handleProjectFieldChange(field.name, e.target.value)}
                            required={field.required}
                            className={inputStyle}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                          />
                        )}
                        {field.type === 'textarea' && (
                          <textarea
                            id={field.name}
                            value={(projectFields[field.name] as string) || ''}
                            onChange={(e) => handleProjectFieldChange(field.name, e.target.value)}
                            required={field.required}
                            rows={4}
                            className={`${inputStyle} rounded-lg`}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                          />
                        )}
                        {field.type === 'image' && (
                          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                            <input
                              type="file"
                              id={field.name}
                              accept="image/*"
                              onChange={(e) => handleProjectFieldChange(field.name, e.target.files?.[0] || null)}
                              className="hidden"
                            />
                            <label
                              htmlFor={field.name}
                              className="cursor-pointer inline-block px-6 py-3 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-yellow-500"
                            >
                              Select Image
                            </label>
                            {projectImagePreviews[field.name] && (
                              <div className="mt-4">
                                <img
                                  src={projectImagePreviews[field.name]}
                                  alt="Preview"
                                  className="max-w-xs mx-auto rounded-lg shadow-md"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleProjectFieldChange(field.name, null)}
                                  className="mt-2 text-red-400 hover:text-red-500"
                                >
                                  Remove Image
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                        {field.type === 'select' && (
                          <select
                            id={field.name}
                            value={(projectFields[field.name] as string) || ''}
                            onChange={(e) => handleProjectFieldChange(field.name, e.target.value)}
                            required={field.required}
                            className={inputStyle}
                          >
                            <option value="">Select {field.label.toLowerCase()}</option>
                            {field.options?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-200">Custom Fields</h3>
                  {customFields.map((field, index) => (
                    <div key={index}>
                      <label htmlFor={field.name} className="block text-lg font-medium mb-2 text-gray-200">
                        {field.label} {field.required && <span className="text-red-400">*</span>}
                      </label>
                      {field.type === 'text' && (
                        <input
                          type="text"
                          id={field.name}
                          value={(projectFields[field.name] as string) || ''}
                          onChange={(e) => handleProjectFieldChange(field.name, e.target.value)}
                          required={field.required}
                          className={inputStyle}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                        />
                      )}
                      {field.type === 'textarea' && (
                        <textarea
                          id={field.name}
                          value={(projectFields[field.name] as string) || ''}
                          onChange={(e) => handleProjectFieldChange(field.name, e.target.value)}
                          required={field.required}
                          rows={4}
                          className={`${inputStyle} rounded-lg`}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                        />
                      )}
                      {field.type === 'image' && (
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                          <input
                            type="file"
                            id={field.name}
                            accept="image/*"
                            onChange={(e) => handleProjectFieldChange(field.name, e.target.files?.[0] || null)}
                            className="hidden"
                          />
                          <label
                            htmlFor={field.name}
                            className="cursor-pointer inline-block px-6 py-3 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-yellow-500"
                          >
                            Select Image
                          </label>
                          {projectImagePreviews[field.name] && (
                            <div className="mt-4">
                              <img
                                src={projectImagePreviews[field.name]}
                                alt="Preview"
                                className="max-w-xs mx-auto rounded-lg shadow-md"
                              />
                              <button
                                type="button"
                                onClick={() => handleProjectFieldChange(field.name, null)}
                                className="mt-2 text-red-400 hover:text-red-500"
                              >
                                Remove Image
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                      {field.type === 'select' && (
                        <select
                          id={field.name}
                          value={(projectFields[field.name] as string) || ''}
                          onChange={(e) => handleProjectFieldChange(field.name, e.target.value)}
                          required={field.required}
                          className={inputStyle}
                        >
                          <option value="">Select {field.label.toLowerCase()}</option>
                          {field.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-200">Add Custom Field</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={newField.name}
                      onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                      placeholder="Field name (e.g., client)"
                      className={inputStyle}
                    />
                    <input
                      type="text"
                      value={newField.label}
                      onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                      placeholder="Field label (e.g., Client Name)"
                      className={inputStyle}
                    />
                    <select
                      value={newField.type}
                      onChange={(e) => setNewField({ ...newField, type: e.target.value as any })}
                      className={inputStyle}
                    >
                      <option value="text">Text</option>
                      <option value="textarea">Textarea</option>
                      <option value="image">Image</option>
                      <option value="select">Select</option>
                    </select>
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        id="required"
                        checked={newField.required}
                        onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                        className="h-5 w-5 text-[#f6ff7a]"
                      />
                      <label htmlFor="required" className="text-gray-200">Required</label>
                    </div>
                    {newField.type === 'select' && (
                      <input
                        type="text"
                        value={newField.options?.join(',') || ''}
                        onChange={(e) => setNewField({ ...newField, options: e.target.value.split(',').map((opt) => opt.trim()) })}
                        placeholder="Options (comma-separated)"
                        className={inputStyle}
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleAddCustomField}
                    className="flex items-center gap-2 px-4 py-2 bg-[#f6ff7a] text-black font-semibold rounded-lg hover:bg-yellow-500"
                  >
                    <FaPlus /> Add Field
                  </button>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading || !selectedTemplate}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 bg-[#f6ff7a] text-black font-bold rounded-lg hover:bg-yellow-500 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Project'}
                </motion.button>
              </form>
            )}

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-200 mb-4">All Projects</h3>
              {projects.length === 0 ? (
                <p className="text-gray-400">No projects found.</p>
              ) : (
                <div className="grid gap-6">
                  {projects.map((project) => (
                    <motion.div
                      key={project._id}
                      className="bg-gray-900 p-6 rounded-xl border border-gray-600 shadow-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h4 className="text-xl font-semibold text-gray-200">{project.data.title}</h4>
                      <p className="text-gray-400">
                        Template: {projectTemplates.find((t) => t.id === project.templateId)?.name}
                      </p>
                      <p className="text-gray-400">Animation: {availableAnimations.find((a) => a.id === project.animation)?.name}</p>
                      {project.data.image1 && (
                        <img
                          src={project.data.image1}
                          alt={project.data.title}
                          className="w-24 h-24 object-cover rounded-lg mt-2"
                        />
                      )}
                      <p className="text-gray-300 mt-2">{project.data.description}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'create' && <div>Create Blog Form</div>}
        {activeTab === 'blogs' && <div>Blogs List</div>}
        {activeTab === 'team' && <div>Team Members</div>}
        {activeTab === 'jobs' && <div>Jobs</div>}
      </div>

      <style jsx>{`
        .container {
          --color-pure: #f6ff7a;
          --color-primary: #3d3d3f;
          --color-secondary: #191a1b;
          --muted: #6b7280;
          background-color: var(--color-secondary);
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .wrap {
          --round: 10px;
          --p-x: 8px;
          --p-y: 4px;
          --w-label: 100px;
          display: flex;
          align-items: center;
          padding: var(--p-y) var(--p-x);
          position: relative;
          background: var(--color-primary);
          border-radius: var(--round);
          max-width: 100%;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .wrap input {
          height: 0;
          width: 0;
          position: absolute;
          overflow: hidden;
          display: none;
          visibility: hidden;
        }
        .label {
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--color-secondary);
          background: transparent;
          padding: 12px 16px;
          width: var(--w-label);
          min-width: var(--w-label);
          transition: color 0.25s ease;
        }
        .wrap input[class*="rd-"]:checked + .label {
          color: var(--color-pure);
        }
        .bar {
          position: absolute;
          height: 100%;
          width: var(--w-label);
          z-index: 0;
          transition: transform 0.5s cubic-bezier(0.33, 0.83, 0.99, 0.98);
        }
        .bar::before,
        .bar::after {
          content: '';
          position: absolute;
          height: 4px;
          width: 100%;
          background: var(--color-secondary);
        }
        .bar::before {
          top: 0;
          border-radius: 0 0 9999px 9999px;
        }
        .bar::after {
          bottom: 0;
          border-radius: 9999px 9999px 0 0;
        }
        .slidebar {
          position: absolute;
          height: calc(100% - (var(--p-y) * 4));
          width: var(--w-label);
          border-radius: calc(var(--round) - var(--p-y));
          background: var(--muted);
          z-index: 0;
          transition: transform 0.5s cubic-bezier(0.33, 0.83, 0.99, 0.98);
        }
        .rd-1:checked ~ .bar,
        .rd-1:checked ~ .slidebar {
          transform: translateX(0) scaleX(1);
        }
        .rd-2:checked ~ .bar,
        .rd-2:checked ~ .slidebar {
          transform: translateX(100%) scaleX(1);
        }
        .rd-3:checked ~ .bar,
        .rd-3:checked ~ .slidebar {
          transform: translateX(200%) scaleX(1);
        }
        .rd-4:checked ~ .bar,
        .rd-4:checked ~ .slidebar {
          transform: translateX(300%) scaleX(1);
        }
        .rd-5:checked ~ .bar,
        .rd-5:checked ~ .slidebar {
          transform: translateX(400%) scaleX(1);
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;