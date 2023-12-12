import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { IHomeNextRout } from '../../models';


interface IHomeNextRouts {
  loading: boolean,
  error: string,
  HomeNextRout: IHomeNextRout[]
}

const initialState:IHomeNextRouts= {
  loading: false,
  error: "",
  HomeNextRout:[],
}

export const HomeNextRoutSlice = createSlice({
  name: 'HomeNextRout',
  initialState,
  reducers: {
    fetchingHomeNextRout(state) {
      state.loading = true;
    },
    fetchHomeNextRout(state, action:PayloadAction<IHomeNextRout[]>) {
      state.loading = false;
      state.HomeNextRout = action.payload;
      state.error = ''
    },
    fetchErrorHomeNextRout(state, action:PayloadAction<Error> ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingHomeNextRout, fetchHomeNextRout, fetchErrorHomeNextRout } = HomeNextRoutSlice.actions


export default HomeNextRoutSlice.reducer
