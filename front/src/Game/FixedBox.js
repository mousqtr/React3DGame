import React, { useRef, useState } from "react";
import { Edges, GradientTexture } from "@react-three/drei";

export default function FixedBox(props) {
  const mesh = useRef();

  const handlePointerMove = (e) => {
    e.stopPropagation();
    const [x, y, z] = props.position;
    const cases = {
      1: [x + 1, y, z],
      5: [x - 1, y, z],
      9: [x, y + 1, z],
      13: [x, y - 1, z],
      17: [x, y, z + 1],
      21: [x, y, z - 1],
    };
    if (cases[e.face.c]) {
      props.moveBox(cases[e.face.c]);
    }
  };

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={1}
      position={props.position}
      onPointerMove={handlePointerMove}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color} />
      <Edges scale={1} threshold={30} color={props.color} />
    </mesh>
  );
}
