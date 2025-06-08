
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RobotModel = () => {
  const { scene } = useGLTF('/lovable-uploads/robot_model.gltf');
  return <primitive object={scene} scale={[0.5, 0.5, 0.5]} position={[0, -10, 0]} />;
};

const RobotModelViewer = () => {
  return (
    <Card className="bg-black/30 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-black/40 transition-all duration-500 h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl text-center text-white drop-shadow-lg">
          Serenity Robot Model
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[600px] w-full bg-black/20 rounded-xl border border-white/10 overflow-hidden">
          <Canvas camera={{ position: [100, 20, 30], fov: 60 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <pointLight position={[-5, -5, -5]} intensity={0.3} />
            <Suspense fallback={null}>
              <RobotModel />
            </Suspense>
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={1}
              maxDistance={200}
              target={[50, 0, 0]}
            />
          </Canvas>
        </div>
        <p className="text-center text-gray-300 mt-4 text-sm">
          Click and drag to rotate • Scroll to zoom • Right-click and drag to pan
        </p>
      </CardContent>
    </Card>
  );
};

export default RobotModelViewer;
