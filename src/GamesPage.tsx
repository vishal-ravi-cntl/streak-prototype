import { useEffect, useRef, useState } from 'react'

type GamesPageProps = {
  onHome: () => void
  onGames: () => void
  onCatalogues: () => void
}

const navigationItems = ['The Latest', 'News', 'Books & Culture', 'Fiction & Poetry', 'Humor & Cartoons', 'Magazine', 'Puzzles & Games', 'Video', 'Podcasts', 'Goings On', 'Shop', 'Festival']

type GameEntry = {
  title: string
  author: string
}

type PuzzleSectionProps = {
  title: string
  allLabel: string
  heroTitle: string
  description: string
  action: string
  image: string
  entries: GameEntry[]
  onHeroClick?: () => void
}

function SearchIcon() {
  return <svg className="h-[19px] w-[19px] fill-none stroke-current stroke-[1.6]" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.7" cy="10.7" r="5.8" /><path d="m15.2 15.2 4.5 4.5" /></svg>
}

function PuzzleSection({ title, allLabel, heroTitle, description, action, image, entries, onHeroClick }: PuzzleSectionProps) {
  return (
    <section className="mx-[72px] mb-[72px] border-t border-[#dedede]">
      <div className="flex h-[101px] items-center justify-between border-b border-[#dedede]">
        <h2 className="font-tny-irvin text-[28px] font-normal uppercase leading-none">{title}</h2>
        <a className="text-[13px] font-semibold" href={'#' + title.toLowerCase().replaceAll(' ', '-')}>{allLabel} »</a>
      </div>
      <div className="grid grid-cols-2 pt-[34px]">
        <article className="border-r border-[#dedede] pr-[18px] text-center">
          {onHeroClick ? <button className="mx-auto block w-[84%] border-0 bg-transparent p-0" onClick={onHeroClick} aria-label={`Open ${heroTitle}`}><img className="aspect-square w-full object-cover" src={image} alt={heroTitle} /></button> : <img className="mx-auto aspect-square w-[84%] object-cover" src={image} alt={heroTitle} />}
          <h3 className="mt-5 font-libre-caslon text-[28px] font-normal leading-none">{heroTitle}</h3>
          <p className="mx-auto mt-3 max-w-[360px] text-[14px] leading-[1.35]">{description}</p>
          <a className="mb-1 mt-3 inline-block text-[13px] font-semibold underline underline-offset-4" href={'#' + title.toLowerCase().replaceAll(' ', '-')}>{action} »</a>
        </article>
        <div className="pl-[24px]">
          {entries.map((entry) => <article className="flex min-h-[107px] flex-col items-center justify-center border-b border-[#dedede] text-center last:border-b-0" key={entry.title}><h3 className="font-libre-caslon text-[23px] font-light leading-[1.12]">{entry.title}</h3><p className="mt-[14px] text-[15px] font-semibold">By {entry.author}</p></article>)}
        </div>
      </div>
    </section>
  )
}

const gameSections: PuzzleSectionProps[] = [
  {
    title: 'Catalogues', allLabel: 'All games', heroTitle: 'Catalogues', description: 'Can you sort the items into the correct order?', action: 'Play today’s game', image: 'https://media.newyorker.com/photos/6a038e1598355286cc52147c/4:3/w_768%2Cc_limit/Catalogues%252016-9-optimised.gif', entries: [
      { title: 'Catalogues: Tuesday, August 25, 2026', author: 'Andy Kravis' }, { title: 'Catalogues: Monday, August 24, 2026', author: 'Adam Wagner' }, { title: 'Catalogues: Sunday, August 23, 2026', author: 'Adam Wagner' }, { title: 'Catalogues: Saturday, August 22, 2026', author: 'Adam Wagner' }, { title: 'Catalogues: Friday, August 21, 2026', author: 'Adam Wagner' },
    ],
  },
  {
    title: 'Shuffalo', allLabel: 'All games', heroTitle: 'Shuffalo', description: 'Can you make a longer word with each new letter?', action: 'Play today’s game', image: 'https://media.newyorker.com/photos/68dac5621bc6d6e78a9bce84/4:3/w_768%2Cc_limit/Shuffalo%252016.9.gif', entries: [
      { title: 'Shuffalo: Tuesday, August 25, 2026', author: 'Andy Kravis' }, { title: 'Shuffalo: Monday, August 24, 2026', author: 'Adam Wagner' }, { title: 'Shuffalo: Sunday, August 23, 2026', author: 'Adam Wagner' }, { title: 'Shuffalo: Saturday, August 22, 2026', author: 'Adam Wagner' }, { title: 'Shuffalo: Friday, August 21, 2026', author: 'Adam Wagner' },
    ],
  },
  {
    title: 'Crossword', allLabel: 'All crosswords', heroTitle: 'The Crossword', description: 'A puzzle that ranges in difficulty, with the occasional theme.', action: 'Solve the latest puzzle', image: 'https://media.newyorker.com/photos/625f1f35553e9092ad75f41e/4:3/w_768%2Cc_limit/NewYorkerCrossword-Homepage.gif', entries: [
      { title: 'The Crossword: Tuesday, August 25, 2026', author: 'Andy Kravis' }, { title: 'The Crossword: Monday, August 24, 2026', author: 'Adam Wagner' }, { title: 'The Crossword: Wednesday, August 19, 2026', author: 'Adam Wagner' }, { title: 'The Crossword: Tuesday, August 18, 2026', author: 'Adam Wagner' }, { title: 'The Crossword: Monday, August 17, 2026', author: 'Adam Wagner' },
    ],
  },
  {
    title: 'Mini Crossword', allLabel: 'All mini crosswords', heroTitle: 'The Mini', description: 'A bite-size crossword, for a quick diversion.', action: 'Solve the latest puzzle', image: 'https://media.newyorker.com/photos/65d4fc979889ece07e0e4659/4:3/w_768%2Cc_limit/mini_anim.gif', entries: [
      { title: 'The Mini Crossword: Friday, August 21, 2026', author: 'Adam Wagner' }, { title: 'The Mini Crossword: Thursday, August 20, 2026', author: 'Adam Wagner' }, { title: 'The Mini Crossword: Friday, August 14, 2026', author: 'Adam Wagner' }, { title: 'The Mini Crossword: Thursday, August 13, 2026', author: 'Adam Wagner' }, { title: 'The Mini Crossword: Friday, August 7, 2026', author: 'Adam Wagner' },
    ],
  },
  {
    title: 'Laugh Lines', allLabel: 'All games', heroTitle: 'Laugh Lines', description: 'Can you guess when these New Yorker cartoons were originally published?', action: 'Play this week’s game', image: 'https://media.newyorker.com/photos/675c84675b9e51f1393ae141/4:3/w_768%2Cc_limit/Focus_SiteImage.gif', entries: [
      { title: 'Laugh Lines No. 86: Weddings, Part 2', author: 'The New Yorker' }, { title: 'Laugh Lines No. 85: Dads, Part 2', author: 'The New Yorker' }, { title: 'Laugh Lines No. 84: Birds', author: 'The New Yorker' }, { title: 'Laugh Lines No. 83: At the Bookstore, Part 2', author: 'The New Yorker' }, { title: 'Laugh Lines No. 82: Sex', author: 'The New Yorker' },
    ],
  },
  {
    title: 'Name Drop', allLabel: 'All quizzes', heroTitle: 'Name Drop', description: 'Can you guess the notable person in six clues or fewer?', action: 'Play a quiz from the vault', image: 'https://media.newyorker.com/photos/61f95b6b10de67271a898693/4:3/w_768%2Cc_limit/NameDrop%2520(16_9).png', entries: [
      { title: 'Name Drop Pack: And the Oscar Goes To . . .', author: 'The New Yorker' }, { title: 'Name Drop Pack: Music Legends', author: 'The New Yorker' }, { title: 'Name Drop Pack: Names of 2023', author: 'The New Yorker' }, { title: 'Name Drop Pack: Moguls and Money-Makers', author: 'The New Yorker' }, { title: 'Name Drop Pack: Make Me Laugh', author: 'The New Yorker' },
    ],
  },
  {
    title: 'Cryptic Crossword', allLabel: 'All cryptics', heroTitle: 'The Cryptic Crossword', description: 'A puzzle for lovers of wily wordplay.', action: 'Browse our archive', image: 'https://media.newyorker.com/photos/625f1f9260a35b8217804203/4:3/w_768%2Cc_limit/NewYorkerCrossword-Cryptic-Homepage-2.jpg', entries: [
      { title: 'The Cryptic Crossword: Sondheim Edition', author: 'The New Yorker' }, { title: 'The Cryptic Crossword: Sunday, March 17, 2024', author: 'The New Yorker' }, { title: 'The Cryptic Crossword: Sunday, March 10, 2024', author: 'The New Yorker' }, { title: 'The Cryptic Crossword: Sunday, March 3, 2024', author: 'The New Yorker' }, { title: 'Beginner-Friendly Cryptic No. 1', author: 'The New Yorker' },
    ],
  },
]

export default function GamesPage({ onHome, onGames, onCatalogues }: GamesPageProps) {
  const titleRef = useRef<HTMLElement>(null)
  const [showNavigation, setShowNavigation] = useState(false)

  useEffect(() => {
    const updateNavigation = () => setShowNavigation((titleRef.current?.getBoundingClientRect().bottom ?? Infinity) <= 69)
    updateNavigation()
    window.addEventListener('scroll', updateNavigation, { passive: true })
    return () => window.removeEventListener('scroll', updateNavigation)
  }, [])

  return (
    <div className="min-h-screen min-w-[1180px] bg-white text-[#111] font-dm">
      <header className="sticky top-0 z-30 border-b border-[#dedede] bg-white shadow-[0_2px_4px_rgba(0,0,0,.1)]">
        <div className="grid h-[69px] grid-cols-[1fr_auto_1fr] items-center px-[42px]">
          <div />
          <a className="col-start-2 block" href="/" onClick={(event) => { event.preventDefault(); onHome() }}><img className="block h-[44px] w-[164px] object-contain" src="https://www.newyorker.com/verso/static/thenewyorker-us/assets/logo.svg" alt="The New Yorker" /></a>
          <div className="col-start-3 flex items-center justify-self-end gap-[22px] text-[12px] tracking-[-.01em]"><button className="border-0 bg-transparent p-0">Newsletter</button><button className="inline-flex items-center gap-[7px] border-0 bg-transparent p-0">My Account<svg className="h-[6px] w-[9px] fill-current" viewBox="0 0 9 6" aria-hidden="true"><path d="M0 0h9L4.5 6z" /></svg></button><a className="w-[123px] bg-[#147cc0] px-3 py-2.5 text-center !text-white" href="#gift">Give a gift</a><button className="h-[30px] w-[30px] border-0 bg-transparent p-[5px]" aria-label="Search"><SearchIcon /></button></div>
        </div>
      </header>
      {showNavigation && <nav className="fixed left-0 right-0 top-[69px] z-[29] flex h-[53px] items-center justify-center gap-[21px] border-b border-[#dedede] bg-white text-[12px] font-semibold tracking-[-.02em] shadow-[0_2px_4px_rgba(0,0,0,.07)]" aria-label="Primary">{navigationItems.map((item) => item === 'Puzzles & Games' ? <a className="h-[53px] border-b-2 border-[#111] pt-[18px]" href="/crossword-puzzles-and-games" onClick={(event) => { event.preventDefault(); onGames() }} key={item}>{item}</a> : <a href={'#' + item.toLowerCase().replaceAll(' ', '-')} key={item}>{item}</a>)}</nav>}

      <main className="pb-24">
        <header className="h-[220px] px-[72px] pt-[19px] text-center" ref={titleRef}><h1 className="font-tny-irvin text-[42px] font-light leading-none uppercase">Puzzles &amp; Games</h1></header>
        <section className="mx-[72px] flex h-[72px] items-center justify-center gap-3 border-b border-[#dedede] px-[18px] text-[13px]"><img className="h-[38px] w-[52px] object-cover" src="https://media.newyorker.com/photos/5d405edf21a62700083b195d/master/w_150%2Cc_limit/newsletter-hp-banner.jpg" alt="" /><span>Stay up to date on our latest offerings.</span><a className="font-semibold text-[#087dc1] underline underline-offset-2" href="#newsletter">Sign up for the Puzzles &amp; Games newsletter »</a></section>
        <div>{gameSections.map((section) => <PuzzleSection {...section} onHeroClick={section.title === 'Catalogues' ? onCatalogues : undefined} key={section.title} />)}</div>
      </main>
    </div>
  )
}
