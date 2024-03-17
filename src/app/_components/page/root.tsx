'use client'

import Link from "next/link"
import { FC } from "react"

// Root
const Root:FC = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div>Root</div>
      <div>ろぐいんとか</div>
      <div>
        <Link href={"/hoge"}>mainページへ</Link>
      </div>
    </div>
  )
}

export default Root