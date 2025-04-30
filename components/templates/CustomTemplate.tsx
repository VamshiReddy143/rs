// @/components/templates/CustomTemplate.tsx
'use client';

import { Dispatch, SetStateAction } from 'react';

interface ContentBlock {
  type: string;
  content: string | File;
  order: number;
}

interface CustomContentFormProps {
  contentBlocks: ContentBlock[];
  setContentBlocks: Dispatch<SetStateAction<ContentBlock[]>>;
}

export default function CustomContentForm({ contentBlocks, setContentBlocks }: CustomContentFormProps) {
  const addBlock = (type: string) => {
    setContentBlocks([
      ...contentBlocks,
      { type, content: type === 'image' || type === 'video' ? new File([], '') : '', order: contentBlocks.length },
    ]);
  };

  const updateBlock = (index: number, field: 'content' | 'type', value: string | File) => {
    const updatedBlocks = [...contentBlocks];
    updatedBlocks[index] = { ...updatedBlocks[index], [field]: value };
    setContentBlocks(updatedBlocks);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => addBlock('heading')}
          className="bg-gray-200 py-1 px-3 rounded"
        >
          Add Heading
        </button>
        <button
          type="button"
          onClick={() => addBlock('paragraph')}
          className="bg-gray-200 py-1 px-3 rounded"
        >
          Add Paragraph
        </button>
        <button
          type="button"
          onClick={() => addBlock('bullet')}
          className="bg-gray-200 py-1 px-3 rounded"
        >
          Add Bullet
        </button>
        <button
          type="button"
          onClick={() => addBlock('image')}
          className="bg-gray-200 py-1 px-3 rounded"
        >
          Add Image
        </button>
        <button
          type="button"
          onClick={() => addBlock('video')}
          className="bg-gray-200 py-1 px-3 rounded"
        >
          Add Video
        </button>
      </div>

      {contentBlocks?.map((block, index) => (
        <div key={index} className="border p-4 rounded">
          <select
            value={block.type}
            onChange={(e) => updateBlock(index, 'type', e.target.value)}
            className="mb-2 p-2 border rounded"
          >
            <option value="heading">Heading</option>
            <option value="paragraph">Paragraph</option>
            <option value="bullet">Bullet</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>

          {block.type === 'image' || block.type === 'video' ? (
            <input
              type="file"
              accept={block.type === 'image' ? 'image/*' : 'video/*'}
              onChange={(e) => updateBlock(index, 'content', e.target.files?.[0] || new File([], ''))}
              className="p-2 border rounded w-full"
            />
          ) : (
            <input
              type="text"
              value={typeof block.content === 'string' ? block.content : ''}
              onChange={(e) => updateBlock(index, 'content', e.target.value)}
              placeholder={`Enter ${block.type} content`}
              className="p-2 border rounded w-full"
            />
          )}
        </div>
      ))}
    </div>
  );
}