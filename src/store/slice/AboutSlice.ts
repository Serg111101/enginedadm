import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { IAbout } from '../../models'

interface IAboutSlices {
  loading: boolean,
  error: string,
  About: IAbout[]
}

const initialState:IAboutSlices= {
  loading: false,
  error: "",
  About: []
}

export const AboutSlice = createSlice({
  name: 'About',
  initialState,
  reducers: {
    fetchingAbout(state) {
      state.loading = true;
    },
    fetchAbout(state, action:PayloadAction<IAbout[]>) {
      state.loading = false;
      state.About = action.payload;
      state.error = '';
    },
    fetchErrorAbout(state, action:PayloadAction<Error> ) {
      state.loading = false;
      state.error = action.payload.message;
    },
    
  }
})

export const { fetchingAbout, fetchAbout, fetchErrorAbout } = AboutSlice.actions;
export default AboutSlice.reducer;
