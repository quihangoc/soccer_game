import { useState, useEffect } from 'react'
import './App.css'
import { Header } from './components/Header'
import { QuestionCard } from './components/QuestionCard'
import { NotesGrid } from './components/NotesGrid'
import { NavigationBar } from './components/NavigationBar'
import { LoadingSpinner } from './components/LoadingSpinner'
import { ErrorMessage } from './components/ErrorMessage'

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
    <div className="app-container">
      <Header />
      <main className="app-main">
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage error={error} />}
        {question && (
          <div className="content-box">
            <QuestionCard title={question.title} />
            <NotesGrid notes={question.notes} noteIndex={noteIndex} />
            <NavigationBar 
              currentIndex={noteIndex} 
              totalItems={question.notes.length}
              onNextClick={handleNextNote}
            />
          </div>
        )}
      </main>
    </div>
  )
}

export default App

