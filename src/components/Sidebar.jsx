import React from 'react';
import { useDrag } from 'react-dnd';
import TextBlockIcon from '../icons/TextBlockIcon';
import MarkdownBlockIcon from '../icons/MarkdownBlockIcon';
import HeaderBlockIcon from '../icons/HeaderBlockIcon';

const BlockItem = ({ type, label, icon: Icon }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'block',
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-6 rounded-xl cursor-grab active:cursor-grabbing transition-all duration-200 group hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-blue-200 bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 ${
        isDragging ? 'opacity-50 scale-95' : ''
      }`}
    >
      <div className="flex items-center space-x-4">
        
        {/* ✅ FIXED ICON BOX */}
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
          <div className="text-white text-xl flex items-center justify-center">
            <Icon />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{label}</h3>
          <p className="text-sm text-gray-500">Drag to canvas</p>
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        
        {/* HEADER */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-lg">🧩</span>
          </div>
          <span>Block Palette</span>
        </h2>

        {/* BLOCK LIST */}
        <div className="space-y-4">
          
          <BlockItem
            type="header"
            label="Header"
            icon={HeaderBlockIcon}
          />

          <BlockItem
            type="text"
            label="Rich Text"
            icon={TextBlockIcon}
          />

          <BlockItem
            type="image"
            label="Image"
            icon={() => <span>🖼️</span>}   // ✅ emoji safe
          />

          <BlockItem
            type="markdown"
            label="Markdown"
            icon={MarkdownBlockIcon}
          />

        </div>
      </div>
    </div>
  );
};

export default Sidebar;