import {useFrame} from "@react-three/fiber";
import * as THREE from 'three'

export default function AboutPage(controls, props) {
    const tgt_look = new THREE.Vector3(1.16, 0.93, 1.6)
    const tgt_pos = new THREE.Vector3(-0.5, 1.3, -1.2);
    const cur_look = new THREE.Vector3()

    useFrame((state, delta) => {
        // Update camera position and tgt_look at based on the current time
        // Animate camera zoom manually since GSAP can't tween Three.js camera properties directly
        controls.controls.current.disconnect();
        controls.controls.current.smoothTime = 1;
        controls.controls.current.lerpLookAt(
            tgt_pos.x,
            tgt_pos.y,
            tgt_pos.z,
            tgt_look.x,
            tgt_look.y,
            tgt_look.z,
            state.camera.position.x,
            state.camera.position.y,
            state.camera.position.z,
            cur_look.x,
            cur_look.y,
            cur_look.z,
            0.,
            true
        )

        const eps = 0.1;

        const arrived = state.camera.position.distanceTo(tgt_pos) < eps;
        if (arrived) {
            controls.controls.current.maxZoom = 10;
            controls.controls.current.smoothTime = 0.01;
            controls.controls.current.zoomTo(5.4, true)
            controls.controls.current.smoothTime = 0.25;
            // Arrived at target position
            // You can trigger any logic here if needed
        }

    })
    return null;
}