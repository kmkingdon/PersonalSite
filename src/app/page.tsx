'use client'
import { useMemo, useState } from 'react';
import LoadingOverlay from '../ui/loadingOverlay';
import { useDispatch, useSelector} from 'react-redux';
import { generateAbout, generateHome, selectHomeAlt, selectHomeLoading, selectHomeUrl, selectHomeWords, selectPromptAudience, selectPromptComments, selectPromptSkills, setPrompt} from '../redux/generatedSlice';
import { AppDispatch } from '../redux/store';
import InputModal from '../ui/inputModal';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  //memoize selector since it returns an object
  const words = useSelector(selectHomeWords);
  const url = useSelector(selectHomeUrl);
  const alt = useSelector(selectHomeAlt);
  const loading = useSelector(selectHomeLoading)
  
  // modal
  //memoize selector
  const promptAudience = useSelector(selectPromptAudience)
  const promptComments = useSelector(selectPromptComments)
  const promptSkills = useSelector(selectPromptSkills)

  const needInput = useMemo(()=> {
    return !promptAudience && promptSkills.length === 0 && !promptComments
  },[ promptAudience, promptComments, promptSkills])
  const [openModal, setOpenModal] = useState(needInput);

  const generateData = (prompt: { audience: string; skills: string[]; comments: string; }) => {
    dispatch(setPrompt(prompt))
    dispatch(generateHome(prompt))
    dispatch(generateAbout(prompt))
    setOpenModal(false);
  }
  

  return (
    loading ? 
    <LoadingOverlay message="Generating..."/>
    :
    <main className="w-full h-full">
      <InputModal openModal={openModal && needInput} setOpenModal={setOpenModal} generateData={generateData}/>
      <div className="w-full h-full bg-[image:var(--image-url)] bg-repeat-y md:bg-no-repeat bg-center bg-cover" style={{'--image-url': `url(${url})`}  as React.CSSProperties} >
        <div className= "w-full h-full flex flex-col bg-black/[.5] ">
          { words.map((word:string, index:number) => {
            const positionArray = ['flex-start', 'center', 'flex-end'];
            return (
              <div key={index} className="w-full h-[33%] flex p-24 items-end" style={{justifyContent: `${positionArray[index]}`}  as React.CSSProperties}>
                <span className=" font-sans text-lg md:text-5xl md:bold text-white drop-shadow-3xl">{word}</span>
              </div>
              )
            })
          }
        </div>
      </div>
    </main>
  )
}
