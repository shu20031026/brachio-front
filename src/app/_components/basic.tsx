'use client'

import { FC, useRef, useState } from 'react'
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
  const { camera, scene } = useThree();

  const [grassAnimation, setGrassAnimation] = useState<{ sphere: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial> | null, targetPosition: THREE.Vector3, isActive: boolean }>({ sphere: null, targetPosition: new THREE.Vector3(), isActive: false });

  const touchPetHandler = (pet:Pet, grassPosition: THREE.Vector3) =>{
    // setCurrentModalContent(pet)

    // 草の生成
    const sphereGeometry = new THREE.SphereGeometry(0.05, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0X006400 });
    const newSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    newSphere.position.copy(camera.position);
    scene.add(newSphere);

    setGrassAnimation({ sphere: newSphere, targetPosition: grassPosition, isActive: true });
  }

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

  // 草↓
  useFrame((state, delta) => {
    if (grassAnimation.isActive && grassAnimation.sphere) {
      const { sphere, targetPosition } = grassAnimation;
      sphere.position.lerp(targetPosition, 0.05);
      if (sphere.position.distanceTo(targetPosition) < 0.1) {
        scene.remove(sphere);
        setGrassAnimation(prev => ({ ...prev, isActive: false, sphere: null }));
      }
    }
  });
  // 草↑

  return (
    <>
      {/* コントロール */}
      <OrbitControls makeDefault />
      <DeviceOrientationControls />

      {/* 背景 */}
      {/* <color args={['ivory']} attach="background" /> */}

      {/* 環境光 */}
      <ambientLight intensity={1} />

      {/* 平行光 */}
      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={0.5}
        shadow-mapSize={[1024, 1024]}
      />

      <group rotation={[0, 0, 0]} position={[0, 0, 0]}>
        {userData?.pets.map((pet,i)=>{
          const numCats = userData.pets.length
          const RADIUS = 2.5
          const angle = (i / numCats) * 2 * Math.PI; 
          const x = Math.cos(angle) * RADIUS;
          const z = Math.sin(angle) * RADIUS;
          const position = new THREE.Vector3(x, 0.4, z);

          return (
            <mesh key={pet.Language} position={[x, 0, z]} rotation={[0,Math.atan2(-x, -z)+Math.PI,0]}>
            <CharacterModel vrmFile='/shiro.vrm' onClickEvent={()=>touchPetHandler(pet,position)}/>
          </mesh>
          )
        })}
        {/* {catModels} */}
      </group>
    </>
  )
}

export default Basic