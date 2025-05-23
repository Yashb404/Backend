import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      localStorage.setItem('token', action.payload.accessToken)
      localStorage.setItem('refreshToken', action.payload.refreshToken)
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.refreshToken = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
    refreshToken: (state, action) => {
      state.token = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      localStorage.setItem('token', action.payload.accessToken)
      localStorage.setItem('refreshToken', action.payload.refreshToken)
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
  refreshToken,
} = authSlice.actions

export default authSlice.reducer 