'use client'

import { Button, Label, Modal } from "flowbite-react";
import { useState } from "react";
import { AUDIENCE, SKILLS } from "../common/constants";
import { useDispatch } from "react-redux";
import { fetchDefault, setDefault } from "../redux/generatedSlice";
import { AppDispatch } from "../redux/store";

type InputParams = {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    generateData: any
}

export default function InputModal({openModal, setOpenModal, generateData}:InputParams) {
    const dispatch = useDispatch<AppDispatch>();
    const [audience, setAudience] = useState<string|undefined>(undefined);
    const [skills, setSkills] = useState<string[]>([]);
    const [comment, setComment] = useState<string|undefined>(undefined);
    const disableGenerate= !audience || !comment || skills.length === 0

    const updateSkillsArray = (e:any) => {
        const value = e.target.value
        if(e.target.checked){
            setSkills([...skills, value])
        } else {
            const index = skills.indexOf(e);
            const skillsPop = [...skills].slice(index)
            setSkills(skillsPop)
        }
    }

    const handleGenerate = (defaultUsed:boolean) => {
        if(defaultUsed) {
            dispatch(fetchDefault())
            dispatch(setDefault())
        } else {
            const prompt = {
                "audience": audience,
                "skills": skills,
                "comments": comment
            }
            generateData(prompt)
        }
    }

    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>What would you like to learn about Kevin Kingdon?</Modal.Header>
            <Modal.Body>
            <form className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="audience" value="Who are you?" />
                    </div>
                    <select id="audience" onChange={(e) => {setAudience(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value={undefined}>Who are you?</option>
                        {
                            Object.values(AUDIENCE).map((item, index) => {
                                return <option key={index} value={item}>{item}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="skills" value="What skills are you interested in learning about?" />
                    </div>
                    {
                        Object.keys(SKILLS).map((item, index) => {
                            return (
                                <div  key={index} className="flex items-center mb-4">
                                    <input id={item} onChange={((e) => updateSkillsArray(e))} type="checkbox" value={item} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    </input>
                                    <label htmlFor={item} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item}</label>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <label htmlFor="first_name"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">What else do you want to know about?</label>
                    <input type="text" id="comment" onChange={(e) => {setComment(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ask questions here">
                    </input>
                </div>
            </form>
            </Modal.Body>
            <Modal.Footer>
            <Button disabled={disableGenerate} onClick={() => handleGenerate(false)}>Generate Site</Button>
            <Button color="gray" onClick={() => handleGenerate(true)}>
                I don't have time for AI, show me the site now!
            </Button>
            </Modal.Footer>
        </Modal>
    )
}