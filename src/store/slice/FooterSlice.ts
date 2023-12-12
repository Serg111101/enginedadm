import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { IFooter } from '../../models'

interface IFooters {
  loading: boolean,
  error: string,
  Footer: IFooter[];
}

const initialState:IFooters= {
  loading: false,
  error: "",
  Footer: []
}

export const FooterSlice = createSlice({
  name: 'Footer',
  initialState,
  reducers: {
    fetchingFooter(state) {
      state.loading = true;
    },
    fetchFooter(state, action:PayloadAction<IFooter[]>) {
      state.loading = false;
      state.Footer = action.payload;
      state.error = ''
    },
    fetchErrorFooter(state, action:PayloadAction<Error> ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingFooter, fetchFooter, fetchErrorFooter } = FooterSlice.actions;
export default FooterSlice.reducer;
