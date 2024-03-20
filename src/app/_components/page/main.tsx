'use client'

import { FC, StrictMode, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'

import * as THREE from 'three'
import Basic from '../basic'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress } from '@nextui-org/react'

import { useAtom } from 'jotai'
import { CURRENT_MODAL, IS_OPEN_MODAL, NOW_FEEDING, USER_DATA_ATOM } from '@/stores/atoms'
import { DUMMY_USER_DATA } from '../../../../mock/userdata'
import Image from 'next/image'

type Props = {
  param: string
}

// メイン
const Main: FC<Props> = ({ ...props }) => {
  const { param } = props
  const [currentModalContentData, setCurrentModalContentData] = useAtom(CURRENT_MODAL)
  const [nowFeeding, setNowFeeding] = useAtom(NOW_FEEDING)
  const [deviceOrientation, setDeviceOrientation] = useState<DeviceOrientationEvent | null>(null)
  const API = "https://suited-hopefully-rhino.ngrok-free.app/"

  const [userData, setUserData] = useAtom(USER_DATA_ATOM)
  const [isOpenModal, setIsOpenModal] = useAtom(IS_OPEN_MODAL)
  const [isOpenFFModal, setIsOpenFFModal] = useState<boolean>(false)

  // const [data,setData] = useState<any>()

  // const testHandler = async () => {
  //   try{
  //     const res = await fetch(API, {
  //       cache: "no-store",
  //     })
  //     const data = await res.json()
  //     setData(data)
  //     console.log(data)
  //     return res
  //   }catch(e){
  //     console.error(e)
  //   }
  // }

  useEffect(() => {
    const fetchData = DUMMY_USER_DATA
    setUserData(fetchData)
  }, [setUserData])

  const handleCloseModal = () => {
    setIsOpenModal(false)
    setCurrentModalContentData(null)
  }

  const handleFeeding = () => {
    setIsOpenModal(false)
    setNowFeeding(true)
  }

  const requestDeviceOrientationPermission = () => {
    if (
      DeviceOrientationEvent &&
      // @ts-ignore
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      // @ts-ignore
      DeviceOrientationEvent.requestPermission()
        .then((permissionState: string) => {
          if (permissionState === "granted") {
            window.addEventListener(
              "deviceorientation",
              (e: DeviceOrientationEvent) => {
                setDeviceOrientation(e)
              }
            );
          }
          window.location.reload();
        })
        .catch(console.error);
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className='flex items-center justify-between p-4 bg-gray-800 text-white'>
        <Image
          src="/icon-512x512.png"
          alt="Example Image"
          sizes='10px'
          width={50}
          height={50}
          className='rounded'
        />
        <p>iOSの方は「motion」をタップ</p>
        <ul className='flex gap-2 space-x-4'>
          <li><Button onClick={() => requestDeviceOrientationPermission()}>motion</Button></li>
          <li><button className="flex h-10 items-center rounded bg-primary px-4 text-sm font-medium text-white transition-colors" onClick={() => setIsOpenFFModal(true)}>FF</button></li>
        </ul>
      </div>
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
            position: [0, -0.2, 0],
          }}
        >
          <Basic />
        </Canvas>
      </StrictMode>
      <div>

      </div>
      <Modal
        isOpen={isOpenModal}
        placement="bottom-center"
        closeButton={<div></div>}
        hideCloseButton
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className='text-2xl'>{currentModalContentData?.Language}</p>
              </ModalHeader>
              <ModalBody>
                <div>
                  <p className='p-2 font-bold'>満腹度</p>
                  <Progress color="success" isStriped aria-label="Loading..." value={currentModalContentData?.HungerLevel} />
                </div>
                <div>
                  <p className='p-2 font-bold'>親愛度</p>
                  <Progress color="success" isStriped aria-label="Loading..." value={currentModalContentData?.FriendshipLevel} />
                </div>
                <div className='flex'>
                  <p className='px-1 font-bold'>逃げられた回数</p>
                  <p className='px-1 font-extrabold'>{currentModalContentData?.EscapeNum}回</p>
                </div>
                <div className='flex'>
                  <p className='px-1 font-bold'>草の所持数</p>
                  <p className='px-1 font-extrabold'>{currentModalContentData?.BaitsNum}個</p>
                </div>
                <Button color="success" className='text-white font-bold' onPress={handleFeeding}>草を食べさせる</Button>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleCloseModal}>
                  <p className='text-white font-bold'>とじる</p>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpenFFModal}
        placement="bottom-center"
        closeButton={<div></div>}
        hideCloseButton
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className='text-2xl'>{currentModalContentData?.Language}</p>
              </ModalHeader>
              <ModalBody className='text-black'>
                {userData?.followers.map((follower, index) => (
                  <div key={index} className="bg-gray-200 p-4 m-2 flex items-center">
                    <Image src={follower.ImageURL} alt={follower.DisplayName} width={40} height={40} className="rounded-full" />
                    <div>
                      <p className="font-bold">{follower.DisplayName}</p>
                      <p>{follower.GithubID}</p>
                    </div>
                  </div>
                ))}
              </ModalBody>
              <ModalFooter>
                <button color="primary" onClick={() => { setIsOpenFFModal(false) }}>
                  <p className="flex h-10 items-center rounded bg-primary px-4 text-sm font-medium text-white transition-colors">とじる</p>
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </div>
  )
}

export default Main