import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [question, setQuestion] = useState<{ id: number; title: string; answerText: string; notes: string[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [noteIndex, setNoteIndex] = useState(0)

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/question/1')
        if (!response.ok) {
          throw new Error('Failed to fetch question')
        }
        const data = await response.json()
        setQuestion(data)
        setNoteIndex(0)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchQuestion()
  }, [])

  const handleNextNote = () => {
    if (question && noteIndex < question.notes.length - 1) {
      setNoteIndex(noteIndex + 1)
    }
  }

  return (
    <div style={{ padding: '0', maxWidth: '100%', margin: '0 auto', minHeight: '100vh', width: '100%', boxSizing: 'border-box' }}>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {question && (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', width: '100%', boxSizing: 'border-box' }}>
          <h1>{question.title}</h1>
          <div style={{ 
            display: 'flex', 
            gap: '15px',
            paddingBottom: '10px',
            marginBottom: '20px'
          }}>
            {question.notes.map((note, index) => (
              index <= noteIndex && (
                <div
                  key={index}
                  style={{
                    flex: '0 0 calc(33.333% - 10px)',
                    minHeight: '200px',
                    padding: '20px',
                    border: noteIndex === index ? '2px solid #007bff' : '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: noteIndex === index ? '#e7f3ff' : '#f9f9f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    lineHeight: '1.6',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    whiteSpace: 'normal'
                  }}
                >
                  {note}
                </div>
              )
            ))}
          </div>
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px' }}>
            <p style={{ fontSize: '0.9em', color: '#666', margin: 0 }}>
              {noteIndex + 1} / {question.notes.length}
            </p>
            <button
              onClick={handleNextNote}
              disabled={noteIndex === question.notes.length - 1}
              style={{
                padding: '10px 20px',
                fontSize: '1rem',
                backgroundColor: noteIndex === question.notes.length - 1 ? '#ccc' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: noteIndex === question.notes.length - 1 ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Nächsten Hinweis einblenden
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

