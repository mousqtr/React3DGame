import React, { useRef } from "react";
import { Edges } from "@react-three/drei";

export default function FixedBox({
  mode,
  position,
  color,
  setMoveBoxPos,
  removeBox,
  changeBoxColor,
}) {
  const mesh = useRef();

  const handlePointerOver = (e) => {
    e.stopPropagation();
    console.log("handlePointerMove");
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

  const handleClick = (e) => {
    console.log("down");
    e.stopPropagation();
    if (!["erase", "fill"].includes(mode) || e.button !== 0) {
      return;
    }

    switch (mode) {
      case "erase":
        removeBox();
        break;
      case "fill":
        changeBoxColor();
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
      onPointerOver={handlePointerOver}
      onClick={handleClick}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
      <Edges scale={1} threshold={15} color={color} />
    </mesh>
  );
}
