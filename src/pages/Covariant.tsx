import React, {useRef, useState} from 'react'
import {useFrame} from '@react-three/fiber'
import {
    PerspectiveCamera,
    useScroll,
    ScrollControls,
    CameraControls,
    Scroll
} from '@react-three/drei'
import * as THREE from 'three'

import {RedcareBase} from '../components/models/RedcareBase'
import {RedcareStation} from '../components/models/RedcareStation'
import ToteScene from '../components/modules/Tote'
import {ABB1300} from '../components/models/ABB1300'
import PointLightWShadow from '../components/common/PointLightWShadow'


const CAMERA_POSITION = [
    [-0.3, 4.33, 1.76],
    [-0.35, 2.3, 2.4],
    [-2.63, 3.05, 3.65],
    [-2.07, 5.07, 2.11]
]
const CAMERA_LOOK_AT = [
    [-0.3, 0, 2.7],
    [-0.35, 0, 2.8],
    [1, 0.5, 1],
    [0, 0.5, 2.11],
]
// #ddeef4 blue
// #ff5e63 pink

{/*
Title: Covariant.AI
text: As Robotic engineer at Covariant.AI,
a silicon valley based company that builds
AI-powered robotic systems for industrial
automation and logistics.

Developed a digital twin framework for sim-to-real de-
ployment in robotic pick-and-place tasks.

Optimized
motion planning algorithms

 enhanced gripper config-
urations, and designed station layouts to improve item
placement and scanning efficiency

*/
}

const STATION_OFFSET = new THREE.Vector3(-0.9, 0, 1.8)
const STATION_ROTATION = new THREE.Euler(0, -Math.PI, 0)
const TOTE_OFFSET = new THREE.Vector3(0.556, 0.867, 0.725).add(STATION_OFFSET)
const PART = 5;

function CameraRig(controls) {

    const scroll = useScroll()
    const [init, setInit] = useState(false)
    useFrame((state, delta) => {
        controls.controls.current.disconnect();
        controls.controls.current.smoothTime = 0.5

        if (!init) {
            controls.controls.current.setLookAt(
                CAMERA_POSITION[0][0],
                CAMERA_POSITION[0][1],
                CAMERA_POSITION[0][2],
                CAMERA_LOOK_AT[0][0],
                CAMERA_LOOK_AT[0][1],
                CAMERA_LOOK_AT[0][2],
                false
            )
            setInit(true)
        }

        if (scroll.visible(0, 1 / PART, 0.01)) {
            // First scene
            controls.controls.current.setLookAt(
                CAMERA_POSITION[0][0],
                CAMERA_POSITION[0][1],
                CAMERA_POSITION[0][2],
                CAMERA_LOOK_AT[0][0],
                CAMERA_LOOK_AT[0][1],
                CAMERA_LOOK_AT[0][2],
                true
            )
        }

        if (scroll.visible(1 / PART, 1 / PART, 0.01)) {
            // First scene
            controls.controls.current.setLookAt(
                CAMERA_POSITION[1][0],
                CAMERA_POSITION[1][1],
                CAMERA_POSITION[1][2],
                CAMERA_LOOK_AT[1][0],
                CAMERA_LOOK_AT[1][1],
                CAMERA_LOOK_AT[1][2],
                true
            )
        }


        if (scroll.visible(2 / PART, 1 / PART, 0.01)) {
            // First scene
            controls.controls.current.setLookAt(
                CAMERA_POSITION[2][0],
                CAMERA_POSITION[2][1],
                CAMERA_POSITION[2][2],
                CAMERA_LOOK_AT[2][0],
                CAMERA_LOOK_AT[2][1],
                CAMERA_LOOK_AT[2][2],
                true
            )
        }

        if (scroll.visible(3 / PART, 1 / PART, 0.01)) {
            // Go to the next page
            controls.controls.current.setLookAt(
                CAMERA_POSITION[3][0],
                CAMERA_POSITION[3][1],
                CAMERA_POSITION[3][2],
                CAMERA_LOOK_AT[3][0],
                CAMERA_LOOK_AT[3][1],
                CAMERA_LOOK_AT[3][2],
                true
            )
        }

        if (scroll.visible(4 / PART, 1 / PART, 0.01)) {
            // Go to the next page
            controls.controls.current.setLookAt(
                CAMERA_POSITION[0][0],
                CAMERA_POSITION[0][1],
                CAMERA_POSITION[0][2],
                CAMERA_LOOK_AT[0][0],
                CAMERA_LOOK_AT[0][1],
                CAMERA_LOOK_AT[0][2],
                true
            )
        }
    })
    return null
}

function CovariantPage() {
    const controls = useRef();
    return (
        <group>
            <PerspectiveCamera
                makeDefault
                fov={30}
            />
            <CameraControls ref={controls}/>
            <ScrollControls pages={PART}>
                <Scroll html>
                    <h1 style={{position: 'absolute', top: '60vh', left: '0.5em', fontSize: '40vw'}}>to</h1>
                    <h1 style={{position: 'absolute', top: '120vh', left: '60vw', fontSize: '40vw'}}>be</h1>
                    <h1 style={{position: 'absolute', top: '200vh', left: '0.5vw', fontSize: '40vw'}}>home</h1>
                    <h1 style={{position: 'absolute', top: '300vh', left: '0.5vw', fontSize: '40vw'}}>Again</h1>
                    <h1 style={{position: 'absolute', top: '400vh', left: '0.5vw', fontSize: '40vw'}}>Mext</h1>
                </Scroll>
                <CameraRig controls={controls} mouseButtons={{wheel: 0}}/>

                <PointLightWShadow
                    position={new THREE.Vector3(-0.35, 2.4, 2.5)}
                    rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}
                    intensity={2}
                    decay={1}
                    near={0.2}
                    far={10}
                />
                <PointLightWShadow
                    position={new THREE.Vector3(0, 2.3, 1.7)}
                    rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}
                    intensity={0.5}
                    decay={1}
                    near={0.2}
                    far={10}
                />
                <RedcareBase
                    position={STATION_OFFSET}
                    rotation={STATION_ROTATION}
                />
                <RedcareStation
                    position={STATION_OFFSET}
                    rotation={STATION_ROTATION}
                />
                <ToteScene
                    position={TOTE_OFFSET}
                    rotation={STATION_ROTATION}
                />
                <ABB1300
                    position={STATION_OFFSET}
                    rotation={STATION_ROTATION}
                />
            </ScrollControls>
        </group>
    )
}

export default CovariantPage
