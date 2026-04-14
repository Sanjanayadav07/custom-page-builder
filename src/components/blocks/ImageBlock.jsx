import React, { useState, useEffect } from 'react';

const ImageBlock = ({ data = {}, previewMode, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [imageUrl, setImageUrl] = useState(data.url || '');
  const [altText, setAltText] = useState(data.alt || 'Image description');

  useEffect(() => {
    setImageUrl(data.url || '');
    setAltText(data.alt || 'Image description');
  }, [data]);

  const handleSave = () => {
    onUpdate({ url: imageUrl, alt: altText });
    setIsEditing(false);
  };

  // 📁 HANDLE FILE UPLOAD
  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result); // base64 image
    };
    if (file) reader.readAsDataURL(file);
  };

  // 🔍 PREVIEW MODE
  if (previewMode) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={altText} className="w-full h-96 object-cover" />
        ) : (
          <div className="w-full h-96 flex items-center justify-center bg-gray-100">
            <p>No image</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
      <div className="p-6">

        {isEditing ? (
          <div className="space-y-4">

            {/* URL INPUT */}
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste image URL"
              className="w-full p-3 border rounded"
            />

            {/* 📁 FILE UPLOAD */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files[0])}
              className="w-full"
            />

            {/* ALT TEXT */}
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Alt text"
              className="w-full p-3 border rounded"
            />

            {/* PREVIEW */}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="preview"
                className="w-full h-48 object-cover rounded"
              />
            )}

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

            {imageUrl ? (
              <img
                src={imageUrl}
                alt={altText}
                className="w-full h-64 object-cover rounded mb-3"
              />
            ) : (
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded mb-3">
                <p>No image</p>
              </div>
            )}

            <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm">
              {imageUrl ? 'Edit Image' : 'Add Image'}
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default ImageBlock;