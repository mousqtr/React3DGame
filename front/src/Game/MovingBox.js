import React, { useRef } from "react";
import { Edges, GradientTexture } from "@react-three/drei";

export default function MovingBox({ addBox, position, color, mode }) {
  const mesh = useRef();

  const handleClick = (e) => {
    e.stopPropagation();
    if (mode === "edit") {
      addBox();
    }
  };

  switch (mode) {
    case "edit":
      return (
        <EditBox
          mesh={mesh}
          position={position}
          color={color}
          handleClick={handleClick}
        />
      );
    case "erase":
      return (
        <EraseBox mesh={mesh} position={position} handleClick={handleClick} />
      );
    case "fill":
      return (
        <FillBox
          mesh={mesh}
          position={position}
          color={color}
          handleClick={handleClick}
        />
      );
    default:
      return <></>;
  }
}

function EditBox({ mesh, position, color, handleClick }) {
  return (
    <mesh ref={mesh} scale={1} position={position} onPointerDown={handleClick}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} opacity={1} transparent={false} />
      <Edges scale={1} threshold={5} color={color} />
      <Edges scale={1.1} threshold={15} color="white" />
    </mesh>
  );
}

function EraseBox({ mesh, position, handleClick }) {
  return (
    <mesh ref={mesh} scale={1} position={position} onPointerDown={handleClick}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        toneMapped={false}
        color="black"
        opacity={0}
        transparent={true}
      />
      <Edges scale={1.1} threshold={15} color="red" />
    </mesh>
  );
}

function FillBox({ mesh, position, handleClick, color }) {
  return (
    <mesh
      ref={mesh}
      scale={1.1}
      position={position}
      onPointerDown={handleClick}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        toneMapped={false}
        color={color}
        opacity={0.7}
        transparent={true}
      />
    </mesh>
  );
}
