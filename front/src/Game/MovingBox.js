import React, { useRef } from "react";
import { Edges, GradientTexture } from "@react-three/drei";

export default function MovingBox(props) {
  const mesh = useRef();

  const handleClick = (e) => {
    e.stopPropagation();
    props.addBox();
  };

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={1}
      position={props.position}
      onPointerDown={handleClick}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color} />
      <Edges scale={1} threshold={5} color={props.color} />

      <Edges scale={1.1} threshold={15} color="white" />
    </mesh>
  );
}
