'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ContentBlock {
  type: 'heading' | 'paragraph' | 'bullet' | 'image' | 'video';
  content: string;
  order: number;
  file?: File | null;
}

interface ICustomContent {
  _id?: string;
  title: string;
  type?: 'AI' | 'Data Science' | 'Cloud' | 'React' | 'React Native' | 'Node.js' | 'Ruby on Rails';
  content: ContentBlock[];
  thumbnailText: string;
  thumbnailImage?: string;
  createdAt: Date;
  isFeatured?: boolean;
}

interface NewBlock {
  type: ContentBlock['type'];
  content: string;
  file: File | null;
}

export default function CreateCustomTemplate() {
  const [formData, setFormData] = useState<ICustomContent>({
    title: '',
    type: undefined,
    content: [],
    thumbnailImage: undefined,
    thumbnailText: '',
    createdAt: new Date(),
  });
  const [newBlock, setNewBlock] = useState<NewBlock>({
    type: 'paragraph',
    content: '',
    file: null,
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isThumbnailDraggingOver, setIsThumbnailDraggingOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectTypeOptions = [
    'AI',
    'Data Science',
    'Cloud',
    'React',
    'React Native',
    'Node.js',
    'Ruby on Rails',
  ];

  useEffect(() => {
    return () => {
      if (thumbnailFile) {
        URL.revokeObjectURL(URL.createObjectURL(thumbnailFile));
      }
      formData.content.forEach((block) => {
        if (block.file) {
          URL.revokeObjectURL(URL.createObjectURL(block.file));
        }
      });
    };
  }, [thumbnailFile, formData.content]);

  const validateField = (name: string, value: any): string => {
    if (name === 'title') {
      return value.trim() ? '' : 'Title is required';
    }
    if (name === 'type') {
      return value && projectTypeOptions.includes(value) ? '' : 'Project type is required';
    }
    if (name === 'thumbnailText') {
      return value.trim() ? '' : 'Thumbnail text is required';
    }
    if (name === 'thumbnailImage') {
      return thumbnailFile || formData.thumbnailImage ? '' : 'Thumbnail image is required';
    }
    if (name === 'content') {
      return value.length > 0 ? '' : 'At least one content block is required';
    }
    if (name === 'newBlockContent') {
      return newBlock.type === 'image' || newBlock.type === 'video'
        ? newBlock.file
          ? ''
          : `Please upload a ${newBlock.type} file`
        : value.trim()
        ? ''
        : 'Content cannot be empty';
    }
    return '';
  };

  const validateFile = (file: File, isThumbnail: boolean = false): string => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return 'File size must be less than 10MB';
    }
    if (isThumbnail && !['image/png', 'image/jpeg'].includes(file.type)) {
      return 'Only PNG or JPEG images are allowed';
    }
    if (!isThumbnail && newBlock.type === 'image' && !['image/png', 'image/jpeg'].includes(file.type)) {
      return 'Only PNG or JPEG images are allowed';
    }
    if (!isThumbnail && newBlock.type === 'video' && file.type !== 'video/mp4') {
      return 'Only MP4 videos are allowed';
    }
    return '';
  };

  const addBlock = () => {
    const contentError = validateField('newBlockContent', newBlock.content);
    const fileError = newBlock.file ? validateFile(newBlock.file) : newBlock.type === 'image' || newBlock.type === 'video' ? 'File is required' : '';

    if (contentError || fileError) {
      setErrors({ ...errors, newBlockContent: contentError || fileError });
      toast.error(contentError || fileError);
      return;
    }

    const block: ContentBlock = {
      type: newBlock.type,
      content: newBlock.type === 'image' || newBlock.type === 'video' ? (newBlock.file?.name || '') : newBlock.content,
      order: formData.content.length,
      file: newBlock.file,
    };

    setFormData({
      ...formData,
      content: [...formData.content, block],
    });

    setNewBlock({ type: 'paragraph', content: '', file: null });
    setErrors({ ...errors, newBlockContent: '' });
  };

  const removeBlock = (index: number) => {
    const blockToRemove = formData.content[index];
    if (blockToRemove.file) {
      URL.revokeObjectURL(URL.createObjectURL(blockToRemove.file));
    }
    setFormData({
      ...formData,
      content: formData.content.filter((_, i) => i !== index).map((block, idx) => ({
        ...block,
        order: idx,
      })),
    });
  };

  const handleFileDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const fileError = validateFile(file);
      if (fileError) {
        setErrors({ ...errors, newBlockContent: fileError });
        toast.error(fileError);
      } else {
        setNewBlock({ ...newBlock, file });
        setErrors({ ...errors, newBlockContent: '' });
      }
    }
  }, [newBlock, errors]);

  const handleThumbnailFileDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsThumbnailDraggingOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const fileError = validateFile(file, true);
      if (fileError) {
        setErrors({ ...errors, thumbnailImage: fileError });
        toast.error(fileError);
      } else {
        if (thumbnailFile) {
          URL.revokeObjectURL(URL.createObjectURL(thumbnailFile));
        }
        setThumbnailFile(file);
        setFormData({ ...formData, thumbnailImage: undefined });
        setErrors({ ...errors, thumbnailImage: '' });
      }
    }
  }, [errors, formData, thumbnailFile]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {
      title: validateField('title', formData.title),
      type: validateField('type', formData.type),
      thumbnailText: validateField('thumbnailText', formData.thumbnailText),
      thumbnailImage: validateField('thumbnailImage', formData.thumbnailImage),
      content: validateField('content', formData.content),
    };

    // Validate each content block
    formData.content.forEach((block, idx) => {
      if (!block.type || !['heading', 'paragraph', 'bullet', 'image', 'video'].includes(block.type)) {
        newErrors[`contentBlock${idx}`] = `Content block ${idx + 1}: Invalid type`;
      }
      if (!block.content && block.type !== 'image' && block.type !== 'video') {
        newErrors[`contentBlock${idx}`] = `Content block ${idx + 1}: Content cannot be empty`;
      }
      if ((block.type === 'image' || block.type === 'video') && !block.file) {
        newErrors[`contentBlock${idx}`] = `Content block ${idx + 1}: File is required`;
      }
    });

    setErrors(newErrors);

    const errorMessages = Object.values(newErrors).filter((error) => error);
    if (errorMessages.length > 0) {
      errorMessages.forEach((error) => toast.error(error));
      return;
    }

    const data = new FormData();
    data.append('data', JSON.stringify({
      title: formData.title,
      type: formData.type,
      thumbnailText: formData.thumbnailText,
      contentBlocks: formData.content.map((block) => ({
        type: block.type === 'image' || block.type === 'video' ? block.type : 'text',
        subtype: block.type === 'image' || block.type === 'video' ? undefined : block.type,
        content: block.content,
        order: block.order,
      })),
    }));

    formData.content.forEach((block, idx) => {
      if (block.file) {
        data.append(`file-${idx}`, block.file);
      }
    });

    if (thumbnailFile) {
      data.append('thumbnailImage', thumbnailFile);
    }

    // Log FormData for debugging
    console.log('FormData JSON:', JSON.stringify(JSON.parse(data.get('data') as string), null, 2));
    console.log('Files:', Array.from(data.entries()).filter(([key]) => key.startsWith('file-')).map(([key, file]) => ({ key, name: (file as File).name })));
    console.log('Thumbnail File:', thumbnailFile ? thumbnailFile.name : null);

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/projects/custom', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        toast.success('Project created successfully!');
        formData.content.forEach((block) => {
          if (block.file) {
            URL.revokeObjectURL(URL.createObjectURL(block.file));
          }
        });
        if (thumbnailFile) {
          URL.revokeObjectURL(URL.createObjectURL(thumbnailFile));
        }
        setFormData({
          title: '',
          type: undefined,
          content: [],
          thumbnailImage: undefined,
          thumbnailText: '',
          createdAt: new Date(),
        });
        setNewBlock({ type: 'paragraph', content: '', file: null });
        setThumbnailFile(null);
        setErrors({});
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || 'Failed to create project');
        setErrors({ form: errorData.error || 'Failed to create project' });
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
      setErrors({ form: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const blockVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
  };

  return (
    <div
      style={{ fontFamily: 'Poppins, sans-serif' }}
      className="min-h-screen bg-[#191a1b] text-white pt-[7em] pb-[2em] px-4 sm:px-6 lg:px-8"
    >
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover />
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
        aria-label="Create Custom Template Form"
      >
        {/* Project Type Select */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1">
            <span className="text-[1.2em] font-semibold text-gray-200">
              Project Type
              <span className="ml-2 text-gray-400 cursor-help" title="Select the type of project">ⓘ</span>
            </span>
            <select
              value={formData.type || ''}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, type: e.target.value as ICustomContent['type'] })}
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white"
              required
              aria-invalid={!!errors.type}
              aria-describedby={errors.type ? 'type-error' : undefined}
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

        {/* Title */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1 relative group">
            <span className="text-[1.2em] font-semibold text-gray-200">
              Project Title
              <span className="ml-2 text-gray-400 cursor-help" title="Enter a descriptive title for your project">ⓘ</span>
            </span>
            <input
              type="text"
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., My Custom Project"
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white"
              required
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && (
              <span id="title-error" className="text-red-400 text-sm mt-1">{errors.title}</span>
            )}
          </label>
        </motion.div>

        {/* Thumbnail Text */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <label className="flex flex-col gap-1 relative group">
            <span className="text-[1.2em] font-semibold text-gray-200">
              Thumbnail Text
              <span className="ml-2 text-gray-400 cursor-help" title="Describe the project for the thumbnail">ⓘ</span>
            </span>
            <textarea
              value={formData.thumbnailText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, thumbnailText: e.target.value })}
              placeholder="e.g., A platform for premium learning experiences"
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white min-h-[100px]"
              required
              aria-invalid={!!errors.thumbnailText}
              aria-describedby={errors.thumbnailText ? 'thumbnailText-error' : undefined}
            />
            {errors.thumbnailText && (
              <span id="thumbnailText-error" className="text-red-400 text-sm mt-1">{errors.thumbnailText}</span>
            )}
          </label>
        </motion.div>

        {/* Thumbnail Image */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <div className="flex flex-col gap-2 bg-[#3d3d3f] p-4 rounded-lg">
            <span className="text-[1.2em] font-semibold text-gray-200">
              Thumbnail Image
              <span className="ml-2 text-gray-400 cursor-help" title="Upload an image for the project thumbnail">ⓘ</span>
            </span>
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center ${isThumbnailDraggingOver ? 'border-[#f6ff7a] bg-[#3d3d3f]' : 'border-gray-700'}`}
              onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
                e.preventDefault();
                setIsThumbnailDraggingOver(true);
              }}
              onDragLeave={() => setIsThumbnailDraggingOver(false)}
              onDrop={handleThumbnailFileDrop}
            >
              <input
                type="file"
                id="thumbnail-upload"
                accept="image/png,image/jpeg"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setThumbnailFile(e.target.files ? e.target.files[0] : null)
                }
                className="hidden"
              />
              <label
                htmlFor="thumbnail-upload"
                className="cursor-pointer text-gray-400 hover:text-white"
              >
                {thumbnailFile ? (
                  <div className="flex flex-col items-center">
                    <p>{thumbnailFile.name}</p>
                    <Image
                      src={URL.createObjectURL(thumbnailFile)}
                      alt="Thumbnail Preview"
                      width={200}
                      height={200}
                      className="mt-2 max-w-[200px] rounded-lg"
                    />
                  </div>
                ) : (
                  <p>Drag and drop a PNG or JPEG image here or click to upload</p>
                )}
              </label>
              <p className="text-sm text-gray-500 mt-2">Max size: 10MB</p>
            </div>
            {errors.thumbnailImage && (
              <span className="text-red-400 text-sm mt-1">{errors.thumbnailImage}</span>
            )}
          </div>
        </motion.div>

        {/* Add Content Block */}
        <motion.div variants={inputVariants} initial="hidden" animate="visible">
          <div className="flex flex-col gap-2 bg-[#3d3d3f] p-4 rounded-lg">
            <span className="text-[1.2em] font-semibold text-gray-200">
              Add Content Block
              <span className="ml-2 text-gray-400 cursor-help" title="Choose a block type and add content or upload a file">ⓘ</span>
            </span>
            <select
              value={newBlock.type}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setNewBlock({ type: e.target.value as ContentBlock['type'], content: '', file: null })
              }
              className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white"
            >
              <option value="heading">Heading</option>
              <option value="paragraph">Paragraph</option>
              <option value="bullet">Bullet</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
            {newBlock.type === 'image' || newBlock.type === 'video' ? (
              <div
                className={`border-2 border-dashed rounded-lg p-4 text-center ${isDraggingOver ? 'border-[#f6ff7a] bg-[#3d3d3f]' : 'border-gray-700'}`}
                onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
                  e.preventDefault();
                  setIsDraggingOver(true);
                }}
                onDragLeave={() => setIsDraggingOver(false)}
                onDrop={handleFileDrop}
              >
                <input
                  type="file"
                  id="file-upload"
                  accept={newBlock.type === 'image' ? 'image/png,image/jpeg' : 'video/mp4'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewBlock({ ...newBlock, file: e.target.files ? e.target.files[0] : null })
                  }
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-gray-400 hover:text-white"
                >
                  {newBlock.file ? (
                    <div className="flex flex-col items-center">
                      <p>{newBlock.file.name}</p>
                      {newBlock.type === 'image' && (
                        <Image
                          src={URL.createObjectURL(newBlock.file)}
                          alt="Preview"
                          width={200}
                          height={200}
                          className="mt-2 max-w-[200px] rounded-lg"
                        />
                      )}
                    </div>
                  ) : (
                    <p>
                      Drag and drop {newBlock.type === 'image' ? 'an image (PNG/JPEG)' : 'a video (MP4)'} here or click to upload
                    </p>
                  )}
                </label>
                <p className="text-sm text-gray-500 mt-2">Max size: 10MB</p>
              </div>
            ) : (
              <textarea
                value={newBlock.content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewBlock({ ...newBlock, content: e.target.value })}
                placeholder={`Enter ${newBlock.type} content`}
                className="p-3 bg-[#3d3d3f] border-b-2 border-transparent rounded-t-lg focus:outline-none focus:border-[#f6ff7a] transition-all duration-300 text-white min-h-[100px]"
              />
            )}
            {errors.newBlockContent && (
              <span className="text-red-400 text-sm mt-1">{errors.newBlockContent}</span>
            )}
            <button
              type="button"
              onClick={addBlock}
              className="bg-[#f6ff7a] text-black py-2 px-4 rounded-lg hover:bg-[#AAB418] font-bold"
            >
              Add Block
            </button>
          </div>
        </motion.div>

        {/* Content Blocks List */}
        {formData.content.length > 0 ? (
          <div className="flex flex-col gap-4 w-full">
            <AnimatePresence>
              {formData.content.map((block, index) => (
                <motion.div
                  key={`block-${index}-${block.type}-${block.order}`}
                  className="flex items-center gap-2 bg-[#242425] p-4 rounded-lg max-w-full overflow-x-auto break-words"
                  variants={blockVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="flex-1">
                    <p className="font-semibold capitalize text-gray-200">{block.type}</p>
                    {block.type === 'image' || block.type === 'video' ? (
                      <div className="mt-2">
                        {block.file ? (
                          <div className="flex items-center gap-2">
                            <p className="text-gray-400">{block.file.name}</p>
                            {block.type === 'image' && (
                              <Image
                                src={URL.createObjectURL(block.file)}
                                alt="Preview"
                                width={100}
                                height={100}
                                className="max-w-[100px] rounded-lg"
                              />
                            )}
                          </div>
                        ) : (
                          <p className="text-gray-400">No file uploaded</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-400">{block.content}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeBlock(index)}
                    className="text-red-400 hover:text-red-600"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : null}
        {errors.content && (
          <span className="text-red-400 text-sm mt-1">{errors.content}</span>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          className={`bg-[#f6ff7a] text-black py-3 px-6 rounded-lg hover:bg-[#AAB418] focus:outline-none mt-6 font-bold flex items-center justify-center ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating...
            </>
          ) : (
            'Create Project'
          )}
        </motion.button>
      </form>
    </div>
  );
}