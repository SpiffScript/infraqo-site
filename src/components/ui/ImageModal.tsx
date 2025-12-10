import React from "react";

type ImageModalProps = {
  src: string;
  alt: string;
  onClose: () => void;
};

const ImageModal: React.FC<ImageModalProps> = ({ src, alt, onClose }) => {
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-zoom-out"
      onClick={onClose}
      onContextMenu={handleContextMenu}
    >
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[90vw] object-contain select-none"
        draggable={false}
        onContextMenu={handleContextMenu}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default ImageModal;
