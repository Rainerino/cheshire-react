/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'
import model from '/models/sku/coffee.glb?url'

type GLTFResult = GLTF & {
  nodes: {
    model: THREE.Mesh
  }
  materials: {
    ['material_0.008']: THREE.MeshPhysicalMaterial
  }
}

export function Coffee(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(model) as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.model.geometry}
        material={materials['material_0.008']}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload(model)
