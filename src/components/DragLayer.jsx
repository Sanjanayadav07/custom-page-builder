import React from 'react';
import { useDragLayer } from 'react-dnd';

const DragLayer = () => {
  const { isDragging, currentOffset, itemType, item } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging) return null;

  return (
    <div
      className="drag-overlay"
      style={{
        transform: `translate(${currentOffset?.x || 0}px, ${currentOffset?.y || 0}px)`,
      }}
    >
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          {itemType === 'block' && (
            <span className="text-white font-bold text-sm">+ {item.type.toUpperCase()}</span>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Add {item?.type || 'Block'}</h3>
          <p className="text-sm text-gray-500">Drop to add to canvas</p>
        </div>
      </div>
    </div>
  );
};

export default DragLayer;