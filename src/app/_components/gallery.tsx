'use client'

import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'

import Wall from './wall'
import Ground from './ground'

const Gallery = () => {
  return (
    <>
      {/* コントロール */}
      <OrbitControls makeDefault />

      {/* モニター */}
      <Perf position="top-left" />

      {/* 背景 */}
      <color args={['ivory']} attach="background" />

      {/* 環境光 */}
      <ambientLight intensity={0.5} />

      <group position={[0, -1, 0]}>
        {/* 壁 */}
        <Wall />
        {/* 地面 */}
        <Ground />
        {/* ポール */}
        {/* <Pole /> */}
      </group>
    </>
  )
}

export default Gallery