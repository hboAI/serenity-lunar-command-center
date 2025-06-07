
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RobotModel = () => {
  const { scene } = useGLTF('/lovable-uploads/robot_model.gltf');
  return <primitive object={scene} scale={[2, 2, 2]} position={[0, 0, 0]} />;
};

const RobotModelViewer = () => {
  return (
    <Card className="bg-black/30 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-black/40 transition-all duration-500">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl text-center text-white drop-shadow-lg">
          Serenity Robot Model
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full bg-black/20 rounded-xl border border-white/10 overflow-hidden">
          <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} />
            <Suspense fallback={null}>
              <RobotModel />
            </Suspense>
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={20}
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
