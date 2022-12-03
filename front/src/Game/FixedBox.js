import React, { useRef, useState, useEffect } from "react";
import { Edges } from "@react-three/drei";

export default function FixedBox({
  mode,
  position,
  color,
  setMoveBoxPos,
  removeBox,
  changeBoxColor,
  isClicking,
  setClicking,
  movingBox,
}) {
  const mesh = useRef();
  const [actionAllowed, setActionAllowed] = useState(true);

  useEffect(() => {
    if (!["erase", "fill"].includes(mode)) {
      return;
    }

    if (JSON.stringify(position) !== JSON.stringify(movingBox.position)) {
      return;
    }

    if (!isClicking || !actionAllowed) {
      return;
    }

    // console.log("isClick", position);

    switch (mode) {
      case "erase":
        removeBox();
        break;
      case "fill":
        // changeBoxColor();
        break;
      default:
        break;
    }

    setActionAllowed(false);
    setTimeout(() => {
      setActionAllowed(true);
    }, 300);
  }, [
    isClicking,
    position,
    mode,
    actionAllowed,
    removeBox,
    movingBox.position,
  ]); //changeBoxColor

  const handlePointerMove = (e) => {
    e.stopPropagation();
    console.log("handlePointerMove", position);
    switch (mode) {
      case "edit":
        const [x, y, z] = position;
        const cases = {
          1: [x + 1, y, z],
          5: [x - 1, y, z],
          9: [x, y + 1, z],
          13: [x, y - 1, z],
          17: [x, y, z + 1],
          21: [x, y, z - 1],
        };
        if (cases[e.face.c]) {
          setMoveBoxPos(cases[e.face.c]);
        }
        break;
      case "erase":
      case "fill":
        setMoveBoxPos(position);
        break;
      default:
        break;
    }
  };

  const handlePointerDown = (e) => {
    console.log("down");
    e.stopPropagation();
    if (["erase", "fill"].includes(mode) && e.button === 0) {
      setClicking(true);
    }
  };

  return (
    <mesh
      ref={mesh}
      scale={1}
      position={position}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
      <Edges scale={1} threshold={15} color={color} />
    </mesh>
  );
}
