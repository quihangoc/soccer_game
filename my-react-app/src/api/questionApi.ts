export interface QuestionData {
  id: number
  title: string
  answerText: string
  notes: string[]
}

const API_BASE = 'http://localhost:8080/api/question'

export async function fetchQuestion(questionId: number): Promise<QuestionData> {
  const response = await fetch(`${API_BASE}/${questionId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch question')
  }
  return response.json()
}

export async function checkAnswer(questionId: number, answer: string): Promise<boolean> {
  const response = await fetch(`${API_BASE}/${questionId}/checkAnswer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: answer.trim(),
  })

  if (!response.ok) {
    throw new Error('Failed to check answer')
  }

  return response.json()
}
