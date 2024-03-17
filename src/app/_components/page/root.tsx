'use client'

import type { FC } from "react"
import { useState } from 'react';
import {
  AdditionalUserInfo,
} from "firebase/auth";
import { handleSignInClick } from "@/lib/firebaseAction";

// Root
const Root:FC = () => {
  const [details, setDetails] = useState<AdditionalUserInfo | null>(null); 

  return (
    <div className="w-full h-screen overflow-hidden">
      <div>Root</div>
      <div>ろぐいんとか</div>
      <div className="">
        <div><button onClick={() => handleSignInClick(details, setDetails)} className="p-2 pl-4 pr-4 rounded-xl font-bold bg-orange-400">サインイン</button></div>
        {/* <div><button onClick={} className="p-2 pl-4 pr-4 rounded-xl font-bold bg-orange-400">サインアップ</button></div> */}
      </div>
      <div>{details?.username}</div>
    </div>
  )
}

export default Root