import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { ITeacher } from '../../models'

interface ITeachers {
  loading: boolean,
  error: string,
  Teacher: ITeacher[]
}

const initialState:ITeachers= {
  loading: false,
  error: "",
  Teacher: []
}

export const TeacherSlice = createSlice({
  name: 'Teacher',
  initialState,
  reducers: {
    fetchingTeacher(state) {
      state.loading = true;
    },
    fetchTeacher(state, action:PayloadAction<ITeacher[]>) {
      state.loading = false;
      state.Teacher = action.payload;
      state.error = ''
    },
    fetchErrorTeacher(state, action:PayloadAction<Error> ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingTeacher, fetchTeacher, fetchErrorTeacher } = TeacherSlice.actions;
export default TeacherSlice.reducer;
