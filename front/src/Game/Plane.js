export default function Plane({ color, ...props }) {
  const handlePointerMove = (e) => {
    e.stopPropagation();
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
      props.moveBox(cases[e.face.c]);
    }
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
      scale={[11, 11, 0.02]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.001, 0]}
      onPointerMove={handlePointerMove}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      receiveShadow
      castShadow
      {...props}
    >
      <boxBufferGeometry />
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
