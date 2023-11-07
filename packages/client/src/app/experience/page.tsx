'use client'
import { informationItem } from '../../common/types';
import { useGetWorkExperienceQuery } from '../../redux/services';
import WorkExperienceCard from '../../ui/workExperienceCard';



export default function Page() {

    const { data, error, isLoading } = useGetWorkExperienceQuery('');
    return (
        <div className="bg-black w-full h-full overflow-y-scroll">
            { data ? data['0'].workExperience.map((item:informationItem) => {
                return (
                    <WorkExperienceCard item={item} />
                )
            }) : null
            }
        </div>
    );
  }