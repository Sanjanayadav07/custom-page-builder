import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const MarkdownBlock = ({ data = {}, previewMode, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [value, setValue] = useState(
    data.content || '# Markdown Title\n\nWrite your markdown content here...'
  );

  const [color, setColor] = useState(data.color || "#000000");
  const [fontSize, setFontSize] = useState(data.fontSize || 16);
  const [align, setAlign] = useState(data.align || "left");

  useEffect(() => {
    setValue(data.content || '');
    setColor(data.color || "#000000");
    setFontSize(data.fontSize || 16);
    setAlign(data.align || "left");
  }, [data]);

  const handleSave = () => {
    onUpdate({
      content: value,
      color,
      fontSize,
      align
    });
    setIsEditing(false);
  };

  // 🔍 PREVIEW MODE
  if (previewMode) {
    return (
      <div
        className="bg-white rounded-2xl p-8 shadow-lg border prose max-w-none"
        style={{
          color,
          fontSize: `${fontSize}px`,
          textAlign: align,
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {value}
        </ReactMarkdown>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
      <div className="p-8">

        {isEditing ? (
          <div className="space-y-4">

            {/* TEXTAREA */}
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full h-64 p-4 border rounded-xl font-mono text-sm"
              placeholder="Write your markdown here..."
            />

            {/* 🎛️ CONTROLS */}
            <div className="flex flex-wrap gap-3 items-center">

              {/* Color */}
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />

              {/* Font Size */}
              <input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-20 border px-2 py-1 rounded"
              />

              {/* Alignment */}
              <select
                value={align}
                onChange={(e) => setAlign(e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>

            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
            </div>

          </div>
        ) : (
          <div onClick={() => setIsEditing(true)} className="cursor-pointer">

            {/* MARKDOWN PREVIEW */}
            <div
              className="prose max-w-none mb-4"
              style={{
                color,
                fontSize: `${fontSize}px`,
                textAlign: align,
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {value}
              </ReactMarkdown>
            </div>

            <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm">
              Edit Markdown
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default MarkdownBlock;