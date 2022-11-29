// Import modules
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
import ControlsPanel from "./ControlsPanel";

// Import style
import "./Game.css";

export default function Game() {
  const [boxes, setBoxes] = useState([]);
  const [movingBox, setMovingBox] = useState({
    position: [0, 0.5, 0],
    color: "green",
  });
  const [mode, setMode] = useState("edit");
  const [isOrbitControls, setOrbitControls] = useState(true);
  const [isDragging, setDragging] = useState(false);
  const [isObjectDetected, setObjectDetected] = useState(false);

  const handleMoveBoxPos = (position) => {
    if (!isDragging) {
      const movingBox_ = { ...movingBox, position: position };
      setMovingBox(movingBox_);
    }
  };

  const handleMoveBoxColor = (color) => {
    const movingBox_ = { ...movingBox, color: color };
    setMovingBox(movingBox_);
  };

  const handleAddBox = () => {
    let boxes_ = [...boxes];
    boxes_.push(movingBox);
    setBoxes(boxes_);
  };

  const handeRemoveBox = (index) => {
    const boxes_ = boxes.filter((elt, ind) => ind !== index);
    setBoxes(boxes_);
  };

  const handleResetBoxes = () => {
    setBoxes([]);
  };

  const handleChangeBoxColor = (index) => {
    const boxes_ = boxes.map((elt, ind) => {
      elt = ind === index ? { ...elt, color: movingBox.color } : elt;
      return elt;
    });
    setBoxes(boxes_);
  };

  const handlePointerDown = () => {
    setDragging(true);
  };

  const handlePointerUp = () => {
    setDragging(false);
    if (isOrbitControls && isObjectDetected) {
      setOrbitControls(false);
    }
    if (!isOrbitControls && !isObjectDetected) {
      setOrbitControls(true);
    }
  };

  const handleSetOrbitControls = (enable) => {
    setOrbitControls(enable);
  };

  const handleSetObjectDetected = (isDetected) => {
    setObjectDetected(isDetected);
    if (!isDragging) {
      if (isOrbitControls && isDetected) {
        setOrbitControls(false);
      }
      if (!isOrbitControls && !isDetected) {
        setOrbitControls(true);
      }
    }
  };

  return (
    <div className="game">
      <ControlsPanel
        mode={mode}
        movingBoxColor={movingBox.color}
        changeMode={setMode}
        setMoveBoxColor={handleMoveBoxColor}
        resetBoxes={handleResetBoxes}
        setOrbitControls={handleSetOrbitControls}
      />
      <Canvas
        style={{
          cursor: isOrbitControls
            ? "grab"
            : mode === "fill"
            ? "crosshair"
            : "initial",
        }}
        camera={{ position: [30, 30, 30], fov: 20 }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(window.devicePixelRatio);
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[0, 10, 10]} />
        <pointLight position={[0, 20, 10]} />
        <OrbitControls
          rotateSpeed={2}
          enableDamping={false}
          enableRotate={isOrbitControls}
          enablePan={true}
          enableZooming={true}
        />
        <Suspense fallback={<Loading />}>
          <Plane
            mode={mode}
            setMoveBoxPos={handleMoveBoxPos}
            isObjectDetected={isObjectDetected}
            setObjectDetected={handleSetObjectDetected}
          />
          <gridHelper args={[11, 11, "grey", "grey"]} />
          <MovingBox
            mode={mode}
            position={movingBox.position}
            color={movingBox.color}
            addBox={handleAddBox}
          />
          {boxes.map((c, index) => (
            <FixedBox
              key={index}
              index={index}
              position={c.position}
              color={c.color}
              setMoveBoxPos={handleMoveBoxPos}
              mode={mode}
              removeBox={handeRemoveBox}
              isObjectDetected={isObjectDetected}
              setObjectDetected={handleSetObjectDetected}
              changeBoxColor={handleChangeBoxColor}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
