import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

type SiteHeaderProps = {
  headerClassName: string
  logoClassName: string
  dark?: boolean
  logoInverted?: boolean
  leftContent?: ReactNode
  onHome?: () => void
  onGames?: () => void
  homeHref?: string
  horizontalPaddingClassName?: string
}

function SearchIcon() {
  return <svg className="h-[19px] w-[19px] fill-none stroke-current stroke-[1.6]" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.7" cy="10.7" r="5.8" /><path d="m15.2 15.2 4.5 4.5" /></svg>
}

function StreakButton({ dark, onClick }: { dark: boolean, onClick: () => void }) {
  return <button className={`inline-flex h-[30px] items-center gap-1 rounded-full border-0 px-2 text-[16px] font-semibold leading-none ${dark ? 'bg-[#292929] text-white hover:bg-[#383838]' : 'bg-[#f3f3f3] text-[#111] hover:bg-[#e8e8e8]'}`} aria-label="View reading profile and 32 day streak" onClick={onClick}><span className="text-[18px] leading-none" aria-hidden="true">🔥</span><span>32</span></button>
}

const rewards = [
  { title: 'Start a game', description: 'Start a New Yorker game', xp: '+1 XP', status: 'Available', icon: '○' },
  { title: 'Daily checkin', description: 'Check in today', xp: '+1 XP', status: 'Available', icon: '○' },
  { title: 'Read today’s main article', description: 'Read today’s featured story', xp: '+2 XP', status: 'Available', icon: '○', articleLink: true },
  { title: 'Complete a game', description: 'Finish a New Yorker game', xp: '+25 XP', status: 'Available', icon: '○', gameLink: true },
  { title: 'Reach a 30-day streak', description: 'Build a 30-day reading streak', xp: '+250 XP', status: 'Done', icon: '✓' },
  { title: 'Reach a 14-day streak', description: 'Build a 14-day reading streak', xp: '+150 XP', status: 'Done', icon: '✓' },
  { title: 'Reach a 7-day streak', description: 'Build a 7-day reading streak', xp: '+100 XP', status: 'Done', icon: '✓' },
  { title: 'Reach a 3-day streak', description: 'Build a 3-day reading streak', xp: '+50 XP', status: 'Done', icon: '✓' },
]

function ExternalLinkIcon() {
  return <svg className="h-[12px] w-[12px] fill-none stroke-current stroke-[1.5]" viewBox="0 0 16 16" aria-hidden="true"><path d="M8.5 2.5h5v5M13.25 2.75 7 9M6.5 4H3v9.5h9.5V10" /></svg>
}

function ReadingProfileModal({ onClose, onGames }: { onClose: () => void, onGames?: () => void }) {
  return <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/35 px-6 py-6 backdrop-blur-sm" role="presentation">
    <section className="relative h-[640px] max-h-[calc(100vh-48px)] w-[480px] overflow-hidden border border-[#dedede] bg-white p-2 text-[#111] shadow-[0_10px_26px_rgba(0,0,0,.2)]" role="dialog" aria-modal="true" aria-labelledby="profile-title" onMouseDown={(event) => event.stopPropagation()}>
      <div className="flex h-full min-h-0 flex-col border border-[#eeeeee] px-9 pb-7 pt-8">
        <button className="absolute right-[15px] top-[13px] border-0 bg-transparent p-0 text-[24px] font-light leading-none text-[#222] hover:opacity-60" aria-label="Close reading profile" onClick={onClose}>×</button>
        <img className="mx-auto block h-[42px] w-[168px] object-contain" src="https://www.newyorker.com/verso/static/thenewyorker-us/assets/logo.svg" alt="The New Yorker" />
        <p className="mb-1 mt-[22px] text-[9px] font-extrabold uppercase tracking-[.15em] text-[#d93636]">Your Reading Profile</p>
        <div className="grid grid-cols-[1fr_100px] items-end">
          <div><h2 className="font-tny-irvin text-[40px] font-normal uppercase leading-[.9]" id="profile-title">City Sage</h2><div className="mt-1 flex items-end gap-2"><span className="font-tny-caslon text-[58px] leading-[.8] text-[#147cc0]">550</span><span className="mb-[5px] text-[10px] font-bold tracking-[.12em] text-[#777]">XP</span></div></div>
          <div className="pb-[3px] text-center"><div className="text-[52px] leading-[.8]" aria-hidden="true">🔥</div><div className="mt-[2px] font-tny-caslon text-[27px] leading-none">32</div><div className="mt-[3px] text-[10px] font-semibold tracking-[.14em] text-[#777]">STREAK</div></div>
        </div>
        <div className="mt-[34px] border-y border-[#ededed] py-4"><h3 className="font-tny-irvin text-[20px] font-normal uppercase leading-none">Ways to Earn XP</h3></div>
        <div className="hide-scrollbar min-h-0 flex-1 overflow-y-auto">{rewards.map((reward, index) => <div className={`grid grid-cols-[1fr_auto] items-center py-[14px] ${index < rewards.length - 1 ? 'border-b border-[#ededed]' : ''}`} key={reward.title}>
          <div>{reward.gameLink || reward.articleLink ? <a className="inline-flex items-center gap-1 !text-[14px] !font-normal leading-none text-[#111] hover:opacity-70" href={reward.gameLink ? '/crossword-puzzles-and-games' : '/news/the-lede/is-rfk-jr-winning-or-losing'} onClick={reward.gameLink && onGames ? (event) => { event.preventDefault(); onGames(); onClose() } : undefined}>{reward.title}<span className="text-[#d93636]"><ExternalLinkIcon /></span></a> : <span className={`inline-flex items-center gap-1 text-[14px] font-normal leading-none ${reward.status === 'Done' ? 'text-[#9a9a9a]' : 'text-[#111]'}`}>{reward.title}</span>}<p className={`mt-[6px] text-[11px] leading-none ${reward.status === 'Done' ? 'text-[#b0b0b0]' : 'text-[#8a8a8a]'}`}>{reward.description}</p></div>
          <div className="text-right"><div className={`text-[11px] font-extrabold leading-none ${reward.status === 'Done' ? 'text-[#9a9a9a]' : 'text-[#147cc0]'}`}>{reward.xp}</div><div className={`mt-1 text-[11px] leading-none ${reward.status === 'Done' ? 'font-semibold text-[#9a9a9a]' : 'font-normal text-[#777]'}`}><span className="mr-1">{reward.icon}</span>{reward.status}</div></div>
        </div>)}</div>
      </div>
    </section>
  </div>
}

export default function SiteHeader({ headerClassName, logoClassName, dark = false, logoInverted = false, leftContent, onHome, onGames, homeHref = '/', horizontalPaddingClassName = 'px-[42px]' }: SiteHeaderProps) {
  const logoAsset = logoInverted ? 'logo-inverted.svg' : 'logo.svg'
  const [profileOpen, setProfileOpen] = useState(false)

  useEffect(() => {
    if (!profileOpen) return
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setProfileOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [profileOpen])

  return (
    <header className={headerClassName}>
      <div className={`grid h-[69px] grid-cols-[1fr_auto_1fr] items-center ${horizontalPaddingClassName}`}>
        <div className="min-w-px">{leftContent}</div>
        <a className="col-start-2 block" href={homeHref} onClick={onHome ? (event) => { event.preventDefault(); onHome() } : undefined}><img className={logoClassName} src={`https://www.newyorker.com/verso/static/thenewyorker-us/assets/${logoAsset}`} alt="The New Yorker" /></a>
        <div className="col-start-3 flex items-center justify-self-end gap-[22px] text-[12px] tracking-[-.01em]">
          <StreakButton dark={dark} onClick={() => setProfileOpen(true)} />
          <button className="border-0 bg-transparent p-0 text-inherit hover:opacity-70">Newsletter</button>
          <button className="inline-flex items-center gap-[7px] border-0 bg-transparent p-0 text-inherit hover:opacity-70">My Account<svg className="h-[6px] w-[9px] fill-current" viewBox="0 0 9 6" aria-hidden="true"><path d="M0 0h9L4.5 6z" /></svg></button>
          <a className="w-[123px] bg-[#147cc0] px-3 py-2.5 text-center !text-white" href="#gift">Give a gift</a>
          <button className="h-[30px] w-[30px] border-0 bg-transparent p-[5px] text-inherit" aria-label="Search"><SearchIcon /></button>
        </div>
      </div>
      {profileOpen && <ReadingProfileModal onClose={() => setProfileOpen(false)} onGames={onGames} />}
    </header>
  )
}
