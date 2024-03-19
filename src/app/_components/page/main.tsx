'use client'

import { FC, StrictMode, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'

import * as THREE from 'three'
import Basic from '../basic'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

import { isIos } from '@/lib/isIos'
import { langColorList } from '@/lib/lang'
import { useAtom } from 'jotai'
import { CURRENT_MODAL, USER_DATA_ATOM } from '@/stores/atoms'
import { DUMMY_USER_DATA } from '../../../../mock/userdata'

type Props = {
  param:string
}

// メイン
const Main:FC<Props> = ({...props}) => {
  const {param} = props
  const [modalContentData, setModalContentData] = useAtom(CURRENT_MODAL)
  const [deviceOrientation, setDeviceOrientation]= useState<DeviceOrientationEvent | null>(null)
  const API="https://suited-hopefully-rhino.ngrok-free.app/"

  const [userData, setUserData] = useAtom(USER_DATA_ATOM)
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

  useEffect(()=>{
    const fetchData = DUMMY_USER_DATA
    setUserData(fetchData)
  },[setUserData])

  const handleCloseModal = () =>{
    setModalContentData(null)
  }

  const requestDeviceOrientationPermission = () => {
    if (
      isIos() &&
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
        })
        .catch(console.error);
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <div>{JSON.stringify(langColorList)}</div>
      <div>{param}</div>
      <Button onClick={()=>requestDeviceOrientationPermission()}>motion</Button>
      <div>{modalContentData?.Language}</div>
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
            position: [0, 0, 0],
          }}
        >
          <Basic deviceEvent={deviceOrientation}/>
        </Canvas>
      </StrictMode>
      <Modal 
        isOpen={modalContentData!==null} 
        placement="bottom-center"
        // onOpenChange={} 
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleCloseModal}>
                  Close
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Main