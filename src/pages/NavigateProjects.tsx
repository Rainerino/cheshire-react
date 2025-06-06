import { extend, useFrame, useThree } from '@react-three/fiber'
import { CameraControls, OrbitControls, PerspectiveCamera, SpotLight, Select } from '@react-three/drei'
import { Autofocus, EffectComposer } from '@react-three/postprocessing'
import * as THREE from 'three'
import { OldTV } from '../components/models/TV'
import { CouchTable } from '../components/models/CouchTable'
import { DoubleCouch } from '../components/models/DoubleCouch'
import { SingleCouch } from '../components/models/SingleCouch'
import ProjectScreen from '../components/modules/ProjectScreen'
import { useEffect, useRef } from 'react'
import { useLocation } from 'wouter'


const CAMERA_START_POSITION = [0, 2.3, 8]
const CAMERA_LOOK_AT = [0.1, -0.2, -6]
const EPS = 0.01
let Enough = false;

const isCameraAtPosition = (pos: THREE.Vector3, target: number[]) =>
    Math.abs(pos.x - target[0]) < EPS &&
    Math.abs(pos.y - target[1]) < EPS &&
    Math.abs(pos.z - target[2]) < EPS

function CameraRig() {
    const cam_ref = useRef<CameraControls>(null);
    const { controls, camera } = useThree()
    useEffect(() => {
        if (!cam_ref.current) return;
        cam_ref.current.zoomTo(1)
        cam_ref.current.setLookAt(
            CAMERA_START_POSITION[0],
            CAMERA_START_POSITION[1],
            CAMERA_START_POSITION[2],
            CAMERA_LOOK_AT[0],
            CAMERA_LOOK_AT[1],
            CAMERA_LOOK_AT[2]);
        cam_ref.current.smoothTime = 0.25;
        cam_ref.current.disconnect();
    }, [cam_ref, location])

    useFrame((state, delta) => {
        if (!cam_ref.current) return;
        if (isCameraAtPosition(cam_ref.current.camera.position, CAMERA_START_POSITION)) {
            if (!Enough) {
                cam_ref.current.smoothTime = 2;
                cam_ref.current.zoomTo(1 / 2.5, true)
                cam_ref.current.dollyInFixed(5, true)
                Enough = true;
            } else {
                cam_ref.current.smoothTime = 0.25;
                // cam_ref.current.zoomTo(1/2.5)
                // cam_ref.current.zoomTo(1/3, false)
                // cam_ref.current.dollyInFixed(3, false)
            }
        } else {
            cam_ref.current.zoomTo(1)
            cam_ref.current.setTarget(CAMERA_LOOK_AT[0],
                CAMERA_LOOK_AT[1], CAMERA_LOOK_AT[2], false);
            cam_ref.current.setPosition(CAMERA_START_POSITION[0], CAMERA_START_POSITION[1], CAMERA_START_POSITION[2], false)
            cam_ref.current.smoothTime = 0.25;
            cam_ref.current.disconnect();
        }
    })
    return <CameraControls ref={cam_ref} />
}
export default function ProjectNavPage(props) {
    return (
        <group {...props}>
            <PerspectiveCamera
                makeDefault
                position={new THREE.Vector3().fromArray(CAMERA_START_POSITION)}
                fov={15}
            />
            <CameraRig />
            <ambientLight intensity={0.1} />
            <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
                <planeGeometry args={[20, 100]} />
                <meshPhongMaterial color="#202020" />
            </mesh>
            <EffectComposer multisampling={8} autoClear={false}>
                <Autofocus
                    mouse
                    smoothTime={0.15}
                    focusRange={0.00025}
                    bokehScale={5}
                    resolutionScale={0.5}
                    resolutionX={2048}
                    resolutionY={2048}
                />
            </EffectComposer>
            <fog attach="fog" args={['#202020', 5, 20]} />
            <SpotLight
                castShadow
                shadow-bias={-0.0003}
                shadow-mapSize={[2048, 2048]}
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
            <OldTV rotation={[0, Math.PI, 0]} position={[0, 0, 0]} />
            <DoubleCouch position={[-1.4, 0, 2]} rotation={[0, 0, 0]} />
            <SingleCouch position={[0.5, 0, 1.6]} rotation={[0, -Math.PI / 2, 0]} />
            <SingleCouch position={[0.5, 0, 0.1]} rotation={[0, -Math.PI / 2, 0]} />
            <CouchTable position={[0.75, 0, 1.3]} rotation={[0, -Math.PI / 2, 0]} />

            <ProjectScreen
                position={[-0.07, 0.885, -0.04]}
                rotation={[0, 0, 0]}
                w={0.51}
                h={0.4}
            />
        </group>
    )
}
