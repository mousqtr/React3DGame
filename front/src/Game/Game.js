// Import modules
import * as THREE from "three";
import React, { Suspense, useRef, useEffect, useState } from "react";
import {
  Canvas,
  useLoader,
  extend,
  useFrame,
  useThree,
} from "@react-three/fiber";

// Import components
import Box from "./Box";
import Plane from "./Plane";
import Loading from "./Loading";
import CameraControls from "./CameraControls";

// Import style
import "./Game.css";

const _isDebug = false;

export default function Game() {
  const [cubePos, setCubePos] = useState([0, 0, 0]);

  const handleSetCursor = (position) => {
    setCubePos(position);
  };

  /**
   * Rendering function
   */
  return (
    <div className="game">
      <Canvas
        camera={{ position: [8, 8, 8], fov: 40 }}
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
          <Plane setCursor={handleSetCursor} />
          <gridHelper args={[11, 11, "grey", "grey"]} />
          <Box pos={cubePos} color="blue" />
        </Suspense>
      </Canvas>
    </div>
  );
}
