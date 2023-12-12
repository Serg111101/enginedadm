import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { IMail } from '../../models'

interface IMails {
  loading: boolean,
  error: string,
  Mail: IMail[]
}
const initialState:IMails= {
  loading: false,
  error: "",
  Mail: []
}

export const MailSlice = createSlice({
  name: 'Mail',
  initialState,
  reducers: {
    fetchingMail(state) {
      state.loading = true;
    },
    fetchMail(state, action:PayloadAction<IMail[]>) {
      state.loading = false;
      state.Mail = action.payload;
      state.error = '';
    },
    fetchErrorMail(state, action : PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload.message;
    },
    
  }
})

export const { fetchingMail, fetchMail, fetchErrorMail } = MailSlice.actions;
export default MailSlice.reducer;
