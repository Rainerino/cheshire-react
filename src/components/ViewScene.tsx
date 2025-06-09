import {useFrame} from "@react-three/fiber";
import { useState } from "react";
import * as THREE from 'three'

const CAMERA_POSITION = [1.8, 2., 0]
const CAMERA_LOOK_AT = [0, 1.1, 0]
export default function ViewScene(controls, props) {
    const [enableMouse, setEnableMouse] = useState(false)
    const [initialize, setInitialize] = useState(false)

    useFrame((state, delta) => {
        controls.controls.current.smoothTime = 1.0;
        const eps = 0.01;
        const dist = controls.controls.current.camera.position.distanceTo(
        new THREE.Vector3(CAMERA_POSITION[0]
            , CAMERA_POSITION[1]
            , CAMERA_POSITION[2]))
        if (dist > eps && !initialize) {
            // Arrived at target position
            // You can trigger any logic here if needed
            controls.controls.current.setLookAt(
                CAMERA_POSITION[0],
                CAMERA_POSITION[1],
                CAMERA_POSITION[2],
                CAMERA_LOOK_AT[0],
                CAMERA_LOOK_AT[1],
                CAMERA_LOOK_AT[2],
                true
            )
            setInitialize(true)
        } 
        if (!enableMouse) {
            controls.controls.current.connect(state.gl.domElement);
            setEnableMouse(true)
        } else {
            controls.controls.current.dollySpeed = 1;
            controls.controls.current.truckSpeed = 0;
            controls.controls.current.azimuthRotateSpeed = 1;
            controls.controls.current.polarRotateSpeed = 0.5;
            controls.controls.current.boundaryFriction = 1;

            controls.controls.current.draggingSmoothTime = 0.5;
            controls.controls.current.maxDistance = 2.5;
            controls.controls.current.minDistance = 1.5;
            controls.controls.current.minPolarAngle = -Math.PI / 5 + Math.PI / 2
            controls.controls.current.maxPolarAngle = -0.01 + Math.PI / 2
            controls.controls.current.minAzimuthAngle = -Math.PI / 6 + Math.PI / 2
            controls.controls.current.maxAzimuthAngle = Math.PI / 6 + Math.PI / 2
    
        }
        
    


    })
    return null;
}