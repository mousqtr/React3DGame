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
  const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(false);
  const [mode, setMode] = useState("edit");

  const handleMoveBoxPos = (position) => {
    const movingBox_ = { ...movingBox, position: position };
    setMovingBox(movingBox_);
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

  return (
    <div className="game">
      <ControlsPanel
        mode={mode}
        movingBoxColor={movingBox.color}
        changeMode={setMode}
        setMoveBoxColor={handleMoveBoxColor}
        resetBoxes={handleResetBoxes}
        setOrbitControlsEnabled={setOrbitControlsEnabled}
      />
      <Canvas
        style={{
          cursor: orbitControlsEnabled
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
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[0, 10, 10]} />
        <pointLight position={[0, 20, 10]} />
        <OrbitControls
          rotateSpeed={2}
          enableDamping={false}
          enableRotate={orbitControlsEnabled}
          enablePan={true}
          enableZooming={true}
        />
        <Suspense fallback={<Loading />}>
          <Plane
            mode={mode}
            setMoveBoxPos={handleMoveBoxPos}
            setOrbitControlsEnabled={setOrbitControlsEnabled}
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
              setOrbitControlsEnabled={setOrbitControlsEnabled}
              changeBoxColor={handleChangeBoxColor}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
