import { useEffect, useRef, useState } from 'react'
import { completionTaskDetails } from './completionTasks'
import type { CompletionTaskId } from './completionTasks'

const articlePath = '/news/the-lede/is-rfk-jr-winning-or-losing'

export default function TaskCompletionToast() {
  const [taskId, setTaskId] = useState<CompletionTaskId | null>(null)
  const dismissTimer = useRef<number | undefined>(undefined)
  const completionTimer = useRef<number | undefined>(undefined)

  const completeTask = (taskToComplete: CompletionTaskId) => window.dispatchEvent(new CustomEvent<CompletionTaskId>('complete-reading-task', { detail: taskToComplete }))

  const showTask = (nextTaskId: CompletionTaskId) => {
    setTaskId(nextTaskId)
    window.clearTimeout(dismissTimer.current)
    window.clearTimeout(completionTimer.current)
    dismissTimer.current = window.setTimeout(() => setTaskId(null), 4500)
    completionTimer.current = window.setTimeout(() => completeTask(nextTaskId), 700)
  }

  useEffect(() => {
    if (window.location.pathname !== articlePath) showTask('daily-check-in')
    const showRequestedTask = (event: Event) => showTask((event as CustomEvent<CompletionTaskId>).detail)
    window.addEventListener('show-task-completion-toast', showRequestedTask)
    return () => {
      window.removeEventListener('show-task-completion-toast', showRequestedTask)
      window.clearTimeout(dismissTimer.current)
      window.clearTimeout(completionTimer.current)
    }
  }, [])

  useEffect(() => {
    const dismissForProfile = () => setTaskId(null)
    window.addEventListener('reading-profile-opened', dismissForProfile)
    return () => window.removeEventListener('reading-profile-opened', dismissForProfile)
  }, [])

  if (!taskId) return null
  const task = completionTaskDetails[taskId]

  const openReadingProfile = () => {
    setTaskId(null)
    window.clearTimeout(completionTimer.current)
    window.dispatchEvent(new Event('open-reading-profile'))
    window.setTimeout(() => completeTask(taskId), 220)
  }

  return <div className="pointer-events-none fixed inset-x-0 bottom-8 z-[110] flex justify-center" role="status" aria-live="polite">
    <div className="check-in-toast pointer-events-auto w-max max-w-[calc(100vw-32px)] cursor-pointer border border-[#dedede] bg-white p-0.5 text-[#111] shadow-[0_6px_18px_rgba(0,0,0,.14)]" role="button" tabIndex={0} aria-label="Open reading profile" onClick={openReadingProfile} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openReadingProfile() } }}>
      <div className="flex items-center gap-2 border border-[#eeeeee] px-2.5 py-1.5">
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#147cc0] text-[12px] text-white" aria-hidden="true">✓</span>
        <p className="m-0 leading-tight"><span className="text-[14px] font-normal">{task.label}</span><span className="text-[12px] text-[#777]"> · Earned </span><span className="text-[12px] font-semibold text-[#147cc0]">{task.xp}</span></p>
        <button className="ml-0.5 border-0 bg-transparent p-0 text-[15px] leading-none text-[#777] hover:text-[#111]" aria-label="Dismiss task completion notification" onClick={(event) => { event.stopPropagation(); setTaskId(null) }}>×</button>
      </div>
    </div>
  </div>
}
