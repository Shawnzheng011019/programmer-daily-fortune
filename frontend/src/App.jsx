import { useState, useEffect } from 'react'
import FortuneForm from './components/FortuneForm'
import FortuneDisplay from './components/FortuneDisplay'
import Header from './components/Header'
import './App.css'

function App() {
  const [fortune, setFortune] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFortuneRequest = async (userData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:3001/api/fortune', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        throw new Error('Failed to get fortune')
      }

      const fortuneData = await response.json()
      setFortune(fortuneData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const resetFortune = () => {
    setFortune(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {!fortune ? (
          <FortuneForm
            onSubmit={handleFortuneRequest}
            loading={loading}
            error={error}
          />
        ) : (
          <FortuneDisplay
            fortune={fortune}
            onReset={resetFortune}
          />
        )}
      </main>

      <footer className="text-center py-8 text-gray-400 text-sm">
        <p>© 2024 Programmer Fortune. For entertainment purposes only.</p>
        <p className="mt-2">May your code compile and your bugs be few! 🐛✨</p>
      </footer>
    </div>
  )
}

export default App
