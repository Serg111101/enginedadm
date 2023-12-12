import { createSlice,PayloadAction } from '@reduxjs/toolkit'

interface ISatelites {
  loading: boolean,
  error: string,
  Satellites: any
}

const initialState:ISatelites= {
  loading: false,
  error: "",
  Satellites: []
}

export const SatellitesSlice = createSlice({
  name: 'Satellites',
  initialState,
  reducers: {
    fetchingSatellites(state) {
      state.loading = true;
    },
    fetchSatellites(state, action:PayloadAction<ISatelites>) {
      state.loading = false;
      state.Satellites = action.payload;
      state.error = ''
    },
    fetchErrorSatellites(state, action:PayloadAction<Error> ) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetchingSatellites, fetchSatellites, fetchErrorSatellites } = SatellitesSlice.actions;
export default SatellitesSlice.reducer;
