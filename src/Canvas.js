// src/Canvas.js
import React, { useRef, useState, useEffect } from 'react';

const Canvas = ({ darkMode }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    setContext(ctx);

    // Load saved drawing
    const savedDrawing = localStorage.getItem('drawing');
    if (savedDrawing) {
      const img = new Image();
      img.src = savedDrawing;
      img.onload = () => ctx.drawImage(img, 0, 0);
    }
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    context.closePath();
    setIsDrawing(false);
    saveDrawing();
  };

  const erase = () => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    saveDrawing();
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const drawing = canvas.toDataURL('image/png');
    localStorage.setItem('drawing', drawing);
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'drawing.png';
    link.click();
  };

  return (
    <div>
      <button onClick={erase}>Erase</button>
      <button onClick={saveImage}>Save</button>
      <canvas
        ref={canvasRef}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className={darkMode ? 'dark-mode' : ''}
      />
    </div>
  );
};

export default Canvas;
