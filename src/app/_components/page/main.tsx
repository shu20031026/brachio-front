'use client'

import { FC, StrictMode, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'

import * as THREE from 'three'
import Basic from '../basic'
import { Button } from '@nextui-org/react'

import { isIos } from '@/lib/isIos'

type Props = {
  param:string
}

// メイン
const Main:FC<Props> = ({...props}) => {
  const {param} = props
  const [deviceOrientation, setDeviceOrientation]= useState<DeviceOrientationEvent | null>(null)
  const API="https://suited-hopefully-rhino.ngrok-free.app/"

  const [data,setData] = useState<any>()

  const testHandler = async () => {
    try{
      const res = await fetch(API, {
        cache: "no-store",
      })
      const data = await res.json()
      setData(data)
      console.log(data)
      return res
    }catch(e){
      console.error(e)
    }
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
      <div>{param}</div>
      <div>{JSON.stringify(data)}</div>
      <Button onClick={testHandler}>api</Button>
      <Button onClick={()=>requestDeviceOrientationPermission()}>motion</Button>
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
    </div>
  )
}

export default Main