import { aboutParams, skillsCategories } from "../common/common";

export const createAboutPrompt = (params: aboutParams & {type: string, data:any}) => {
    const { audience, skills, type, comments, data } = params;

    const promptStart = type === "about" ?
        "Can you create a summary section for Kevin Kingdon's personal website's About page. It should be a couple of paragraphs in form. " :
        "Can you list three single or double word phrases that would summarize Kevin Kingdon. The phrases should be no longer than three words. Please return only the word and no additional explanation."
    const promptAudience = audience.length ? `Write it for an audience of a ${audience} but don't specifically call this out. ` : `Write it for a general audience. `;
    let promptSkills; 
    //add skills
    if(skills && skills.length){
        const skillsObject = Object.fromEntries(Object.entries(data.skills).filter((skill) => {
            if(skills.includes(skill[0] as skillsCategories)){
                return skill;
            }
            return null;
        }))
        promptSkills =  `Include references to the follow JSON list of skills that Kevin has: ${JSON.stringify(skillsObject)}. `
    }
    const promptComments = comments.length ? `Finally, also try to answer or address the following: ${comments}. ` : ' ';
    const promptDetails =  `Use the following experience, education, and history JSON objects for details. 
    Experience: ${JSON.stringify(data.workExperience)}. 
    Education: ${JSON.stringify(data.education)}.
    History: ${JSON.stringify(data.history)}.`

    return promptStart + promptAudience + promptSkills + promptComments + promptDetails;
}