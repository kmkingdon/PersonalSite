'use client'
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Toast } from 'flowbite-react';
import { Bebas_Neue } from "next/font/google";
import {useImage} from 'react-image';

import LoadingOverlay from '../ui/loadingOverlay';
import { useDispatch, useSelector} from 'react-redux';
import { fetchDefault, generateAbout, generateHome, selectAboutLoading, selectDefault, selectErrorState, selectHomeAlt, selectHomeLoading, selectHomeUrl, selectHomeWords, selectPromptAudience, selectPromptComments, selectPromptSkills, setDefault, setErrorState, setPrompt} from '../redux/generatedSlice';
import { AppDispatch } from '../redux/store';
import InputModal from '../ui/inputModal';
import ErrorOverlay from '../ui/errorOverlay';
import { postBody } from '../common/types';
import PageFooter from '../ui/footer';
import LoadingComponent from '../ui/loadingComponent';
import Link from 'next/link';

const bebas = Bebas_Neue({weight:"400", subsets: ['latin']});

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  //memoize selector since it returns an object
  const words = useSelector(selectHomeWords);
  const url = useSelector(selectHomeUrl);
  const alt = useSelector(selectHomeAlt);
  const homeLoading = useSelector(selectHomeLoading)
  const aboutLoading = useSelector(selectAboutLoading)
  
  // modal state and refetch logic state
  const defaultUsed = useSelector(selectDefault)
  const promptAudience = useSelector(selectPromptAudience)
  const promptComments = useSelector(selectPromptComments)
  const promptSkills = useSelector(selectPromptSkills)
  const promptObj = {audience:promptAudience, skills: promptSkills, comments: promptComments};

  const needInput = useMemo(()=> {
    if(defaultUsed){
      return false;
    } else{
      return  !promptAudience && promptSkills.length === 0 && !promptComments;
    }
  },[ promptAudience, promptComments, promptSkills, defaultUsed])
  const [openModal, setOpenModal] = useState(needInput);

  const generateData = (prompt: { audience: string; skills: string[]; comments: string; }) => {
    dispatch(setPrompt(prompt))
    dispatch(generateHome(prompt))
    dispatch(generateAbout(prompt))
    setOpenModal(false);
  }
  
  // error view
  const errorState = useSelector(selectErrorState)
  const { home, message} = errorState;
  const showErrorOverlay = home;

  const handleDataRefetch = useCallback((defaultUsed:boolean, prompt:postBody) => {
    dispatch(setErrorState({view:'home', reset: true, message:''}))
    if(defaultUsed){
      dispatch(fetchDefault());
    } else {
      dispatch(generateHome(prompt))
    }
  },[])


  //loading and image check
  const loading = homeLoading || aboutLoading
  //reset state to ensure component re-render and check for image load error
  const [ status, setStatus ] = useState('initialized');
  const {src} = useImage({
    srcList: [url, '/defaultBackground.png']
  })

  useEffect(() => {
    if(loading){
      setStatus('loading');
    } else {
      setStatus('complete')
    }
  }, [loading])



  //toast
  useEffect(() => {
    setShowToast(loading)
  },[loading])
  const [showToast, setShowToast] = useState<boolean>(false);
  const handleDefault = () => {
    dispatch(fetchDefault());
    dispatch(setDefault())
    setShowToast(false);
  }

  return (
    showErrorOverlay ?
      <ErrorOverlay prompt={promptObj} defaultUsed={defaultUsed} handleDataRefetch={handleDataRefetch} message={message}/>
    :
    loading ? 
    <>
        <LoadingOverlay message="Generating..."/>
        {showToast && (
          <Toast className="absolute bottom-2 left-2 sm:bottom-10 sm:left-10">
            <div className="text-sm font-normal">{`Don't have time for generative AI?`}</div>
            <div className="ml-auto flex items-center space-x-2">
              <a
                onClick={() => handleDefault()}
                className="text-center rounded-lg p-1.5 text-sm font-medium text-cyan-600 hover:bg-cyan-100 dark:text-cyan-500 dark:hover:bg-gray-700"
              >
                Show Default Site
              </a>
              <Toast.Toggle onDismiss={() => setShowToast(false)} />
            </div>
          </Toast>
        )}
    </>
    :
    <main className="w-full h-full">
      <InputModal openModal={openModal && needInput} generateData={generateData}/>
        <div className="w-full h-full flex justify-center align-center overflow-hidden">
        { url.length > 0 ?
        <img className="w-full object-cover z-0" src={src} alt={alt}></img>
        :
        <LoadingComponent/>
        }
        <div className= "absolute w-full h-full flex flex-col bg-black/[.5] z-2">
          { words.map((word:string, index:number) => {
            const positionArray = ['flex-start', 'center', 'flex-end'];
            return (
              <div key={index} className="w-full h-[25%] flex p-24 items-end" style={{justifyContent: `${positionArray[index]}`}  as React.CSSProperties}>
                <Link href="/about">
                  <span className={`${bebas.className} text-xl md:text-5xl md:bold text-white drop-shadow-3xl`}>{word}</span>
                </Link>
              </div>
              )
            })
          }
        </div>
      </div>
      <PageFooter/>
    </main>
  )
}
