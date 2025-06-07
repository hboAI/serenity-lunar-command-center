
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RobotModel = () => {
  const { scene } = useGLTF('/lovable-uploads/robot_model.gltf');
  return <primitive object={scene} scale={[1, 1, 1]} position={[0, -1, 0]} />;
};

const CameraController = () => {
  const { camera, gl } = useThree();
  
  useEffect(() => {
    // Ensure camera is properly positioned
    camera.position.set(5, 3, 5);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  return (
    <OrbitControls 
      camera={camera}
      domElement={gl.domElement}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      minDistance={1}
      maxDistance={100}
      maxPolarAngle={Math.PI * 0.9}
      minPolarAngle={Math.PI * 0.1}
      target={[0, 0, 0]}
    />
  );
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
          <Canvas 
            camera={{ 
              position: [5, 3, 5], 
              fov: 60,
              near: 0.1,
              far: 1000
            }}
            onCreated={({ camera }) => {
              camera.lookAt(0, 0, 0);
            }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <pointLight position={[-5, -5, -5]} intensity={0.3} />
            <Suspense fallback={null}>
              <RobotModel />
            </Suspense>
            <CameraController />
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
