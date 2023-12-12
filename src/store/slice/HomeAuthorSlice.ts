import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { IHomeAuthor } from '../../models'

interface IHomeAuthors {
  loading: boolean,
  error: string,
  HomeAuthor: IHomeAuthor[]
}

const initialState:IHomeAuthors= {
  loading: false,
  error: "",
  HomeAuthor:[]
}

export const HomeAuthorSlice = createSlice({
  name: 'HomeAuthor',
  initialState,
  reducers: {
    fetchingHomeAuthor(state) {
      state.loading = true;
    },
    fetchHomeAuthor(state, action:PayloadAction<IHomeAuthor[]>) {
      state.loading = false;
      state.HomeAuthor = action.payload;
      state.error = ''
    },
    fetchErrorHomeAuthor(state, action:PayloadAction<Error> ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingHomeAuthor, fetchHomeAuthor, fetchErrorHomeAuthor } = HomeAuthorSlice.actions


export default HomeAuthorSlice.reducer
