import React, { useRef } from "react";
import { Edges, GradientTexture } from "@react-three/drei";

export default function MovingBox({ addBox, position, color, mode }) {
  const mesh = useRef();

  const handleClick = (e) => {
    e.stopPropagation();
    addBox();
  };

  if (mode === "edit") {
    return (
      <mesh
        ref={mesh}
        scale={1}
        position={position}
        onPointerDown={handleClick}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} opacity={1} transparent={false} />
        <Edges scale={1} threshold={5} color={color} />
        <Edges scale={1.1} threshold={15} color="white" />
      </mesh>
    );
  } else {
    return (
      <mesh
        ref={mesh}
        scale={1}
        position={position}
        onPointerDown={handleClick}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          toneMapped={false}
          color="black"
          opacity={0}
          transparent={true}
        />
        <Edges scale={1.1} threshold={15} color="white" />
      </mesh>
    );
  }
}
