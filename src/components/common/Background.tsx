import React, { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Background() {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = new THREE.Color(0x18181b);
    return () => {
      // Clean up the background color when the component unmounts
    };
  }, [scene]);

  return (
    <>
      {/* Your scene content here */}
    </>
  );
}

export default Background;