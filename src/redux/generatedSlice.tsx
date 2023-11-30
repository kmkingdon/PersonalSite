import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { postBody } from "../common/types";
import { HomeData, experienceApi } from "./services";


export interface GeneratedState {
    default: boolean;
    error: {
      about: boolean;
      home: boolean;
      message: string;
      status: string;
    }
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
    default: false,
    error:{
      about: false,
      home: false,
      message: '', 
      status: ''},
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
    } catch(e){
      console.log({e})
      const message = (e as Error).message;
      dispatch(setErrorState({view:'home', message, reset:false}))
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
    } catch(e){
      console.log({e})
      const message = (e as Error).message;
      dispatch(setErrorState({view:'about', message, reset:false}))
    }
  }, 
)

export const fetchDefault = createAsyncThunk(
  'generated/fetchDefault',
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try{
      const result = await dispatch(
        experienceApi.endpoints.fetchDefault.initiate('')
      )
        return result;
    } catch(e){
      console.log({e})
      const message = (e as Error).message;
      dispatch(setErrorState({view:'defaultData', message, reset:false}))
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
    setHomeState(state, action: PayloadAction<{alt:string, words:string[], url:string}>) {
      state.generatedState.homeWords = [...action.payload.words];
      state.generatedState.homeUrl = action.payload.url;
      state.generatedState.homeAlt = action.payload.alt;
    },
    setPrompt(state, action: PayloadAction<{audience:string, skills:string[], comments:string}>) {
      state.generatedState.prompt.audience = action.payload.audience;
      state.generatedState.prompt.skills = action.payload.skills;
      state.generatedState.prompt.comments = action.payload.comments;
    },
    setDefault(state) {
      state.generatedState.default = true;
    },
    setErrorState(state, action: PayloadAction<{view: string, message:string, reset: boolean}>) {
      const {view, message, reset } = action.payload;
      switch(view){
        case 'home':
          state.generatedState.error.home = reset? false : true;
          break;
        case 'about':
          state.generatedState.error.about = reset? false : true; 
          break;
        case 'defaultData':
          state.generatedState.error.home = reset? false : true;
          state.generatedState.error.about = reset? false : true;
          break;
      }
      state.generatedState.error.message = message;
    },
    resetState(state) {
      const resetState = {...generatedState};
      state.generatedState = resetState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(generateHome.pending , (state) => {
      state.generatedState.homeLoading = true;
    }),
    builder.addCase(generateHome.fulfilled, (state, action) => {
      if(!state.generatedState.default){
        const {words, url, alt} = action.payload as {words: string[], url: string, alt: string};
        state.generatedState.homeWords = words;
        state.generatedState.homeUrl = url;
        state.generatedState.homeAlt = alt;
      }
      state.generatedState.homeLoading = false;
    }),
    // builder.addCase(generateHome.rejected, (state, action) => {
    //   console.log({payloadRejected: action.payload})
    // }),
    builder.addCase(generateAbout.pending , (state) => {
      state.generatedState.aboutLoading = true;
    }),
    builder.addCase(generateAbout.fulfilled, (state, action) => {
      if(!state.generatedState.default){
        state.generatedState.aboutParagraphs = action.payload as string[];
      }
      state.generatedState.aboutLoading = false;
    }),
    builder.addCase(fetchDefault.pending , (state) => {
      state.generatedState.aboutLoading = true;
      state.generatedState.homeLoading = true;
    }),
    builder.addCase(fetchDefault.fulfilled, (state, action) => {
      state.generatedState.homeWords = action.payload?.data.words;
      state.generatedState.homeUrl = action.payload?.data.url;
      state.generatedState.homeAlt = action.payload?.data.alt;
      state.generatedState.aboutParagraphs = action.payload?.data.aboutParagraphs;
      state.generatedState.aboutLoading = action.payload?.data.false;
      state.generatedState.homeLoading = action.payload?.data.false;
    })
  },
});

export const { setAboutState, setHomeState, setPrompt, setDefault, setErrorState, resetState} = generatedSlice.actions;

export const selectDefault = (state: AppState) => state.generated.generatedState.default;

export const selectAboutParagraphs = (state: AppState) => state.generated.generatedState.aboutParagraphs;
export const selectAboutLoading = (state: AppState) => state.generated.generatedState.aboutLoading;

export const selectHomeLoading = (state: AppState) => state.generated.generatedState.homeLoading;
export const selectHomeUrl= (state: AppState) => state.generated.generatedState.homeUrl;
export const selectHomeAlt = (state: AppState) => state.generated.generatedState.homeAlt;
export const selectHomeWords = (state: AppState) => state.generated.generatedState.homeWords;

export const selectPromptAudience = (state: AppState) => state.generated.generatedState.prompt.audience;
export const selectPromptSkills = (state: AppState) => state.generated.generatedState.prompt.skills;
export const selectPromptComments = (state: AppState) => state.generated.generatedState.prompt.comments;
export const selectErrorState = (state: AppState) => state.generated.generatedState.error;

export default generatedSlice.reducer;