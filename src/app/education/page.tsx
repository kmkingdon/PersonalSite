'use client'
import { informationItem } from '../../common/types';
import { useGetEducationQuery } from '../../redux/services';
import WorkExperienceCard from '../../ui/workExperienceCard';



export default function Page() {
    const { data, error, isLoading } = useGetEducationQuery('');
    return (
        <div className="bg-black w-full h-full overflow-y-scroll">
            { data ? data.education.map((item:informationItem) => {
                return (
                    <WorkExperienceCard item={item} />
                )
            }) : null
            }
        </div>
    );
  }