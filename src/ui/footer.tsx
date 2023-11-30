'use client'
import { Footer } from 'flowbite-react';
import { useState } from 'react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';


export default function PageFooter() {
    const [showFooter, setShowFooter] = useState(false)


    return (
        <>
            <div className="w-full absolute bottom-0 !bg-transparent h-12" onMouseEnter={() => setShowFooter(true)}></div>
            <div className={showFooter ? "w-full sticky bottom-0 h-12 top-0 animate-[fadeIn_0.5s_ease-in-out] sm:bg-transparent bg-slate-700" : "hidden"} onMouseLeave={() => setShowFooter(false)}>
                <div className="w-full h-full px-4 py-6 flex flex-row items-center justify-between">
                    <div className="flex flex-row justify-center items-center">
                        <span className="text-white">Powered by </span>
                        <img src="/openAI.png" alt="open AI logo" className="h-8 w-8 ml-4"/>
                        <span className="text-white ml-2">OpenAI</span>
                    </div>
                    <div className="flex space-x-6 sm:mt-0 sm:justify-center">
                        <Footer.Icon href="https://github.com/kmkingdon" target="_blank" icon={BsGithub} className="text-white"/>
                        <Footer.Icon href="https://www.linkedin.com/in/kevin-kingdon/" target="_blank" icon={BsLinkedin} className="text-white"/>
                    </div>
                </div>
            </div>
        </>


    )
  }