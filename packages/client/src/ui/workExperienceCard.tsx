'use client'
import { Dropdown } from 'flowbite-react';

import ProjectCard from './projectCard';
import { informationItem } from '../common/types';



export default function informationCard(props:{item:informationItem}) {
    const {item} = props;
    return (
        <div className="px-6 py-4 md:px-24 md:py-16" key={item.title}>
            <div className="flex max-w-none bg-transparent flex-col md:flex-row">
                <img className="object-cover w-full rounded-t-lg h-80 md:w-100 md:rounded-none md:rounded-l-lg md:max-w-[600px]" src={item.companyImage} alt={item.companyName}/>
                <div className="flex flex-col justify-start leading-normal max-w-[700px] px-6 py-2 md:px-24 md:py-8">
                    <div className="flex row items-center">
                        <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            <a href={item.companyLink} target="_blank" rel="noopener noreferrer">{item.companyName}</a>
                        </span>
                        <span className="align-bottom ml-4 text-md tracking-tight text-gray-900 dark:text-white">
                            {item.companyLocation}
                        </span>
                    </div>
                    <div className="flex row items-center mt-2 mb-2">
                        <span className="text-xl tracking-tight text-gray-900 dark:text-white">
                            {item.title}
                        </span>
                    </div>
                    <div className="flex row items-center mt-4 mb-4">
                        <span className="text-md tracking-tight text-gray-700 dark:text-gray-400">
                            {`${item.startDate} - ${item.endDate}`}
                        </span>
                    </div>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                    {item.summary}
                    </p>
                    <div className="pt-8 w-full">
                        <Dropdown label="Learn More" className='w-[90%] md:w-[70%]'>
                            <ul className="p-2 list-disc flex flex-col items-end">
                                {item.responsibilities.map((text) => {
                                    return (
                                        <li className="w-[95%] p-2 text-gray-700 dark:text-gray-400">
                                            <p className="text-xs text-gray-700 dark:text-gray-400">
                                                {text}
                                            </p>
                                        </li>
                                    )
                                })}
                            </ul>
                            { item.projects.length > 0 && 
                                <div className="flex flex-col p-8">
                                    <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Projects</span>
                                    <div className="flex flex-col md:flex-row md:justify-around p-2">
                                        { item.projects.map((project) => {
                                            return (
                                                <ProjectCard project={project}/>
                                            )
                                        })}
                                    </div>
                                </div>
                            }
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
  }