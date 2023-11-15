import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const experienceApi = createApi({
    reducerPath: 'experienceApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
    endpoints: (builder) => ({
      getWorkExperience: builder.query<any, string>({
        query: () => `workExperience`,
      }),
      getEducation: builder.query<any, string>({
        query: () => `education`,
      }),
    }),
  })
  
  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints
  export const { useGetWorkExperienceQuery, useGetEducationQuery } = experienceApi