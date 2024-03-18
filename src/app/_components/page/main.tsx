'use client'

import { FC, StrictMode, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'

import * as THREE from 'three'
import Basic from '../basic'

const isIos = () => {
  const ua = navigator.userAgent.toLowerCase();
  return (
    ua.indexOf("iphone") >= 0 ||
    ua.indexOf("ipad") >= 0 ||
    ua.indexOf("ipod") >= 0
  );
};

// メイン
const Main:FC = () => {
  const [deviceOrientation, setDeviceOrientation]= useState<DeviceOrientationEvent | null>(null)

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
      <button onClick={()=>requestDeviceOrientationPermission()}>motion</button>
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
          <Basic deviceEvent={deviceOrientation}/>
        </Canvas>
      </StrictMode>
    </div>
  )
}

export default Main