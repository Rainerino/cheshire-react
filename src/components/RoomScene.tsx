import {CameraControls, Environment, PerspectiveCamera} from "@react-three/drei";
import HomeNavPage from "./modules/HomePaper";
import * as THREE from 'three'
import {RedrumDoor} from "./modules/RedrumDoor";
import {Room2} from "./models/Room2";
import {Desktop2} from "./models/Desktop2";
import Curtain from "./models/Curtain";
import Mirror from "./modules/Mirror";
import {OverheadLamp} from "./modules/OverheadLamp";
import {useEffect, useMemo, useRef, useState} from "react";
import {extend, useFrame, useThree} from "@react-three/fiber";
import {Route, useLocation} from "wouter";
import AboutScene from "./AboutScene";
import ViewScene from "./ViewScene";
import BusinessCard from "./modules/BusinessCard";
import env_file from "/textures/night.hdr?url"

const PAGE_ANGLE = Math.PI / 6.5;
const LOOKAT_EPS = 0.00001;
const HOME_POSITION = [0.077, 1.5, 0.218]
const HOME_LOOK_AT = [0.077 - LOOKAT_EPS * Math.cos(PAGE_ANGLE), 0, 0.218 + LOOKAT_EPS * Math.sin(PAGE_ANGLE)]

export default function RoomScene(props) {
    // Upon enter, fix the camera
    const [location, setLocation] = useLocation();
    const [mycam, setMycam] = useState<THREE.PerspectiveCamera | null>(null);
    const [initialize, setInitialize] = useState(false)

    const ref = useRef<CameraControls>(null);
    useEffect(() => {
        if (!ref.current) return;
        ref.current.setLookAt(
            HOME_POSITION[0],
            HOME_POSITION[1],
            HOME_POSITION[2],
            HOME_LOOK_AT[0],
            HOME_LOOK_AT[1],
            HOME_LOOK_AT[2],
            false
        )

    }, [ref]);
    useFrame((state, delta) => {
        if (!ref.current) return;
        ref.current.smoothTime = 0.5;
        if (location === "/cheshire/home") {
            ref.current.zoomTo(1, false);
            ref.current.disconnect();
            // Make sure the first frame is not transitioned.
            if (!initialize) {
                setInitialize(true)
            }
            ref.current.setLookAt(
                HOME_POSITION[0],
                HOME_POSITION[1],
                HOME_POSITION[2],
                HOME_LOOK_AT[0],
                HOME_LOOK_AT[1],
                HOME_LOOK_AT[2],
                initialize
            )
        }

    })
    return (
        <group {...props}>
            <Route path="/cheshire/home" nest>
                <Route path="/about">
                    <AboutScene controls={ref}/>
                </Route>
                <Route path="/view">
                    <ViewScene controls={ref} />
                </Route>
                <HomeNavPage
                    position={[0.11, 0.87, 0.2]}
                    rotation={[-Math.PI / 2, 0, Math.PI / 2 + Math.PI / 6.5]}
                    scale={[1, 1, 1]}
                />
                <BusinessCard
                    position={[0., 0.87, -0.43]}
                    rotation={[-Math.PI / 2, 0, Math.PI / 2 - Math.PI / 13]}
                />
                <Environment
                    files={env_file}
                    background
                    backgroundBlurriness={0.1}
                    backgroundIntensity={0.5}
                />
                <PerspectiveCamera
                    ref={setMycam}
                    makeDefault
                    position={new THREE.Vector3().fromArray(HOME_POSITION)}
                    fov={25}
                />
                {mycam && <CameraControls ref={ref} camera={mycam}/>}
                <ambientLight intensity={0.05}/>
                <Curtain
                    position={new THREE.Vector3(-2.45, 1.7, -0.6)}
                    rotation={new THREE.Euler(0, -Math.PI / 2, 0)}
                />
                <Room2 position={[-1.5, 0, 0]} rotation={[0, Math.PI, 0]}/>
                <RedrumDoor/>
                <Desktop2 position={[-0, 0, 0]} rotation={[0, Math.PI / 2, 0]}/>
                {/* Curtain and Mirror are conflicted somehow */}
                <Mirror
                    position={[1, 1, 1.3]}
                    rotation={[0, Math.PI / 17 + Math.PI, 0]}
                />
                <fog attach="fog" args={['#202020', 5, 20]}/>
                <pointLight
                    color={'#f7e7ba'}
                    castShadow
                    decay={2}
                    shadow-bias={-0.00001}
                    shadow-mapSize={[1024, 1024]}
                    // shadow-camera-fov={120}
                    // shadow-camera-far={100}
                    // shadow-camera-near={0.1}
                    position={[-2.25, 1, -2.245]}
                    intensity={0.8}>
                </pointLight>
                <pointLight
                    color={'#f7e7ba'}
                    castShadow
                    decay={2}
                    shadow-bias={-0.00001}
                    shadow-mapSize={[1024, 1024]}
                    // shadow-camera-far={100}
                    // shadow-camera-near={0.1}
                    position={[0.775, 1.1, -2.245]}
                    intensity={0.5}>
                </pointLight>
                <OverheadLamp position={[-1, 2.5, -0.4]}/>

            </Route>

        </group>
    )
}