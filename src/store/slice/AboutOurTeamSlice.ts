import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { IAboutOurTeam } from '../../models'

interface IAboutOurTeams {
  loading: boolean,
  error: string,
  AboutOurTeam: IAboutOurTeam[]
}
const initialState:IAboutOurTeams= {
  loading: false,
  error: "",
  AboutOurTeam: []
}

export const AboutOurTeamSlice = createSlice({
  name: 'AboutOurTeam',
  initialState,
  reducers: {
    fetchingAboutOurTeam(state) {
      state.loading = true;
    },
    fetchAboutOurTeam(state, action:PayloadAction<IAboutOurTeam[]>) {
      state.loading = false;
      state.AboutOurTeam = action.payload;
      state.error = '';
    },
    fetchErrorAboutOurTeam(state, action:PayloadAction<Error> ) {
      state.loading = false;
      state.error = action.payload.message;
    },
    
  }
})

export const { fetchingAboutOurTeam, fetchAboutOurTeam, fetchErrorAboutOurTeam } = AboutOurTeamSlice.actions;
export default AboutOurTeamSlice.reducer;
