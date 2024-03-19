'use client'

import type { FC } from "react"
import Link from "next/link"
import {Button, Image} from "@nextui-org/react";
import { useState } from 'react';
import {
AdditionalUserInfo,
} from "firebase/auth";
import { registerServiceWorker } from "@/utils/registerServiceWorker";
import { handleSignInClick } from "@/lib/firebaseAction";
import getCookieValue from "@/lib/cookie";

//@ts-ignore
// Root
const Root:FC = () => {
  const [details, setDetails] = useState<AdditionalUserInfo | null>(null); 

  return (
    <div className="w-full h-screen overflow-hidden">
      <div>Root</div>
      <div>ろぐいんとか</div>

      <Button color="primary" onClick={() => handleSignInClick(details, setDetails)}>サインイン</Button>
      <div>{details?.username}</div>
      <div>{JSON.stringify(details?.profile?.avatar_url, null , 2)}</div>
      <div>{JSON.stringify(details?.isNewUser)}</div>
      <div>{details?.profile?.name as string}</div>
      <div>aaa</div>
      <Image src={details?.profile?.avatar_url as string || ""} alt=""/>

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