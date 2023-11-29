'use client'

import { Spinner } from "flowbite-react";

export default function loadingComponent() {
    return (
      <div className="w-full h-[100vh] flex flex-wrap justify-center items-center bg-black">
        <Spinner size="xl" color="info"/>
      </div>
    )
  }