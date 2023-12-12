import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { IHeader } from '../../models'

interface IHeaders {
  loading: boolean,
  error: string,
  Header: IHeader[]
}

const initialState:IHeaders= {
  loading: false,
  error: "",
  Header: []
}

export const HeaderSlice = createSlice({
  name: 'Header',
  initialState,
  reducers: {
    fetchingHeader(state) {
      state.loading = true;
    },
    fetchHeader(state, action:PayloadAction<IHeader[]>) {
      state.loading = false;
      state.Header = action.payload;
      state.error = ''
    },
    fetchErrorHeader(state, action:PayloadAction<Error> ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingHeader, fetchHeader, fetchErrorHeader } = HeaderSlice.actions;
export default HeaderSlice.reducer;
