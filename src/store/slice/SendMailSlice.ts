import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISendMail } from '../../models';

interface ISendMails {
  loading: boolean,
  error: string,
  SendMail: ISendMail[];
}

const initialState:ISendMails = {
  loading: false,
  error: "",
  SendMail: []
}

export const SendMailSlice = createSlice({
  name: 'SendMail',
  initialState,
  reducers: {
    fetchingSendMail(state) {
      state.loading = true;
    },
    fetchSendMail(state, action:PayloadAction<ISendMail[]>) {
      state.loading = false;
      state.SendMail = action.payload;
      state.error = '';
    },
    fetchErrorSendMail(state, action ) {
      state.loading = false;
      state.error = action.payload.message;
    },
    
  }
})

export const { fetchingSendMail, fetchSendMail, fetchErrorSendMail } = SendMailSlice.actions;
export default SendMailSlice.reducer;
