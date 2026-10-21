import { useState, useEffect } from 'react'
import { fetchDrinkingCards } from '../api/gameApi'
import { LoadingSpinner } from './LoadingSpinner'
import { ErrorMessage } from './ErrorMessage'

interface DrinkingGameFormProps {
  readonly onBack: () => void
}

// Fisher-Yates: mischt eine Kopie, damit jede Karte pro Runde genau einmal vorkommt
function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function DrinkingGameForm({ onBack }: DrinkingGameFormProps) {
  const [allCards, setAllCards] = useState<string[]>([])
  const [deck, setDeck] = useState<string[]>([])
  const [cardIndex, setCardIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startRound = (cards: string[]) => {
    setDeck(shuffle(cards))
    setCardIndex(0)
  }

  useEffect(() => {
    const loadGame = async () => {
      setLoading(true)
      setError(null)
      try {
        const cards = (await fetchDrinkingCards()).map((card) => card.text)
        setAllCards(cards)
        startRound(cards)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten')
      } finally {
        setLoading(false)
      }
    }
    loadGame()
  }, [])

  const handleNextCard = () => {
    if (cardIndex < deck.length - 1) {
      setCardIndex(cardIndex + 1)
    }
  }

  const handleRestart = () => {
    startRound(allCards)
  }

  const isLastCard = cardIndex >= deck.length - 1
  const currentCard = deck[cardIndex]

  return (
    <div className="content-box theme-berry">
      <button className="back-button" onClick={onBack}>
        ← Zur Spielauswahl
      </button>
      <button
        className="next-question-button"
        onClick={handleRestart}
        disabled={loading || allCards.length === 0}
      >
        Spiel neustarten
      </button>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage error={error} />}

      {!loading && !error && deck.length === 0 && allCards.length === 0 && (
        <p className="drinking-empty">Keine Trinkspiel-Karten vorhanden.</p>
      )}

      {currentCard !== undefined && (
        <>
          <div className="drinking-card" key={cardIndex}>
            <span className="card-corner top" aria-hidden="true">{cardIndex + 1}</span>
            <p className="drinking-card-text">{currentCard}</p>
            <span className="card-corner bottom" aria-hidden="true">{cardIndex + 1}</span>
          </div>

          {isLastCard && (
            <p className="drinking-round-over">
              Das war die letzte Karte. Mischt neu für die nächste Runde.
            </p>
          )}

          <div className="navigation-footer">
            <div className="progress-section">
              <span className="progress-counter">{cardIndex + 1} / {deck.length}</span>
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${((cardIndex + 1) / deck.length) * 100}%` }}
                ></div>
              </div>
            </div>
            {isLastCard ? (
              <button onClick={handleRestart} className="next-button">
                Neu mischen
              </button>
            ) : (
              <button onClick={handleNextCard} className="next-button">
                Nächste Karte ziehen
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
