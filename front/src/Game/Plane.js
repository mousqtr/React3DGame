export default function Plane({
  mode,
  setMoveBoxPos,
  setOrbitControlsEnabled,
}) {
  const handlePointerMove = (e) => {
    e.stopPropagation();
    if (mode === "edit") {
      const [x, y, z] = [
        Math.round(e.point.x),
        Math.round(e.point.y),
        Math.round(e.point.z),
      ];
      const cases = {
        17: [x, y + 0.5, z],
        21: [x, y - 0.5, z],
      };
      if (cases[e.face.c]) {
        setMoveBoxPos(cases[e.face.c]);
      }
    }
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setOrbitControlsEnabled(false);
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setOrbitControlsEnabled(true);
  };

  return (
    <mesh
      scale={[11, 11, 0.02]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.001, 0]}
      onPointerMove={handlePointerMove}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      receiveShadow
      castShadow
    >
      <boxGeometry />
      <meshBasicMaterial
        attach="material"
        color="black"
        toneMapped={false}
        opacity={0.3}
        transparent
      />
    </mesh>
  );
}
