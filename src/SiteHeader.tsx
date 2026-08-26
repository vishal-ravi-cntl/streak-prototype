import type { ReactNode } from 'react'

type SiteHeaderProps = {
  headerClassName: string
  logoClassName: string
  dark?: boolean
  logoInverted?: boolean
  leftContent?: ReactNode
  onHome?: () => void
  homeHref?: string
  horizontalPaddingClassName?: string
}

function SearchIcon() {
  return <svg className="h-[19px] w-[19px] fill-none stroke-current stroke-[1.6]" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.7" cy="10.7" r="5.8" /><path d="m15.2 15.2 4.5 4.5" /></svg>
}

function StreakButton({ dark }: { dark: boolean }) {
  return <button className={`inline-flex h-[30px] items-center gap-1 rounded-full border-0 px-2 text-[16px] font-semibold leading-none ${dark ? 'bg-[#292929] text-white hover:bg-[#383838]' : 'bg-[#f3f3f3] text-[#111] hover:bg-[#e8e8e8]'}`} aria-label="32 day streak"><span className="text-[18px] leading-none" aria-hidden="true">🔥</span><span>32</span></button>
}

export default function SiteHeader({ headerClassName, logoClassName, dark = false, logoInverted = false, leftContent, onHome, homeHref = '/', horizontalPaddingClassName = 'px-[42px]' }: SiteHeaderProps) {
  const logoAsset = logoInverted ? 'logo-inverted.svg' : 'logo.svg'

  return (
    <header className={headerClassName}>
      <div className={`grid h-[69px] grid-cols-[1fr_auto_1fr] items-center ${horizontalPaddingClassName}`}>
        <div className="min-w-px">{leftContent}</div>
        <a className="col-start-2 block" href={homeHref} onClick={onHome ? (event) => { event.preventDefault(); onHome() } : undefined}><img className={logoClassName} src={`https://www.newyorker.com/verso/static/thenewyorker-us/assets/${logoAsset}`} alt="The New Yorker" /></a>
        <div className="col-start-3 flex items-center justify-self-end gap-[22px] text-[12px] tracking-[-.01em]">
          <StreakButton dark={dark} />
          <button className="border-0 bg-transparent p-0 text-inherit hover:opacity-70">Newsletter</button>
          <button className="inline-flex items-center gap-[7px] border-0 bg-transparent p-0 text-inherit hover:opacity-70">My Account<svg className="h-[6px] w-[9px] fill-current" viewBox="0 0 9 6" aria-hidden="true"><path d="M0 0h9L4.5 6z" /></svg></button>
          <a className="w-[123px] bg-[#147cc0] px-3 py-2.5 text-center !text-white" href="#gift">Give a gift</a>
          <button className="h-[30px] w-[30px] border-0 bg-transparent p-[5px] text-inherit" aria-label="Search"><SearchIcon /></button>
        </div>
      </div>
    </header>
  )
}
