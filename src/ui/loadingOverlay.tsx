'use client'

import { Spinner } from "flowbite-react"

export default function loadingOverlay() {
    return (
      <div className="w-full h-full flex flex-wrap justify-center items-center">
        <Spinner aria-label="Center-aligned spinner example"  size='xl'/>
      </div>
    )
  }