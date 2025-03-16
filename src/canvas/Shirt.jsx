import { Canvas, useFrame } from '@react-three/fiber'
import React from 'react'
import { useSnapshot } from 'valtio'
import state from "../store"
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import { easing } from 'maath'
const Shirt = () => {
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF("/shirt_baked.glb")
  const logoTexture = useTexture(snap.logoDecal)
  const fullTexture = useTexture(snap.fullDecal)

  //for smooth transition of colors on shirt:-
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta))

  const stateString=JSON.stringify(snap)


  return (

    <group key={stateString} > //to update the shirt "colors perfectly."
      
      
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >

        {snap.isFullTexture && (
          <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} map={fullTexture} ></Decal>
        )}

        {snap.isLogotexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}

      </mesh>
    </group>
  )
}

export default Shirt
