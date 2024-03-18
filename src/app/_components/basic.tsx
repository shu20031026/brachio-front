'use client'

import { FC, useEffect, useRef } from 'react'
import { DeviceOrientationControls, OrbitControls, useHelper } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

import * as THREE from 'three'
import useWebcamBackground from './videoTexture'
import CatModel from './CatModel'

// 基本
const Basic:FC<{deviceEvent:DeviceOrientationEvent|null}> = ({deviceEvent}) => {
  const directionalLight = useRef<THREE.DirectionalLight>(null)
  const boxRef = useRef<THREE.Mesh>(null)
  const catRef = useRef<THREE.Mesh>(null)
  const { scene } = useThree();

  const videoTexture = useWebcamBackground();

  useEffect(() => {
    scene.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        child.lookAt(new THREE.Vector3(0, child.position.y, 0));
      }
    });
  }, [scene]);

  useEffect(() => {
    if (videoTexture) {
      scene.background = videoTexture;
    }
  }, [videoTexture, scene]);

  const catModels = [];
  const radius = 4; // 猫を配置する円の半径
  const numCats = 1; // 猫の数
  for (let i = 0; i < numCats; i++) {
    const angle = (i / numCats) * 2 * Math.PI; // 各猫の位置を決定する角度
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    catModels.push(
      <mesh key={i} position={[x, 0, z]} >
        <CatModel />
      </mesh>
    );
  }

  // ダイレクト光のヘルパー
  useHelper(
    directionalLight as React.MutableRefObject<THREE.DirectionalLight>,
    THREE.DirectionalLightHelper,
    1,
    'red'
  )

  useFrame((state, delta) => {
    // 経過時間
    const time = state.clock.elapsedTime
    if (boxRef.current) {
      // X移動
      boxRef.current.position.x = Math.sin(time) + 1
      // Y回転
      boxRef.current.rotation.y += delta
    }
    if (catRef.current) {
      // X移動
      catRef.current.position.x = Math.sin(time) + 1
      // Y回転
      catRef.current.rotation.y += delta
     }  
  })

  return (
    <>
      {/* コントロール */}
      <OrbitControls makeDefault />
      <DeviceOrientationControls  />

      {/* モニター */}
      {/* <Perf position="top-right" /> */}

      {/* 背景 */}
      <color args={['ivory']} attach="background" />

      {/* 環境光 */}
      <ambientLight intensity={0.5} />

      {/* 平行光 */}
      <directionalLight
        castShadow
        ref={directionalLight}
        position={[1, 2, 3]}
        intensity={0.5}
        shadow-mapSize={[1024, 1024]}
      />

      <group rotation={[0, 0, 0]} position={[0, 0, 0]}>
        {catModels}
      </group>
    </>
  )
}

export default Basic