/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React from 'react'
import { useGLTF, Decal, RenderTexture, Text, PerspectiveCamera } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'
import model from '/models/room/door.glb?url'
import handwritten_font from '/fonts/handwritten.ttf?url'
import engineer_font from '/fonts/engineer.ttf?url'

type GLTFResult = GLTF & {
    nodes: {
        OBJ_1: THREE.Mesh
        OBJ_2: THREE.Mesh
    }
    materials: {
        Wood: THREE.MeshPhysicalMaterial
        Brass_A_5: THREE.MeshPhysicalMaterial
    }
}

const SCALE = 50

export function RedrumDoor(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF(model) as GLTFResult
    return (
        <group {...props} dispose={null}>
            <group position={[1.65, 1.02, -2.63]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.OBJ_1.geometry}
                    material={materials.Wood}
                >
                    <Decal
                        position={[0, 0, 0.7 * SCALE]}
                        rotation={[-Math.PI / 2, Math.PI, 0]}
                        scale={[1 * SCALE, 2 * SCALE, 1 * SCALE]}
                    >
                        {/* ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789! */}
                        <meshStandardMaterial roughness={1} transparent polygonOffset polygonOffsetFactor={-1}>
                            <RenderTexture attach="map" anisotropy={16}>
                                <PerspectiveCamera makeDefault manual aspect={0.5} position={[0, 0, 2]} />
                                <ambientLight intensity={1} />
                                <Text font={handwritten_font} position={[0, 0.6, 0]} fontSize={0.15} color="red">
                                    H  LLO
                                </Text>
                                <Text font={handwritten_font} position={[-0.13, 0.6, 0]} rotation={[0, Math.PI, 0]} fontSize={0.15} color="red">
                                    E
                                </Text>
                                <Text font={engineer_font} position={[0, -0.1, 0]} fontSize={0.1} color="red">
                                    I am Yiyi, AAAAAA
                                </Text>
                                <Text font={engineer_font} position={[0, -0.2, 0]} fontSize={0.1} color="red">
                                    I am Yiyi, AAAAAA
                                </Text>
                            </RenderTexture>
                        </meshStandardMaterial>
                    </Decal>
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.OBJ_2.geometry}
                    material={materials.Brass_A_5}
                />
            </group>
        </group>
    )
}

useGLTF.preload(model)