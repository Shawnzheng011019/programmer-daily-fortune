import React, { useState, useEffect } from 'react'

const FortuneForm = ({ onSubmit, loading, error }) => {
  const [birthDate, setBirthDate] = useState('')
  const [location, setLocation] = useState(null)
  const [locationError, setLocationError] = useState(null)
  const [gettingLocation, setGettingLocation] = useState(false)

  const generateUserHash = (birthDate, lat, lon) => {
    const data = `${birthDate}-${lat.toFixed(4)}-${lon.toFixed(4)}`
    let hash = 0
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return Math.abs(hash).toString(36)
  }

  const getLocation = () => {
    setGettingLocation(true)
    setLocationError(null)

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser')
      setGettingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        setGettingLocation(false)
      },
      (error) => {
        setLocationError('Unable to get your location. Please enable location services.')
        setGettingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!birthDate) {
      alert('Please enter your birth date')
      return
    }
    
    if (!location) {
      alert('Please allow location access to get weather data')
      return
    }

    const userHash = generateUserHash(birthDate, location.latitude, location.longitude)
    
    onSubmit({
      birthDate,
      latitude: location.latitude,
      longitude: location.longitude,
      userHash
    })
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="fortune-card rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">
          Enter Your Details
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-300 mb-2">
              Birth Date
            </label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Location (for weather data)
            </label>
            {!location ? (
              <button
                type="button"
                onClick={getLocation}
                disabled={gettingLocation}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center"
              >
                {gettingLocation ? (
                  <>
                    <div className="loading-spinner mr-2"></div>
                    Getting Location...
                  </>
                ) : (
                  <>
                    📍 Get My Location
                  </>
                )}
              </button>
            ) : (
              <div className="px-4 py-3 bg-green-800 border border-green-600 rounded-lg text-green-200">
                ✅ Location obtained ({location.latitude.toFixed(4)}, {location.longitude.toFixed(4)})
              </div>
            )}
            
            {locationError && (
              <p className="text-red-400 text-sm mt-2">{locationError}</p>
            )}
          </div>

          {error && (
            <div className="px-4 py-3 bg-red-800 border border-red-600 rounded-lg text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !location || !birthDate}
            className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 disabled:scale-100 glow-effect"
          >
            {loading ? (
              <>
                <div className="loading-spinner mr-2"></div>
                Consulting the Code Gods...
              </>
            ) : (
              '🔮 Get My Fortune'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>🌟 Your fortune is based on your zodiac sign and current weather</p>
          <p className="mt-1">⏰ One fortune per day to maintain cosmic balance</p>
        </div>
      </div>
    </div>
  )
}

export default FortuneForm
