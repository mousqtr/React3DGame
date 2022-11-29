import React, { useRef, useState } from "react";
import { Edges, GradientTexture } from "@react-three/drei";

export default function FixedBox({
  index,
  mode,
  position,
  color,
  setMoveBoxPos,
  removeBox,
  setOrbitControlsEnabled,
  changeBoxColor,
}) {
  const mesh = useRef();

  const handlePointerMove = (e) => {
    e.stopPropagation();
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
    setOrbitControlsEnabled(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    switch (mode) {
      case "erase":
        removeBox(index);
        break;
      case "fill":
        changeBoxColor(index);
        break;
      default:
        break;
    }
  };

  return (
    <mesh
      ref={mesh}
      scale={1}
      position={position}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
      <Edges scale={1} threshold={15} color={color} />
    </mesh>
  );
}
