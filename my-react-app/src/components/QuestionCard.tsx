import type { KeyboardEvent } from 'react'

interface QuestionCardProps {
  readonly title: string
  readonly description?: string
  readonly icon?: string
  readonly accent?: 'sun' | 'berry'
  readonly onClick?: () => void
}

export function QuestionCard({ title, description, icon, accent, onClick }: QuestionCardProps) {
  const clickProps = onClick
    ? {
        onClick,
        role: 'button' as const,
        tabIndex: 0,
        onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onClick()
          }
        },
      }
    : undefined

  const classes = ['question-card', onClick ? 'clickable' : '', accent ? `accent-${accent}` : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...clickProps}>
      <div className="card-content">
        {icon && <span className="game-icon" aria-hidden="true">{icon}</span>}
        <p className="question-text">{title}</p>
        {description && <p className="question-description">{description}</p>}
        {onClick && <span className="game-play">Spielen</span>}
      </div>
    </div>
  )
}
