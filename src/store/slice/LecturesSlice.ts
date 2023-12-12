import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { ILectures } from '../../models'

interface ILecturess {
  loading: boolean,
  error: string,
  Lectures: ILectures[]
}


const initialState:ILecturess= {
  loading: false,
  error: "",
  Lectures: []
}

export const LecturesSlice = createSlice({
  name: 'Lectures',
  initialState,
  reducers: {
    fetchingLectures(state) {
      state.loading = true;
    },
    fetchLectures(state, action:PayloadAction<ILectures[]>) {
      state.loading = false;
      state.Lectures = action.payload;
      state.error = ''
    },
    fetchErrorLectures(state, action:PayloadAction<Error> ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingLectures, fetchLectures, fetchErrorLectures } = LecturesSlice.actions;
export default LecturesSlice.reducer;
