import { useEffect, useRef, useState } from 'react'

type Story = {
  title: string
  description: string
  author: string
  image: string
}

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
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.7" cy="10.7" r="5.8" /><path d="m15.2 15.2 4.5 4.5" /></svg>
}

function HeadphonesIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13v-1a8 8 0 0 1 16 0v1M4 13v4.1a1.9 1.9 0 0 0 1.9 1.9H7v-6H5.9A1.9 1.9 0 0 0 4 14.9Zm16 0v4.1a1.9 1.9 0 0 1-1.9 1.9H17v-6h1.1a1.9 1.9 0 0 1 1.9 1.9Z" /></svg>
}

type HomePageProps = {
  onArticleClick: () => void
}

export default function HomePage({ onArticleClick }: HomePageProps) {
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

  return (
    <div className="site-shell">
      <header className={`site-header${navigationJoined ? ' header-joined' : ''}`}>
        <div className="header-top">
          <div className="header-spacer" />
          <a href="#top" className="logo-link"><img className="masthead" src={`https://www.newyorker.com/verso/static/thenewyorker-us/assets/${navigationJoined ? 'logo.svg' : 'logo-inverted.svg'}`} alt="The New Yorker" /></a>
          <div className="utility-actions">
            <button>Newsletter</button><button>My Account⌄</button>
            <a className="gift-link" href="#gift">Give a gift</a>
            <button className="search-text">Search</button><button className="icon-button" aria-label="Search"><SearchIcon /></button>
          </div>
        </div>
      </header>

      <main>
        <section className="focus-story" id="latest">
          <a className="focus-image-link" href="/news/the-lede/is-rfk-jr-winning-or-losing" onClick={(event) => { event.preventDefault(); onArticleClick() }}>
            <img src={stories[0].image} alt="Secretary of Health and Human Services Robert F. Kennedy Jr. looks on as President Donald Trump speaks in the Oval Office." />
          </a>
          <div className="focus-copy"><a className="focus-copy-link" href="/news/the-lede/is-rfk-jr-winning-or-losing" onClick={(event) => { event.preventDefault(); onArticleClick() }}><h1>{stories[0].title}</h1><p>It’s reasonable to worry that Trump’s Secretary of Health and Human Services has done permanent damage to American science and medicine. Yet, <strong>Dhruv Khullar</strong> writes, it’s also possible to read Kennedy’s efforts—especially the new vaccine recommendations—as flailing attempts to enact an unwelcome vision.</p></a><button className="listen-button"><HeadphonesIcon />Listen</button></div>
        </section>

        <nav className="primary-nav" aria-label="Primary" ref={navigationRef}>
          {['The Latest', 'News', 'Books & Culture', 'Fiction & Poetry', 'Humor & Cartoons', 'Magazine', 'Puzzles & Games', 'Video', 'Podcasts', 'Goings On', 'Shop', 'Festival'].map((item) => <a href={'#' + item.toLowerCase().replaceAll(' ', '-')} key={item}>{item}</a>)}
        </nav>

        <div className="ticker"><img src="https://media.newyorker.com/photos/6a1edb34b64cb2502bcb50a8/original/pass/ezgif.com-resize%20(1).gif" alt="" /><span><strong>Introducing Catalogues:</strong> a brand-new game that challenges you to sort items based on a hidden theme.</span><a href="#play">Play now »</a></div>

        <section className="todays-mix"><h2>Today’s Mix</h2><div className="mix-grid">{[...stories.slice(1), { title: 'On Jackie the Eagle and the Nature of the Soul', description: 'Live-streaming tragedy and seduction from a nest in the San Bernardino Mountains.', author: 'By Alex Ross', image: 'https://media.newyorker.com/photos/6a88ccdf064e93be8305297b/4:3/w_1600,c_limit/Ross-Jackie-the-Eagle-postiscript_2.jpg' }, { title: 'Does Anybody Know Who Darline Graham Is?', description: 'Lindsey Graham’s younger sister may soon be elected to a full term.', author: 'By Charles Bethea', image: 'https://media.newyorker.com/photos/6a889ff977002d1ba593badb/4:3/w_1600,c_limit/Bethea-Darline-Graham.jpg' }].map((story) => <article className="mix-story" key={story.title}><h3>{story.title}</h3><img src={story.image} alt="" /><p>{story.description}</p><span>{story.author}</span></article>)}</div></section>
      </main>

      <div className="footer-gift"><img src="https://media.newyorker.com/photos/67ad0936a90d0c5daf1b1574/original/pass/TNY_Gifting_Footer_DT_940x140_2x.png?format=original" alt="Give the gift of The New Yorker. Give a subscription for more than 40% off. Plus, get a free tote for yourself." /></div>
      <footer>
        <div className="footer-brand"><img src="https://www.newyorker.com/verso/static/thenewyorker-us/assets/logo-reverse.svg" alt="The New Yorker" /></div>
        <div className="footer-links"><div><h2>Sections</h2>{['News', 'Books & Culture', 'Fiction & Poetry', 'Humor & Cartoons', 'Magazine', 'Crossword', 'Video', 'Podcasts', '100th Anniversary', 'Goings On'].map((item) => <a href="#sections" key={item}>{item}</a>)}</div><div><h2>More</h2>{['Manage Account', 'Shop The New Yorker', 'Buy Covers and Cartoons', 'Condé Nast Store', 'Digital Access', 'Subscribe', 'Newsletters', 'Jigsaw Puzzle', 'RSS', 'Site Map'].map((item) => <a href="#more" key={item}>{item}</a>)}</div></div>
        <div className="footer-notices"><div className="notice-links">{['About', 'Careers', 'Contact', 'F.A.Q.', 'Media Kit', 'Press', 'Accessibility Help', 'User Agreement', 'Privacy Policy', 'Your California Privacy Rights'].map((item) => <a href="#notices" key={item}>{item}</a>)}</div><p>© 2026 Condé Nast. All rights reserved. <em>The New Yorker</em> may earn a portion of sales from products that are purchased through our site as part of our Affiliate Partnerships with retailers.</p><div className="social-links">Instagram · TikTok · Threads · X · Facebook · LinkedIn · YouTube</div><button>Privacy Information</button></div>
      </footer>
    </div>
  )
}
