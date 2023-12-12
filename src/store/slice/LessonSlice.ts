import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { ILesson } from '../../models'


interface ILessons {
  loading: boolean,
  error: string,
  Lesson: ILesson[]
}
const initialState:ILessons= {
  loading: false,
  error: "",
  Lesson: []
}

export const LessonSlice = createSlice({
  name: 'Lesson',
  initialState,
  reducers: {
    fetchingLesson(state) {
      state.loading = true;
    },
    fetchLesson(state, action:PayloadAction<ILesson[]>) {
      state.loading = false;
      state.Lesson = action.payload;
      state.error = ''
    },
    fetchErrorLesson(state, action:PayloadAction<Error> ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingLesson, fetchLesson, fetchErrorLesson } = LessonSlice.actions;
export default LessonSlice.reducer;
