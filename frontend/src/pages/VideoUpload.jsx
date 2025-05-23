import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addVideo } from '../store/slices/videoSlice'
import axios from 'axios'

const VideoUpload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoFile: null,
    thumbnail: null,
  })
  const [uploadProgress, setUploadProgress] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.video)

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formDataToSend = new FormData()
    formDataToSend.append('title', formData.title)
    formDataToSend.append('description', formData.description)
    formDataToSend.append('video', formData.videoFile)
    formDataToSend.append('thumbnail', formData.thumbnail)

    try {
      const response = await axios.post('/api/v1/videos', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          setUploadProgress(progress)
        },
      })

      dispatch(addVideo(response.data))
      navigate(`/video/${response.data._id}`)
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Upload Video</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input w-full h-32"
            required
          />
        </div>
        <div>
          <label htmlFor="videoFile" className="block mb-2">
            Video File
          </label>
          <input
            type="file"
            id="videoFile"
            name="videoFile"
            onChange={handleChange}
            className="input w-full"
            accept="video/*"
            required
          />
        </div>
        <div>
          <label htmlFor="thumbnail" className="block mb-2">
            Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            onChange={handleChange}
            className="input w-full"
            accept="image/*"
            required
          />
        </div>
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-accent h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
    </div>
  )
}

export default VideoUpload 