import React from 'react';

const Header = ({ previewMode, setPreviewMode, blockCount }) => {
  const exportPage = () => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>My Custom Page</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-slate-50 to-blue-50 p-8">
  ${document.querySelector('.canvas-content')?.innerHTML || '<p>No content to export</p>'}
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-page.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Page Builder
            </h1>
            <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {blockCount} blocks
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={exportPage}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Export HTML
            </button>
            
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className={`px-4 py-2 font-medium rounded-lg transition-all duration-200 shadow-lg transform hover:-translate-y-0.5 ${
                previewMode
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {previewMode ? 'Edit Mode' : 'Preview'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;