'use client'
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { informationItem } from '../../common/types';
import { useGetWorkExperienceQuery } from '../../redux/services';
import LoadingComponent from '../../ui/loadingComponent';
import WorkExperienceCard from '../../ui/workExperienceCard';
import ErrorOverlay from '../../ui/errorOverlay';
import PageFooter from '../../ui/footer';



export default function Page() {
    const [requestId, setRequestId] = useState(uuidv4())
    const { data, error, isLoading, isError } = useGetWorkExperienceQuery(requestId);

    // error overlay
    const showErrorOverlay = isError;
    let message = '';
    useEffect(()=> {
        if(error){
            if('status' in error){
                message = 'error' in error ? error.error : JSON.stringify(error.data);
            } else {
                message = error.message as string;
            }
        }
    }, [error])

    const handleDataRefetch = useCallback(() => {
        setRequestId(uuidv4());
    },[])

    return (
        showErrorOverlay ?
            <ErrorOverlay prompt={null} defaultUsed={false} handleDataRefetch={handleDataRefetch} message={message}/>
        :
        isLoading ?
        <LoadingComponent/>
        :
        <div className="bg-black w-full h-full overflow-y-scroll">
            { data ? data.workExperience.map((item:informationItem, index:number) => {
                return (
                    <WorkExperienceCard key={index} item={item} />
                )
            }) : null
            }
            <div className="w-full h-12"></div>
            <PageFooter/>
        </div>
    );
  }