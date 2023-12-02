'use client'
import { Button } from "flowbite-react";
import { BiSolidError } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";

import { postBody } from "../common/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { resetState } from "../redux/generatedSlice";


export default function errorOverlay({message, handleDataRefetch, defaultUsed, prompt}:{message:string, handleDataRefetch: CallableFunction, defaultUsed:boolean, prompt:postBody | null}) {
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname()
    const router = useRouter()

    const handleSiteReload = () => {
        dispatch(resetState());
        if(pathname !== '/'){
          router.push('/');
        }
        location.reload()
    }
    
    return (
      <div className="w-full h-full flex flex-col justify-center items-center bg-black">
        <div className="mb-10">
            <BiSolidError style ={{ color: "white", fontSize: "2.5em" }}/>
        </div>
        <p className="text-white text-center w-[40%] text-3xl mb-10">Site's data failed to load.</p>
        <code className="text-white text-center w-[40%] text-lg mb-10 border-white border">{message}</code>
        <div className="w-full flex flex-col sm:flex-row justify-center items-center">
            <Button className="m-4 text-white min-w-[150px]" onClick={() => handleDataRefetch(defaultUsed, prompt)}>Reload Data</Button>
            <Button color="gray" className="mx-4 text-white min-w-[150px]" onClick={() => handleSiteReload()}>Reload Entire Site</Button>
        </div>
      </div>
    )
  }