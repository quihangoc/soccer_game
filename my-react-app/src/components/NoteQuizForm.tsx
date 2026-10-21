import { useState, useEffect } from 'react'
import { fetchRandomQuizQuestion, checkAnswer } from '../api/gameApi'
import type { AnswerResult, QuizQuestion } from '../api/gameApi'
import { QuestionCard } from './QuestionCard'
import { NotesGrid } from './NotesGrid'
import { NavigationBar } from './NavigationBar'
import { LoadingSpinner } from './LoadingSpinner'
import { ErrorMessage } from './ErrorMessage'

interface NoteQuizFormProps {
  onBack: () => void
}

export function NoteQuizForm({ onBack }: NoteQuizFormProps) {
  const [question, setQuestion] = useState<QuizQuestion | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [noteIndex, setNoteIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [answerResult, setAnswerResult] = useState<AnswerResult | null>(null)
  const [answerLoading, setAnswerLoading] = useState(false)
  const [answerError, setAnswerError] = useState<string | null>(null)

  const loadQuestion = async () => {
    setLoading(true)
    setError(null)
    setNoteIndex(0)
    setAnswer('')
    setAnswerResult(null)
    setAnswerError(null)

    try {
      const data = await fetchRandomQuizQuestion()
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
    if (question && noteIndex < question.hints.length - 1) {
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
    setAnswerResult(null)

    try {
      setAnswerResult(await checkAnswer(question.id, trimmedAnswer))
    } catch (err) {
      setAnswerError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten')
    } finally {
      setAnswerLoading(false)
    }
  }

  return (
    <div className="content-box theme-sun">
      <button className="back-button" onClick={onBack}>
        ← Zur Spielauswahl
      </button>
      <button className="next-question-button" onClick={handleNextQuestion} disabled={loading}>
        Neue Frage
      </button>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage error={error} />}

      {question && (
        <>
          <QuestionCard title={question.title} />
          <NotesGrid notes={question.hints} noteIndex={noteIndex} />

          <div className={`answer-form ${answerResult ? (answerResult.correct ? 'correct' : 'wrong') : ''}`}>
            <form className="answer-input-row" onSubmit={handleSubmitAnswer}>
              <input
                className="answer-input"
                type="text"
                value={answer}
                onChange={(event) => {
                  setAnswer(event.target.value)
                  setAnswerError(null)
                  setAnswerResult(null)
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

            {answerResult && (
              <div className="answer-result">
                <p className={`result-text ${answerResult.correct ? 'success' : 'error'}`}>
                  {answerResult.correct ? 'Richtig!' : 'Leider falsch.'}
                </p>
                <p className="correct-answer">
                  Richtige Antwort: <strong>{answerResult.correctAnswer}</strong>
                </p>
              </div>
            )}

            {answerError && <p className="answer-form-error">{answerError}</p>}
          </div>

          <NavigationBar
            currentIndex={noteIndex}
            totalItems={question.hints.length}
            onNextClick={handleNextNote}
          />
        </>
      )}
    </div>
  )
}
