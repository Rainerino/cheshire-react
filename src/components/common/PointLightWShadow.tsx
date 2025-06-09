import { useRef } from "react"
import * as THREE from "three"
import { Helper } from '@react-three/drei'

interface PointLightWShadowProps {
    position: THREE.Vector3,
    rotation: THREE.Euler | [number, number, number],
    intensity?: number,
    distance?: number,
    decay?: number,
    near?: number,
    far?: number,
    bias?: number
}
  
const PointLightWShadow: React.FC<PointLightWShadowProps> = ({
    position,
    rotation,
    intensity = 10,
    distance = 100,
    decay = 2,
    near = 0.1,
    far = 100,
    bias = -0.001,
}) => {
    return (
      <>
          <pointLight
            position={position}
            rotation={rotation}
            intensity={intensity}
            castShadow={true}
          decay={decay}
          distance={distance}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-far={far}
            shadow-camera-near={near}
            shadow-bias={bias}>
          {/* <orthographicCamera attach='shadow-camera'>
            <Helper type={THREE.CameraHelper} />
          </orthographicCamera> */}
          </pointLight>
      </>
    )
};
  
export default PointLightWShadow