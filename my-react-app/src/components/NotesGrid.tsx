interface NotesGridProps {
  notes: string[]
  noteIndex: number
}

export function NotesGrid({ notes, noteIndex }: NotesGridProps) {
  return (
    <div className="notes-grid">
      {notes.map((note, index) => (
        index <= noteIndex && (
          <div
            key={index}
            className={`note-card ${noteIndex === index ? 'active' : ''}`}
          >
            <div className="note-badge">Tipp {index + 1}</div>
            <div className="note-content">{note}</div>
          </div>
        )
      ))}
    </div>
  )
}
