import {useFrame} from '@react-three/fiber'
import {CameraControls, PerspectiveCamera, SpotLight} from '@react-three/drei'
import {Autofocus, EffectComposer} from '@react-three/postprocessing'
import * as THREE from 'three'
import ProjectScreen from '../components/modules/ProjectScreen'
import {useEffect, useRef, useState} from 'react'
import { TVRoom } from '../components/models/TVRoom'


const CAMERA_START_POSITION = [0, 2.3, 8]
const CAMERA_LOOK_AT = [0.1, -0.2, -6]
const EPS = 0.01

let ENOUGH = false;
const isCameraAtPosition = (pos, target) =>
    Math.abs(pos.x - target[0]) < EPS &&
    Math.abs(pos.y - target[1]) < EPS &&
    Math.abs(pos.z - target[2]) < EPS

function CameraRig({camera, ...props}) {
    const cam_ref = useRef<CameraControls>(null);

    useEffect(() => {
        cam_ref.current.setLookAt(
            CAMERA_START_POSITION[0],
            CAMERA_START_POSITION[1],
            CAMERA_START_POSITION[2],
            CAMERA_LOOK_AT[0],
            CAMERA_LOOK_AT[1],
            CAMERA_LOOK_AT[2],
            false);
    }, [camera])

    useFrame((state, delta) => {
        if (!cam_ref.current) return;
        cam_ref.current.disconnect();
        if (isCameraAtPosition(cam_ref.current.camera.position, CAMERA_START_POSITION)) {
            if (!ENOUGH) {
                cam_ref.current.smoothTime = 1;
                cam_ref.current.zoomTo(1 / 2.5, true)
                cam_ref.current.dollyInFixed(5, true)
                ENOUGH = true;
            }
        }
    })
    return <CameraControls ref={cam_ref} camera={camera}/>
}

export default function ProjectNavPage(props) {
    const [mycam, setMycam] = useState<THREE.PerspectiveCamera | null>(null);
    return (
        <group {...props}>
            <ProjectScreen
                position={[-0.07, 0.884, -0.00]}
                rotation={[0, 0, 0]}
                w={0.57}
                h={0.41}
            />
            <PerspectiveCamera
                makeDefault
                ref={setMycam}
                position={new THREE.Vector3().fromArray(CAMERA_START_POSITION)}
                fov={12}
            />
            <CameraRig camera={mycam}/>
            <ambientLight intensity={0.1}/>
            <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
                <planeGeometry args={[20, 100]}/>
                <meshPhongMaterial color="#202020"/>
            </mesh>
            <EffectComposer multisampling={8} autoClear={false}>
                <Autofocus
                    mouse
                    smoothTime={0.15}
                    focusRange={0.00025}
                    bokehScale={4}
                    resolutionScale={0.5}
                    resolutionX={1024}
                    resolutionY={1024}
                />
            </EffectComposer>
            <fog attach="fog" args={['#202020', 5, 20]}/>
            <SpotLight
                castShadow
                shadow-bias={-0.0001}
                shadow-mapSize={[1024, 1024]}
                position={[0, 5, -5]}
                distance={70}
                penumbra={0.4}
                radiusTop={0.4}
                radiusBottom={40}
                angle={0.45}
                attenuation={20}
                anglePower={5}
                intensity={300}
                opacity={0.2}
            />
            <TVRoom rotation={[0, Math.PI, 0]} position={[0, 0, 0]} />
        </group>
    )
}
