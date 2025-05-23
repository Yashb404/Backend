import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../store/slices/authSlice'
import axios from 'axios'

const Profile = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    avatar: null,
  })
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' })
      return
    }

    const formDataToSend = new FormData()
    formDataToSend.append('username', formData.username)
    formDataToSend.append('email', formData.email)
    if (formData.currentPassword) {
      formDataToSend.append('currentPassword', formData.currentPassword)
    }
    if (formData.newPassword) {
      formDataToSend.append('newPassword', formData.newPassword)
    }
    if (formData.avatar) {
      formDataToSend.append('avatar', formData.avatar)
    }

    try {
      const response = await axios.patch('/api/v1/users/update-account', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      dispatch(updateUser(response.data))
      setMessage({ type: 'success', text: 'Profile updated successfully' })
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }))
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to update profile',
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

      {message.text && (
        <div
          className={`p-4 rounded-md mb-6 ${
            message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-6">
          <img
            src={user?.avatar || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <label htmlFor="avatar" className="block mb-2">
              Change Avatar
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleChange}
              className="input"
              accept="image/*"
            />
          </div>
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

        <div className="border-t border-gray-700 pt-6">
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block mb-2">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="input w-full"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="input w-full"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input w-full"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Update Profile
        </button>
      </form>
    </div>
  )
}

export default Profile 