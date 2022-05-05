import './App.css';
import * as THREE from 'three'
import {Canvas, useFrame} from 'react-three-fiber'
import {OrbitControls} from '@react-three/drei'
import React, {useRef} from 'react'

const TempObject = new THREE.Object3D()

function Boxes() {
  const ref = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    ref.current.rotation.x = Math.sin(time / 4) + 1
    ref.current.rotation.y = Math.sin(time / 4) + 1 
    let i = 0;
    for(let x = 0; x < 10; x++) {
      for(let y = 0; y < 10; y++) {
        for(let z = 0; z < 10; z++) {
            const id = i++
              TempObject.position.set(5 - x, 5 - y, 5 - z)
              TempObject.rotation.y = Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + Math.sin(z / 4 + time);
              TempObject.rotation.z = TempObject.rotation.y * 4;
              TempObject.updateMatrix()
              ref.current.setMatrixAt(id, TempObject.matrix)
        } 
      } 
    }
    ref.current.instanceMatrix.needsUpdate = true
  })

  return(
    <>
        <instancedMesh ref={ref} args={[null, null, 1000]}>
            <boxBufferGeometry attach='geometry' args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial attach='material' color='#D92525' />
        </instancedMesh>  
    </>
  )
}

function Scene(){
  return(
    <>
        <ambientLight />
        <pointLight  castShadow={true} intensity={1} position={[0, 3, 3]} />
        <Boxes />
    </>
  )
}

function App() {
  return (
    <>
      <Canvas
        camera={{
          position: [0, 0, 15],
          near: 5,
          far: 20
        }}
      >
          <Scene />
      </Canvas>
    </>
  );
}

export default App;
