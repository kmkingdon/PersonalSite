'use client'
import { experience} from '../../common/experience.json'
import WorkExperienceCard from '../../ui/workExperienceCard';



export default function Page() {
    return (
        <div className="bg-black w-full h-full overflow-y-scroll">
            { experience.workExperience.map((item) => {
                return (
                    <WorkExperienceCard item={item} />
                )
            })
            }
        </div>
    );
  }