import React from 'react';
import { useDrop } from 'react-dnd';
import BlockRenderer from './BlockRenderer';
import CanvasDropZone from './CanvasDropZone';


const Canvas = ({
    blocks,
    previewMode,
    updateBlock,
    deleteBlock,
    moveBlock,
    addBlock,
    duplicateBlock
}) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'block',
        drop: (item) => {
            // Handle new block drop
            if (!previewMode) {
                console.log("Dropped:", item.type);
                addBlock(item.type);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }), [addBlock, previewMode]);

    const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);
    //const sortedBlocks = blocks.sort((a, b) => a.order - b.order);

    return (
        <div
            ref={drop}
            className={`bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl border overflow-hidden min-h-[600px] relative transition-all duration-300 ${isOver ? "border-blue-400 bg-blue-50" : "border-gray-200/50"
                }`}
        >
            <div className="canvas-content p-12">
                {isOver && !previewMode && (
                    <div className="drag-placeholder mx-auto text-center py-12 mb-8">
                        <div className="text-4xl mb-4">✨</div>
                        <p className="text-xl font-semibold text-gray-700 mb-2">Drop blocks here</p>
                        <p className="text-gray-500">Drag from the palette to start building</p>
                    </div>
                )}

                {sortedBlocks.length === 0 && !isOver && !previewMode && (
                    <div className="text-center py-24">
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Build your page</h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                            Drag blocks from the palette on the left to create your perfect page layout
                        </p>
                    </div>
                )}

                <div className="space-y-8 transition-all duration-300">
                    {sortedBlocks.map((block, index) => (
                        <div key={block.id}
                            className="transition-all duration-300 ease-in-out hover:scale-[1.01]"
                        >
                            {!previewMode && (
                                <CanvasDropZone
                                    index={index}
                                    onDrop={(targetIndex) => moveBlock(index, targetIndex)}
                                />
                            )}
                            <BlockRenderer
                                block={block}
                                previewMode={previewMode}
                                updateBlock={updateBlock}
                                deleteBlock={deleteBlock}
                                duplicateBlock={duplicateBlock} 
                            />
                        </div>
                    ))}

                    {!previewMode && sortedBlocks.length > 0 && (
                        <CanvasDropZone
                            index={sortedBlocks.length}
                            onDrop={(targetIndex) => moveBlock(sortedBlocks.length - 1, targetIndex)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Canvas;