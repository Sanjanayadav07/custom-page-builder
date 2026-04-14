import React from 'react';
import HeaderBlock from './blocks/HeaderBlock';
import TextBlock from './blocks/TextBlock';
import ImageBlock from './blocks/ImageBlock';
import MarkdownBlock from './blocks/MarkdownBlock';
import BlockControls from './BlockControls';

const BlockRenderer = ({ block, previewMode, updateBlock, deleteBlock , duplicateBlock}) => {
  const renderBlock = () => {
    switch (block.type) {
      case 'header':
        return (
          <HeaderBlock
            data={block.data}
            previewMode={previewMode}
            onUpdate={(data) => updateBlock(block.id, data)}
          />
        );
      case 'text':
        return (
          <TextBlock
            data={block.data}
            previewMode={previewMode}
            onUpdate={(data) => updateBlock(block.id, data)}
          />
        );
      case 'image':
        return (
          <ImageBlock
            data={block.data}
            previewMode={previewMode}
            onUpdate={(data) => updateBlock(block.id, data)}
          />
        );
      case 'markdown':
        return (
          <MarkdownBlock
            data={block.data}
            previewMode={previewMode}
            onUpdate={(data) => updateBlock(block.id, data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="group relative">
      {!previewMode && (
        <BlockControls
          onDelete={() => deleteBlock(block.id)}
           onDuplicate={() => duplicateBlock(block)}
        />
      )}
      {renderBlock()}
    </div>
  );
};

export default BlockRenderer;