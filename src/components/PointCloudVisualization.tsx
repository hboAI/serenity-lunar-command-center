
import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PointCloudVisualization = () => {
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const [rotationAngles, setRotationAngles] = useState([0, 0, 0, 0]);

  // Generate point cloud data
  const generatePointCloud = (cameraIndex: number, time: number) => {
    const points = [];
    const numPoints = 1000;
    
    for (let i = 0; i < numPoints; i++) {
      // Generate a sphere with some noise
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 50 + Math.random() * 20 + Math.sin(time * 0.001 + cameraIndex) * 10;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      // Color based on distance
      const distance = Math.sqrt(x*x + y*y + z*z);
      const hue = ((distance - 50) / 30) * 240; // Blue to red gradient
      
      points.push({ x, y, z, hue });
    }
    
    return points;
  };

  // Render point cloud on canvas
  const renderPointCloud = (canvas: HTMLCanvasElement, points: any[], rotation: number) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 2;
    
    // Sort points by z-depth for proper rendering
    const sortedPoints = points
      .map(point => {
        // Apply rotation
        const cosR = Math.cos(rotation);
        const sinR = Math.sin(rotation);
        const rotatedX = point.x * cosR - point.z * sinR;
        const rotatedZ = point.x * sinR + point.z * cosR;
        
        return {
          ...point,
          x: rotatedX,
          z: rotatedZ,
          screenX: centerX + rotatedX * scale,
          screenY: centerY + point.y * scale
        };
      })
      .filter(point => point.screenX >= 0 && point.screenX < width && 
                      point.screenY >= 0 && point.screenY < height)
      .sort((a, b) => b.z - a.z);
    
    // Render points
    sortedPoints.forEach(point => {
      const size = Math.max(1, 3 - point.z * 0.01);
      ctx.fillStyle = `hsl(${point.hue}, 70%, 60%)`;
      ctx.beginPath();
      ctx.arc(point.screenX, point.screenY, size, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  useEffect(() => {
    const animate = () => {
      const time = Date.now();
      
      canvasRefs.current.forEach((canvas, index) => {
        if (canvas) {
          const points = generatePointCloud(index, time);
          renderPointCloud(canvas, points, rotationAngles[index]);
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, [rotationAngles]);

  const handleMouseMove = (index: number, event: React.MouseEvent<HTMLCanvasElement>) => {
    if (event.buttons === 1) { // Left mouse button
      const deltaX = event.movementX;
      setRotationAngles(prev => {
        const newAngles = [...prev];
        newAngles[index] += deltaX * 0.01;
        return newAngles;
      });
    }
  };

  return (
    <div className="h-full grid grid-cols-2 grid-rows-2 gap-4">
      {['cam0', 'cam1', 'cam2', 'cam3'].map((cam, index) => (
        <Card key={cam} className="bg-black/20 border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white">Point Cloud {index}</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-60px)] p-2">
            <div className="w-full h-full bg-black/40 rounded border border-white/10 overflow-hidden">
              <canvas
                ref={el => canvasRefs.current[index] = el}
                width={300}
                height={200}
                className="w-full h-full cursor-move"
                onMouseMove={(e) => handleMouseMove(index, e)}
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-1 text-center">
              Click and drag to rotate
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PointCloudVisualization;
