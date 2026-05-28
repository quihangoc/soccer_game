interface QuestionCardProps {
  title: string
}

export function QuestionCard({ title }: QuestionCardProps) {
  return (
    <div className="question-card">
      <div className="card-content">
        <p className="question-text">{title}</p>
      </div>
    </div>
  )
}
