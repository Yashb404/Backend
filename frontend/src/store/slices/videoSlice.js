import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  videos: [],
  currentVideo: null,
  loading: false,
  error: null,
}

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    fetchVideosStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchVideosSuccess: (state, action) => {
      state.loading = false
      state.videos = action.payload
    },
    fetchVideosFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    setCurrentVideo: (state, action) => {
      state.currentVideo = action.payload
    },
    addVideo: (state, action) => {
      state.videos.unshift(action.payload)
    },
    updateVideo: (state, action) => {
      const index = state.videos.findIndex(video => video._id === action.payload._id)
      if (index !== -1) {
        state.videos[index] = action.payload
      }
    },
    deleteVideo: (state, action) => {
      state.videos = state.videos.filter(video => video._id !== action.payload)
    },
  },
})

export const {
  fetchVideosStart,
  fetchVideosSuccess,
  fetchVideosFailure,
  setCurrentVideo,
  addVideo,
  updateVideo,
  deleteVideo,
} = videoSlice.actions

export default videoSlice.reducer 