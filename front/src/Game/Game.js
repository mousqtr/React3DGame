// Import modules
import * as THREE from "three";
import React, { Suspense, useRef, useEffect } from "react";
import {
  Canvas,
  useLoader,
  extend,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Import components
import Box from "./Box";

// Import style
import "./Game.css";

function Plane({ color, ...props }) {
  return (
    <mesh receiveShadow castShadow {...props}>
      <boxBufferGeometry />
      <meshBasicMaterial attach="material" color="grey" toneMapped={false} />
    </mesh>
  );
}

extend({ OrbitControls });

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="blue"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

const _isDebug = false;

export default function Game(props) {
  /**
   * Rendering function
   */
  return (
    <div className="game">
      <Canvas
        camera={{ position: [0, -80, 80], fov: 55 }}
        gl={{ antialias: true }}
        onCreated={({ gl, scene }) => {
          if (_isDebug) console.log("WebGLRenderer", gl);
          if (_isDebug) console.log("SCENE", scene);
          // scene.add(new THREE.AxesHelper(20));
          gl.setPixelRatio(window.devicePixelRatio);
        }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[100, 100, 100]} />
        <CameraControls />
        <Suspense fallback={<Loading />}>
          <Plane position-z={0} scale={[100, 100, 1]} />
          <Box pos={[0, 0, 10]} color="blue" />
        </Suspense>
      </Canvas>
    </div>
  );
}
