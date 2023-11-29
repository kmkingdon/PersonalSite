'use client'
import { informationItem } from '../../common/types';
import { useGetEducationQuery } from '../../redux/services';
import LoadingComponent from '../../ui/loadingComponent';
import WorkExperienceCard from '../../ui/workExperienceCard';



export default function Page() {
    const { data, error, isLoading } = useGetEducationQuery('');
    return (
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