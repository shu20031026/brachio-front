'use client'

import { FC, useRef } from 'react'
import { DeviceOrientationControls, OrbitControls, useHelper } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

import * as THREE from 'three'
import CharacterModel from './CharacterModel'
import { useLookAtCenter } from '@/hooks/useLookAtCenter'
import { useSceneBackground } from '@/hooks/useSceneBackground'
import { useLightHelper } from '@/hooks/useLightHelper'
import { CURRENT_MODAL, USER_DATA_ATOM } from '@/stores/atoms'
import { useAtom } from 'jotai'
import { Pet } from '@/interfaces/types'

// 基本
const Basic:FC<{deviceEvent:DeviceOrientationEvent|null}> = ({deviceEvent}) => {
  const boxRef = useRef<THREE.Mesh>(null)
  const catRef = useRef<THREE.Mesh>(null)
  useSceneBackground();
  useLookAtCenter();
  const { directionalLight } = useLightHelper();
  const [currentModalContent, setCurrentModalContent] = useAtom(CURRENT_MODAL)
  const [userData, setUserData] = useAtom(USER_DATA_ATOM)

  const touchPetHandler = (pet:Pet) =>{
    setCurrentModalContent(pet)
  }

  // const catModels = [];
  // const radius = 4; // 鳥を配置する円の半径
  // const numCats = 3; // 鳥の数
  // for (let i = 0; i < numCats; i++) {
  //   const angle = (i / numCats) * 2 * Math.PI; // 各鳥の位置を決定する角度
  //   const x = Math.cos(angle) * radius;
  //   const z = Math.sin(angle) * radius;
  //   catModels.push(
  //     <mesh key={i} position={[x, 0, z]} >
  //       <CharacterModel vrmFile='/shiro.vrm' onClickEvent={touchPetHandler}/>
  //     </mesh>
  //   );
  // }

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
      <DeviceOrientationControls />

      {/* 背景 */}
      {/* <color args={['ivory']} attach="background" /> */}

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

      <group rotation={[0, 0, 0]} position={[0, 0, 1]}>
        {userData?.pets.map((pet,i)=>{
          const numCats = userData.pets.length
          const RADIUS = 2
          const angle = (i / numCats) * 2 * Math.PI; 
          const x = Math.cos(angle) * RADIUS;
          const z = Math.sin(angle) * RADIUS;

          return (
            <mesh key={pet.Language} position={[x, 0, z]} >
            <CharacterModel vrmFile='bird0_white.vrm' onClickEvent={()=>touchPetHandler(pet)}/>
          </mesh>
          )
        })}
        {/* {catModels} */}
      </group>
    </>
  )
}

export default Basic