export type CompletionTaskId = 'daily-check-in' | 'main-article-read'

export const completionTaskDetails: Record<CompletionTaskId, { label: string, xp: string }> = {
  'daily-check-in': { label: 'Daily check-in', xp: '1 XP' },
  'main-article-read': { label: 'Read today’s main article', xp: '2 XP' },
}
