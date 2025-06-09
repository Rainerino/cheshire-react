import React, {useRef, useEffect, type JSX} from 'react';
import * as THREE from 'three';
import URDFLoader from 'urdf-loader';
import robot from '/models/robots/abb_irb1300/robot.urdf?url';

const ROBOT_MATERIAL = new THREE.MeshPhysicalMaterial({
    color: 0xff5733,
    metalness: 0.75,
    roughness: 0.5,
    opacity: 0.3,
    transparent: true,
    transmission: 0.99,
    clearcoat: 1.0,
    clearcoatRoughness: 0.25,
});

function URDFRobot({url}: { url: string }) {
    const groupRef = useRef<THREE.Group>(null);

    useEffect(() => {
        const loader = new URDFLoader();
        loader.load(
            url,
            (robot) => {
                if (groupRef.current) {
                    robot.rotation.x = -Math.PI / 2;
                    robot.rotation.z = -Math.PI;
                    robot.traverse((c) => {
                        c.castShadow = true;
                        c.receiveShadow = true;
                        if ((c as THREE.Mesh).isMesh) {
                            (c as THREE.Mesh).material = ROBOT_MATERIAL;
                        }
                    });
                    robot.updateMatrixWorld(true);
                    robot.position.y += 0.8;
                    groupRef.current.add(robot);
                }
            },
            undefined,
            (err) => {
                console.error('Failed to load URDF:', err);
                alert('Failed to load URDF model. Please check the console for details.');
            }
        );
        return () => {
            if (groupRef.current) {
                while (groupRef.current.children.length) {
                    groupRef.current.remove(groupRef.current.children[0]);
                }
            }
        };
    }, [url]);

    return <group ref={groupRef}/>;
}

export function ABB1300(props: JSX.IntrinsicElements['group']) {
    return (
        <group {...props} dispose={null}>
            <URDFRobot url={robot}/>
        </group>
    );
}

export default ABB1300;
