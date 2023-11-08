import { OpenAI } from "openai";

import db from "../db/conn.js";
import { MONGO_COLLECTIONS, collections } from "../common/common.js";

export const getMongoData = async (type:collections[]) => {
    let results:any={};
    if(type.includes(MONGO_COLLECTIONS.WORKEXPERIENCE as collections)){
        const workExperience = await db?.collection('workExperience');
        let workResults = await workExperience?.find({}).toArray();
        if(workResults){
            results = Object.assign(results, workResults[0]) 
        }
    }

    if(type.includes(MONGO_COLLECTIONS.EDUCATION as collections)){
        const education = await db?.collection(MONGO_COLLECTIONS.EDUCATION);
        let eduResults = await education?.find({}).toArray();
        if(eduResults){
            results = Object.assign(results, eduResults[0]) 
        }
    }

    if(type.includes(MONGO_COLLECTIONS.SKILLS as collections)){
        const skills = await db?.collection(MONGO_COLLECTIONS.SKILLS);
        let skillsResults = await skills?.find({}).toArray();
        if(skillsResults){
            results = Object.assign(results, skillsResults[0]) 
        }
    }

    if(type.includes(MONGO_COLLECTIONS.HISTORY as collections)){
        const history = await db?.collection(MONGO_COLLECTIONS.HISTORY);
        let historyResults = await history?.find({}).toArray();
        if(historyResults){
            results = Object.assign(results, historyResults[0]) 
        }
    }
    return results;
};


export const generatePrompt = async (prompt:string) => {
    const configuration = {
        apiKey: process.env.OPENAI_API_KEY,
    };
    console.log({key: process.env.OPENAI_API_KEY })
    const openai = new OpenAI(configuration);

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo",
    });
    return completion;
}