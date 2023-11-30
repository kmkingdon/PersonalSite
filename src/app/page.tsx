'use client'
import { useCallback, useEffect, useMemo, useState } from 'react';
import LoadingOverlay from '../ui/loadingOverlay';
import { useDispatch, useSelector} from 'react-redux';
import { fetchDefault, generateAbout, generateHome, selectAboutLoading, selectDefault, selectErrorState, selectHomeAlt, selectHomeLoading, selectHomeUrl, selectHomeWords, selectPromptAudience, selectPromptComments, selectPromptSkills, setDefault, setErrorState, setPrompt} from '../redux/generatedSlice';
import { AppDispatch } from '../redux/store';
import InputModal from '../ui/inputModal';
import { Toast } from 'flowbite-react';
import ErrorOverlay from '../ui/errorOverlay';
import { postBody } from '../common/types';
import PageFooter from '../ui/footer';

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
  },[ promptAudience, promptComments, promptSkills])
  const [openModal, setOpenModal] = useState(needInput);

  const generateData = (prompt: { audience: string; skills: string[]; comments: string; }) => {
    dispatch(setPrompt(prompt))
    dispatch(generateHome(prompt))
    dispatch(generateAbout(prompt))
    setOpenModal(false);
  }
  
  // error view
  const errorState = useSelector(selectErrorState)
  const { home, about, message} = errorState;
  const showErrorOverlay = home;

  const handleDataRefetch = useCallback((defaultUsed:boolean, prompt:postBody) => {
    dispatch(setErrorState({view:'home', reset: true, message:''}))
    console.log({inPage: true, prompt, defaultUsed})
    if(defaultUsed){
      dispatch(fetchDefault());
    } else {
      dispatch(generateHome(prompt))
    }
  },[])


  //toast and loading
  const loading = homeLoading || aboutLoading


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
      <InputModal openModal={openModal && needInput} setOpenModal={setOpenModal} generateData={generateData}/>
      <div className="w-full h-full bg-[image:var(--image-url)] bg-repeat-y md:bg-no-repeat bg-center bg-cover" style={{'--image-url': `url(${url})`}  as React.CSSProperties} aria-label={alt} >
        <div className= "w-full h-full flex flex-col bg-black/[.5] ">
          { words.map((word:string, index:number) => {
            const positionArray = ['flex-start', 'center', 'flex-end'];
            return (
              <div key={index} className="w-full h-[33%] flex p-24 items-end" style={{justifyContent: `${positionArray[index]}`}  as React.CSSProperties}>
                <span className=" font-home text-lg md:text-5xl md:bold text-white drop-shadow-3xl">{word}</span>
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
