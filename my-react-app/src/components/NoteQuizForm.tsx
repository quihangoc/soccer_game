import { useState, useEffect } from 'react'
import { fetchRandomQuestion, checkAnswer } from '../api/questionApi'
import type { QuestionData } from '../api/questionApi'
import { QuestionCard } from './QuestionCard'
import { NotesGrid } from './NotesGrid'
import { NavigationBar } from './NavigationBar'
import { LoadingSpinner } from './LoadingSpinner'
import { ErrorMessage } from './ErrorMessage'

interface NoteQuizFormProps {
  onBack: () => void
}

export function NoteQuizForm({ onBack }: NoteQuizFormProps) {
  const [question, setQuestion] = useState<QuestionData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [noteIndex, setNoteIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [answerStatus, setAnswerStatus] = useState<'correct' | 'wrong' | null>(null)
  const [answerSubmitted, setAnswerSubmitted] = useState(false)
  const [answerLoading, setAnswerLoading] = useState(false)
  const [answerError, setAnswerError] = useState<string | null>(null)

  const loadQuestion = async () => {
    setLoading(true)
    setError(null)
    setNoteIndex(0)
    setAnswer('')
    setAnswerStatus(null)
    setAnswerSubmitted(false)
    setAnswerError(null)

    try {
      const data = await fetchRandomQuestion()
      setQuestion(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadQuestion()
  }, [])

  const handleNextQuestion = () => {
    loadQuestion()
  }

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
      setAnswerError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten')
      setAnswerSubmitted(false)
      setAnswerStatus(null)
    } finally {
      setAnswerLoading(false)
    }
  }

  return (
    <div className="content-box">
      <button className="back-button" onClick={onBack}>
        ← Zurück zur Startseite
      </button>
      <button className="next-question-button" onClick={handleNextQuestion} disabled={loading}>
        Nächste Zufällige Frage
      </button>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage error={error} />}

      {question && (
        <>
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
                  {answerStatus === 'correct' ? 'Richtig!' : 'Leider falsch.'}
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
        </>
      )}
    </div>
  )
}
