import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { postBody } from '../common/types'

type HomeImage = {
  revised_prompt: string;
  url: string;
}

export type HomeData =  {
  image: {
    created: string;
    data: HomeImage[]
  },
  words: string
}

// Define a service using a base URL and expected endpoints
export const experienceApi = createApi({
    reducerPath: 'experienceApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
    endpoints: (builder) => ({
      getWorkExperience: builder.query<any, string>({
        query: () => ({url: 'workExperience', method:'Get'}),
      }),
      getEducation: builder.query<any, string>({
        query: () => ({url: 'education', method:'Get'}),
      }),
      fetchDefault: builder.query<any, string>({
        query: () => ({url: 'default', method:'Get'}),
      }),
      generateAbout: builder.mutation<string, postBody>({
        query: (body) => ({url: 'about', method:'Post', body, responseHandler: (response) => response.text()}),
      }),
      generateHome: builder.mutation<HomeData, postBody>({
        query: (body) => ({url: 'home', method:'Post', body}),
      }),
    }),
  })
  
  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints
  export const { useGetWorkExperienceQuery, useGetEducationQuery, useGenerateHomeMutation, useGenerateAboutMutation } = experienceApi