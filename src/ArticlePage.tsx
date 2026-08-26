import { useEffect, useRef, useState } from 'react'

type ArticlePageProps = {
  onHome: () => void
}

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.7" cy="10.7" r="5.8" /><path d="m15.2 15.2 4.5 4.5" /></svg>
}

export default function ArticlePage({ onHome }: ArticlePageProps) {
  const ledeRef = useRef<HTMLElement>(null)
  const [showLightHeader, setShowLightHeader] = useState(false)

  useEffect(() => {
    const updateHeader = () => {
      setShowLightHeader((ledeRef.current?.getBoundingClientRect().bottom ?? Infinity) <= 69)
    }

    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  return (
    <div className="article-page">
      <header className={`article-site-header${showLightHeader ? ' article-header-scrolled' : ''}`}>
        <div className="article-header-top">
          <div className="article-gift-message">Give the gift of <em>The New Yorker.</em></div>
          <a className="article-logo-link" href="/" onClick={(event) => { event.preventDefault(); onHome() }}><img src={`https://www.newyorker.com/verso/static/thenewyorker-us/assets/${showLightHeader ? 'logo.svg' : 'logo-inverted.svg'}`} alt="The New Yorker" /></a>
          <div className="article-utility-actions">
            <button>Newsletter</button><button>My Account⌄</button>
            <a className="article-gift-link" href="#gift">Give a gift</a>
            <button className="article-search" aria-label="Search"><SearchIcon /></button>
          </div>
        </div>
      </header>
      <nav className={`article-primary-nav${showLightHeader ? ' article-nav-scrolled' : ''}`} aria-label="Primary">
        {['The Latest', 'News', 'Books & Culture', 'Fiction & Poetry', 'Humor & Cartoons', 'Magazine', 'Puzzles & Games', 'Video', 'Podcasts', 'Goings On', 'Shop', 'Festival'].map((item) => <a href={'#' + item.toLowerCase().replaceAll(' ', '-')} key={item}>{item}</a>)}
      </nav>

      <main className="article-main">
        <article>
          <header className="article-lede" ref={ledeRef}>
            <div className="article-lede-copy">
              <a className="article-rubric" href="#the-lede">The Lede</a>
              <h1>Is R.F.K., Jr., Winning or Losing?</h1>
              <p className="article-dek">A case for cautious optimism about the Trump Administration’s war on vaccines.</p>
              <p className="article-byline">By <a href="#author">Dhruv Khullar</a></p>
              <time dateTime="2026-08-25">August 25, 2026</time>
            </div>
            <figure className="article-lede-image">
              <img src="https://media.newyorker.com/photos/6a8c595dec4aa6d59db77b44/master/w_2560%2Cc_limit/Khullar-RFK.jpg" alt="President Donald Trump speaks in the Oval Office as Robert F. Kennedy, Jr., looks on." />
            </figure>
          </header>

          <section className="article-content" id="the-lede">
            <aside className="article-actions" aria-label="Article actions"><button className="article-save-button" aria-label="Save this story"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3.5h11.5v17L12 17.15 6 20.5v-17Z" /><path d="M15.4 3.5v3.2M13.8 5.1H17" /></svg></button></aside>
            <div className="article-body">
              <p className="article-caption">Photograph by Jim Watson / Getty</p>
              <button className="article-listen" aria-label="Listen to this story"><span className="article-play" aria-hidden="true" /><strong>Listen</strong><span>•</span><span>15 minutes</span></button>
              <p className="article-first-paragraph">This month, at an Oval Office event resounding with outlandish statements, President Trump signed an executive order called “Delivering Gold Standard Childhood Vaccine Recommendations for Americans.” His order cut the number of vaccines the federal government recommends for all children from seventeen to eleven. It threatened legal action against states that don’t grant expansive exemptions from vaccine mandates. And it proposed that the vaccine against measles, mumps, and rubella (M.M.R.), which is currently combined to curb costs and reduce the total number of injections that children receive, be separated into three different shots.</p>
              <p>In his remarks, Trump repeated a debunked theory that vaccines are linked to rising autism rates. He claimed, incorrectly, that doctors were injecting doses “the size of a bottle of soda” into tiny bodies, and argued that the M.M.R. shot “can be explosive” and “quite lethal.” (M.M.R. vaccines have been administered hundreds of millions of times, and have contributed to saving millions of lives while causing meaningful side effects in only the tiniest minority of cases.) During the event, he made sure to thank “the man who has done more than perhaps anyone else to bring about this real revolution”—the Secretary of Health and Human Services, Robert F. Kennedy, Jr.</p>
              <p>Trump’s executive order, which was not supported by any major independent medical organization, is perhaps the Administration’s most forthright attempt yet to upend federal vaccine recommendations. It has been touted as a major victory for R.F.K., Jr., whose time as Health Secretary has dismayed the public-health community. Under Kennedy, vaccine skeptics have been elevated to prominent positions and public-health agencies have suppressed the publication of scientific reports that diverge from his preferred narrative. (Officials have said that the reports were pulled owing to methodological concerns.) Parents are increasingly asking pediatricians to delay, space out, or altogether forgo immunizations for their children. State lawmakers have introduced hundreds of bills to weaken immunization rules and access, or to undermine trust in vaccines. There’s been a sharp uptick in the number of kindergarteners deemed exempt from such mandates; in some states, more than one in every eight remains unvaccinated against a preventable disease. Under the second Trump Administration, the United States has recorded more measles cases than it did in the preceding twenty-eight years.</p>
              <p>It’s reasonable to worry that the R.F.K., Jr., era has set American science and medicine back in ways that might not be corrected for years, if ever. Yet it’s also possible to read Kennedy’s efforts, especially the new vaccine recommendations, less as triumphs than as flailing attempts to enact an unwelcome vision. Kennedy and his agenda are hardly popular. Public trust in the agencies he leads has fallen. The latest order, like prior attempts to undermine established vaccine guidance, will surely face legal challenges that limit its scope and impact.</p>
              <p>Kennedy has argued that “there is no vaccine that is, you know, safe and effective,” and that the COVID shot was the “deadliest vaccine ever made.” But, as the nation’s top health official, he has struggled to actualize his maximalist rhetoric in the way that other Administration officials have theirs. Trump’s Department of Homeland Security says that it deported more than half a million people in the President’s first year back in office, sending some to countries they’ve never been to. The Department of Justice has launched pretextual prosecutions against the President’s political opponents. Elon Musk bragged about throwing U.S.A.I.D., an agency estimated to have saved millions of lives around the world, into a “wood chipper.” In the meantime, measles immunization rates among kindergarteners have fallen by less than one per cent. The share of kindergarteners with formal exemptions from vaccine mandates rose from 3.6 per cent to 4.2 per cent. These are troubling developments, to be sure, and enough to contribute to an unprecedented rise in infections. But, for now, we are not living in the worst-case scenarios that some envisioned when Kennedy took office. A year and a half into his tenure, is R.F.K., Jr., winning or losing?</p>
            </div>
          </section>
        </article>
      </main>
    </div>
  )
}
