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
import { OrbitControls } from "@react-three/drei";

// Import components
import MovingBox from "./MovingBox";
import FixedBox from "./FixedBox";
import Plane from "./Plane";
import Loading from "./Loading";

// Import style
import "./Game.css";

const _isDebug = false;

export default function Game() {
  const [boxes, setBoxes] = useState([]);
  const [movingBox, setMovingBox] = useState({
    position: [0, 0.5, 0],
    color: "red",
  });
  const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(false);

  const handleMoveBox = (position) => {
    const movingBox_ = { ...movingBox, position: position };
    setMovingBox(movingBox_);
  };

  const handleAddBox = () => {
    console.log("addBox");
    let boxes_ = [...boxes];
    boxes_.push(movingBox);
    setBoxes(boxes_);
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
        <pointLight position={[0, 10, 10]} />
        <OrbitControls enabled={orbitControlsEnabled} rotateSpeed={2} />
        <Suspense fallback={<Loading />}>
          <Plane
            moveBox={handleMoveBox}
            setOrbitControlsEnabled={setOrbitControlsEnabled}
          />
          <gridHelper args={[11, 11, "grey", "grey"]} />
          <MovingBox
            position={movingBox.position}
            color={movingBox.color}
            addBox={handleAddBox}
          />
          {boxes.map((c, index) => (
            <FixedBox
              key={index}
              position={c.position}
              color={c.color}
              moveBox={handleMoveBox}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
