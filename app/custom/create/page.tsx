// app/custom/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomContentForm from '@/components/templates/CustomTemplate';


export default function CreateCustomTemplate() {
  const [title, setTitle] = useState('');
  const [thumbnailText, setThumbnailText] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
  const [contentBlocks, setContentBlocks] = useState<
    { type: string; content: string | File; order: number }[]
  >([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    contentBlocks.forEach((block, idx) => {
      if (block.type === 'image' || block.type === 'video') {
        formData.append(`file-${idx}`, block.content as File);
      } else {
        formData.append(`block-${idx}`, JSON.stringify(block));
      }
    });
    formData.append('title', title);
    formData.append('thumbnailText', thumbnailText);
    if (thumbnailImage) {
      formData.append('thumbnailImage', thumbnailImage);
    }
    formData.append('blockCount', contentBlocks.length.toString());

    const res = await fetch('/api/projects/custom', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const { id } = await res.json();
      router.push(`/templates/custom/${id}`);
    }
  };

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-[3em] font-bold mb-6">Create Custom Template</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project Title"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          value={thumbnailText}
          onChange={(e) => setThumbnailText(e.target.value)}
          placeholder="Thumbnail Text"
          className="p-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnailImage(e.target.files?.[0] || null)}
          className="p-2 border rounded"
        />
        <CustomContentForm
          contentBlocks={contentBlocks}
          setContentBlocks={setContentBlocks}
        />
        <button type="submit" className="bg-black text-white py-2 px-4 rounded">
          Save and Preview
        </button>
      </form>
    </div>
  );
}