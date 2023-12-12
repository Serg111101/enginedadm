import { createSlice ,PayloadAction} from '@reduxjs/toolkit'
import { IHomeInfo } from '../../models'

interface IHomeInfos {
  loading: boolean,
  error: string,
  HomeInfo: IHomeInfo[]
}

const initialState:IHomeInfos= {
  loading: false,
  error: "",
  HomeInfo: []
}

export const HomeInfoSlice = createSlice({
  name: 'HomeInfo',
  initialState,
  reducers: {
    fetchingHomeInfo(state) {
      state.loading = true;
    },
    fetchHomeInfo(state, action:PayloadAction<IHomeInfo[]>) {
      state.loading = false;
      state.HomeInfo = action.payload;
      state.error = ''
    },
    fetchErrorHomeInfo(state, action:PayloadAction<Error> ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingHomeInfo, fetchHomeInfo, fetchErrorHomeInfo } = HomeInfoSlice.actions;
export default HomeInfoSlice.reducer;
