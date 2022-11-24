export default function Plane({ color, ...props }) {
  const handlePointerMove = (e) => {
    // console.log("hover");
    // console.log(transformPosition(e.point));
    props.setCursor(transformPosition(e.point));
  };

  return (
    <mesh
      scale={[11, 11, 0.1]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.1, 0]}
      onPointerMove={handlePointerMove}
      receiveShadow
      castShadow
      {...props}
    >
      <boxBufferGeometry />
      <meshBasicMaterial attach="material" color="grey" toneMapped={false} />
    </mesh>
  );
}

const transformPosition = (point) => {
  return [Math.round(point.x), Math.round(point.y) + 0.5, Math.round(point.z)];
};
