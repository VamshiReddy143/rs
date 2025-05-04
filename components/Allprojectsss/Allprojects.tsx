'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { GrAddCircle, GrTrash, GrDrag } from 'react-icons/gr';
import { AiOutlineStar, AiFillStar, AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface UnifiedProject {
  _id: string;
  title: string;
  thumbnailText: string;
  image?: string | null;
  model: 'Project' | 'Template3Project' | 'CustomContent';
  isFeatured: boolean;
  order: number;
}

const SortableProject: React.FC<{
  project: UnifiedProject;
  index: number;
  onDelete: (id: string, model: string) => void;
  onToggleFeatured: (id: string, model: string, isFeatured: boolean) => void;
  section: 'featured' | 'all';
}> = ({ project, index, onDelete, onToggleFeatured, section }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `${section}-${project.model}-${project._id}`,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 100 : 0,
    boxShadow: isDragging ? '0 8px 16px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: isDragging ? '2px solid #f6ff7a' : '1px solid #3d3d3f',
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-[#242425] p-4 rounded-xl shadow-lg relative pb-[4em] touch-manipulation">
      <Link href={`/projects/${project._id}`} aria-label={`View ${project.title}`}>
        <div className="flex flex-col gap-4">
          <div className="relative w-full h-32 sm:h-40">
            <Image
              src={project.image || '/default-project-image.png'}
              alt={project.title}
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-[#f6ff7a]">{project.title}</h3>
            <p className="text-gray-400 text-xs sm:text-sm line-clamp-2">{project.thumbnailText}</p>
            <p className="text-gray-400 text-xs mt-1">Model: {project.model}</p>
          </div>
        </div>
      </Link>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFeatured(project._id, project.model, project.isFeatured);
        }}
        className={`absolute top-2 right-2 p-1 sm:p-2 bg-[#242425] rounded-lg ${
          project.isFeatured ? 'text-[#AAB418]' : 'text-[#f6ff7a]'
        }`}
        aria-label={project.isFeatured ? `Remove ${project.title} from featured` : `Add ${project.title} to featured`}
      >
        {project.isFeatured ? <AiFillStar size={20} /> : <AiOutlineStar size={20} />}
      </motion.button>
      <div className="flex justify-between items-center absolute bottom-4 left-4 right-4">
        <div
          {...attributes}
          {...listeners}
          className="p-2 bg-[#3d3d3f] rounded-full cursor-grab active:cursor-grabbing touch-manipulation"
          aria-label={`Drag to reorder ${project.title}`}
        >
          <GrDrag size={20} className="text-[#f6ff7a]" />
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(project._id, project.model);
          }}
          className="p-1 sm:p-2 bg-red-600 text-white rounded-full hover:bg-red-500"
          aria-label={`Delete ${project.title}`}
        >
          <GrTrash size={14} />
        </motion.button>
      </div>
    </div>
  );
};

const Pagination: React.FC<{
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPageButtons = 5;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 1) {
      pages.unshift('...');
      pages.unshift(1);
    }
    if (endPage < totalPages) {
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-lg text-sm sm:text-base ${
          currentPage === 1 ? 'bg-[#3d3d3f] text-gray-400 cursor-not-allowed' : 'bg-[#3d3d3f] text-[#f6ff7a] hover:bg-[#4a4a4c]'
        }`}
        aria-label="Previous page"
      >
        Prev
      </motion.button>
      {getPageNumbers().map((page, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={`px-3 py-1 rounded-lg text-sm sm:text-base ${
            page === currentPage
              ? 'bg-[#f6ff7a] text-black font-semibold'
              : typeof page === 'number'
              ? 'bg-[#3d3d3f] text-[#f6ff7a] hover:bg-[#4a4a4c]'
              : 'bg-[#242425] text-gray-400 cursor-default'
          }`}
          disabled={typeof page !== 'number'}
          aria-label={typeof page === 'number' ? `Page ${page}` : 'Ellipsis'}
        >
          {page}
        </motion.button>
      ))}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-lg text-sm sm:text-base ${
          currentPage === totalPages ? 'bg-[#3d3d3f] text-gray-400 cursor-not-allowed' : 'bg-[#3d3d3f] text-[#f6ff7a] hover:bg-[#4a4a4c]'
        }`}
        aria-label="Next page"
      >
        Next
      </motion.button>
    </div>
  );
};

const ProjectsDashboard: React.FC = () => {
  const [projects, setProjects] = useState<UnifiedProject[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<UnifiedProject[]>([]);
  const [allProjects, setAllProjects] = useState<UnifiedProject[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{ id: string; model: string } | null>(null);
  const [featuredPage, setFeaturedPage] = useState(1);
  const [allPage, setAllPage] = useState(1);
  const itemsPerPage = 6;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/projects/allprojects');
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        const sortedData = data.sort((a: UnifiedProject, b: UnifiedProject) => a.order - b.order);
        setProjects(sortedData);
        setFeaturedProjects(
          sortedData
            .filter((p: UnifiedProject) => p.isFeatured)
            .sort((a: UnifiedProject, b: UnifiedProject) => a.order - b.order)
        );
        setAllProjects(
          sortedData
            .filter((p: UnifiedProject) => !p.isFeatured)
            .sort((a: UnifiedProject, b: UnifiedProject) => a.order - b.order)
        );
      } catch (err) {
        toast.error('Failed to load projects', { theme: 'dark' });
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const filteredFeatured = projects
      .filter((p) => p.isFeatured)
      .filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.thumbnailText.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => a.order - b.order);
    const filteredAll = projects
      .filter((p) => !p.isFeatured)
      .filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.thumbnailText.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => a.order - b.order);
    setFeaturedProjects(filteredFeatured);
    setAllProjects(filteredAll);
    setFeaturedPage(1);
    setAllPage(1);
  }, [searchQuery, projects]);

  const handleDeleteProject = async (id: string, model: string) => {
    setLoading(true);
    try {
      let endpoint: string;
      switch (model) {
        case 'Project':
          endpoint = `/api/projects/template1/${id}`;
          break;
        case 'Template3Project':
          endpoint = `/api/projects/template3/${id}`;
          break;
        case 'CustomContent':
          endpoint = `/api/projects/custom/${id}`;
          break;
        default:
          throw new Error('Invalid model type');
      }

      const response = await fetch(endpoint, { method: 'DELETE' });
      if (!response.ok) throw new Error(`Failed to delete ${model}: ${await response.text()}`);

      setProjects((prev) => prev.filter((project) => project._id !== id));
      setFeaturedProjects((prev) => prev.filter((project) => project._id !== id));
      setAllProjects((prev) => prev.filter((project) => project._id !== id));
      toast.success(`${model} deleted successfully!`, { theme: 'dark' });
      setShowDeleteConfirm(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Error: ${message}`, { theme: 'dark' });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeatured = async (id: string, model: string, isFeatured: boolean) => {
    try {
      const response = await fetch('/api/projects/feature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, model, isFeatured: !isFeatured }),
      });
      if (!response.ok) throw new Error(`Failed to update featured status: ${await response.text()}`);

      setProjects((prev) => {
        const updatedProjects = prev.map((project) =>
          project._id === id
            ? {
                ...project,
                isFeatured: !isFeatured,
                order: !isFeatured ? 0 : prev.filter((p) => !p.isFeatured).length,
              }
            : project
        );
        setFeaturedProjects(
          updatedProjects.filter((p) => p.isFeatured).sort((a, b) => a.order - b.order)
        );
        setAllProjects(
          updatedProjects.filter((p) => !p.isFeatured).sort((a, b) => a.order - b.order)
        );
        return updatedProjects;
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Error: ${message}`, { theme: 'dark' });
    }
  };

  const handleDragEnd = async (event: any, section: 'featured' | 'all') => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const projectsInSection = section === 'featured' ? featuredProjects : allProjects;
    const oldIndex = projectsInSection.findIndex((p) => `${section}-${p.model}-${p._id}` === active.id);
    const newIndex = projectsInSection.findIndex((p) => `${section}-${p.model}-${p._id}` === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      console.warn('Invalid drag indices:', { section, oldIndex, newIndex, activeId: active.id, overId: over.id });
      return;
    }

    const reorderedProjects = arrayMove(projectsInSection, oldIndex, newIndex).map((project, index) => ({
      ...project,
      order: index,
    }));

    if (section === 'featured') {
      setFeaturedProjects(reorderedProjects);
    } else {
      setAllProjects(reorderedProjects);
    }

    const updatedProjects = projects.map((p) => {
      const updatedProject = reorderedProjects.find((rp) => rp._id === p._id);
      return updatedProject || p;
    });

    setProjects(updatedProjects);

    try {
      const response = await fetch('/api/projects/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects: updatedProjects }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to save project order: ${errorText}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('Reorder error:', message);
      toast.error(`Error: ${message}`, { theme: 'dark' });
      setFeaturedProjects(projects.filter((p) => p.isFeatured).sort((a, b) => a.order - b.order));
      setAllProjects(projects.filter((p) => !p.isFeatured).sort((a, b) => a.order - b.order));
    }
  };

  const getPaginatedItems = (items: UnifiedProject[], page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div
      style={{ fontFamily: 'Poppins, sans-serif' }}
      className="min-h-screen bg-[#191a1b] text-white px-4 sm:px-6 lg:px-4"
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick theme="dark" />

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-[#242425] p-4 sm:p-6 rounded-xl w-full max-w-md sm:max-w-lg shadow-xl border border-[#3d3d3f]"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-[#f6ff7a] mb-4">Confirm Deletion</h2>
            <p className="text-gray-200 mb-6 text-xs sm:text-sm">
              Are you sure you want to delete this {showDeleteConfirm.model}? This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDeleteProject(showDeleteConfirm.id, showDeleteConfirm.model)}
                disabled={loading}
                className="flex-1 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 disabled:opacity-50 text-sm sm:text-base"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-2 bg-[#3d3d3f] text-white font-bold rounded-lg hover:bg-[#4a4a4c] text-sm sm:text-base"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="max-w-full sm:max-w-3xl lg:max-w-4xl mx-auto bg-[#191a1b] rounded-xl p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-7">
          <h2 className="text-xl sm:text-2xl font-bold text-[#f6ff7a]">Projects</h2>
          <div className="relative flex-1 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 sm:p-3 bg-[#242425] text-white rounded-lg border border-[#3d3d3f] focus:outline-none focus:border-b-2 focus:border-b-[#f6ff7a] focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent placeholder-gray-400 text-sm sm:text-base"
              style={{ fontFamily: 'Poppins, sans-serif' }}
              aria-label="Search projects"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#f6ff7a]"
                title="Clear search"
                aria-label="Clear search"
              >
                <AiOutlineClose size={14} className="" />
              </button>
            )}
          </div>
          <Link href="/SelectTemplate">
            <motion.div className="cursor-pointer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <GrAddCircle size={30} color="#f6ff7a" />
            </motion.div>
          </Link>
        </div>

        <div className="mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-semibold text-[#f6ff7a] mb-4">Featured Projects</h3>
          <DndContext
            id="featured"
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(event) => handleDragEnd(event, 'featured')}
          >
            <SortableContext items={getPaginatedItems(featuredProjects, featuredPage).map((p) => `featured-${p.model}-${p._id}`)}>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {getPaginatedItems(featuredProjects, featuredPage).length === 0 ? (
                  <div className="bg-[#242425] p-4 sm:p-6 rounded-xl text-gray-400 text-xs sm:text-sm text-center shadow-lg border border-[#3d3d3f] col-span-full">
                    No featured projects. Star a project to showcase it here.
                  </div>
                ) : (
                  getPaginatedItems(featuredProjects, featuredPage).map((project, index) => (
                    <SortableProject
                      key={`featured-${project.model}-${project._id}`}
                      project={project}
                      index={index}
                      onDelete={() => setShowDeleteConfirm({ id: project._id, model: project.model })}
                      onToggleFeatured={handleToggleFeatured}
                      section="featured"
                    />
                  ))
                )}
              </div>
            </SortableContext>
          </DndContext>
          <Pagination
            currentPage={featuredPage}
            totalItems={featuredProjects.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setFeaturedPage}
          />
        </div>

        <div className="mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-semibold text-[#f6ff7a] mb-4">All Projects</h3>
          {loading ? (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#242425] p-4 rounded-xl shadow-lg animate-pulse">
                  <div className="relative w-full h-32 sm:h-40 bg-gray-700 rounded-lg mb-4"></div>
                  <div className="h-4 sm:h-5 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 sm:h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : allProjects.length === 0 ? (
            <div className="bg-[#242425] p-4 sm:p-6 rounded-xl text-gray-400 text-xs sm:text-sm text-center shadow-lg border border-[#3d3d3f]">
              No projects found.
            </div>
          ) : (
            <DndContext
              id="all"
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event) => handleDragEnd(event, 'all')}
            >
              <SortableContext items={getPaginatedItems(allProjects, allPage).map((p) => `all-${p.model}-${p._id}`)}>
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {getPaginatedItems(allProjects, allPage).map((project, index) => (
                    <SortableProject
                      key={`all-${project.model}-${project._id}`}
                      project={project}
                      index={index}
                      onDelete={() => setShowDeleteConfirm({ id: project._id, model: project.model })}
                      onToggleFeatured={handleToggleFeatured}
                      section="all"
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
          <Pagination
            currentPage={allPage}
            totalItems={allProjects.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setAllPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectsDashboard;