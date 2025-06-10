
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ImageVisualization = () => {
  const [imageData, setImageData] = useState<{ [key: string]: string }>({});

  // Simulate IR camera data
  useEffect(() => {
    const interval = setInterval(() => {
      const cameras = ['cam0', 'cam1', 'cam2', 'cam3'];
      const newImageData: { [key: string]: string } = {};
      
      cameras.forEach(cam => {
        // Generate a simple gradient pattern to simulate IR data
        const canvas = document.createElement('canvas');
        canvas.width = 320;
        canvas.height = 240;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          // Create gradient to simulate thermal data
          const gradient = ctx.createLinearGradient(0, 0, 320, 240);
          const hue = Math.random() * 360;
          gradient.addColorStop(0, `hsl(${hue}, 70%, 20%)`);
          gradient.addColorStop(0.5, `hsl(${hue + 60}, 70%, 50%)`);
          gradient.addColorStop(1, `hsl(${hue + 120}, 70%, 80%)`);
          
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 320, 240);
          
          // Add some noise
          const imageData = ctx.getImageData(0, 0, 320, 240);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const noise = (Math.random() - 0.5) * 50;
            data[i] = Math.max(0, Math.min(255, data[i] + noise));
            data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
            data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
          }
          ctx.putImageData(imageData, 0, 0);
          
          newImageData[cam] = canvas.toDataURL();
        }
      });
      
      setImageData(newImageData);
    }, 500); // Update every 500ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full grid grid-cols-2 grid-rows-2 gap-4">
      {['cam0', 'cam1', 'cam2', 'cam3'].map((cam, index) => (
        <Card key={cam} className="bg-black/20 border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white">IR Camera {index}</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-60px)] p-2">
            <div className="w-full h-full bg-black/40 rounded border border-white/10 overflow-hidden">
              {imageData[cam] ? (
                <img 
                  src={imageData[cam]} 
                  alt={`IR Camera ${index}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  Loading IR feed...
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ImageVisualization;
