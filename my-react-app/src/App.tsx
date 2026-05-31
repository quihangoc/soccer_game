import { useState, useEffect } from 'react'
import './App.css'
import { Header } from './components/Header'
import { QuestionCard } from './components/QuestionCard'
import { NotesGrid } from './components/NotesGrid'
import { NavigationBar } from './components/NavigationBar'
import { LoadingSpinner } from './components/LoadingSpinner'
import { ErrorMessage } from './components/ErrorMessage'
import { fetchQuestion, checkAnswer } from './api/questionApi'
import type { QuestionData } from './api/questionApi'

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'quiz'>('home')
  const [question, setQuestion] = useState<QuestionData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [noteIndex, setNoteIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [answerStatus, setAnswerStatus] = useState<'correct' | 'wrong' | null>(null)
  const [answerSubmitted, setAnswerSubmitted] = useState(false)
  const [answerLoading, setAnswerLoading] = useState(false)
  const [answerError, setAnswerError] = useState<string | null>(null)

  useEffect(() => {
    if (currentPage !== 'quiz') {
      return
    }

    const loadQuestion = async () => {
      setLoading(true)
      setError(null)
      setNoteIndex(0)
      setAnswer('')
      setAnswerStatus(null)
      setAnswerSubmitted(false)
      setAnswerError(null)

      try {
        const data = await fetchQuestion(1)
        setQuestion(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    loadQuestion()
  }, [currentPage])

  const handleNextNote = () => {
    if (question && noteIndex < question.notes.length - 1) {
      setNoteIndex(noteIndex + 1)
    }
  }

  const handleSubmitAnswer = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!question) return

    const trimmedAnswer = answer.trim()
    if (!trimmedAnswer) {
      setAnswerError('Bitte gib eine Antwort ein.')
      return
    }

    setAnswerLoading(true)
    setAnswerError(null)
    setAnswerSubmitted(false)
    setAnswerStatus(null)

    try {
      const isCorrect = await checkAnswer(question.id, trimmedAnswer)
      setAnswerStatus(isCorrect ? 'correct' : 'wrong')
      setAnswerSubmitted(true)
    } catch (err) {
      setAnswerError(err instanceof Error ? err.message : 'An error occurred')
      setAnswerSubmitted(false)
      setAnswerStatus(null)
    } finally {
      setAnswerLoading(false)
    }
  }

  const handleStartQuiz = () => {
    setCurrentPage('quiz')
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
  }

  return (
    <div className="app-container">
      <Header />
      <main className="app-main">
        {currentPage === 'home' && (
          <div className="content-box start-page">
            <h2>Spielauswahl</h2>
            <p>Wähle ein Spiel aus, um zu starten.</p>
            <QuestionCard
              title="Hinweisquiz"
              description="Tipps nacheinander anzeigen und die richtige Antwort erraten."
              onClick={handleStartQuiz}
            />
          </div>
        )}

        {currentPage === 'quiz' && (
          <>
            {loading && <LoadingSpinner />}
            {error && <ErrorMessage error={error} />}
            {question && (
              <div className="content-box">
                <button className="back-button" onClick={handleBackToHome}>
                  ← Zurück zur Startseite
                </button>
                <QuestionCard title={question.title} />
                <NotesGrid notes={question.notes} noteIndex={noteIndex} />

                <div className={`answer-form ${answerSubmitted ? answerStatus : ''}`}>
                  <form className="answer-input-row" onSubmit={handleSubmitAnswer}>
                    <input
                      className="answer-input"
                      type="text"
                      value={answer}
                      onChange={(event) => {
                        setAnswer(event.target.value)
                        setAnswerError(null)
                        setAnswerSubmitted(false)
                        setAnswerStatus(null)
                      }}
                      placeholder="Deine Antwort hier eingeben"
                      aria-label="Antwort eingeben"
                    />
                    <button
                      className="answer-submit"
                      type="submit"
                      disabled={answerLoading || !answer.trim()}
                    >
                      {answerLoading ? 'Prüfe...' : 'Antwort prüfen'}
                    </button>
                  </form>

                  {answerSubmitted && (
                    <div className="answer-result">
                      <p className={`result-text ${answerStatus === 'correct' ? 'success' : 'error'}`}>
                        {answerStatus === 'correct'
                          ? 'Richtig!'
                          : 'Leider falsch.'}
                      </p>
                      <p className="correct-answer">
                        Richtige Antwort: <strong>{question.answerText}</strong>
                      </p>
                    </div>
                  )}

                  {answerError && <p className="answer-form-error">{answerError}</p>}
                </div>

                <NavigationBar
                  currentIndex={noteIndex}
                  totalItems={question.notes.length}
                  onNextClick={handleNextNote}
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App

