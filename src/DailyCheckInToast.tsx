import { useEffect, useState } from 'react'

export default function DailyCheckInToast() {
  const [visible, setVisible] = useState(false)

  const openReadingProfile = () => {
    setVisible(false)
    window.dispatchEvent(new Event('open-reading-profile'))
    window.setTimeout(() => window.dispatchEvent(new Event('complete-daily-check-in')), 220)
  }

  useEffect(() => {
    setVisible(true)
    const dismissTimer = window.setTimeout(() => setVisible(false), 4500)
    return () => window.clearTimeout(dismissTimer)
  }, [])

  useEffect(() => {
    const dismissForProfile = () => setVisible(false)
    window.addEventListener('reading-profile-opened', dismissForProfile)
    return () => window.removeEventListener('reading-profile-opened', dismissForProfile)
  }, [])

  if (!visible) return null

  return <div className="pointer-events-none fixed inset-x-0 bottom-8 z-[110] flex justify-center" role="status" aria-live="polite">
    <div className="check-in-toast pointer-events-auto w-max max-w-[calc(100vw-32px)] cursor-pointer border border-[#dedede] bg-white p-0.5 text-[#111] shadow-[0_6px_18px_rgba(0,0,0,.14)]" role="button" tabIndex={0} aria-label="Open reading profile" onClick={openReadingProfile} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openReadingProfile() } }}>
      <div className="flex items-center gap-2 border border-[#eeeeee] px-2.5 py-1.5">
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#147cc0] text-[12px] text-white" aria-hidden="true">✓</span>
        <p className="m-0 text-[12px] leading-tight"><span className="font-medium">Daily check-in done</span><span className="text-[#777]"> · Earned </span><span className="font-semibold text-[#147cc0]">1 XP</span></p>
        <button className="ml-0.5 border-0 bg-transparent p-0 text-[15px] leading-none text-[#777] hover:text-[#111]" aria-label="Dismiss daily check-in notification" onClick={(event) => { event.stopPropagation(); setVisible(false) }}>×</button>
      </div>
    </div>
  </div>
}
