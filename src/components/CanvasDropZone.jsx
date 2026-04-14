import React from 'react';
import { useDrop } from 'react-dnd';

const CanvasDropZone = ({ index, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'block',
    drop: () => onDrop(index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [index, onDrop]);

  if (isOver) {
    return (
      <div ref={drop} className="drag-placeholder py-4 mx-12 my-2">
        Drop here
      </div>
    );
  }

  return <div ref={drop} />;
};

export default CanvasDropZone;