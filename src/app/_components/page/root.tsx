'use client'

import Link from "next/link"
import { FC } from "react"
import {Button} from "@nextui-org/react";
import { registerServiceWorker } from "@/utils/registerServiceWorker";

// Root
const Root:FC = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div>Root</div>
      <div>ろぐいんとか</div>
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