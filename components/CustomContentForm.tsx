'use client';

import { useState } from 'react';

interface ContentBlock {
  type: string;
  content: string | File;
  order: number;
}

interface CustomContentFormProps {
  contentBlocks: ContentBlock[];
  setContentBlocks: React.Dispatch<React.SetStateAction<ContentBlock[]>>;
}

const CustomContentForm: React.FC<CustomContentFormProps> = ({
  contentBlocks,
  setContentBlocks,
}) => {
  const [type, setType] = useState('heading');
  const [content, setContent] = useState<string | File>('');

  const handleAddBlock = () => {
    if (!content) return;

    setContentBlocks((prev) => [
      ...prev,
      { type, content, order: prev.length },
    ]);
    setContent('');
  };

  return (
    <div className="flex flex-col gap-4">
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="heading">Heading</option>
        <option value="paragraph">Paragraph</option>
        <option value="bullet">Bullet Point</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>
      {type === 'image' || type === 'video' ? (
        <input
          type="file"
          accept={type === 'image' ? 'image/*' : 'video/*'}
          onChange={(e) => setContent(e.target.files![0])}
          className="p-2 border rounded"
        />
      ) : (
        <textarea
          value={typeof content === 'string' ? content : ''}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="p-2 border rounded"
        />
      )}
      <button
        type="button"
        onClick={handleAddBlock}
        className="bg-gray-700 text-white py-2 px-4 rounded"
      >
        Add Block
      </button>
      <div>
        {contentBlocks.map((block, idx) => (
          <div key={idx} className="p-2 border-b">
            <p>Type: {block.type}</p>
            <p>
              Content:{' '}
              {typeof block.content === 'string'
                ? block.content
                : block.content.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomContentForm;