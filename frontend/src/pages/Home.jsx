import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchVideosStart, fetchVideosSuccess, fetchVideosFailure } from '../store/slices/videoSlice'
import axios from 'axios'

const Home = () => {
  const dispatch = useDispatch()
  const { videos, loading, error } = useSelector((state) => state.video)

  useEffect(() => {
    const fetchVideos = async () => {
      dispatch(fetchVideosStart())
      try {
        const response = await axios.get('/api/v1/videos')
        dispatch(fetchVideosSuccess(response.data))
      } catch (error) {
        dispatch(fetchVideosFailure(error.response?.data?.message || 'Failed to fetch videos'))
      }
    }

    fetchVideos()
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-500 text-white p-4 rounded-md">
        {error}
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Featured Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Link
            key={video._id}
            to={`/video/${video._id}`}
            className="bg-secondary rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform"
          >
            <div className="aspect-video bg-gray-800">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
              <p className="text-gray-400 text-sm">
                {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
              </p>
              <div className="flex items-center mt-2">
                <img
                  src={video.owner.avatar}
                  alt={video.owner.username}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-sm text-gray-400">{video.owner.username}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home 