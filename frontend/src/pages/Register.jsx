import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice'
import axios from 'axios'

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [avatar, setAvatar] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const [previewAvatar, setPreviewAvatar] = useState('')
  const [previewCoverImage, setPreviewCoverImage] = useState('')
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e, type) => {
    const file = e.target.files[0]
    if (file) {
      if (type === 'avatar') {
        setAvatar(file)
        setPreviewAvatar(URL.createObjectURL(file))
      } else {
        setCoverImage(file)
        setPreviewCoverImage(URL.createObjectURL(file))
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      dispatch(loginFailure('Passwords do not match'))
      return
    }

    if (!avatar) {
      dispatch(loginFailure('Avatar is required'))
      return
    }

    dispatch(loginStart())

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('fullname', formData.fullname)
      formDataToSend.append('username', formData.username)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('password', formData.password)
      formDataToSend.append('avatar', avatar)
      if (coverImage) {
        formDataToSend.append('coverImage', coverImage)
      }

      const response = await axios.post('/api/v1/users/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      dispatch(loginSuccess(response.data))
      navigate('/dashboard')
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || 'Registration failed'))
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      {error && (
        <div className="bg-red-500 text-white p-3 rounded-md mb-4">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullname" className="block mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="username" className="block mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="avatar" className="block mb-2">
            Avatar
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'avatar')}
            className="input w-full"
            required
          />
          {previewAvatar && (
            <img
              src={previewAvatar}
              alt="Avatar preview"
              className="mt-2 w-20 h-20 rounded-full object-cover"
            />
          )}
        </div>
        <div>
          <label htmlFor="coverImage" className="block mb-2">
            Cover Image (Optional)
          </label>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'coverImage')}
            className="input w-full"
          />
          {previewCoverImage && (
            <img
              src={previewCoverImage}
              alt="Cover image preview"
              className="mt-2 w-full h-32 object-cover rounded-md"
            />
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-accent hover:underline">
          Login
        </Link>
      </p>
    </div>
  )
}

export default Register 