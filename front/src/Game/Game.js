// Import modules
import React, { Suspense, useState, useCallback } from "react";
import { MOUSE } from "three";
import { Canvas } from "@react-three/fiber";
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
  const [isClicking, setClicking] = useState(false);

  /**
   * Update the moving box position
   */
  const handleMoveBoxPos = (position) => {
    const movingBox_ = { ...movingBox, position: position };
    setMovingBox(movingBox_);
  };

  /**
   * Update the moving box color
   */
  const handleMoveBoxColor = (color) => {
    const movingBox_ = { ...movingBox, color: color };
    setMovingBox(movingBox_);
  };

  /**
   * Add the moving box to boxes list
   */
  const handleAddBox = useCallback(() => {
    let boxes_ = [...boxes];
    boxes_.push(movingBox);
    setBoxes(boxes_);
  }, [boxes, movingBox]);

  /**
   * Remove the moving box from boxes list
   */
  const handeRemoveBox = useCallback(() => {
    const boxes_ = boxes.filter(
      (box) =>
        JSON.stringify(box.position) !== JSON.stringify(movingBox.position)
    );
    setBoxes(boxes_);
  }, [boxes, movingBox.position]);

  /**
   * Clear boxes list
   */
  const handleResetBoxes = useCallback(() => {
    setBoxes([]);
  }, []);

  /**
   * Update the fixed box color
   */
  const handleChangeBoxColor = useCallback(
    (id) => {
      const boxes_ = boxes.map((box) => {
        box =
          JSON.stringify(box.position) === JSON.stringify(movingBox.position)
            ? { ...box, color: movingBox.color }
            : box;
        return box;
      });
      setBoxes(boxes_);
    },
    [boxes, movingBox]
  );

  const handlePointerUp = (e) => {
    console.log("up");
    if (["erase", "fill"].includes(mode) && e.button === 0) {
      setClicking(false);
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
      />
      <Canvas
        style={{ cursor: mode === "move" ? "grab" : "initial" }}
        camera={{ position: [30, 30, 30], fov: 20 }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(window.devicePixelRatio);
        }}
        onPointerUp={handlePointerUp}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[0, 10, 10]} />
        <pointLight position={[0, 20, 10]} />
        <OrbitControls
          rotateSpeed={2}
          enableDamping={false}
          enableRotate={true}
          enablePan={true}
          enableZooming={true}
          mouseButtons={{
            LEFT: mode === "move" ? MOUSE.ROTATE : null,
            MIDDLE: MOUSE.PAN,
            RIGHT: MOUSE.ROTATE,
          }}
        />
        <Suspense fallback={<Loading />}>
          <Plane mode={mode} setMoveBoxPos={handleMoveBoxPos} />
          <gridHelper args={[11, 11, "grey", "grey"]} />
          <MovingBox
            mode={mode}
            position={movingBox.position}
            color={movingBox.color}
            addBox={handleAddBox}
            boxes={boxes}
          />
          {boxes.map((box, index) => (
            <FixedBox
              key={index}
              boxes={boxes}
              position={box.position}
              color={box.color}
              setMoveBoxPos={handleMoveBoxPos}
              mode={mode}
              removeBox={handeRemoveBox}
              changeBoxColor={handleChangeBoxColor}
              isClicking={isClicking}
              setClicking={setClicking}
              movingBox={movingBox}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
