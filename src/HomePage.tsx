import { useEffect, useRef, useState } from 'react'

type Story = {
  title: string
  description: string
  author: string
  image: string
}

type HomePageProps = {
  onArticleClick: () => void
  onGamesClick: () => void
}

const primaryNavItems = ['The Latest', 'News', 'Books & Culture', 'Fiction & Poetry', 'Humor & Cartoons', 'Magazine', 'Puzzles & Games', 'Video', 'Podcasts', 'Goings On', 'Shop', 'Festival']

const stories: Story[] = [
  {
    title: 'Is R.F.K., Jr., Winning or Losing?',
    description: 'It’s reasonable to worry that Trump’s Secretary of Health and Human Services has done permanent damage to American science and medicine. Yet, Dhruv Khullar writes, it’s also possible to read Kennedy’s efforts—especially the new vaccine recommendations—as flailing attempts to enact an unwelcome vision.',
    author: 'By Dhruv Khullar',
    image: 'https://media.newyorker.com/photos/6a8c595dec4aa6d59db77b44/16:9/w_1280,c_limit/Khullar-RFK.jpg',
  },
  {
    title: 'Stumped by a Medical Mystery? Try Metagenomics',
    description: 'When doctors can’t figure out what’s ailing us, they can search our bodies for snippets of genetic material from viruses, bacteria, and fungi.',
    author: 'By Jason Liebowitz',
    image: 'https://media.newyorker.com/photos/6a8c6bceec4aa6d59db77b70/4:3/w_1600,c_limit/THENEWYORKER_METAGENOMIC_ANIMATION.gif',
  },
  {
    title: 'How the Job Market Will Shape the Next Generation',
    description: 'Young people are already discontented. It’s not going to get better anytime soon.',
    author: 'By Jay Caspian Kang',
    image: 'https://media.newyorker.com/photos/6a8c9449523c0fde41c7e787/4:3/w_1600,c_limit/Final%20(1).jpg',
  },
]

function SearchIcon() {
  return <svg className="h-[19px] w-[19px] fill-none stroke-current stroke-[1.6]" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.7" cy="10.7" r="5.8" /><path d="m15.2 15.2 4.5 4.5" /></svg>
}

function HeadphonesIcon() {
  return <svg className="h-[25px] w-[25px] fill-none stroke-current stroke-[1]" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13v-1a8 8 0 0 1 16 0v1M4 13v4.1a1.9 1.9 0 0 0 1.9 1.9H7v-6H5.9A1.9 1.9 0 0 0 4 14.9Zm16 0v4.1a1.9 1.9 0 0 1-1.9 1.9H17v-6h1.1a1.9 1.9 0 0 1 1.9 1.9Z" /></svg>
}

export default function HomePage({ onArticleClick, onGamesClick }: HomePageProps) {
  const navigationRef = useRef<HTMLElement>(null)
  const [navigationJoined, setNavigationJoined] = useState(false)

  useEffect(() => {
    const updateHeaderTheme = () => {
      setNavigationJoined((navigationRef.current?.getBoundingClientRect().top ?? Infinity) <= 70)
    }

    updateHeaderTheme()
    window.addEventListener('scroll', updateHeaderTheme, { passive: true })
    return () => window.removeEventListener('scroll', updateHeaderTheme)
  }, [])

  const mixStories = [...stories.slice(1), { title: 'On Jackie the Eagle and the Nature of the Soul', description: 'Live-streaming tragedy and seduction from a nest in the San Bernardino Mountains.', author: 'By Alex Ross', image: 'https://media.newyorker.com/photos/6a88ccdf064e93be8305297b/4:3/w_1600,c_limit/Ross-Jackie-the-Eagle-postiscript_2.jpg' }, { title: 'Does Anybody Know Who Darline Graham Is?', description: 'Lindsey Graham’s younger sister may soon be elected to a full term.', author: 'By Charles Bethea', image: 'https://media.newyorker.com/photos/6a889ff977002d1ba593badb/4:3/w_1600,c_limit/Bethea-Darline-Graham.jpg' }]

  return (
    <div className="min-w-[1180px] bg-white text-[#111] font-dm">
      <header className={`sticky top-0 z-20 border-b transition-[color,background-color,border-color] duration-150 ${navigationJoined ? 'border-[#ddd] bg-white text-[#111]' : 'border-[#313131] bg-black text-white'}`}>
        <div className="grid h-[69px] grid-cols-[1fr_auto_1fr] items-center px-[42px]">
          <div className="min-w-px" />
          <a className="col-start-2 block" href="#top"><img className={`block object-contain transition-[width,height] duration-150 ${navigationJoined ? 'h-[38px] w-[136px]' : 'h-[50px] w-[184px]'}`} src={`https://www.newyorker.com/verso/static/thenewyorker-us/assets/${navigationJoined ? 'logo.svg' : 'logo-inverted.svg'}`} alt="The New Yorker" /></a>
          <div className="col-start-3 flex items-center justify-self-end gap-[22px] text-[12px] tracking-[-.01em]">
            <button className="border-0 bg-transparent p-0 text-inherit hover:opacity-70">Newsletter</button><button className="border-0 bg-transparent p-0 text-inherit hover:opacity-70">My Account⌄</button>
            <a className="w-[123px] bg-[#147cc0] px-3 py-2.5 text-center text-white" href="#gift">Give a gift</a>
            <button className="h-[30px] w-[30px] border-0 bg-transparent p-[5px] text-inherit" aria-label="Search"><SearchIcon /></button>
          </div>
        </div>
      </header>

      <main>
        <section className="grid min-h-[812px] grid-cols-[1.025fr_1fr] items-center bg-black px-[26px] pb-[109px] pt-[94px] text-white" id="latest">
          <a className="col-start-2 row-start-1 block" href="/news/the-lede/is-rfk-jr-winning-or-losing" onClick={(event) => { event.preventDefault(); onArticleClick() }}>
            <img className="block h-[609px] w-full object-cover object-center" src={stories[0].image} alt="Secretary of Health and Human Services Robert F. Kennedy Jr. looks on as President Donald Trump speaks in the Oval Office." />
          </a>
          <div className="col-start-1 row-start-1 mx-auto w-[590px] p-0 text-center">
            <a className="block" href="/news/the-lede/is-rfk-jr-winning-or-losing" onClick={(event) => { event.preventDefault(); onArticleClick() }}><h1 className="mx-auto max-w-[560px] font-libre-caslon text-[36px] font-normal leading-[1.11]">{stories[0].title}</h1><p className="mx-auto mb-[25px] mt-5 max-w-[586px] font-tny-caslon text-[19px] font-light leading-[1.38]">It’s reasonable to worry that Trump’s Secretary of Health and Human Services has done permanent damage to American science and medicine. Yet, <strong>Dhruv Khullar</strong> writes, it’s also possible to read Kennedy’s efforts—especially the new vaccine recommendations—as flailing attempts to enact an unwelcome vision.</p></a>
            <button className="inline-flex min-h-[52px] items-center gap-2 rounded-[28px] border border-[#888] bg-transparent px-5 font-dm text-[15px] font-semibold text-white"><HeadphonesIcon />Listen</button>
          </div>
        </section>

        <nav className="sticky top-[69px] z-[19] flex h-[53px] items-center justify-center gap-[21px] border-b border-[#ddd] bg-white text-[12px] font-semibold tracking-[-.02em]" aria-label="Primary" ref={navigationRef}>
          {primaryNavItems.map((item) => item === 'Puzzles & Games' ? <a href="/crossword-puzzles-and-games" onClick={(event) => { event.preventDefault(); onGamesClick() }} key={item}>{item}</a> : <a href={'#' + item.toLowerCase().replaceAll(' ', '-')} key={item}>{item}</a>)}
        </nav>

        <div className="mx-[32px] flex h-[60px] items-center justify-center gap-3 border-y border-[#111] px-[18px] text-[12px]"><img className="h-[35px] w-[35px] object-contain" src="https://media.newyorker.com/photos/6a1edb34b64cb2502bcb50a8/original/pass/ezgif.com-resize%20(1).gif" alt="" /><span className="font-tny-caslon"><strong>Introducing Catalogues:</strong> a brand-new game that challenges you to sort items based on a hidden theme.</span><a className="font-semibold text-[#8d0000]" href="#play">Play now »</a></div>

        <section className="px-[32px] pb-[78px] pt-[45px]"><h2 className="mb-6 border-t border-[#111] pt-3 font-libre-caslon text-[29px] font-normal">Today’s Mix</h2><div className="grid grid-cols-4 border-t border-[#aaa]">{mixStories.map((story, index) => <article className={`flex min-h-[407px] flex-col border-r border-[#aaa] pt-5 ${index === 0 ? 'pl-0 pr-[22px]' : index === mixStories.length - 1 ? 'pl-[22px] pr-0 border-r-0' : 'px-[22px]'}`} key={story.title}><h3 className="min-h-[63px] font-libre-caslon text-[18px] font-normal leading-[1.25]">{story.title}</h3><img className="my-[15px] h-[178px] w-full object-cover" src={story.image} alt="" /><p className="mb-[14px] text-[12px] leading-[1.45] tracking-[-.01em]">{story.description}</p><span className="mt-auto text-[10px] font-semibold uppercase tracking-[.04em]">{story.author}</span></article>)}</div></section>
      </main>

      <div className="flex justify-center bg-white py-[66px]"><img className="block h-[140px] w-[940px] object-cover" src="https://media.newyorker.com/photos/67ad0936a90d0c5daf1b1574/original/pass/TNY_Gifting_Footer_DT_940x140_2x.png?format=original" alt="Give the gift of The New Yorker. Give a subscription for more than 40% off. Plus, get a free tote for yourself." /></div>
      <footer className="grid min-h-[365px] grid-cols-[1.1fr_1.35fr_2.2fr] gap-[50px] bg-[#111] px-[54px] pb-[35px] pt-12 text-white">
        <div><img className="h-[28px] w-[245px] object-contain" src="https://www.newyorker.com/verso/static/thenewyorker-us/assets/logo-reverse.svg" alt="The New Yorker" /></div>
        <div className="grid grid-cols-2 gap-[30px]"><FooterLinkGroup title="Sections" links={['News', 'Books & Culture', 'Fiction & Poetry', 'Humor & Cartoons', 'Magazine', 'Crossword', 'Video', 'Podcasts', '100th Anniversary', 'Goings On']} /><FooterLinkGroup title="More" links={['Manage Account', 'Shop The New Yorker', 'Buy Covers and Cartoons', 'Condé Nast Store', 'Digital Access', 'Subscribe', 'Newsletters', 'Jigsaw Puzzle', 'RSS', 'Site Map']} /></div>
        <div className="self-end"><div className="mb-[17px] flex flex-wrap gap-x-3 gap-y-[7px]">{['About', 'Careers', 'Contact', 'F.A.Q.', 'Media Kit', 'Press', 'Accessibility Help', 'User Agreement', 'Privacy Policy', 'Your California Privacy Rights'].map((item) => <a className="text-[9px] leading-[1.55] text-[#aaa]" href="#notices" key={item}>{item}</a>)}</div><p className="mb-4 max-w-[480px] text-[9px] leading-[1.55] text-[#aaa]">© 2026 Condé Nast. All rights reserved. <em>The New Yorker</em> may earn a portion of sales from products that are purchased through our site as part of our Affiliate Partnerships with retailers.</p><div className="mb-[19px] text-[9px] tracking-[.03em] text-[#dedede]">Instagram · TikTok · Threads · X · Facebook · LinkedIn · YouTube</div><button className="border-0 bg-transparent p-0 text-[9px] text-white">Privacy Information</button></div>
      </footer>
    </div>
  )
}

function FooterLinkGroup({ title, links }: { title: string, links: string[] }) {
  return <div><h2 className="mb-[14px] text-[10px] font-semibold uppercase tracking-[.08em]">{title}</h2>{links.map((item) => <a className="mb-2 block text-[11px] text-[#dedede]" href={'#' + title.toLowerCase()} key={item}>{item}</a>)}</div>
}
