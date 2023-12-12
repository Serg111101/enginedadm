import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ILoginStyle } from '../../models';

interface LoginStyle {
  loading: boolean;
  error: string;
  LoginStyle: ILoginStyle[]
}

const initialState: LoginStyle = {
  loading: false,
  error: "",
  LoginStyle: []
}

export const LoginStyleSlice = createSlice({
  name: 'LoginStyle',
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true;
    },
    fetchSuccess(state, action: PayloadAction<ILoginStyle[]>) {
      state.loading = false;
      state.LoginStyle = action.payload;
      state.error = ''
    },
    fetchError(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload.message
    }
  }
})

export const { fetching, fetchSuccess,  fetchError } = LoginStyleSlice.actions


export default LoginStyleSlice.reducer