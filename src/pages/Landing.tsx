import { Suspense, useReducer, useRef, useState } from 'react'
import { CameraControls, useGLTF, Environment, PerspectiveCamera, OrbitControls, PivotControls, SpotLight, Preload, MeshReflectorMaterial, Helper, AccumulativeShadows, RandomizedLight, Grid, Loader, PerformanceMonitor, useEnvironment } from '@react-three/drei'
import * as THREE from 'three'
import { Redirect, Route, Router, useLocation, useRoute, useRouter } from "wouter"
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';


import { ThemeProvider, createTheme } from '@mui/material/styles';

import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from "react-i18next"
import { Canvas, useLoader } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { Perf } from "r3f-perf"


import ProjectNavPage from './NavigateProjects'
import CovariantPage from './Covariant'
import MotionMetricsPage from './MotionMetrics'
import NextPage from './Next'
import RoomScene from '../components/RoomScene'

THREE.ColorManagement.enabled = true

let theme = createTheme({
  // Theme customization goes here as usual, including tonalOffset and/or
  // contrastThreshold as the augmentColor() function relies on these
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

theme = createTheme(theme, {
  // Custom colors created with augmentColor go here
  palette: {
    salmon: theme.palette.augmentColor({
      color: {
        main: '#FF5733',
      },
      name: 'salmon',
    }),
  },
});
const debug = false
function LandingPage() {
  const [location, setLocation] = useLocation()
  const [dpr, setDpr] = useState(1)
  const { t, i18n } = useTranslation();

  return (
    <>
      <Redirect to="/cheshire-react/home" />
      <div style={{ width: '100%', height: '100%' }}>
        <Canvas
          dpr={dpr}
          frameloop="demand"
          performance={{ min: 0.1 }}
          shadows gl={{
            powerPreference: "high-performance",
            antialias: true,
            preserveDrawingBuffer: false
          }} >
          <color attach="background" args={['black']} />
          <PerformanceMonitor onIncline={() => setDpr(1.3)} onDecline={() => setDpr(0.7)} >
            {debug && <Stats />}
            {debug && <Perf position="bottom-left" />}

            <Suspense fallback={null}>
              <Router base="/cheshire-react/projects">
                <Route path="/" component={() => <ProjectNavPage />} />
                <Route path="/covariant" component={() => <CovariantPage />} />
                <Route path="/motion_metrics" component={() => <MotionMetricsPage />} />
                <Route path="/next" component={() => <NextPage />} />
              </Router>
              <Route path="/cheshire-react/credit" >
                <PerspectiveCamera makeDefault fov={75} />
                <ambientLight intensity={1} />
                <CameraControls enabled dollySpeed={1} />
              </Route>
              <RoomScene />
              <Preload all />
            </Suspense>
          </PerformanceMonitor>
        </Canvas>
        {/* <Loader /> */}
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            top: '5%',
            right: '5%',
            // transform: 'translateX(-50%)',
            transition: 'opacity 1s',
            opacity: location !== '/cheshire-react/cheshire-react/home' ? 1 : 0,
            pointerEvents: location !== '/cheshire-react/cheshire-react/home' ? 'auto' : 'none'
          }}
        >
          <ThemeProvider theme={darkTheme}>
            <Tooltip title={t("back_tooltip")}>
              <IconButton
                onClick={() => {
                  if (location.includes('projects')) {
                    if (location === '/cheshire-react/cheshire-react/projects') {
                      window.location.reload();
                      setLocation('/cheshire-react/cheshire-react');
                    } else {
                      setLocation('/cheshire-react/cheshire-react/projects');
                    }
                  } else {
                    setLocation('/cheshire-react/cheshire-react/home');
                  }
                }}
                style={{
                  color: "#d1d1d1"
                }}>
                <ArrowForwardIosRoundedIcon sx={{ fontSize: 48 }} color="inherit" />
              </IconButton>
            </Tooltip>
          </ThemeProvider>
        </div>
      </div>
    </>
  )
}

function preloadEnvFiles() {
  [
    '/cheshire-react/textures/mines.hdr',
    '/cheshire-react/textures/night.hdr'
  ].forEach((url) => useEnvironment.preload({ files: url }));
}
preloadEnvFiles();

function preloadGLTFFiles() {
  [
    '/cheshire-react/models/es/CAT_6080_S.glb',
    '/cheshire-react/models/room/Desktop2.glb',
    '/cheshire-react/models/room/Env2.glb',
    '/cheshire-react/models/room/door.glb',
    '/cheshire-react/models/tv_room/TVRoom.glb',
    '/cheshire-react/models/stations/pick_tote.glb',
    '/cheshire-react/models/stations/redcare_one_piece.glb',
    '/cheshire-react/models/stations/robot_base.glb',
  ].forEach((url) => useGLTF.preload(url))
}

preloadGLTFFiles()

export default LandingPage
