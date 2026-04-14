import React, { useState, useEffect } from 'react';

const HeaderBlock = ({ data = {}, previewMode, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [level, setLevel] = useState(data.level || 1);
  const [text, setText] = useState(data.text || 'Your Header');

  const [color, setColor] = useState(data.color || "#000000");
  const [fontSize, setFontSize] = useState(data.fontSize || 32);
  const [bold, setBold] = useState(data.bold ?? true);
  const [align, setAlign] = useState(data.align || "left");

  useEffect(() => {
    setLevel(data.level || 1);
    setText(data.text || "Your Header");
    setColor(data.color || "#000000");
    setFontSize(data.fontSize || 32);
    setBold(data.bold ?? true);
    setAlign(data.align || "left");
  }, [data]);

  const handleSave = () => {
    onUpdate({ level, text, color, fontSize, bold, align });
    setIsEditing(false);
  };

  const Tag = `h${level}`;

  // 🔍 PREVIEW MODE
  if (previewMode) {
    return (
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg border">
        <Tag
          style={{
            color,
            fontSize: `${fontSize}px`,
            fontWeight: bold ? "bold" : "normal",
            textAlign: align,
          }}
          className="mb-4"
        >
          {text}
        </Tag>
        <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-24" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
      <div className="p-8">

        {isEditing ? (
          <div className="space-y-4">

            {/* Header Level */}
            <select
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              className="w-full p-2 border rounded"
            >
              <option value={1}>H1</option>
              <option value={2}>H2</option>
              <option value={3}>H3</option>
              <option value={4}>H4</option>
            </select>

            {/* Text */}
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 border rounded"
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

              {/* Bold */}
              <button
                onClick={() => setBold(!bold)}
                className={`px-2 py-1 border rounded ${bold ? "bg-gray-300" : ""}`}
              >
                B
              </button>

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

            {/* Buttons */}
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

            <Tag
              style={{
                color,
                fontSize: `${fontSize}px`,
                fontWeight: bold ? "bold" : "normal",
                textAlign: align,
              }}
              className="mb-4"
            >
              {text}
            </Tag>

            <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-24" />

            <button className="mt-4 px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm">
              Edit Header
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default HeaderBlock;