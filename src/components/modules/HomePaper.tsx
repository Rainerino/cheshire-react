import * as THREE from 'three'
import {useLocation, Link} from "wouter"
import {PerspectiveCamera, Text, useCursor, Decal, RenderTexture} from '@react-three/drei'
import {useState} from 'react'
import {useFrame, useLoader} from '@react-three/fiber'
import {useTranslation} from "react-i18next"

import handwritten_font from '/fonts/elegant_typewriter/ELEGANT TYPEWRITER Regular.ttf?url'
import handwritten_cn_font from '/fonts/Huiwenmincho-improved.ttf?url'
import lang_toggle from '../../lib/glb_const'
import texture_path from '/textures/paper_light.jpg'

const GOLDEN = 1.618033988
const SIZE = 0.3;
const STARTING_HEIGHT = 0.3
const LINE_HEIGHT = 0.1;
const LIST_FONT_SIZE = 0.05;
export default function HomeNavPage({ ...props }) {
    const [location, setLocation] = useLocation()
    const [hovered, setHovered] = useState(false)
    const texture = useLoader(THREE.TextureLoader, texture_path)
    const {t, i18n} = useTranslation();
    const [fontFamily, setFontFamily] = useState(handwritten_font);
    const [langFontFamily, setLangFontFamily] = useState(handwritten_cn_font);
    const on_click_callback = () => {
        // Ensure lang_toggle has the is_en property for
        lang_toggle.is_en = !lang_toggle.is_en;
    }

    useFrame((state, delta) => {
        if (!('is_en' in lang_toggle)) {
            (lang_toggle as any).is_en = true;
            setFontFamily(handwritten_font);
        }
        if (lang_toggle.is_en) {
            i18n.changeLanguage("en")
            setFontFamily(handwritten_font);
            setLangFontFamily(handwritten_cn_font);
        } else {
            i18n.changeLanguage("ch")
            setFontFamily(handwritten_cn_font);
            setLangFontFamily(handwritten_font);
        }
    })
    useCursor(hovered)
    return (
        <group {...props}>
            <mesh
                receiveShadow>
                <planeGeometry args={[SIZE, SIZE * GOLDEN]}/>
                <meshPhongMaterial
                    roughness={1}
                    map={texture}/>
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
                                font={langFontFamily}
                                position={[0.3, -0.3, 0]}
                                fontSize={LIST_FONT_SIZE}
                                color="black"
                                anchorX="right"
                                onPointerOver={() => setHovered(true)}
                                onPointerOut={() => setHovered(false)}
                                onClick={() => on_click_callback()}>
                                {t("lang")}
                            </Text>
                            {/* <ambientLight intensity={1} /> */}
                            <Text
                                font={fontFamily}
                                position={[0.3, -0.2, 0]}
                                fontSize={LIST_FONT_SIZE}
                                color="black"
                                anchorX="right"
                                onPointerOver={() => setHovered(true)}
                                onPointerOut={() => setHovered(false)}
                                onClick={() => setLocation("/view")}>
                                {t("switch")}
                            </Text>
                            <Text
                                font={fontFamily}
                                position={[0, 0.5, 0]}
                                fontSize={LIST_FONT_SIZE}
                                color="black"
                                anchorX="center"
                                onPointerOver={() => setHovered(true)}
                                onPointerOut={() => setHovered(false)}>
                                {t("welcome")}
                            </Text>
                            <Text
                                font={fontFamily}
                                anchorX="left"
                                position={[-0.3, STARTING_HEIGHT, 0]}
                                fontSize={LIST_FONT_SIZE}
                                color="black"
                                onPointerOver={() => setHovered(true)}
                                onPointerOut={() => setHovered(false)}
                                onClick={() => setLocation("/about")}>
                                {t("about")}
                            </Text>

                            <Text
                                font={fontFamily}
                                position={[-.3, STARTING_HEIGHT - LINE_HEIGHT, 0]}
                                fontSize={LIST_FONT_SIZE}
                                anchorX="left"
                                color="black"
                                onPointerOver={() => setHovered(true)}
                                onPointerOut={() => setHovered(false)}
                                onClick={() => setLocation("~/cheshire/projects")}>
                                {t("projects")}
                            </Text>


                            <Text
                                font={fontFamily}
                                position={[-.3, STARTING_HEIGHT - LINE_HEIGHT * 2, 0]}
                                fontSize={LIST_FONT_SIZE}
                                anchorX="left"
                                color="black"
                                onPointerOver={() => setHovered(true)}
                                onPointerOut={() => setHovered(false)}
                                onClick={() => window.open(lang_toggle.is_en ?
                                    '/cheshire/files/cv_2025__Robotic.pdf' : '/cheshire/files/cv_2025__Robotic_CN.pdf', '_blank')}>
                                {t("resume")}
                            </Text>

                            <Text
                                font={fontFamily}
                                position={[-.3, STARTING_HEIGHT - LINE_HEIGHT * 3, 0]}
                                fontSize={LIST_FONT_SIZE}
                                anchorX="left"
                                color="black"
                                onPointerOver={() => setHovered(true)}
                                onPointerOut={() => setHovered(false)}
                                onClick={() => setLocation("~/cheshire/projects")}>
                                {t("playground")}
                            </Text>

                            <Text
                                font={fontFamily}
                                position={[-.3, STARTING_HEIGHT - LINE_HEIGHT * 4, 0]}
                                fontSize={LIST_FONT_SIZE}
                                anchorX="left"
                                color="black"
                                onPointerOver={() => setHovered(true)}
                                onPointerOut={() => setHovered(false)}
                                onClick={() => setLocation("~/cheshire/credit")}>
                                {t("credit")}
                            </Text>


                            <Text
                                font={handwritten_font}
                                position={[0, 0.8, 0]}
                                fontSize={LIST_FONT_SIZE}
                                color="#5c5b5b"


                            >
                                All work and no play made Jack a dull boy
                            </Text>

                            <Text
                                font={handwritten_font}
                                position={[0, 0.7, 0]}
                                fontSize={LIST_FONT_SIZE}
                                color="#827f7f"


                            >
                                All work and no play makes All a dull boy
                            </Text>

                            <Text
                                font={handwritten_font}
                                position={[-0.48, STARTING_HEIGHT + LINE_HEIGHT * 3, 0]}
                                fontSize={LIST_FONT_SIZE}
                                color="#5c5b5b"


                            >
                                AI
                            </Text>
                            <Text
                                font={handwritten_font}
                                position={[0.43, STARTING_HEIGHT + LINE_HEIGHT * 3, 0]}
                                fontSize={LIST_FONT_SIZE}
                                color="#5c5b5b"


                            >
                                dl boy
                            </Text>
                            <Text
                                font={handwritten_font}
                                position={[0.46, STARTING_HEIGHT + LINE_HEIGHT, 0]}
                                fontSize={LIST_FONT_SIZE}
                                color="#827f7f"


                            >
                                boy
                            </Text>
                            <Text
                                font={handwritten_font}
                                position={[0.4, STARTING_HEIGHT, 0]}
                                fontSize={LIST_FONT_SIZE}
                                color="#827f7f"


                            >
                                dull boy
                            </Text>
                            <Text
                                font={handwritten_font}
                                position={[0.41, STARTING_HEIGHT - LINE_HEIGHT, 0]}
                                fontSize={LIST_FONT_SIZE}
                                color="#827f7f"


                            >
                                ull boj
                            </Text>
                            <Text
                                font={handwritten_font}
                                position={[0.44, STARTING_HEIGHT - LINE_HEIGHT * 2, 0]}
                                fontSize={LIST_FONT_SIZE}
                                color="#5c5b5b"


                            >
                                l boy
                            </Text>
                            <Text
                                font={handwritten_font}
                                position={[0.47, STARTING_HEIGHT - LINE_HEIGHT * 3, 0]}
                                fontSize={LIST_FONT_SIZE}
                                color="#827f7f"


                            >
                                oy
                            </Text>
                            <Text
                                font={handwritten_font}
                                position={[-0.43, -0.3, 0]}
                                fontSize={LIST_FONT_SIZE}
                                color="#827f7f"


                            >
                                All play
                            </Text>
                            <Text
                                font={handwritten_font}
                                position={[-0.31, -0.4, 0]}
                                fontSize={LIST_FONT_SIZE}
                                color="#5c5b5b"


                            >
                                All work not play
                            </Text>
                            <Text
                                font={handwritten_font}
                                position={[-0.53, -0.5, 0]}
                                fontSize={LIST_FONT_SIZE}
                                color="#827f7f"
                                anchorX="left"

                            >
                                All work and play not lboy
                            </Text>
                            <Text
                                font={handwritten_font}
                                position={[0, -0.6, 0]}
                                fontSize={LIST_FONT_SIZE}
                                color="#827f7f"


                            >
                                All works and no plays make Jack dull boys
                            </Text>
                            <Text
                                font={handwritten_font}
                                position={[0, -0.7, 0]}
                                fontSize={LIST_FONT_SIZE}
                                color="#5c5b5b"


                            >
                                All work and no play makes John a dull boy
                            </Text>
                            <Text
                                font={handwritten_font}
                                position={[0, -0.8, 0]}
                                fontSize={LIST_FONT_SIZE}
                                color="#5c5b5b"


                            >
                                All work and no play makes Jack a doll boy
                            </Text>
                        </RenderTexture>
                    </meshStandardMaterial>
                </Decal>
            </mesh>
        </group>
    )
}
