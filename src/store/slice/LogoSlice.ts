import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { ILogo } from '../../models'

interface ILogos {
  loading: boolean,
  error: string,
  Logo: ILogo[]
}

const initialState:ILogos= {
  loading: false,
  error: "",
  Logo: []
}

export const LogoSlice = createSlice({
  name: 'Logo',
  initialState,
  reducers: {
    fetchingLogo(state) {
      state.loading = true;
    },
    fetchLogo(state, action:PayloadAction<ILogo[]>) {
      state.loading = false;
      state.Logo = action.payload;
      state.error = ''
    },
    fetchErrorLogo(state, action:PayloadAction<Error> ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingLogo, fetchLogo, fetchErrorLogo } = LogoSlice.actions;
export default LogoSlice.reducer;
