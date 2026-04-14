import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Header from './components/Header';
import DragLayer from './components/DragLayer';
import './index.css';

function App() {
  const [blocks, setBlocks] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('pageBuilderBlocks');
    if (saved) {
      setBlocks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pageBuilderBlocks', JSON.stringify(blocks));
  }, [blocks]);

  const addBlock = (blockType, initialData = {}) => {
    setBlocks((prev) => {
      const newBlock = {
        id: crypto.randomUUID(), // 🔥 UNIQUE ID
        type: blockType,
        data: initialData,
        order: prev.length + 1
      };
      return [...prev, newBlock];
    });
  };

  const updateBlock = (id, newData) => {
    setBlocks(blocks.map(block =>
      block.id === id ? { ...block, data: newData } : block
    ));
  };

  const deleteBlock = (id) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  const moveBlock = (fromIndex, toIndex) => {
    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);
    setBlocks(newBlocks);
  };

  const duplicateBlock = (block) => {
    setBlocks((prev) => {
      const newBlock = {
        ...block,
        id: crypto.randomUUID(), // better ID
        order: prev.length + 1
      };
      return [...prev, newBlock];
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header
          previewMode={previewMode}
          setPreviewMode={setPreviewMode}
          blockCount={blocks.length}
        />

        <div className="max-w-7xl mx-auto px-4 py-8 lg:px-8">
          <div className={`grid gap-8 ${previewMode ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-4"}`}>
            {!previewMode && (
              <Sidebar
                blocks={blocks}
                addBlock={addBlock}
              />
            )}

            <div className={previewMode ? "lg:col-span-4" : "lg:col-span-3"}>
              <Canvas
                blocks={blocks}
                previewMode={previewMode}
                updateBlock={updateBlock}
                deleteBlock={deleteBlock}
                moveBlock={moveBlock}
                addBlock={addBlock}
                duplicateBlock={duplicateBlock}
              />
            </div>
          </div>
        </div>
      </div>
      <DragLayer />
    </DndProvider>
  );
}

export default App;