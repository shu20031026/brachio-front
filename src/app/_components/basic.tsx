'use client'

import { FC, useEffect, useRef, useState } from 'react'
import { DeviceOrientationControls, OrbitControls, Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

import * as THREE from 'three'
import CharacterModel from './CharacterModel'
import { useLookAtCenter } from '@/hooks/useLookAtCenter'
import { useSceneBackground } from '@/hooks/useSceneBackground'
import { CURRENT_MODAL, GRASS_VECTOR, IS_OPEN_MODAL, NOW_FEEDING, USER_DATA_ATOM } from '@/stores/atoms'
import { useAtom } from 'jotai'
import { Pet } from '@/interfaces/types'
import { friendshipGage } from '@/lib/friendshipGage'

// 基本
const Basic: FC = () => {
  const birdRef = useRef<THREE.Mesh>(null)
  useSceneBackground();
  useLookAtCenter();
  const [userData, setUserData] = useAtom(USER_DATA_ATOM)
  const [isOpenModal, setIsOpenModal] = useAtom(IS_OPEN_MODAL)
  const [currentModalContent, setCurrentModalContent] = useAtom(CURRENT_MODAL)
  const [nowFeeding, setNowFeeding] = useAtom(NOW_FEEDING)

  const { camera, scene } = useThree();

  const [grassAnimation, setGrassAnimation] = useState<{ sphere: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial> | null, targetPosition: THREE.Vector3, isActive: boolean }>({ sphere: null, targetPosition: new THREE.Vector3(), isActive: false });

  const [happyFlag, setHappyFlag] = useState(false)
  const [happyPetId, setHappyPetId] = useState<string | null>(null);
  const [grassVector, setGrassVector] = useAtom(GRASS_VECTOR)

  const RADIUS = 2.5

  useEffect(() => {
    if (nowFeeding && currentModalContent && grassVector) {
      feedingHandler(currentModalContent, grassVector)
    }
  }, [currentModalContent, grassVector, nowFeeding])

  const handleOpenModal = (pet: Pet, position: THREE.Vector3) => {
    setCurrentModalContent(pet)
    setIsOpenModal(true)
    setGrassVector(position)
    //モーダル
    // setCurrentModalContent(pet)

    // モーダル開く
    // Petをグローバルに渡す
  }

  const feedingHandler = (pet: Pet, grassPosition: THREE.Vector3) => {
    setHappyPetId(pet.Language);

    // 草の生成
    const sphereGeometry = new THREE.SphereGeometry(0.05, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0X006400 });
    const newSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    newSphere.position.copy(camera.position);
    scene.add(newSphere);

    setGrassAnimation({ sphere: newSphere, targetPosition: grassPosition, isActive: true });
  }

  useFrame((state, delta) => {
    userData?.pets.forEach((pet, i) => {
      const numCats = userData.pets.length;
      const angle = (i / numCats) * 2 * Math.PI;
      const x = Math.cos(angle) * RADIUS;
      const z = Math.sin(angle) * RADIUS;

      const petMesh = scene.getObjectByName(pet.Language);
      if (petMesh && pet.Language === happyPetId && happyFlag) {
        const time = state.clock.elapsedTime;
        const y1 = Math.sin(time * 5) * 0.5 + 1;
        const y2 = Math.sin((time - 0.5) * 5) * 0.5 + 1;
        petMesh.position.y = y1 - 1;
        petMesh.position.y = y2 - 1;
        setTimeout(() => {
          setHappyFlag(false);
          setIsOpenModal(false)
          setNowFeeding(false)
          setCurrentModalContent(null)
          setGrassVector(null)
        }, 3000);
      } else if (petMesh) {
        petMesh.position.y = 0; // クリックされていないペットは元の位置に
      }
    });
  });


  // 草↓
  useFrame((state, delta) => {
    if (grassAnimation.isActive && grassAnimation.sphere) {
      const { sphere, targetPosition } = grassAnimation;
      sphere.position.lerp(targetPosition, 0.05);
      if (sphere.position.distanceTo(targetPosition) < 0.1) {
        scene.remove(sphere);
        setHappyFlag(true)

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
        {userData?.pets.map((pet, i) => {
          const numCats = userData.pets.length
          const angle = (i / numCats) * 2 * Math.PI;
          const x = Math.cos(angle) * RADIUS;
          const z = Math.sin(angle) * RADIUS;
          const position = new THREE.Vector3(x, 0.4, z);

          //pet positionをセット

          return (
            <mesh name={pet.Language} ref={birdRef} key={pet.Language} position={[x, 0, z]} rotation={[0, Math.atan2(-x, -z) + Math.PI, 0]}>
              <CharacterModel vrmFile={friendshipGage(pet.FriendshipLevel)} onClickEvent={() => handleOpenModal(pet, position)} />
              <Text
                position={[0, -0.2, 0]}
                rotation={[0, Math.PI, 0]}
                fontSize={0.2}
                color="green"
                anchorX="center"
                anchorY="middle"
              >
                {pet.Language}
              </Text>
            </mesh>
          )
        })}
      </group>
    </>
  )
}

export default Basic