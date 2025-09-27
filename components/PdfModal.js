"use client";

import { useState, useEffect } from 'react';
import { X, Download, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

const PdfModal = ({ fileUrl, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (fileUrl) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [fileUrl, onClose]);

  // Don't render if no file URL
  if (!fileUrl) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop() || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const resetControls = () => {
    setZoom(1);
    setRotation(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="relative w-full h-full max-w-7xl max-h-[95vh] bg-white rounded-lg shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[var(--brand-blue)] to-blue-600 text-white">
          <h3 className="text-lg font-semibold truncate flex-1">
            {fileUrl.split('/').pop()?.replace('.pdf', '') || 'Document Preview'}
          </h3>
          
          {/* Controls */}
          <div className="flex items-center space-x-2 mr-4">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            
            <span className="text-sm font-medium min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleRotate}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Rotate"
            >
              <RotateCw className="w-5 h-5" />
            </button>
            
            <button
              onClick={resetControls}
              className="px-3 py-1 text-xs bg-white/20 hover:bg-white/30 rounded transition-colors"
              title="Reset View"
            >
              Reset
            </button>
          </div>
          
          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="flex items-center px-4 py-2 bg-[var(--brand-green)] hover:bg-emerald-700 text-white rounded-lg transition-colors mr-2"
            title="Download PDF"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </button>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 h-[calc(100%-80px)] bg-gray-100 overflow-auto">
          <div className="flex items-center justify-center min-h-full p-4">
            <div 
              className="transition-transform duration-200 shadow-lg"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                transformOrigin: 'center center'
              }}
            >
              <iframe
                src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-[800px] h-[600px] border-0 rounded-lg"
                title="PDF Preview"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Footer with additional info */}
        <div className="p-3 bg-gray-50 border-t text-center text-sm text-gray-600">
          <p>Use scroll to navigate • ESC to close • Click Download to save the file</p>
        </div>
      </div>

      {/* Background click to close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
        aria-label="Close modal"
      />
    </div>
  );
};

export default PdfModal;