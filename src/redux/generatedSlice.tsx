import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { postBody } from "../common/types";
import { HomeData, experienceApi } from "./services";


export interface GeneratedState {
    homeWords: string[];
    homeUrl: string;
    homeAlt: string;
    homeLoading: boolean;
    aboutLoading: boolean;
    aboutParagraphs: string[];
    prompt: {
      audience?: string;
      skills: string[];
      comments?: string;
    }
  }
  
  const generatedState: GeneratedState = {
    homeWords: [],
    homeUrl: '',
    homeAlt: '',
    homeLoading: false,
    aboutLoading: false,
    aboutParagraphs: [],
    prompt: {
      audience: undefined,
      skills:[],
      comments: undefined
    }
  };

export const generateHome = createAsyncThunk(
  'generated/generateHome',
  async (body: postBody, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try{
      const result = await dispatch(
        experienceApi.endpoints.generateHome.initiate(body)
      ) as {data:HomeData} 

        const parseWords = result.data.words.split(/[\n,]/)
        const url = result.data.image.data[0].url
        const alt = result.data.image.data[0].revised_prompt;
        return {words: parseWords, url, alt }
    } catch(error){
      console.log({error})
    }
  }, 
)

export const generateAbout = createAsyncThunk(
  'generated/generateAbout',
  async (body: postBody, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try{
      const result = await dispatch(
        experienceApi.endpoints.generateAbout.initiate(body)
      ) as {data:string}
        const parseParagraphs = result.data.split('\n')
        return parseParagraphs;
    } catch(error){
      console.log({error})
    }
  }, 
)


export const generatedSlice = createSlice({
  name: "generated",
  initialState: {generatedState},
  reducers: {
    setAboutState(state, action) {
      state.generatedState.aboutParagraphs = [...action.payload];
    },
    setHomeState(state, action) {
      state.generatedState.homeWords = [...action.payload.words];
      state.generatedState.homeUrl = action.payload.url;
      state.generatedState.homeAlt = action.payload.alt;
    },
    setPrompt(state, action) {
      state.generatedState.prompt.audience = action.payload.audience;
      state.generatedState.prompt.skills = action.payload.skills;
      state.generatedState.prompt.comments = action.payload.comments;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(generateHome.pending , (state, action) => {
      console.log({payloadLoading: action.payload})
      state.generatedState.homeLoading = true;
    }),
    builder.addCase(generateHome.fulfilled, (state, action) => {
      console.log({payloadFullfilled: action.payload})
      // @ts-ignore
      const {words, url, alt} = action.payload;
      state.generatedState.homeWords = words;
      state.generatedState.homeUrl = url;
      state.generatedState.homeAlt = alt;
      state.generatedState.homeLoading = false;
      console.log({state})
    }),
    builder.addCase(generateHome.rejected, (state, action) => {
      console.log({payloadRejected: action.payload})
    }),
    builder.addCase(generateAbout.pending , (state, action) => {
      console.log({payloadLoading: action.payload})
      state.generatedState.aboutLoading = true;
    }),
    builder.addCase(generateAbout.fulfilled, (state, action) => {
      console.log({payloadFullfilled: action.payload})
      state.generatedState.aboutParagraphs = action.payload as string[];
      state.generatedState.aboutLoading = false;
      console.log({state})
    }),
    builder.addCase(generateAbout.rejected, (state, action) => {
      console.log({payloadRejected: action.payload})
    })
  },
});

export const { setAboutState, setHomeState, setPrompt} = generatedSlice.actions;

export const selectAboutParagraphs = (state: AppState) => state.generated.generatedState.aboutParagraphs;
export const selectAboutLoading = (state: AppState) => state.generated.generatedState.aboutLoading;

export const selectHomeLoading = (state: AppState) => state.generated.generatedState.homeLoading;
export const selectHomeUrl= (state: AppState) => state.generated.generatedState.homeUrl;
export const selectHomeAlt = (state: AppState) => state.generated.generatedState.homeAlt;
export const selectHomeWords = (state: AppState) => state.generated.generatedState.homeWords;

export const selectPromptAudience = (state: AppState) => state.generated.generatedState.prompt.audience;
export const selectPromptSkills = (state: AppState) => state.generated.generatedState.prompt.skills;
export const selectPromptComments = (state: AppState) => state.generated.generatedState.prompt.comments;

export default generatedSlice.reducer;