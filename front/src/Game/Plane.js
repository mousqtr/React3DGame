export default function Plane({ color, ...props }) {
  const handlePointerMove = (e) => {
    e.stopPropagation();
    const newPos = [
      Math.round(e.point.x),
      Math.round(e.point.y) + 0.5,
      Math.round(e.point.z),
    ];
    props.moveBox(newPos);
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    props.setOrbitControlsEnabled(false);
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    props.setOrbitControlsEnabled(true);
  };

  return (
    <mesh
      scale={[11, 11, 0.1]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.1, 0]}
      onPointerMove={handlePointerMove}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      receiveShadow
      castShadow
      {...props}
    >
      <boxBufferGeometry />
      <meshBasicMaterial attach="material" color="grey" toneMapped={false} />
    </mesh>
  );
}
