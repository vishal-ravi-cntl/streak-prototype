import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode, RefObject } from 'react'
import '@lottiefiles/dotlottie-wc'
import { setWasmUrl } from '@lottiefiles/dotlottie-wc'
import streakFireNav from './assets/streak-fire-nav.lottie?url&no-inline'
import { completionTaskDetails } from './completionTasks'
import type { CompletionTaskId } from './completionTasks'

setWasmUrl('/dotlottie-player.wasm')

const popupFireSegment: [number, number] = [0, 25]

const readingTitleMilestones = [
  { xp: 1, title: 'New Yorker', character: 'https://media.newyorker.com/photos/6a038e1598355286cc52147c/4:3/w_768%2Cc_limit/Catalogues%252016-9-optimised.gif' },
  { xp: 300, title: 'Borough Regular', character: 'https://media.newyorker.com/photos/68dac5621bc6d6e78a9bce84/4:3/w_768%2Cc_limit/Shuffalo%252016.9.gif' },
  { xp: 500, title: 'TNY Insider', character: 'https://media.newyorker.com/photos/625f1f35553e9092ad75f41e/4:3/w_768%2Cc_limit/NewYorkerCrossword-Homepage.gif' },
  { xp: 1000, title: 'TNY Legend', character: 'https://media.newyorker.com/photos/65d4fc979889ece07e0e4659/4:3/w_768%2Cc_limit/mini_anim.gif' },
]

type SiteHeaderProps = {
  headerClassName: string
  logoClassName: string
  dark?: boolean
  logoInverted?: boolean
  leftContent?: ReactNode
  onHome?: () => void
  onGames?: () => void
  onArticle?: () => void
  homeHref?: string
  horizontalPaddingClassName?: string
}

function SearchIcon() {
  return <svg className="h-[19px] w-[19px] fill-none stroke-current stroke-[1.6]" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.7" cy="10.7" r="5.8" /><path d="m15.2 15.2 4.5 4.5" /></svg>
}

type DotLottieCore = {
  isLoaded?: boolean
  play: () => void
  stop: () => void
  setFrame: (frame: number) => void
  setSegment: (startFrame: number, endFrame: number) => void
  addEventListener: (event: 'load' | 'loadError', listener: () => void) => void
  removeEventListener: (event: 'load' | 'loadError', listener: () => void) => void
}

type DotLottieElement = HTMLElement & {
  dotLottie?: DotLottieCore
}

function StaticFlame({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true"><path fill="#ef6a25" d="M12.5 1.8c.5 4.2-2.7 5.7-2.7 8.7 0 1.5.9 2.6 2.3 3.2-.4-2.9 1.5-4.2 2.6-5.7 2.1 2.1 3.4 4.9 3.4 7.4a6.5 6.5 0 1 1-13 0c0-4.5 3.2-7.4 7.4-13.6Z" /><path fill="#ffd057" d="M12.1 12.7c1.7 1.8 2.2 3.2 2.2 4.3a2.3 2.3 0 0 1-4.6 0c0-1.3.8-2.6 2.4-4.3Z" /></svg>
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = (event: MediaQueryListEvent) => setReducedMotion(event.matches)
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  return reducedMotion
}

function StreakButton({ dark, onClick, streak }: { dark: boolean, onClick: () => void, streak: number }) {
  const reducedMotion = useReducedMotion()
  const playerRef = useRef<DotLottieElement>(null)
  const celebrationTimerRef = useRef<number | undefined>(undefined)
  const lastCelebratedStreakRef = useRef<number | undefined>(undefined)
  const previousStreakRef = useRef(streak - 1)
  const [fireReady, setFireReady] = useState(false)
  const [playerFailed, setPlayerFailed] = useState(false)
  const [isCelebrating, setIsCelebrating] = useState(false)
  const [rollingFrom, setRollingFrom] = useState(streak - 1)
  const buttonReady = fireReady

  useEffect(() => {
    if (reducedMotion || playerFailed) return
    const player = playerRef.current
    const dotLottie = player?.dotLottie
    if (!dotLottie) return

    const onLoad = () => {
      dotLottie.stop()
      dotLottie.setSegment(0, 25)
      dotLottie.setFrame(0)
      setFireReady(true)
    }
    const onLoadError = () => setPlayerFailed(true)

    dotLottie.addEventListener('load', onLoad)
    dotLottie.addEventListener('loadError', onLoadError)
    return () => {
      dotLottie.removeEventListener('load', onLoad)
      dotLottie.removeEventListener('loadError', onLoadError)
    }
  }, [playerFailed, reducedMotion])

  useEffect(() => {
    if (!buttonReady || reducedMotion || lastCelebratedStreakRef.current === streak) return
    window.clearTimeout(celebrationTimerRef.current)
    setIsCelebrating(false)

    const animationFrame = window.requestAnimationFrame(() => {
      lastCelebratedStreakRef.current = streak
      setRollingFrom(previousStreakRef.current)
      previousStreakRef.current = streak
      const player = playerRef.current?.dotLottie
      if (player && !playerFailed) {
        player.stop()
        player.setSegment(0, 25)
        player.setFrame(0)
        player.play()
      }
      setIsCelebrating(true)
      celebrationTimerRef.current = window.setTimeout(() => setIsCelebrating(false), 1300)
    })

    return () => window.cancelAnimationFrame(animationFrame)
  }, [buttonReady, playerFailed, reducedMotion, streak])

  useEffect(() => () => {
    window.clearTimeout(celebrationTimerRef.current)
  }, [])

  const sparkStyle = (x: string, y: string, delay: string): CSSProperties => ({ '--spark-x': x, '--spark-y': y, '--spark-delay': delay } as CSSProperties)
  const streakText = String(streak)
  const previousStreakText = String(rollingFrom)
  const streakPrefix = streakText.slice(0, -1)
  const previousOnesDigit = previousStreakText.slice(-1)
  const currentOnesDigit = streakText.slice(-1)

  return <button className={`streak-button ${buttonReady ? 'is-ready' : ''} ${isCelebrating ? 'is-celebrating' : ''} ${dark ? 'bg-[#292929] text-white hover:bg-[#383838]' : 'bg-[#f3f3f3] text-[#111] hover:bg-[#e8e8e8]'}`} aria-hidden={!buttonReady} aria-label={`View reading profile and ${streak} day streak`} disabled={!buttonReady} tabIndex={buttonReady ? 0 : -1} onClick={onClick}>
    <span className="streak-button-content">
      <span className="streak-fire-visual" aria-hidden="true">
        <span className="streak-fire-aura" />
        <span className="streak-fire-icon">
          {!reducedMotion && !playerFailed && <dotlottie-wc ref={playerRef} src={streakFireNav} segment={[0, 25]} speed="1" aria-hidden="true" />}
        </span>
      </span>
      {isCelebrating ? <span className="streak-count" aria-hidden="true">{streakPrefix}<span className="streak-count-roller"><span className="streak-count-track"><span>{previousOnesDigit}</span><span>{currentOnesDigit}</span></span></span></span> : <span className="streak-count" aria-hidden="true">{streak}</span>}
      <span className="streak-spark" style={sparkStyle('-5px', '-14px', '0ms')} aria-hidden="true">✦</span>
      <span className="streak-spark" style={sparkStyle('6px', '-10px', '65ms')} aria-hidden="true">✦</span>
      <span className="streak-spark" style={sparkStyle('4px', '9px', '130ms')} aria-hidden="true">✦</span>
    </span>
  </button>
}

type Reward = {
  title: string
  description: string
  xp: string
  status: 'Available' | 'Done'
  icon: string
  taskId?: CompletionTaskId
  articleLink?: boolean
  gameLink?: boolean
}

const rewards: Reward[] = [
  { title: 'Daily check-in', description: 'Check in today', xp: '+1 XP', status: 'Available', icon: '○', taskId: 'daily-check-in' },
  { title: 'Read today’s main article', description: 'Read today’s featured story', xp: '+2 XP', status: 'Available', icon: '○', articleLink: true, taskId: 'main-article-read' },
  { title: 'Start a game', description: 'Start a New Yorker game', xp: '+1 XP', status: 'Available', icon: '○', gameLink: true, taskId: 'start-game' },
  { title: 'Complete a game', description: 'Finish a New Yorker game', xp: '+25 XP', status: 'Available', icon: '○', taskId: 'complete-game' },
  { title: 'Reach a 30-day streak', description: 'Build a 30-day reading streak', xp: '+250 XP', status: 'Done', icon: '✓' },
  { title: 'Reach a 14-day streak', description: 'Build a 14-day reading streak', xp: '+150 XP', status: 'Done', icon: '✓' },
  { title: 'Reach a 7-day streak', description: 'Build a 7-day reading streak', xp: '+100 XP', status: 'Done', icon: '✓' },
  { title: 'Reach a 3-day streak', description: 'Build a 3-day reading streak', xp: '+50 XP', status: 'Done', icon: '✓' },
]

const sessionCompletedTasks = new Set<CompletionTaskId>()
const sessionRevealedCompletedTasks = new Set<CompletionTaskId>()

function ExternalLinkIcon() {
  return <svg className="h-[12px] w-[12px] fill-none stroke-current stroke-[1.5]" viewBox="0 0 16 16" aria-hidden="true"><path d="M8.5 2.5h5v5M13.25 2.75 7 9M6.5 4H3v9.5h9.5V10" /></svg>
}

function RewardsList({ completedTasks, onGames, onArticle, onClose }: { completedTasks: Set<CompletionTaskId>, onGames?: () => void, onArticle?: () => void, onClose: () => void }) {
  const previousPositions = useRef(new Map<string, number>())
  const itemRefs = useRef(new Map<string, HTMLDivElement>())
  const activeRewards = rewards.slice(0, 4).filter((reward) => !reward.taskId || !completedTasks.has(reward.taskId))
  const newlyCompletedRewards = rewards.slice(0, 4).filter((reward) => reward.taskId && completedTasks.has(reward.taskId)).map((reward) => ({ ...reward, status: 'Done' as const, icon: '✓' }))
  const displayRewards: Reward[] = [...activeRewards, ...newlyCompletedRewards, ...rewards.slice(4)]

  useLayoutEffect(() => {
    const canAnimate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    displayRewards.forEach((reward) => {
      const item = itemRefs.current.get(reward.title)
      const previousTop = previousPositions.current.get(reward.title)
      if (canAnimate && item && previousTop !== undefined) {
        const delta = previousTop - item.getBoundingClientRect().top
        if (delta) item.animate([{ transform: `translateY(${delta}px)` }, { transform: 'translateY(0)' }], { duration: 520, easing: 'cubic-bezier(.2, .8, .2, 1)' })
      }
    })
    previousPositions.current = new Map(displayRewards.flatMap((reward) => {
      const item = itemRefs.current.get(reward.title)
      return item ? [[reward.title, item.getBoundingClientRect().top]] : []
    }))
  }, [displayRewards])

  return <div className="hide-scrollbar min-h-0 flex-1 overflow-y-auto">{displayRewards.map((reward, index) => <div className={`grid grid-cols-[1fr_auto] items-center py-[14px] ${index < displayRewards.length - 1 ? 'border-b border-[#ededed]' : ''}`} key={reward.title} ref={(item) => { if (item) itemRefs.current.set(reward.title, item); else itemRefs.current.delete(reward.title) }}>
    <div>{(reward.gameLink || reward.articleLink) && reward.status !== 'Done' ? <a className="inline-flex items-center gap-1 !text-[14px] !font-normal leading-none text-[#111] hover:opacity-70" href={reward.gameLink ? '/crossword-puzzles-and-games' : '/news/the-lede/is-rfk-jr-winning-or-losing'} onClick={reward.gameLink && onGames ? (event) => { event.preventDefault(); onGames(); onClose() } : reward.articleLink && onArticle ? (event) => { event.preventDefault(); onArticle(); onClose() } : undefined}>{reward.title}<span className="text-[#d93636]"><ExternalLinkIcon /></span></a> : <span className={`inline-flex items-center gap-1 text-[14px] font-normal leading-none ${reward.status === 'Done' ? 'text-[#9a9a9a]' : 'text-[#111]'}`}>{reward.title}</span>}<p className={`mt-[6px] text-[11px] leading-none ${reward.status === 'Done' ? 'text-[#b0b0b0]' : 'text-[#8a8a8a]'}`}>{reward.description}</p></div>
    <div className="text-right"><div className={`text-[11px] font-extrabold leading-none ${reward.status === 'Done' ? 'text-[#9a9a9a]' : 'text-[#147cc0]'}`}>{reward.xp}</div><div className={`mt-1 text-[11px] leading-none ${reward.status === 'Done' ? 'font-semibold text-[#9a9a9a]' : 'font-normal text-[#777]'}`}><span className="mr-1">{reward.icon}</span>{reward.status}</div></div>
  </div>)}</div>
}

function PopupStreakFireIntro({ isOpen, popupContentRef, targetRef, reducedMotion, onFallback, onIntroStateChange }: { isOpen: boolean, popupContentRef: RefObject<HTMLDivElement | null>, targetRef: RefObject<HTMLDivElement | null>, reducedMotion: boolean, onFallback: () => void, onIntroStateChange: (isActive: boolean) => void }) {
  const playerRef = useRef<DotLottieElement>(null)
  const completionTimerRef = useRef<number | undefined>(undefined)
  const [isFirePlayerReady, setIsFirePlayerReady] = useState(false)
  const [isFireTargetReady, setIsFireTargetReady] = useState(false)
  const [isFireIntroStarted, setIsFireIntroStarted] = useState(false)
  const [isFireIntroComplete, setIsFireIntroComplete] = useState(false)
  const [fireTargetOffset, setFireTargetOffset] = useState({ x: 0, y: 0 })
  const [playerFailed, setPlayerFailed] = useState(false)

  useLayoutEffect(() => {
    if (!isOpen) return
    const measureDestination = () => {
      const popupContent = popupContentRef.current
      const target = targetRef.current
      if (!popupContent || !target) return

      const popupContentRect = popupContent.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      const popupContentCenterX = popupContentRect.left + popupContentRect.width / 2
      const popupContentCenterY = popupContentRect.top + popupContentRect.height / 2
      const targetCenterX = targetRect.left + targetRect.width / 2
      const targetCenterY = targetRect.top + targetRect.height / 2

      setFireTargetOffset({ x: targetCenterX - popupContentCenterX, y: targetCenterY - popupContentCenterY })
      setIsFireTargetReady(true)
    }

    const animationFrame = window.requestAnimationFrame(measureDestination)
    const resizeObserver = new ResizeObserver(measureDestination)
    if (popupContentRef.current) resizeObserver.observe(popupContentRef.current)
    if (targetRef.current) resizeObserver.observe(targetRef.current)
    return () => {
      window.cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
    }
  }, [isOpen, popupContentRef, targetRef])

  useEffect(() => {
    if (reducedMotion) {
      onFallback()
      return
    }
    if (!isOpen) return

    let player: DotLottieCore | undefined
    let animationFrame: number | undefined

    const onLoad = () => {
      if (!player) return
      player.stop()
      player.setSegment(...popupFireSegment)
      player.setFrame(popupFireSegment[0])
      setIsFirePlayerReady(true)
    }
    const onLoadError = () => {
      setPlayerFailed(true)
      onFallback()
    }

    const subscribeWhenAvailable = () => {
      player = playerRef.current?.dotLottie
      if (!player) {
        animationFrame = window.requestAnimationFrame(subscribeWhenAvailable)
        return
      }
      player.addEventListener('load', onLoad)
      player.addEventListener('loadError', onLoadError)
      if (player.isLoaded) onLoad()
    }

    subscribeWhenAvailable()
    return () => {
      if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame)
      player?.removeEventListener('load', onLoad)
      player?.removeEventListener('loadError', onLoadError)
    }
  }, [isOpen, onFallback, reducedMotion])

  useEffect(() => {
    if (reducedMotion || !isOpen || isFirePlayerReady || playerFailed) return
    const fallbackTimer = window.setTimeout(() => {
      setPlayerFailed(true)
      onFallback()
    }, 1800)
    return () => window.clearTimeout(fallbackTimer)
  }, [isFirePlayerReady, isOpen, onFallback, playerFailed, reducedMotion])

  useEffect(() => {
    if (!isOpen || reducedMotion || playerFailed || !isFirePlayerReady || !isFireTargetReady || isFireIntroStarted) return
    const animationFrame = window.requestAnimationFrame(() => {
      const player = playerRef.current?.dotLottie
      if (!player) return
      player.stop()
      player.setSegment(...popupFireSegment)
      player.setFrame(popupFireSegment[0])
      player.play()
      setIsFireIntroStarted(true)
    })
    return () => window.cancelAnimationFrame(animationFrame)
  }, [isFireIntroStarted, isFirePlayerReady, isFireTargetReady, isOpen, playerFailed, reducedMotion])

  useEffect(() => {
    if (!isFireIntroStarted) return
    completionTimerRef.current = window.setTimeout(() => setIsFireIntroComplete(true), 1150)
    return () => window.clearTimeout(completionTimerRef.current)
  }, [isFireIntroStarted])

  useEffect(() => {
    if (isOpen) return
    setIsFireIntroStarted(false)
    setIsFirePlayerReady(false)
    setIsFireTargetReady(false)
    setIsFireIntroComplete(false)
    setFireTargetOffset({ x: 0, y: 0 })
  }, [isOpen])

  useEffect(() => {
    if (import.meta.env.DEV) console.log({ isOpen, isFirePlayerReady, isFireTargetReady, isFireIntroStarted, fireTargetOffset })
  }, [fireTargetOffset, isFireIntroStarted, isFirePlayerReady, isFireTargetReady, isOpen])

  useEffect(() => {
    onIntroStateChange(isFireIntroStarted && !isFireIntroComplete)
  }, [isFireIntroComplete, isFireIntroStarted, onIntroStateChange])

  useEffect(() => () => window.clearTimeout(completionTimerRef.current), [])

  if (reducedMotion || playerFailed) return null

  const motionStyle = {
    '--fire-target-x': `${fireTargetOffset.x}px`,
    '--fire-target-y': `${fireTargetOffset.y}px`,
  } as CSSProperties

  const completeIntro = () => {
    if (isFireIntroStarted) setIsFireIntroComplete(true)
  }

  return <div className="popup-streak-intro-layer" style={motionStyle} aria-hidden="true">
    <div className={`popup-streak-intro-flare ${isFireIntroStarted ? 'is-playing' : ''}`} />
    <div className={`popup-streak-intro-flame ${isFireIntroStarted ? 'is-playing' : ''} ${isFireIntroComplete ? 'is-complete' : ''}`} onAnimationEnd={completeIntro}>
      <dotlottie-wc ref={playerRef} src={streakFireNav} segment={popupFireSegment} speed="1" renderConfig={{ autoResize: true, devicePixelRatio: 2 }} aria-hidden="true" />
    </div>
  </div>
}

function getReadingTitle(totalXp: number) {
  return readingTitleMilestones.reduce((title, milestone) => totalXp >= milestone.xp ? milestone.title : title, readingTitleMilestones[0].title)
}

function ShareTitleIcon({ type }: { type: 'x' | 'instagram' | 'facebook' | 'link' }) {
  if (type === 'x') return <span className="text-[16px] font-semibold leading-none" aria-hidden="true">𝕏</span>
  if (type === 'facebook') return <span className="font-serif text-[20px] font-bold leading-none" aria-hidden="true">f</span>
  if (type === 'link') return <svg className="h-4 w-4 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 14.5 5-5M7.2 17.8l-1.5 1.5a3.5 3.5 0 0 1-5-5l3-3a3.5 3.5 0 0 1 5 0M16.8 6.2l1.5-1.5a3.5 3.5 0 1 1 5 5l-3 3a3.5 3.5 0 0 1-5 0" /></svg>
  return <svg className="h-[17px] w-[17px] fill-none stroke-current stroke-[1.7]" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.7" cy="6.4" r=".8" className="fill-current stroke-none" /></svg>
}

function TitleRoadmapModal({ onClose, totalXp }: { onClose: () => void, totalXp: number }) {
  const currentTitle = getReadingTitle(totalXp)
  const nextTitle = readingTitleMilestones.find((milestone) => milestone.xp > totalXp)

  return <div className="title-roadmap-overlay" role="presentation" onMouseDown={onClose}>
    <section className="title-roadmap-modal" role="dialog" aria-modal="true" aria-labelledby="title-roadmap-heading" onMouseDown={(event) => event.stopPropagation()}>
      <button className="absolute right-4 top-4 border-0 bg-transparent p-1 text-[25px] font-light leading-none text-[#222] hover:opacity-60" aria-label="Close title roadmap" onClick={onClose}>×</button>
      <div className="border border-[#ededed] px-9 pb-6 pt-7">
        <p className="text-center text-[9px] font-extrabold uppercase tracking-[.16em] text-[#d93636]">You’re a</p>
        <h2 className="mt-2 text-center font-tny-irvin text-[47px] font-normal uppercase leading-[.9]" id="title-roadmap-heading">{currentTitle}</h2>
        <p className="mt-2 text-center font-tny-caslon text-[18px] text-[#555]">{totalXp} XP earned</p>
        <div className="mt-5 border-t border-[#ededed] pt-4">
          <div className="mb-3 flex items-baseline justify-between"><h3 className="font-tny-irvin text-[20px] font-normal uppercase leading-none">Your Roadmap</h3>{nextTitle && <span className="text-[9px] font-bold uppercase tracking-[.12em] text-[#777]">Next: {nextTitle.xp} XP</span>}</div>
          <div className="title-roadmap-list">
            {readingTitleMilestones.map((milestone, index) => {
              const isCurrent = milestone.title === currentTitle
              const isEarned = milestone.xp <= totalXp
              const isNext = milestone.title === nextTitle?.title
              const status = isCurrent ? 'Current title' : isNext ? 'Next title' : isEarned ? 'Earned' : 'Locked'
              return <div className={`title-roadmap-milestone ${isCurrent ? 'is-current' : isEarned ? 'is-earned' : ''}`} key={milestone.title} style={{ '--roadmap-delay': `${160 + index * 120}ms` } as CSSProperties}>
                <div className="title-roadmap-character"><img src={milestone.character} alt="" /></div>
                <span className="title-roadmap-dot" aria-hidden="true" />
                <p className="mt-2 font-tny-caslon text-[20px] leading-none">{milestone.title}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[.1em] text-[#777]">{milestone.xp} XP</p>
                <span className={`mt-1 text-[9px] font-bold uppercase tracking-[.12em] ${isCurrent ? 'text-[#d93636]' : isEarned ? 'text-[#147cc0]' : 'text-[#999]'}`}>{status}</span>
              </div>
            })}
          </div>
        </div>
        <footer className="mt-5 border-t border-[#ededed] pt-4 text-center"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#777]">Share your title</p><div className="mt-2 flex justify-center gap-2"><button className="title-share-button" aria-label="Share title on X"><ShareTitleIcon type="x" /></button><button className="title-share-button" aria-label="Share title on Instagram"><ShareTitleIcon type="instagram" /></button><button className="title-share-button" aria-label="Share title on Facebook"><ShareTitleIcon type="facebook" /></button><button className="title-share-button" aria-label="Copy a link to share title"><ShareTitleIcon type="link" /></button></div></footer>
      </div>
    </section>
  </div>
}

function ReadingProfileModal({ onClose, onGames, onArticle, streak, completedTasks }: { onClose: () => void, onGames?: () => void, onArticle?: () => void, streak: number, completedTasks: Set<CompletionTaskId> }) {
  const totalXp = 543 + [...completedTasks].reduce((total, taskId) => total + completionTaskDetails[taskId].xpAmount, 0)
  const readingTitle = getReadingTitle(totalXp)
  const reducedMotion = useReducedMotion()
  const popupContentRef = useRef<HTMLDivElement>(null)
  const flameTargetRef = useRef<HTMLDivElement>(null)
  const [showFlameFallback, setShowFlameFallback] = useState(reducedMotion)
  const [isFlameIntroActive, setIsFlameIntroActive] = useState(false)
  const [isTitleRoadmapOpen, setIsTitleRoadmapOpen] = useState(false)
  const showStaticFlameFallback = useCallback(() => setShowFlameFallback(true), [])
  return <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/35 px-6 py-6 backdrop-blur-sm" role="presentation">
    <section className="relative h-[640px] max-h-[calc(100vh-48px)] w-[480px] overflow-hidden border border-[#dedede] bg-white p-2 text-[#111] shadow-[0_10px_26px_rgba(0,0,0,.2)]" role="dialog" aria-modal="true" aria-labelledby="profile-title" onMouseDown={(event) => event.stopPropagation()}>
      <div className="relative z-[3] h-full min-h-0" ref={popupContentRef}>
        <PopupStreakFireIntro isOpen popupContentRef={popupContentRef} targetRef={flameTargetRef} reducedMotion={reducedMotion} onFallback={showStaticFlameFallback} onIntroStateChange={setIsFlameIntroActive} />
        <div className={`relative z-[2] flex h-full min-h-0 flex-col border border-[#eeeeee] px-9 pb-7 pt-8 ${isFlameIntroActive ? 'popup-streak-content-is-hidden' : ''}`}>
        <button className="absolute right-[15px] top-[13px] border-0 bg-transparent p-0 text-[24px] font-light leading-none text-[#222] hover:opacity-60" aria-label="Close reading profile" onClick={onClose}>×</button>
        <img className="mx-auto block h-[32px] w-[128px] object-contain" src="https://www.newyorker.com/verso/static/thenewyorker-us/assets/logo.svg" alt="The New Yorker" />
        <p className="mb-1 mt-[22px] text-[9px] font-extrabold uppercase tracking-[.15em] text-[#d93636]">You’re a</p>
        <div className="grid grid-cols-[1fr_100px] items-end">
          <div><button className="group inline-flex items-end gap-2 border-0 bg-transparent p-0 text-left" aria-haspopup="dialog" aria-label={`View ${readingTitle} title roadmap`} onClick={() => setIsTitleRoadmapOpen(true)}><h2 className="font-tny-irvin text-[40px] font-normal uppercase leading-[.9] group-hover:text-[#d93636]" id="profile-title">{readingTitle}</h2><span className="mb-[2px] flex h-[12px] items-center text-[#d93636] transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"><ExternalLinkIcon /></span></button><div className="mt-1 flex items-end gap-2"><span className="font-tny-caslon text-[58px] leading-[.8] text-[#147cc0]">{totalXp}</span><span className="mb-[5px] text-[10px] font-bold tracking-[.12em] text-[#777]">XP</span></div></div>
          <div className="pb-[3px] text-center"><div className="popup-streak-flame-target" ref={flameTargetRef} aria-hidden="true">{showFlameFallback && <StaticFlame className="popup-streak-static-flame" />}</div><div className="mt-[2px] font-tny-caslon text-[27px] leading-none">{streak}</div><div className="mt-[3px] text-[10px] font-semibold tracking-[.14em] text-[#777]">STREAK</div></div>
        </div>
        <div className="mt-[34px] border-y border-[#ededed] py-4"><h3 className="font-tny-irvin text-[20px] font-normal uppercase leading-none">Ways to Earn XP</h3></div>
        <RewardsList completedTasks={completedTasks} onGames={onGames} onArticle={onArticle} onClose={onClose} />
        </div>
      </div>
      {isTitleRoadmapOpen && <TitleRoadmapModal totalXp={totalXp} onClose={() => setIsTitleRoadmapOpen(false)} />}
    </section>
  </div>
}

export default function SiteHeader({ headerClassName, logoClassName, dark = false, logoInverted = false, leftContent, onHome, onGames, onArticle, homeHref = '/', horizontalPaddingClassName = 'px-[42px]' }: SiteHeaderProps) {
  const logoAsset = logoInverted ? 'logo-inverted.svg' : 'logo.svg'
  const [profileOpen, setProfileOpen] = useState(false)
  const [completedTasks, setCompletedTasks] = useState(() => new Set(sessionCompletedTasks))
  const [revealedCompletedTasks, setRevealedCompletedTasks] = useState(() => new Set(sessionRevealedCompletedTasks))
  const [streak] = useState(() => 33)

  useEffect(() => {
    const openProfile = () => setProfileOpen(true)
    const completeTask = (event: Event) => {
      const taskId = (event as CustomEvent<CompletionTaskId>).detail
      if (sessionCompletedTasks.has(taskId)) return
      sessionCompletedTasks.add(taskId)
      setCompletedTasks(new Set(sessionCompletedTasks))
    }
    window.addEventListener('open-reading-profile', openProfile)
    window.addEventListener('complete-reading-task', completeTask)
    return () => {
      window.removeEventListener('open-reading-profile', openProfile)
      window.removeEventListener('complete-reading-task', completeTask)
    }
  }, [])

  useEffect(() => {
    if (profileOpen) window.dispatchEvent(new Event('reading-profile-opened'))
  }, [profileOpen])

  useEffect(() => {
    if (!profileOpen) return
    const unrevealedTasks = [...completedTasks].filter((taskId) => !sessionRevealedCompletedTasks.has(taskId))
    if (!unrevealedTasks.length) return
    const revealTimer = window.setTimeout(() => {
      unrevealedTasks.forEach((taskId) => sessionRevealedCompletedTasks.add(taskId))
      setRevealedCompletedTasks(new Set(sessionRevealedCompletedTasks))
    }, 240)
    return () => window.clearTimeout(revealTimer)
  }, [profileOpen, completedTasks])

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
          <StreakButton dark={dark} onClick={() => setProfileOpen(true)} streak={streak} />
          <button className="border-0 bg-transparent p-0 text-inherit hover:opacity-70">Newsletter</button>
          <button className="inline-flex items-center gap-[7px] border-0 bg-transparent p-0 text-inherit hover:opacity-70">My Account<svg className="h-[6px] w-[9px] fill-current" viewBox="0 0 9 6" aria-hidden="true"><path d="M0 0h9L4.5 6z" /></svg></button>
          <a className="w-[123px] bg-[#147cc0] px-3 py-2.5 text-center !text-white" href="#gift">Give a gift</a>
          <button className="h-[30px] w-[30px] border-0 bg-transparent p-[5px] text-inherit" aria-label="Search"><SearchIcon /></button>
        </div>
      </div>
      {profileOpen && <ReadingProfileModal onClose={() => setProfileOpen(false)} onGames={onGames} onArticle={onArticle} streak={streak} completedTasks={revealedCompletedTasks} />}
    </header>
  )
}
