import { useEffect, useState } from 'react'
import type { DragEvent } from 'react'
import SiteHeader from './SiteHeader'

type CataloguesPageProps = {
  onHome: () => void
  onGames: () => void
}

const navigationItems = ['The Latest', 'News', 'Books & Culture', 'Fiction & Poetry', 'Humor & Cartoons', 'Magazine', 'Puzzles & Games', 'Video', 'Podcasts', 'Goings On', 'Shop', 'Festival']
const correctItems = ['Raindrops', 'Whiskers', 'Kettles', 'Mittens', 'Packages', 'Ponies', 'Strudels']
const initialItems = [...correctItems]
const itemDescriptions: Record<string, string> = {
  Raindrops: 'Raindrops on roses',
  Whiskers: 'Whiskers on kittens',
  Kettles: 'Bright copper kettles',
  Mittens: 'Warm woollen mittens',
  Packages: 'Brown paper packages tied up with strings',
  Ponies: 'Cream-colored ponies',
  Strudels: 'Crisp apple strudels',
}
const completionCatImage = 'data:image/png;base64,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'

function CompletionDescription({ item }: { item: string }) {
  const phrase = itemDescriptions[item]
  const matchIndex = phrase.toLowerCase().indexOf(item.toLowerCase())
  const before = phrase.slice(0, matchIndex)
  const match = phrase.slice(matchIndex, matchIndex + item.length)
  const after = phrase.slice(matchIndex + item.length)

  return <p className="mt-1 text-[12px] font-normal leading-none">{before}<u>{match}</u>{after}</p>
}

export default function CataloguesPage({ onHome, onGames }: CataloguesPageProps) {
  const [items, setItems] = useState(initialItems)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [showClue, setShowClue] = useState(false)
  const [submissionState, setSubmissionState] = useState<'idle' | 'incorrect' | 'success'>('idle')

  useEffect(() => {
    const completionTimer = window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('show-task-completion-toast', { detail: 'start-game' }))
    }, 220)
    return () => window.clearTimeout(completionTimer)
  }, [])

  const moveItem = (targetItem: string) => {
    if (!draggedItem || draggedItem === targetItem) return
    const fromIndex = items.indexOf(draggedItem)
    const toIndex = items.indexOf(targetItem)
    const nextItems = [...items]
    nextItems.splice(fromIndex, 1)
    nextItems.splice(toIndex, 0, draggedItem)
    setItems(nextItems)
    setDraggedItem(null)
    setSubmissionState('idle')
  }

  const onDragStart = (event: DragEvent<HTMLButtonElement>, item: string) => {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', item)
    setDraggedItem(item)
  }

  const submitOrder = () => {
    const isCorrect = items.every((item, index) => item === correctItems[index])
    setSubmissionState(isCorrect ? 'success' : 'incorrect')
    if (isCorrect) window.setTimeout(() => window.dispatchEvent(new CustomEvent('show-task-completion-toast', { detail: 'complete-game' })), 220)
  }

  return (
    <div className="min-h-screen min-w-[1180px] bg-[#effdf5] text-[#111] font-dm">
      <SiteHeader headerClassName="sticky top-0 z-30 border-b border-[#dedede] bg-white" horizontalPaddingClassName="px-[50px]" logoClassName="block h-[38px] w-[136px] object-contain" leftContent={<span className="text-[13px] font-semibold">Give the gift of <em className="font-tny-caslon font-normal">The New Yorker.</em></span>} onHome={onHome} onGames={onGames} />
      <nav className="sticky top-[69px] z-[29] flex h-[53px] items-center justify-center gap-[21px] border-b border-[#dedede] bg-white text-[12px] font-semibold tracking-[-.02em]" aria-label="Primary">
        {navigationItems.map((item) => item === 'Puzzles & Games' ? <a className="h-[53px] border-b-2 border-[#111] pt-[18px]" href="/crossword-puzzles-and-games" onClick={(event) => { event.preventDefault(); onGames() }} key={item}>{item}</a> : <a href={'#' + item.toLowerCase().replaceAll(' ', '-')} key={item}>{item}</a>)}
      </nav>

      {submissionState === 'success' ? <main className="min-h-[1000px] border-t border-[#c7eee0] pt-[49px]">
        <section className="mx-auto w-[405px]">
          <div className="flex h-[140px] items-center rounded-[17px] border border-[#b9dfc8] bg-[#d9f4e3] px-[28px]">
            <img className="mr-[21px] h-[88px] w-[88px] shrink-0 object-contain" src={completionCatImage} alt="In good order" />
            <div className="text-center"><h1 className="font-tny-irvin text-[27px] font-normal leading-none uppercase">In Good Order</h1><p className="mt-2 text-[12px] font-medium">You solved it in 4 guesses.</p><p className="mt-1 text-[12px] font-medium">Most players used 4 guesses.</p><p className="mt-3 text-[12px] font-normal text-[#717171]">Completion time: 0:52</p></div>
          </div>
          <div className="mt-[10px] overflow-hidden rounded-[17px] border border-[#b9dfc8] bg-[#d8f4e2] text-center">
            <header className="border-b border-[#c5e8d1] bg-[#c4efd3] px-6 py-[11px]"><h2 className="font-tny-irvin text-[17px] font-normal uppercase">Favoritism</h2><p className="mt-1 font-tny-caslon text-[14px] font-normal italic leading-[1.22]">Maria’s favorite things from “The Sound of Music,” in lyric order.</p></header>
            <div className="px-6 pb-[14px] pt-[21px]">{correctItems.map((item) => <div className="mb-[14px] last:mb-0" key={item}><h3 className="text-[12px] font-medium">{item}</h3><CompletionDescription item={item} /></div>)}</div>
          </div>
          <div className="mt-[9px] grid grid-cols-2 gap-[9px]"><button className="h-[44px] rounded-[6px] border-2 border-[#111] bg-transparent text-[12px] font-medium" onClick={() => { setItems(initialItems); setSubmissionState('idle') }}>Play previous game</button><button className="h-[44px] rounded-[6px] border-0 bg-black text-[12px] font-medium text-white">Share your results</button></div>
        </section>
      </main> : <main className="relative min-h-[760px] border-t border-[#c7eee0] pt-[8px]">
        <button className="absolute left-[14.2%] top-[15px] grid h-7 w-7 place-items-center rounded-full border border-[#111] bg-transparent p-0 font-tny-caslon text-[19px] leading-none" aria-label="Game information">i</button>
        <button className="absolute right-[13.9%] top-[10px] h-[31px] w-[69px] rounded-[4px] border-0 bg-[#c8efd9] text-[12px] font-medium" onClick={() => setShowClue((value) => !value)}>Clue</button>
        <section className="mx-auto w-[514px] text-center">
          <h1 className="font-tny-irvin text-[29px] font-normal uppercase leading-none">Catalogues</h1>
          <p className="mt-[17px] font-libre-caslon text-[20px] font-normal">Favoritism</p>
          {showClue && <p className="mt-2 text-[13px] text-[#356d51]">Put the answers in the order suggested by the theme.</p>}
          <div className="mt-[20px] space-y-[9px]">
            {items.map((item) => <button key={item} className={`flex h-[48px] w-full cursor-grab items-center justify-center rounded-[18px] border border-[#aaa] bg-white text-[14px] font-medium transition-opacity active:cursor-grabbing ${draggedItem === item ? 'opacity-40' : 'opacity-100'}`} draggable onDragStart={(event) => onDragStart(event, item)} onDragOver={(event) => event.preventDefault()} onDrop={() => moveItem(item)} onDragEnd={() => setDraggedItem(null)}>{item}</button>)}
          </div>
          <div className="mt-[14px] flex items-center justify-center gap-2 text-[11px] font-normal text-[#626262]"><span>Guesses remaining</span><div className="flex gap-[7px]">{Array.from({ length: 5 }).map((_, index) => <span className="h-[12px] w-[12px] rounded-full bg-[#50c982]" key={index} />)}</div></div>
          <button className="mt-[15px] h-[45px] w-[158px] rounded-[5px] border-0 bg-black text-[12px] font-medium text-white" onClick={submitOrder}>Submit</button>
          {submissionState === 'incorrect' && <p className="mt-3 text-[13px] text-[#9a3b32]">Not quite—try another order.</p>}
        </section>
      </main>
      }
    </div>
  )
}
