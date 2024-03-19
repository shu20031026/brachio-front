'use client'

import type { FC } from "react";
import Link from "next/link";
import { Button, Image } from "@nextui-org/react";
import { StrictMode, useState } from 'react';
import { AdditionalUserInfo } from "firebase/auth";
import { handleSignInClick } from "@/lib/firebaseAction";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Sky, Text } from "@react-three/drei";
import CharacterModel from "../CharacterModel";


// Root
const Root: FC = () => {
  const [details, setDetails] = useState<AdditionalUserInfo | null>(null);

  return (
    <div className="w-full h-screen overflow-hidden">

      <StrictMode>
        <Canvas>
          <ambientLight intensity={0.5} />
          <Sky />

          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <OrbitControls />

        </Canvas>
      </StrictMode>
      <div className="absolute top-0 right-0 w-full h-full flex justify-center items-center flex-col">
        <div className="relative">
        <br />

          <div className="flex gap-4">
            {details?.username ? 
            (
              <Link href={`/${details?.username}`}>
                <Button color="primary">マイページへ</Button>
              </Link>
            )
              :
            (
              <Button className="gap-4" onClick={() => handleSignInClick(details, setDetails)}>サインイン</Button>
            )}
          </div>
          <br />

          <div className="text-black mt-8">{details?.username}</div>
          {/* <div className="text-white">{JSON.stringify(details?.profile?.avatar_url, null , 2)}</div> */}
          {/* <div className="text-white">{JSON.stringify(details?.isNewUser)}</div> */}
          <br />

          <div className="text-black">{details?.profile?.name as string}</div>
          <Image src={details?.profile?.avatar_url as string || ""} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Root;
