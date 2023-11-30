'use client'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDefault, generateAbout, selectAboutLoading, selectAboutParagraphs, selectDefault, selectErrorState, selectPromptAudience, selectPromptComments, selectPromptSkills, setErrorState} from '../../redux/generatedSlice';
import LoadingOverlay from '../../ui/loadingOverlay';
import ErrorOverlay from '../../ui/errorOverlay';
import { useCallback } from 'react';
import { AppDispatch } from '../../redux/store';
import { postBody } from '../../common/types';
import PageFooter from '../../ui/footer';


export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const aboutParagraphs = useSelector(selectAboutParagraphs);
  const loading = useSelector(selectAboutLoading);

   // modal state and refetch logic state
   const defaultUsed = useSelector(selectDefault);
   const promptAudience = useSelector(selectPromptAudience);
   const promptComments = useSelector(selectPromptComments);
   const promptSkills = useSelector(selectPromptSkills);
   const promptObj = {audience:promptAudience, skills: promptSkills, comments: promptComments};

  // error view
  const errorState = useSelector(selectErrorState);
  const { about, message} = errorState;
  const showErrorOverlay = about;

  const handleDataRefetch = useCallback((defaultUsed:boolean, prompt:postBody) => {
    dispatch(setErrorState({view:'about', reset: true, message:''}));
    if(defaultUsed){
      dispatch(fetchDefault());
    } else {
      dispatch(generateAbout({audience: prompt.audience, skills: prompt.skills, comments: prompt.comments}));
    }
  },[])

  return (
    showErrorOverlay ?
      <ErrorOverlay prompt={promptObj} defaultUsed={defaultUsed} handleDataRefetch={handleDataRefetch} message={message}/>
    :
    loading ? 
    <LoadingOverlay message="Generating..."/>
    :
    <div className="bg-black w-full h-full overflow-y-scroll">
      <div className="p-12 md:p-24">
        <Image
          src="/headshot.png"
          alt="Kevin Kingdon"
          style={{float:"left", margin:"24px"}}
          width={400}
          height={400}
          priority
        />
        {
          aboutParagraphs.map((text, index) => {
            return  <p key={index} className="text-white px-12 py-4 text-justify text-lg indent-20 break-normal">{text}</p>
          })
        }
      </div>
      <PageFooter/>
    </div>
  )
}