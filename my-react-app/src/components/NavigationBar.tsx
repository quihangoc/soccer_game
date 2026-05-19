interface NavigationBarProps {
  currentIndex: number
  totalItems: number
  onNextClick: () => void
}

export function NavigationBar({ currentIndex, totalItems, onNextClick }: NavigationBarProps) {
  const isLastItem = currentIndex === totalItems - 1

  return (
    <div className="navigation-footer">
      <div className="progress-section">
        <span className="progress-counter">{currentIndex + 1} / {totalItems}</span>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill"
            style={{ width: `${((currentIndex + 1) / totalItems) * 100}%` }}
          ></div>
        </div>
      </div>
      <button
        onClick={onNextClick}
        disabled={isLastItem}
        className={`next-button ${isLastItem ? 'disabled' : ''}`}
      >
        {isLastItem ? '✓ Alle Tipps angezeigt' : 'Nächsten Tipp →'}
      </button>
    </div>
  )
}
