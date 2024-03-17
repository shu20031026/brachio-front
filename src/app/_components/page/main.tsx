'use client'

import { FC, StrictMode } from 'react'
import { Canvas } from '@react-three/fiber'

import * as THREE from 'three'
import Basic from '../basic'

// メイン
const Main:FC = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div>hogehoge</div>
      <StrictMode>
        <Canvas
          flat
          shadows
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
          }}
          camera={{
            fov: 45,
            near: 0.1,
            far: 100,
            position: [0, 0, 4],
          }}
        >
          <Basic />
        </Canvas>
      </StrictMode>
    </div>
  )
}

export default Main