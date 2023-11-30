'use client'
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { informationItem } from '../../common/types';
import { useGetEducationQuery } from '../../redux/services';
import ErrorOverlay from '../../ui/errorOverlay';
import LoadingComponent from '../../ui/loadingComponent';
import WorkExperienceCard from '../../ui/workExperienceCard';



export default function Page() {
    const [requestId, setRequestId] = useState(uuidv4())
    const { data, error, isLoading, isError } = useGetEducationQuery(requestId);

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
            { data ? data.education.map((item:informationItem, index:number) => {
                return (
                    <WorkExperienceCard key={index} item={item} />
                )
            }) : null
            }
        </div>
    );
  }