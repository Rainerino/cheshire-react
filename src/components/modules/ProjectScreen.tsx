import * as THREE from 'three'
import {useRef, useState} from 'react'
import {useLocation} from "wouter";
import {

    useCursor,
    Decal,
    useScroll,
    ScrollControls,
    useVideoTexture
} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import {proxy, useSnapshot} from 'valtio'
import CurvedPlane from '../common/CurvedPlane'
import gsap from 'gsap'
import co_vid_file from "/videos/covariant.mp4"
import mm_vid_file from "/videos/mm.mp4"
import nt_vid_file from "/videos/covariant2.mp4"


const screen_state = proxy({key: ""})

class ProjectInfo {
    constructor(color, title, path, url) {
        this.color = color
        this.title = title
        this.path = path
        this.url = url
    }
}

const project_infos = new Map([
    ["covariant",
        new ProjectInfo(new THREE.Color(0x2185d0),
            'Covariant',
            "/images/covariant.mp4",
            '/covariant')],
    ["motion_metrics",
        new ProjectInfo(new THREE.Color(0x2185d0),
            'Motion Metrics',
            "/images/mm.mp4",
            '/motion_metrics')],
    ["next",
        new ProjectInfo(new THREE.Color(0x2185d0),
            'Next',
            "/images/covariant2.mp4",
            '/next')],
])

const RADIUS = 1;
const PART = 3;
const ASPECT_RATIO = 4 / 3;
const FADE_TIME = 1;

function Display({position, rotation, w, h, ...props}) {
    const co_ref = useRef<THREE.Mesh>(null)
    const mm_ref2 = useRef<THREE.Mesh>(null)
    const nxt_ref2 = useRef<THREE.Mesh>(null)
    const scroll = useScroll()
    const [hovered, setHovered] = useState(false)
    if (screen_state.key == '') {
        screen_state.key = "covariant"
    }
    const snap = useSnapshot(screen_state)
    const [location, setLocation] = useLocation();
    const co_texture = useVideoTexture(co_vid_file, { start: false })
    const co_video = co_texture.image;
    const mm_texture = useVideoTexture(mm_vid_file, { start: false })
    const mm_video = mm_texture.image;
    const nt_texture = useVideoTexture(nt_vid_file, { start: false })
    const nt_video = nt_texture.image;
    useCursor(hovered)

    const handleClick = () => {
        const url = project_infos.get(screen_state.key).url
        setLocation(url);
    }
    useFrame((state, delta) => {
        // if (!co_ref.current || !mm_ref2.current || !nxt_ref2.current) return
        // Update screen_state.key based on scroll offset
        if (!hovered) {
            const randomValue = Math.random() / 3 + 1
            co_ref.current.material.color.setScalar(randomValue)
            mm_ref2.current?.material.color.setScalar(randomValue)
            nxt_ref2.current?.material.color.setScalar(randomValue)
        } else {
            gsap.to(co_ref.current.material.color, {
                r: 1, g: 1, b: 1, duration: 0.5, overwrite: true
            })
            gsap.to(mm_ref2.current.material.color, {
                r: 1, g: 1, b: 1, duration: 0.5, overwrite: true
            })
            gsap.to(nxt_ref2.current.material.color, {
                r: 1, g: 1, b: 1, duration: 0.5, overwrite: true
            })
        }

        co_ref.current.material.transparent = true;
        // co_ref.current.material.opacity = 0;

        if (scroll.visible(0, 1 / PART, 0.01)) {
            co_video.play();
            mm_video.pause();
            nt_video.pause();
            gsap.to(co_ref.current.material, {
                opacity: 1, duration: FADE_TIME, overwrite: true
            })
            gsap.to(mm_ref2.current.material, {
                opacity: 0, duration: FADE_TIME
            })
            gsap.to(nxt_ref2.current.material, {
                opacity: 0, duration: FADE_TIME
            })

            screen_state.key = "covariant"
        } else if (scroll.visible(1 / PART, 1 / PART, 0.01)) {
            co_video.pause();
            mm_video.play();
            nt_video.pause();
            gsap.to(co_ref.current.material, {
                opacity: 0, duration: FADE_TIME
            })
            gsap.to(mm_ref2.current.material, {
                opacity: 1, duration: FADE_TIME
            })
            gsap.to(nxt_ref2.current.material, {
                opacity: 0, duration: FADE_TIME
            })
            screen_state.key = "motion_metrics"
        } else {
            co_video.pause();
            mm_video.pause();
            nt_video.play();
            gsap.to(co_ref.current.material, {
                opacity: 0, duration: FADE_TIME
            })
            gsap.to(mm_ref2.current.material, {
                opacity: 0, duration: FADE_TIME
            })
            gsap.to(nxt_ref2.current.material, {
                opacity: 1, duration: FADE_TIME
            })
            screen_state.key = "next"
        }
        // co_ref.current.material.needsUpdate = true;
        // mm_ref2.current.material.transparent = true;
        // nxt_ref2.current.material.transparent = true;
    })

    return (
        <group {...props}>
            <CurvedPlane
                position={position}
                rotation={rotation}
                width={w}
                height={h}
                radius={RADIUS}
                onClick={handleClick}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                castShadow
                receiveShadow
                dispose={null}
            >
                <meshStandardMaterial attach="material" color="#827f7f"/>
                <Decal
                    // debug
                    ref={co_ref}
                    position={[0, 0, RADIUS]}
                    rotation={[0, 0.0001, 0]}
                    scale={[w, h / ASPECT_RATIO, 1]}
                    map={co_texture}
                >
                </Decal>
                <Decal
                    // debug
                    ref={mm_ref2}
                    position={[0, 0, RADIUS]}
                    rotation={[0, 0.0001, 0]}
                    scale={[w, h / ASPECT_RATIO, 1]}
                    map={mm_texture}
                >
                </Decal>
                <Decal
                    // debug
                    ref={nxt_ref2}
                    position={[0, 0, RADIUS]}
                    rotation={[0, 0.0001, 0]}
                    scale={[w, h / ASPECT_RATIO, 1]}
                    map={nt_texture}
                >
                </Decal>
            </CurvedPlane>
        </group>
    )
}

export default function ProjectScreen({position, rotation, w = 1, h = 1, ...props}) {
    return (
        <group {...props}>
            <ScrollControls damping={0.1} pages={PART}>
                <Display position={position} rotation={rotation} w={w} h={h}/>
            </ScrollControls>
        </group>
    )
}