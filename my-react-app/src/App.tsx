import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { QuestionCard } from './components/QuestionCard'
import { NoteQuizForm } from './components/NoteQuizForm'

enum Page {
  HOME = 'home',
  NOTE_QUIZ = 'notequiz',
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME)

  const handleStartQuiz = () => {
    setCurrentPage(Page.NOTE_QUIZ)
  }

  const handleBackToHome = () => {
    setCurrentPage(Page.HOME)
  }

  return (
    <div className="app-container">
      <Header />
      <main className="app-main">
        {currentPage === Page.HOME && (
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

        {currentPage === Page.NOTE_QUIZ && <NoteQuizForm onBack={handleBackToHome} />}
      </main>
    </div>
  )
}

export default App

