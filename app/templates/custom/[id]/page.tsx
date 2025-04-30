// app/templates/custom/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { ICustomContent } from "@/types";
import CustomTemplateOriginal from '@/components/templates/CustomTemplate';
import { ComponentType } from 'react';

interface CustomTemplateProps {
  content: ICustomContent;
}

// Explicitly type CustomTemplate to avoid import conflict
// Safer type assertion to enforce correct props
const CustomTemplate = CustomTemplateOriginal as unknown as ComponentType<CustomTemplateProps>;

export default function CustomProjectPage(context: any) {
  const { id } = context.params;
  const [project, setProject] = useState<ICustomContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/custom/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch project: ${res.status}`);
        }
        const data: ICustomContent = await res.json();
        console.log("API response:", data); // Debug: Log the response
        setProject(data);
        setLoading(false);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load project");
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  if (error || !project) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error || "Project not found"}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <CustomTemplate content={project} />
    </div>
  );
}