export type audienceCategories = "Recruiter" | "Hiring Manager" | "Peer Collaborator" | "Friend and Family" | "Community Member"
export type skillsCategories = "technical" | "softwareDelivery" | "peopleLeadership" | "education" | "community"

export type collections = "workExperience" | "education" | "skills" | "history" 
export const MONGO_COLLECTIONS: { [key: string]: collections; } = {
    EDUCATION: 'education',
    WORKEXPERIENCE: 'workExperience',
    SKILLS: 'skills',
    HISTORY: 'history'
}

export type aboutParams = {
    audience: audienceCategories;
    skills: skillsCategories[];
    comments: string;
  }
  