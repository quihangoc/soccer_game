import type { KeyboardEvent } from 'react'

interface QuestionCardProps {
  readonly title: string
  readonly description?: string
  readonly onClick?: () => void
}

export function QuestionCard({ title, description, onClick }: QuestionCardProps) {
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

  return (
    <div className={`question-card ${onClick ? 'clickable' : ''}`} {...clickProps}>
      <div className="card-content">
        <p className="question-text">{title}</p>
        {description && <p className="question-description">{description}</p>}
      </div>
    </div>
  )
}
