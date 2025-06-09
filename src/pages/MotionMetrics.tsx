import {useRef, useState} from 'react';
import {useFrame} from '@react-three/fiber';
import {
    CameraControls, Environment,
    Grid, PerspectiveCamera, Scroll, ScrollControls, useScroll
} from '@react-three/drei';
import {CAT6080} from '../components/models/CAT_6080';
// import env_file from "/cheshire/textures/mines.hdr?url"


const CAMERA_POSITION = [
    [1, 9.5, -3.5],
    [3.39, 7.46, -4.29], //3.39, 7.46, -4.29
    [4.68, 8.23, -10],
    [-2.07, 5.07, 2.11]
]
const CAMERA_LOOK_AT = [
    [1.5, 9.2, -3.5],
    [10, 3, 0],
    [7, 8, 0], //
    [0, 0.5, 2.11],
]
const PART = 4;

function CameraRig(controls) {
    const scroll = useScroll()
    const [init, setInit] = useState(false)

    useFrame((state, delta) => {

        controls.controls.current.smoothTime = 0.5
        controls.controls.current.disconnect();

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
            // Second scene
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
            // Third scene
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
        }
    })


}

export default function MotionMetricsPage(props) {
    // const cam_ref = useRef()
    const controls = useRef();
    return (
        <group {...props}>
            <PerspectiveCamera makeDefault fov={75}/>
            {/* <CameraControls ref={cameraControlRef}></CameraControls> */}
            <CameraControls ref={controls}/>
            <ScrollControls pages={PART} damping={0.1}>
                <CAT6080 rotation={[0, Math.PI / 2, 0]} position={[0, 0, 0]}/>
                <CameraRig controls={controls}/>

                <Scroll html>
                    {/* This needs to be scaled with the screen size...*/}
                    <h1 style={{position: 'absolute', top: '60vh', left: '0.5em', fontSize: '40vw'}}>to</h1>
                    <h1 style={{position: 'absolute', top: '120vh', left: '60vw', fontSize: '40vw'}}>be</h1>
                    <h1 style={{position: 'absolute', top: '200vh', left: '0.5vw', fontSize: '40vw'}}>home</h1>
                    <h1 style={{position: 'absolute', top: '300vh', left: '0.5vw', fontSize: '40vw'}}>Mext</h1>
                </Scroll>
            </ScrollControls>
            {/* <Environment
                files={env_file}
                background
                backgroundBlurriness={0.1}
                backgroundIntensity={0.5}
            /> */}

            <Grid infiniteGrid/>
        </group>
    )
} 

