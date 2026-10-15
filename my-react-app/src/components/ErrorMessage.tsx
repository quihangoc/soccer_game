interface ErrorMessageProps {
  error: string
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className="error-container">
      <div className="error-content">
                <p className="error-text">Das hat nicht geklappt: {error}. Läuft das Backend auf Port 8080?</p>
      </div>
    </div>
  )
}
