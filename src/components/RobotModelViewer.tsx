
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as THREE from 'three';

const RobotModel = ({ onCenterCalculated }: { onCenterCalculated: (center: THREE.Vector3) => void }) => {
  const { scene } = useGLTF('/lovable-uploads/robot_model.gltf');
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    console.log('Robot model scene loaded:', scene);
    if (modelRef.current && scene) {
      // Calculate the bounding box of the entire model
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      
      console.log('Robot bounding box:', box);
      console.log('Robot center:', center);
      
      // Call the callback with the calculated center
      onCenterCalculated(center);
    }
  }, [scene, onCenterCalculated]);

  return (
    <group ref={modelRef}>
      <primitive object={scene} scale={[0.5, 0.5, 0.5]} position={[0, -1, 0]} />
      {/* Add coordinate system axes for reference */}
      <primitive object={new THREE.AxesHelper(2)} />
    </group>
  );
};

const CameraController = ({ target }: { target: THREE.Vector3 }) => {
  const { camera, gl } = useThree();
  
  useEffect(() => {
    console.log('Setting up camera with target:', target);
    // Position camera to look at the target from a good angle
    camera.position.set(5, 3, 5);
    camera.lookAt(target);
    camera.updateProjectionMatrix();
    console.log('Camera position set to:', camera.position);
  }, [camera, target]);

  return (
    <OrbitControls 
      camera={camera}
      domElement={gl.domElement}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      minDistance={1}
      maxDistance={20}
      target={target}
      enableDamping={true}
      dampingFactor={0.05}
    />
  );
};

// Fallback component to ensure we always have something visible
const FallbackScene = () => {
  return (
    <group>
      {/* Add coordinate system axes for reference */}
      <primitive object={new THREE.AxesHelper(3)} />
      {/* Add a simple test cube */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </group>
  );
};

const RobotModelViewer = () => {
  const [robotCenter, setRobotCenter] = useState(new THREE.Vector3(0, 0, 0));

  const handleCenterCalculated = (center: THREE.Vector3) => {
    console.log('Center calculated:', center);
    setRobotCenter(center);
  };

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
            onCreated={({ gl, camera, scene }) => {
              console.log('Canvas created');
              console.log('Camera initial position:', camera.position);
              console.log('Scene:', scene);
            }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />
            <Suspense fallback={<FallbackScene />}>
              <RobotModel onCenterCalculated={handleCenterCalculated} />
            </Suspense>
            <CameraController target={robotCenter} />
          </Canvas>
        </div>
        <p className="text-center text-gray-300 mt-4 text-sm">
          Click and drag to rotate • Scroll to zoom • Right-click and drag to pan
        </p>
        <p className="text-center text-gray-400 mt-2 text-xs">
          Red = X axis, Green = Y axis, Blue = Z axis • Robot center: ({robotCenter.x.toFixed(2)}, {robotCenter.y.toFixed(2)}, {robotCenter.z.toFixed(2)})
        </p>
      </CardContent>
    </Card>
  );
};

export default RobotModelViewer;
