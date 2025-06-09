import {useState} from 'react'
import * as THREE from 'three'
import {SpotLight} from '@react-three/drei'

export function OverheadLamp(props) {
    const [target] = useState(() => new THREE.Object3D())
    return (
        <mesh  {...props}>
            <cylinderGeometry args={[0.1, 0.3, 0.2, 32]}/>
            <meshStandardMaterial/>
            <SpotLight
                castShadow
                // target={target}
                volumetric
                penumbra={0.8}
                intensity={15}
                angle={0.35}
                distance={0}
                shadow-bias={-0.0001}
                shadow-mapSize={[1024, 1024]}
            />
            {/* <primitive object={target} /> */}
        </mesh>
    )
}
  