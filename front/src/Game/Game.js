// Import modules
import * as THREE from "three";
import React, { Suspense, useRef } from "react";
import {
  Canvas,
  useLoader,
  extend,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Import components
import Box from "./Box";

// Import style
import "./Game.css";

function Plane({ color, ...props }) {
  return (
    <mesh receiveShadow castShadow {...props}>
      <boxBufferGeometry />
      <meshBasicMaterial attach="material" color="grey" toneMapped={false} />
    </mesh>
  );
}

extend({ OrbitControls });

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="blue"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

export default class Game extends React.Component {
  _colors = ["blue", "yellow", "green"];
  _isDebug = false;
  _initializationGlobals = false;
  _initializationActor = false;
  _initializationSpectator = false;

  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  /**
   * After the first rendering
   */
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeydown);
  }

  componentDidUpdate() {}

  /**
   * Keyboard event
   */
  handleKeydown(event) {
    console.log(event);
    //   switch (event.code) {
    //     case "ArrowLeft":
    //       actor.x -= 5;
    //       break;
    //     case "ArrowRight":
    //       actor.x += 5;
    //       break;
    //     case "ArrowDown":
    //       actor.y -= 5;
    //       break;
    //     case "ArrowUp":
    //       actor.y += 5;
    //       break;
    //     default:
    //       break;
    //   }
    //   event.preventDefault();
    // }
  }

  /**
   * Function called when the component is destroyed
   */
  componentWillUnmount() {
    if (this._isDebug) console.log("componentWillUnmount");
    window.removeEventListener("keydown", this.handleKeydown);
  }

  /**
   * Rendering function
   */
  render() {
    return (
      <div className="game">
        <Canvas
          camera={{ position: [0, -100, 100], fov: 55 }}
          gl={{ antialias: true }}
          onCreated={({ gl, scene }) => {
            if (this._isDebug) console.log("WebGLRenderer", gl);
            if (this._isDebug) console.log("SCENE", scene);
            // scene.add(new THREE.AxesHelper(20));
            gl.setPixelRatio(window.devicePixelRatio);
          }}
        >
          <ambientLight intensity={0.7} />
          <pointLight position={[100, 100, 100]} />
          <CameraControls />
          <Suspense fallback={<Loading />}>
            <Plane position-z={0} scale={[100, 100, 1]} />
            <Box pos={[0, 0, 10]} color="blue" />
          </Suspense>
        </Canvas>
      </div>
    );
  }
}
