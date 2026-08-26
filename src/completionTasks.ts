export type CompletionTaskId = 'daily-check-in' | 'main-article-read' | 'start-game' | 'complete-game'

export const completionTaskDetails: Record<CompletionTaskId, { label: string, xp: string, xpAmount: number }> = {
  'daily-check-in': { label: 'Daily check-in', xp: '1 XP', xpAmount: 1 },
  'main-article-read': { label: 'Read today’s main article', xp: '2 XP', xpAmount: 2 },
  'start-game': { label: 'Start a game', xp: '1 XP', xpAmount: 1 },
  'complete-game': { label: 'Complete a game', xp: '25 XP', xpAmount: 25 },
}
