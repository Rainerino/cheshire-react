/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'
import model from '/models/room/paper_holder.glb?url'

type GLTFResult = GLTF & {
  nodes: {
    kağıtlık: THREE.Mesh
  }
  materials: {
    Chrome_A: THREE.MeshPhysicalMaterial
  }
}

export function PaperHolder(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(model) as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kağıtlık.geometry}
        material={materials.Chrome_A}
        position={[0, 0.031, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
    </group>
  )
}

useGLTF.preload(model)
