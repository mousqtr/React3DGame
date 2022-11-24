import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";

// function Edges(props) {

//   console.log(props.mesh)

//   const [mesh, setMesh] = useState(props.mesh);

//   useEffect(() => {
//     setMesh(props.mesh);
//     console.log(mesh)
//   })

//   if (mesh !== undefined) {
//     return (
//       <lineSegments>
//         <edgesGeometry attach="geometry" args={[mesh.current.geometry]} />
//         <lineBasicMaterial color="red" attach="material" />
//       </lineSegments>
//     )
//   } else {
//     return (
//       <></>
//     );
//   }

// };

export default function Box(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  // const [active, setActive] = useState(false)

  const handlePointerMove = (e) => {
    console.log("hover");
    console.log(e.face);
  };

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={20}
      position={props.pos}
      // onClick={(event) => setActive(!active)}
      // onPointerOut={(event) => setHover(false)}
      onPointerMove={handlePointerMove}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
}
