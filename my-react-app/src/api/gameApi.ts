export interface QuizQuestion {
  id: number
  title: string
  hints: string[]
}

export interface AnswerResult {
  correct: boolean
  correctAnswer: string
}

export interface DrinkingCard {
  id: number
  text: string
}

const API_BASE = 'http://localhost:8080/api'

async function request<T>(path: string, errorMessage: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, init)
  if (!response.ok) {
    throw new Error(errorMessage)
  }
  return response.json()
}

export function fetchQuizQuestion(questionId: number): Promise<QuizQuestion> {
  return request(`/quiz/questions/${questionId}`, 'Failed to fetch question')
}

export function fetchRandomQuizQuestion(): Promise<QuizQuestion> {
  return request('/quiz/questions/random', 'Failed to fetch random question')
}

export function checkAnswer(questionId: number, answer: string): Promise<AnswerResult> {
  return request(`/quiz/questions/${questionId}/answer`, 'Failed to check answer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answer: answer.trim() }),
  })
}

export function fetchDrinkingCards(): Promise<DrinkingCard[]> {
  return request('/drinking-game/cards', 'Failed to fetch drinking game')
}
