import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { IHomeHeader } from '../../models'

interface IHomeHeaders {
  loading: boolean,
  error: string,
  HomeHeaderr: IHomeHeader[]
}

const initialState:IHomeHeaders= {
  loading: false,
  error: "",
  HomeHeaderr: []
}

export const HomeHeaderrSlice = createSlice({
  name: 'HomeHeader',
  initialState,
  reducers: {
    fetchingHomeHeaderr(state) {
      state.loading = true;
    },
    fetchHomeHeaderr(state, action:PayloadAction<IHomeHeader[]>) {
      state.loading = false;
      state.HomeHeaderr = action.payload;
      state.error = ''
    },
    fetchErrorHomeHeaderr(state, action:PayloadAction<Error> ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingHomeHeaderr, fetchHomeHeaderr, fetchErrorHomeHeaderr } = HomeHeaderrSlice.actions


export default HomeHeaderrSlice.reducer
