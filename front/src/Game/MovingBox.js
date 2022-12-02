import React, { useRef, useEffect, useState } from "react";
import { Edges, GradientTexture } from "@react-three/drei";

export default function MovingBox({ addBox, position, color, mode }) {
  const mesh = useRef();
  const [isClicking, setClicking] = useState(false);
  const [actionAllowed, setActionAllowed] = useState(true);

  useEffect(() => {
    if (isClicking && actionAllowed) {
      addBox();
      setActionAllowed(false);
      setTimeout(() => {
        setActionAllowed(true);
      }, 300);
    }
  }, [position, isClicking, actionAllowed]);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    if (mode === "edit" && e.button === 0) {
      setClicking(true);
    }
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    if (mode === "edit" && e.button === 0) {
      setClicking(false);
    }
  };

  switch (mode) {
    case "edit":
      return (
        <EditBox
          mesh={mesh}
          position={position}
          color={color}
          handlePointerDown={handlePointerDown}
          handlePointerUp={handlePointerUp}
        />
      );
    case "erase":
      return (
        <EraseBox
          mesh={mesh}
          position={position}
          handlePointerDown={handlePointerDown}
          handlePointerUp={handlePointerUp}
        />
      );
    case "fill":
      return (
        <FillBox
          mesh={mesh}
          position={position}
          color={color}
          handlePointerDown={handlePointerDown}
          handlePointerUp={handlePointerUp}
        />
      );
    default:
      return <></>;
  }
}

function EditBox({
  mesh,
  position,
  color,
  handlePointerDown,
  handlePointerUp,
}) {
  return (
    <mesh
      ref={mesh}
      scale={1}
      position={position}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} opacity={1} transparent={false} />
      <Edges scale={1} threshold={5} color={color} />
      <Edges scale={1.1} threshold={15} color="white" />
    </mesh>
  );
}

function EraseBox({ mesh, position, handlePointerDown, handlePointerUp }) {
  return (
    <mesh
      ref={mesh}
      scale={1}
      position={position}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
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

function FillBox({
  mesh,
  position,
  color,
  handlePointerDown,
  handlePointerUp,
}) {
  return (
    <mesh
      ref={mesh}
      scale={1.1}
      position={position}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
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
