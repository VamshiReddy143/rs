import { Template } from './types';

export const projectTemplates: Template[] = [
  {
    id: 'modern',
    name: 'Modern Card',
    fields: [
      { name: 'title', type: 'text', label: 'Project Title', required: true },
      { name: 'description', type: 'textarea', label: 'Description', required: true },
      { name: 'image', type: 'image', label: 'Project Image', required: true },
    ],
    style: {
      cardClass: 'bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300',
      imageClass: 'w-full h-64 object-cover',
      titleClass: 'text-2xl font-bold text-gray-800 p-4',
      descriptionClass: 'text-gray-600 p-4',
      previewImage: '/preview-modern.jpg',
    },
  },
  {
    id: 'minimal',
    name: 'Minimal Showcase',
    fields: [
      { name: 'title', type: 'text', label: 'Project Title', required: true },
      { name: 'description', type: 'textarea', label: 'Description', required: true },
    ],
    style: {
      cardClass: 'bg-gray-100 border border-gray-200 rounded-md p-4 hover:shadow-lg transition-shadow duration-300',
      imageClass: 'w-full h-48 object-cover rounded-md',
      titleClass: 'text-xl font-semibold text-gray-900',
      descriptionClass: 'text-gray-500',
      previewImage: '/preview-minimal.jpg',
    },
  },
  {
    id: 'bold',
    name: 'Bold Highlight',
    fields: [
      { name: 'title', type: 'text', label: 'Project Title', required: true },
      { name: 'image', type: 'image', label: 'Project Image', required: true },
    ],
    style: {
      cardClass: 'bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300',
      imageClass: 'w-full h-56 object-cover rounded-t-lg',
      titleClass: 'text-3xl font-extrabold',
      descriptionClass: 'text-white/80 p-4',
      previewImage: '/preview-bold.jpg',
    },
  },
  {
    id: 'creative',
    name: 'Creative Grid',
    fields: [
      { name: 'title', type: 'text', label: 'Project Title', required: true },
      { name: 'description', type: 'textarea', label: 'Description', required: true },
      { name: 'image1', type: 'image', label: 'Primary Image', required: true },
      { name: 'image2', type: 'image', label: 'Secondary Image', required: false },
      { name: 'image3', type: 'image', label: 'Tertiary Image', required: false },
    ],
    style: {
      cardClass: 'bg-yellow-50 rounded-xl p-5',
      imageClass: 'w-full h-60 object-cover rounded-lg',
      titleClass: 'text-2xl font-bold text-yellow-800',
      descriptionClass: 'text-gray-700 p-4',
      previewImage: '/preview-creative.jpg',
    },
  },
  {
    id: 'professional',
    name: 'Professional Portfolio',
    fields: [
      { name: 'title', type: 'text', label: 'Project Title', required: true },
      { name: 'description', type: 'textarea', label: 'Description', required: true },
    ],
    style: {
      cardClass: 'bg-gray-800 text-white rounded-lg p-6 hover:shadow-xl transition-shadow duration-300',
      imageClass: 'w-full h-64 object-cover rounded-t-lg',
      titleClass: 'text-2xl font-semibold',
      descriptionClass: 'text-gray-300 p-4',
      previewImage: '/preview-professional.jpg',
    },
  },
];

export const availableAnimations = [
  { id: 'fadeInUp', name: 'Fade In Up' },
  { id: 'slideInLeft', name: 'Slide In Left' },
  { id: 'zoomIn', name: 'Zoom In' },
  { id: 'bounceIn', name: 'Bounce In' },
  { id: 'fadeInRight', name: 'Fade In Right' },
  { id: 'creativeWave', name: 'Creative Wave (Creative Grid Only)' },
];