'use client'
import { projectItem } from '../common/types'
import Image from 'next/image'

export default function projectCard(props:{project:projectItem}) {
    const {project} = props;
    return (
    <div className="max-w-[250px]">
        <div className="flex flex-row justify-start items-center">
            <Image
                src={project.image}
                className="mr-2"
                alt={project.title}
                width={70}
                height={50}
                priority
            />
            <span className="text-l mr-4 max-w-[100px] text-center align-middle text-gray-900 dark:text-white">
                {project.deployed.length > 0 ?
                    <a href={project.deployed} target="_blank" rel="noopener noreferrer">
                        {project.title}
                    </a>
                    :
                    <>{project.title}</>
                }
            </span>
            <a href={project.git} target="_blank" rel="noopener noreferrer">
                <Image
                    src={'/github.png'}
                    className="contrast-200 min-w-[30px]"
                    alt={project.title}
                    width={30}
                    height={30}
                    priority
                />
            </a>
        </div>
        <p className="text-xs mt-4 text-gray-700 dark:text-gray-400">
            {project.summary}
        </p>
    </div>
    )
  }