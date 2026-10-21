import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { QuestionCard } from './components/QuestionCard'
import { NoteQuizForm } from './components/NoteQuizForm'
import { DrinkingGameForm } from './components/DrinkingGameForm'

const Page = {
  HOME: 'home',
  NOTE_QUIZ: 'notequiz',
  DRINKING_GAME: 'drinkinggame',
} as const

type Page = (typeof Page)[keyof typeof Page]

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME)

  const handleStartQuiz = () => {
    setCurrentPage(Page.NOTE_QUIZ)
  }

  const handleStartDrinkingGame = () => {
    setCurrentPage(Page.DRINKING_GAME)
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
            <h2>Was spielen wir?</h2>
            <div className="game-shelf">
              <QuestionCard
                title="Hinweisquiz"
                icon="💡"
                accent="sun"
                description="Deckt Tipp für Tipp auf und erratet die gesuchte Person."
                onClick={handleStartQuiz}
              />
              <QuestionCard
                title="Trinkspiel"
                icon="🍻"
                accent="berry"
                description="Zieht reihum eine Karte. Jede Karte kommt pro Runde nur einmal."
                onClick={handleStartDrinkingGame}
              />
            </div>
          </div>
        )}

        {currentPage === Page.NOTE_QUIZ && <NoteQuizForm onBack={handleBackToHome} />}
        {currentPage === Page.DRINKING_GAME && <DrinkingGameForm onBack={handleBackToHome} />}
      </main>
    </div>
  )
}

export default App

