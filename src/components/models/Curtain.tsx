import React, {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import CurtainSimulation from '../../lib/curtain';
import * as THREE from 'three';

type CurtainProps = {
    position?: THREE.Vector3;
    rotation?: THREE.Euler;
};

const Curtain: React.FC<CurtainProps> = ({position, rotation, ...props}) => {
    const curtainRef = useRef<CurtainSimulation>(new CurtainSimulation(position, rotation));
    useFrame((state, delta) => {
        curtainRef.current.update(delta);
    });

    return (
        <group {...props}>
            <primitive object={curtainRef.current?.clothMesh}/>
            {/* <primitive object={curtainRef.current?.sphereMesh} /> */}
        </group>
    );
};

export default Curtain;
