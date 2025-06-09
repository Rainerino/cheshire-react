import React, {useRef, useState} from 'react';
import {useFrame} from '@react-three/fiber';
import {Environment, Grid, CameraControls} from '@react-three/drei';
import {Physics, RigidBody, CuboidCollider} from "@react-three/rapier";
import {RedcareTote} from '../components/models/RedcareTote';
// import {Coffee} from '../components/sku/Coffee';
// import {InkBox} from '../components/sku/InkBox';
// import {Lotion} from '../components/sku/Lotion';
// import {PaperBox} from '../components/sku/PaperBox';
// import {Mustard} from '../components/sku/Mustard';
// import {MultuCapBottle} from '../components/sku/MutliCapBottle';
// import {PencilCase} from '../components/sku/PencilCase';


const WALL_HEIGHT = 2 / 2;
const BOTTOM_WIDTH = 0.58 / 2;
const BOTTOM_LENGTH = 0.38 / 2;
const WALL_THICKNESS = 0.02;
const HEIGHT_OFFSET = 0.3
export default function NextPage(props) {
    const controls = useRef(null);
    useFrame(() => {
        controls.current.enabled = true;
    });
    const [isPaused, togglePaused] = useState(true)
    return (
        <group {...props}>
            <CameraControls ref={controls}/>
            <hemisphereLight intensity={0.35 * Math.PI}/>
            <ambientLight intensity={5}/>
            <RedcareTote onClick={() => togglePaused((value) => !value)}/>
            <Physics paused={isPaused} debug gravity={[0, -10, 0]} colliders="hull">
                {/* Bottom */}
                <CuboidCollider position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}
                                args={[BOTTOM_WIDTH, BOTTOM_LENGTH, WALL_THICKNESS]}/>
                {/* Side front and back */}
                <CuboidCollider position={[0, WALL_HEIGHT, -BOTTOM_LENGTH - WALL_THICKNESS]} rotation={[0, 0, 0]}
                                args={[BOTTOM_WIDTH, WALL_HEIGHT, WALL_THICKNESS,]}/>
                <CuboidCollider position={[0, WALL_HEIGHT, BOTTOM_LENGTH + WALL_THICKNESS]} rotation={[0, 0, 0]}
                                args={[BOTTOM_WIDTH, WALL_HEIGHT, WALL_THICKNESS,]}/>

                {/* Side left and right */}
                <CuboidCollider position={[-BOTTOM_WIDTH - WALL_THICKNESS, WALL_HEIGHT, 0]}
                                rotation={[0, Math.PI / 2, 0]} args={[BOTTOM_LENGTH, WALL_HEIGHT, WALL_THICKNESS,]}/>
                <CuboidCollider position={[BOTTOM_WIDTH + WALL_THICKNESS, WALL_HEIGHT, 0]}
                                rotation={[0, -Math.PI / 2, 0]} args={[BOTTOM_LENGTH, WALL_HEIGHT, WALL_THICKNESS,]}/>
                {/* {[
                    {Component: Coffee, key: 'coffee'},
                    {Component: InkBox, key: 'inkbox'},
                    {Component: Lotion, key: 'lotion'},
                    {Component: Mustard, key: 'mustard'},
                    {Component: PaperBox, key: 'capbottle'},
                    {Component: MultuCapBottle, key: 'multucapbottle'},
                    {Component: PencilCase, key: 'pencilcase'},
                ].map(({Component, key}) => {
                    // Define bounds
                    const xMin = -BOTTOM_WIDTH + WALL_THICKNESS, xMax = BOTTOM_WIDTH - WALL_THICKNESS;
                    const yMin = HEIGHT_OFFSET, yMax = HEIGHT_OFFSET + 1;
                    const zMin = -BOTTOM_LENGTH + WALL_THICKNESS, zMax = BOTTOM_LENGTH - WALL_THICKNESS;

                    // Random position within bounds
                    const x = xMin + Math.random() * (xMax - xMin);
                    const y = yMin + Math.random() * (yMax - yMin);
                    const z = zMin + Math.random() * (zMax - zMin);
                    return (
                        <RigidBody key={key} position={[x, y, z]}>
                            <Component/>
                        </RigidBody>
                    );
                })} */}
            </Physics>
            <Environment preset={"forest"}/>

            <Grid infiniteGrid/>
            {/* Add 3D objects here if needed */}
        </group>
    )
} 

