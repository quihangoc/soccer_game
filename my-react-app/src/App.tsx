import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [question, setQuestion] = useState<{ id: number; title: string; answerText: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/question/1')
        if (!response.ok) {
          throw new Error('Failed to fetch question')
        }
        const data = await response.json()
        setQuestion(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchQuestion()
  }, [])

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {question && (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h1>{question.title}</h1>
          <p>{question.answerText}</p>
        </div>
      )}
    </div>
  )
}

export default App

