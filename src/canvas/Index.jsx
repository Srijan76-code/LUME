import { Center, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import CameraRig from './CameraRig'
import Backdrop from './Backdrop'
import Shirt from './Shirt'

const CanvasModel = () => {
  return (
    <Canvas  
      shadows
      camera={{position:[0,0,0],fov:30}}
      gl={{preserveDrawingBuffer:true}}
      className='w-full max-w-full h-full transition-all ease-in'
     >

      <ambientLight intensity={0.5} />
      <Environment preset='city' />

      <CameraRig>
        <Backdrop />

        <Center>
          <Shirt />
        </Center>
        
      </CameraRig>


    </Canvas>
  )
}

export default CanvasModel
