'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ITemplate3FormData} from '@/types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateTemplate3() {
  const [formData, setFormData] = useState<ITemplate3FormData>({
    name: '',
    type: '',
    tagline: '',
    clientAbout: '',
    quote: { text: '', author: '', position: '' },
    challenges: [],
    actions: [],
    results: [],
    images: { hero: null, challenge: null },
    thumbnailText: '',
    thumbnailImage: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newChallenge, setNewChallenge] = useState('');
  const [newAction, setNewAction] = useState('');
  const [newResult, setNewResult] = useState('');

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
      type: '',
      tagline: '',
      clientAbout: '',
      quote: { text: '', author: '', position: '' },
      challenges: [],
      actions: [],
      results: [],
      images: { hero: null, challenge: null },
      thumbnailText: '',
      thumbnailImage: null,
    });
    setNewChallenge('');
    setNewAction('');
    setNewResult('');
    setErrors({});
    // Reset file inputs
    document.querySelectorAll('input[type="file"]').forEach((input) => {
      (input as HTMLInputElement).value = '';
    });
  };

  // Validate form fields
  const validateField = (name: string, value: any): string => {
    if (['name', 'type', 'tagline', 'clientAbout', 'thumbnailText'].includes(name)) {
      return value.trim() ? '' : `${name.replace(/([A-Z])/g, ' $1')} is required`;
    }
    if (['challenges', 'actions', 'results'].includes(name)) {
      return value.length > 0 ? '' : `${name} must have at least one entry`;
    }
    return '';
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {
      name: validateField('name', formData.name),
      type: validateField('type', formData.type),
      tagline: validateField('tagline', formData.tagline),
      clientAbout: validateField('clientAbout', formData.clientAbout),
      thumbnailText: validateField('thumbnailText', formData.thumbnailText),
      challenges: validateField('challenges', formData.challenges),
      actions: validateField('actions', formData.actions),
      results: validateField('results', formData.results),
      hero: formData.images.hero ? '' : 'Hero image is required',
      challenge: formData.images.challenge ? '' : 'Challenge image is required',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      toast.error('Please fix the errors in the form');
      return;
    }

    const data = new FormData();
    data.append('data', JSON.stringify(formData));
    if (formData.images.hero) data.append('hero', formData.images.hero);
    if (formData.images.challenge) data.append('challenge', formData.images.challenge);
    if (formData.thumbnailImage) data.append('thumbnailImage', formData.thumbnailImage);

    try {
      const res = await fetch('/api/projects/template3', {
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
        const errorData = await res.json();
        setErrors({ form: errorData.error || 'Failed to create project' });
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
        aria-label="Create Template 3 Project Form"
      >
        {/* Project Type Select */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Project Type</span>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white appearance-none cursor-pointer bg-gradient-to-r from-[#f6ff7a] to-[#AAB418] bg-[length:0%_2px] bg-no-repeat bg-bottom hover:bg-[length:100%_2px] focus:bg-[length:100%_2px]"
              required
              aria-invalid={!!errors.type}
              aria-describedby={errors.type ? "type-error" : undefined}
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
            {errors.type && (
              <span id="type-error" className="text-red-400 text-sm mt-1">{errors.type}</span>
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
              placeholder="e.g., Brightwheel"
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
              placeholder="e.g., Combining SaaS, Consumer & Payments"
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
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#f6ff7a] file:text-black file:font-bold hover:file:bg-[#AAB418]"
              aria-describedby="thumbnailImage-note"
            />
            <span id="thumbnailImage-note" className="text-gray-400 text-sm mt-1">
              Optional image for project thumbnail (defaults to placeholder if not provided).
            </span>
          </label>
        </motion.div>

        {/* Tagline */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Tagline</span>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="e.g., Building the #1 early education platform"
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white"
              required
              aria-invalid={!!errors.tagline}
              aria-describedby={errors.tagline ? "tagline-error" : undefined}
            />
            {errors.tagline && (
              <span id="tagline-error" className="text-red-400 text-sm mt-1">{errors.tagline}</span>
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
              placeholder="e.g., Brightwheel is the leading platform for early education..."
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
              placeholder="e.g., We’re happy with the quality of the service..."
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
              placeholder="e.g., Julie DeLoyd"
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
              placeholder="e.g., President, Brightwheel"
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white"
            />
          </label>
        </motion.div>

        {/* Challenges */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Challenges</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={newChallenge}
                onChange={(e) => setNewChallenge(e.target.value)}
                placeholder="e.g., Scale engineering operations"
                className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white flex-1"
              />
              <button
                type="button"
                onClick={() => {
                  if (newChallenge.trim()) {
                    setFormData({
                      ...formData,
                      challenges: [...formData.challenges, newChallenge.trim()],
                    });
                    setNewChallenge('');
                  }
                }}
                className="bg-[#f6ff7a] text-black px-4 py-2 rounded-lg hover:bg-[#AAB418] font-bold"
              >
                Add
              </button>
            </div>
            <AnimatePresence>
              {formData.challenges.map((challenge, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-2 mt-2 bg-[#242425] p-2 rounded-lg"
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <span className="flex-1 text-gray-200">● {challenge}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        challenges: formData.challenges.filter((_, i) => i !== idx),
                      })
                    }
                    className="text-red-400 hover:text-red-600"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {errors.challenges && (
              <span className="text-red-400 text-sm mt-1">{errors.challenges}</span>
            )}
          </label>
        </motion.div>

        {/* Actions */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Actions</span>
            <div className="flex gap-2">
              <textarea
                value={newAction}
                onChange={(e) => setNewAction(e.target.value)}
                placeholder="e.g., Enlisted senior React JS developers..."
                className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white flex-1 min-h-[80px]"
              />
              <button
                type="button"
                onClick={() => {
                  if (newAction.trim()) {
                    setFormData({
                      ...formData,
                      actions: [...formData.actions, newAction.trim()],
                    });
                    setNewAction('');
                  }
                }}
                className="bg-[#f6ff7a] text-black px-4 py-2 rounded-lg hover:bg-[#AAB418] font-bold"
              >
                Add
              </button>
            </div>
            <AnimatePresence>
              {formData.actions.map((action, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-2 mt-2 bg-[#242425] p-2 rounded-lg"
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <span className="flex-1 text-gray-200">● {action}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        actions: formData.actions.filter((_, i) => i !== idx),
                      })
                    }
                    className="text-red-400 hover:text-red-600"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {errors.actions && (
              <span className="text-red-400 text-sm mt-1">{errors.actions}</span>
            )}
          </label>
        </motion.div>

        {/* Results */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">Results</span>
            <div className="flex gap-2">
              <textarea
                value={newResult}
                onChange={(e) => setNewResult(e.target.value)}
                placeholder="e.g., Ranked as the leading childcare software..."
                className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white flex-1 min-h-[80px]"
              />
              <button
                type="button"
                onClick={() => {
                  if (newResult.trim()) {
                    setFormData({
                      ...formData,
                      results: [...formData.results, newResult.trim()],
                    });
                    setNewResult('');
                  }
                }}
                className="bg-[#f6ff7a] text-black px-4 py-2 rounded-lg hover:bg-[#AAB418] font-bold"
              >
                Add
              </button>
            </div>
            <AnimatePresence>
              {formData.results.map((result, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-2 mt-2 bg-[#242425] p-2 rounded-lg"
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <span className="flex-1 text-gray-200">● {result}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        results: formData.results.filter((_, i) => i !== idx),
                      })
                    }
                    className="text-red-400 hover:text-red-600"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {errors.results && (
              <span className="text-red-400 text-sm mt-1">{errors.results}</span>
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
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#f6ff7a] file:text-black file:font-bold hover:file:bg-[#AAB418]"
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
            <span className="text-[1.2em] font-semibold text-gray-200">Challenge Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  images: { ...formData.images, challenge: e.target.files![0] },
                })
              }
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#f6ff7a] file:text-black file:font-bold hover:file:bg-[#AAB418]"
              required
              aria-invalid={!!errors.challenge}
              aria-describedby={errors.challenge ? "challenge-error" : undefined}
            />
            {errors.challenge && (
              <span id="challenge-error" className="text-red-400 text-sm mt-1">{errors.challenge}</span>
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
          Save and Preview
        </motion.button>
      </form>

      {/* Preview Section */}
      {/* {formData.name && (
        <motion.div
          className="mt-12 max-w-2xl mx-auto bg-[#242425] p-7 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[2em] font-semibold text-gray-200 mb-4">Preview</h2>
          <div className="flex flex-col gap-4">
            <h3 className="text-[1.5em] font-bold text-gray-200">{formData.name}</h3>
            <p className="text-gray-400">Thumbnail Text: {formData.thumbnailText}</p>
            {formData.thumbnailImage && (
              <img src={URL.createObjectURL(formData.thumbnailImage)} alt="Thumbnail Preview" className="w-full h-48 object-cover rounded-lg" />
            )}
            <p className="text-gray-400">{formData.tagline}</p>
            <p className="text-gray-400">Client: {formData.clientAbout}</p>
            {formData.quote.text && (
              <blockquote className="border-l-4 border-[#f6ff7a] pl-4 italic text-gray-200">
                "{formData.quote.text}" - {formData.quote.author}, {formData.quote.position}
              </blockquote>
            )}
            <div>
              <p className="text-gray-400 font-semibold">Challenges:</p>
              <ul className="list-disc ml-6 text-gray-400">
                {formData.challenges.map((challenge, idx) => (
                  <li key={idx}>{challenge}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-gray-400 font-semibold">Actions:</p>
              <ul className="ml-6 text-gray-400">
                {formData.actions.map((action, idx) => (
                  <li key={idx}>● {action}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-gray-400 font-semibold">Results:</p>
              <ul className="ml-6 text-gray-400">
                {formData.results.map((result, idx) => (
                  <li key={idx}>● {result}</li>
                ))}
              </ul>
            </div>
            {formData.images.hero && (
              <img src={URL.createObjectURL(formData.images.hero)} alt="Hero Preview" className="w-full h-48 object-cover rounded-lg mt-4" />
            )}
            {formData.images.challenge && (
              <img src={URL.createObjectURL(formData.images.challenge)} alt="Challenge Preview" className="w-full h-48 object-cover rounded-lg mt-4" />
            )}
          </div>
        </motion.div>
      )} */}
    </div>
  );
}