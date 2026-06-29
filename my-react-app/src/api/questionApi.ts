export enum QuestionType {
  NOTE_QUIZ = 'NOTE_QUIZ',
}

export interface QuestionData {
  id: number
  questionType: QuestionType
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

export async function fetchRandomQuestion(): Promise<QuestionData> {
  const response = await fetch(`${API_BASE}/random`)
  if (!response.ok) {
    throw new Error('Failed to fetch random question')
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
