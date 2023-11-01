'use client'
import { experience} from '../../common/experience.json'



export default function Page() {
    return (
        <div className="bg-black w-full h-full ov">
            { experience.map((item) => {
                return (
                    <div className="p-2">
                        <div className="flex max-w-none bg-transparent flex-col md:flex-row">
                            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-96 md:rounded-none md:rounded-l-lg" src={item.companyImage} alt={item.companyName}/>
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <div className="flex row items-center">
                                    <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        <a href={item.companyLink}>{item.companyName}</a>
                                    </span>
                                    <span className="align-bottom ml-4 text-l tracking-tight text-gray-900 dark:text-white">
                                        {item.companyLocation}
                                    </span>
                                </div>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                {item.summary}
                                </p>
                                <ul className="list-disc flex flex-col items-end">
                                    {item.responsibilities.map((text) => {
                                        return (
                                            <li className="w-[95%] font-small p-2 text-gray-700 dark:text-gray-400">
                                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                                    {text}
                                                </p>
                                            </li>
                                        )
                                    })}
                                </ul>

                            </div>
                        </div>
                    </div>

                )
            })

            }
        </div>
    );
  }