export type informationItem = {
    title: string;
    companyName: string;
    companyLink: string;
    companyImage: string;
    companyLocation: string;
    startDate: string;
    endDate: string;
    summary: string;
    responsibilities: string[];
    projects: projectItem[];
};

export type projectItem = {
    title: string;
    deployed: string;
    git: string;
    summary: string;
    image: string;
};

export type postBody = {
    audience?: string;
    skills: string[];
    comments?: string;
}