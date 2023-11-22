'use client'
import { useGenerateAboutMutation, useGenerateHomeMutation } from '../redux/services';
import { useEffect, useState } from 'react';
import LoadingOverlay from '../ui/loadingOverlay';

const testPrompt = {
  "audience": "Recruiter",
  "skills": ["softwareDelivery", "peopleLeadership"],
  "comments": "What makes him so fun?"
}

export default function Home() {
  const [updateHome, homeResult] = useGenerateHomeMutation()
  const [updateAbout, aboutResult] = useGenerateAboutMutation()
  const {status:homeStatus , data:homeData, error:homeError} = homeResult;
  const {status:aboutStatus , data:aboutData, error:aboutError} = aboutResult;

  // view variables
  let loading = homeStatus === 'pending';
  const fullfilled = homeStatus === 'fulfilled';

  const [words, setWords] = useState<string[]>([]);
  const [image, setImage] = useState({url:'', alt:''});

  // call on initial load
  useEffect(() => {
    updateHome(testPrompt)
    updateAbout(testPrompt)
  },[])

  //set home data
  useEffect(() => {
    if(fullfilled){
      const parseWords = homeData.words.split(/[\n,]/)
      setWords(parseWords)
      setImage({url: homeData.image.data[0].url, alt: homeData.image.data[0].revised_prompt})
    }
  },[homeStatus])

  //set about data
  useEffect(() => {
    console.log({aboutStatus})
    console.log({aboutError})
    if(aboutStatus === 'fulfilled'){
      // const parseParagraphs = aboutData.split('\n')
      console.log({parseParagraphs: aboutData})
    }
  },[aboutStatus])

  return (
    loading ? 
    <LoadingOverlay />
    :
    <main className="w-full h-full">
      <div className="w-full h-full bg-[image:var(--image-url)] bg-repeat-y md:bg-no-repeat bg-center bg-cover" style={{'--image-url': `url(${image.url})`}  as React.CSSProperties} >
        <div className= "w-full h-full flex flex-col bg-black/[.5] ">
          { words.map((word, index) => {
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
