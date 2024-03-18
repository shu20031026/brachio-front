'use client'

import type { FC } from "react"
import Link from "next/link"
import {Button} from "@nextui-org/react";
import { useState } from 'react';
import {
AdditionalUserInfo,
} from "firebase/auth";
import { registerServiceWorker } from "@/utils/registerServiceWorker";
import { handleSignInClick } from "@/lib/firebaseAction";

// Root
const Root:FC = () => {
  const [details, setDetails] = useState<AdditionalUserInfo | null>(null); 

  return (
    <div className="w-full h-screen overflow-hidden">
      <div>Root</div>
      <div>ろぐいんとか</div>

      <Button color="primary" onClick={() => handleSignInClick(details, setDetails)}>サインイン</Button>
      <div>{details?.username}</div>

      <div>
        <Link href={"/hoge"}>
          <Button color="primary">
            main
          </Button>
        </Link>
        <Button onClick={async ()=> {await registerServiceWorker()}}>sw</Button>
      </div>
    </div>
  )
}

export default Root