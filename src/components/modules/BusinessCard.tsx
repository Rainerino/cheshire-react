import * as THREE from 'three'
import {useLocation, Link} from "wouter"
import {
    PerspectiveCamera,
    Text,
    Decal,
    RenderTexture
} from '@react-three/drei'
import {useLoader} from '@react-three/fiber'
import {useTranslation} from "react-i18next"

import handwritten_cn_font from '/fonts/HanyiSentyTang.ttf?url'
import texture_path from '/textures/paper_light.jpg'

const GOLDEN = 1.618033988
const SIZE = 0.08;
const FONT_SIZE = 0.1
export default function BusinessCard({...props}) {
    const texture = useLoader(THREE.TextureLoader, texture_path)
    const {t, i18n} = useTranslation();
    return (
        <group {...props}>
            <mesh
                // onPointerOver={(e) => setHovered(true)}
                // onPointerOut={(e) => setHovered(false)}
                receiveShadow>
                <planeGeometry args={[SIZE * GOLDEN, SIZE]}/>
                <meshPhongMaterial
                    roughness={1}
                    map={texture}
                />
                <Decal
                    receiveShadow
                    // debug
                    position={[0, 0, 0]}
                    rotation={[0, 0, 0]}
                    scale={[SIZE, SIZE * GOLDEN, SIZE]}
                >
                    {/* ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789! */}
                    <meshStandardMaterial
                        roughness={1}
                        transparent
                        polygonOffset
                        polygonOffsetFactor={-1}>
                        <RenderTexture attach="map" anisotropy={64}>
                            <PerspectiveCamera makeDefault manual aspect={1 / GOLDEN} position={[0, 0, 2]}/>
                            {/* <ambientLight intensity={1} /> */}
                            <Text
                                font={handwritten_cn_font}
                                position={[0, 0.2, 0]}
                                fontSize={FONT_SIZE * (1 + GOLDEN)}
                                color="black"
                                anchorX="center"
                            >
                                {t("name")}
                            </Text>
                            <Text

                                position={[0, 0.05, 0]}
                                fontSize={FONT_SIZE}
                                color="black"
                                anchorX="center"
                            >
                                ----------------------------------
                            </Text>
                            <Text
                                font={handwritten_cn_font}
                                position={[0, -0.1, 0]}
                                fontSize={FONT_SIZE}
                                color="black"
                                anchorX="center"
                            >
                                {t("title")}
                            </Text>
                            <Text
                                font={handwritten_cn_font}
                                position={[0, -0.25, 0]}
                                fontSize={FONT_SIZE}
                                color="black"
                                anchorX="center"
                            >
                                albertyanyy@gmail.com
                            </Text>
                        </RenderTexture>
                    </meshStandardMaterial>
                </Decal>
            </mesh>
        </group>
    )
}
