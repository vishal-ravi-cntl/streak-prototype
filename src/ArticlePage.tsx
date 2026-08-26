import { useEffect, useRef, useState } from 'react'

type ArticlePageProps = {
  onHome: () => void
  onGames: () => void
}

const articleParagraphClass = 'mb-7 text-[#242424] font-tny-caslon text-[20px] font-light leading-[1.52] tracking-normal antialiased'

function SearchIcon() {
  return <svg className="h-[19px] w-[19px] fill-none stroke-current stroke-[1.6]" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.7" cy="10.7" r="5.8" /><path d="m15.2 15.2 4.5 4.5" /></svg>
}

export default function ArticlePage({ onHome, onGames }: ArticlePageProps) {
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
    <div className="min-h-screen min-w-[1180px] bg-white text-[#111]">
      <header className={`sticky top-0 z-30 border-b transition-[color,background-color,border-color,box-shadow] duration-150 ${showLightHeader ? 'border-[#dedede] bg-white text-[#111] shadow-[0_2px_4px_rgba(0,0,0,.14)]' : 'border-[#313131] bg-black text-white'}`}>
        <div className="grid h-[69px] grid-cols-[1fr_auto_1fr] items-center px-[42px]">
          <div className="text-[13px] font-semibold">Give the gift of <em className="font-tny-caslon font-normal">The New Yorker.</em></div>
          <a className="col-start-2 block" href="/" onClick={(event) => { event.preventDefault(); onHome() }}><img className={`block object-contain transition-[width,height] duration-150 ${showLightHeader ? 'h-[34px] w-[124px]' : 'h-[44px] w-[164px]'}`} src={`https://www.newyorker.com/verso/static/thenewyorker-us/assets/${showLightHeader ? 'logo.svg' : 'logo-inverted.svg'}`} alt="The New Yorker" /></a>
          <div className="col-start-3 flex items-center justify-self-end gap-[22px] text-[12px] tracking-[-.01em]">
            <button className="border-0 bg-transparent p-0 text-inherit">Newsletter</button><button className="inline-flex items-center gap-[7px] border-0 bg-transparent p-0 text-inherit">My Account<svg className="h-[6px] w-[9px] fill-current" viewBox="0 0 9 6" aria-hidden="true"><path d="M0 0h9L4.5 6z" /></svg></button>
            <a className="w-[123px] bg-[#147cc0] px-3 py-2.5 text-center !text-white" href="#gift">Give a gift</a>
            <button className="h-[30px] w-[30px] border-0 bg-transparent p-[5px] text-inherit" aria-label="Search"><SearchIcon /></button>
          </div>
        </div>
      </header>
      <nav className={`flex h-[54px] items-center justify-center gap-[21px] border-b text-[12px] font-semibold tracking-[-.02em] ${showLightHeader ? 'sticky top-[69px] z-[29] border-[#dedede] bg-white text-[#111] shadow-[0_2px_4px_rgba(0,0,0,.1)]' : 'border-[#333] bg-black text-white'}`} aria-label="Primary">
        {['The Latest', 'News', 'Books & Culture', 'Fiction & Poetry', 'Humor & Cartoons', 'Magazine', 'Puzzles & Games', 'Video', 'Podcasts', 'Goings On', 'Shop', 'Festival'].map((item) => item === 'Puzzles & Games' ? <a href="/crossword-puzzles-and-games" onClick={(event) => { event.preventDefault(); onGames() }} key={item}>{item}</a> : <a href={'#' + item.toLowerCase().replaceAll(' ', '-')} key={item}>{item}</a>)}
      </nav>

      <main>
        <article>
          <header className="grid min-h-[834px] grid-cols-[51.85%_48.15%] bg-black text-white" ref={ledeRef}>
            <div className="ml-[clamp(100px,calc(100vw-1700px),205px)] my-auto w-[min(600px,calc(100%-155px))] p-0 text-center">
              <a className="mb-[22px] inline-block text-[13px] font-semibold uppercase" href="#the-lede">The Lede</a>
              <h1 className="m-0 max-w-[600px] font-libre-caslon text-[44px] font-normal leading-[.98] tracking-[-.015em] uppercase">Is R.F.K., Jr., Winning or Losing?</h1>
              <p className="mx-auto mb-[26px] mt-[22px] max-w-[560px] font-tny-caslon text-[24px] italic leading-[1.27]">A case for cautious optimism about the Trump Administration’s war on vaccines.</p>
              <p className="mb-2 text-[13px] font-semibold">By <a href="#author">Dhruv Khullar</a></p>
              <time className="text-[12px]" dateTime="2026-08-25">August 25, 2026</time>
            </div>
            <figure className="my-auto mr-[35px] min-w-0"><img className="block h-[588px] w-full object-cover object-center" src="https://media.newyorker.com/photos/6a8c595dec4aa6d59db77b44/master/w_2560%2Cc_limit/Khullar-RFK.jpg" alt="President Donald Trump speaks in the Oval Office as Robert F. Kennedy, Jr., looks on." /></figure>
          </header>

          <section className="grid w-full grid-cols-[130px_600px_1fr] gap-x-[50px] pb-[112px]" id="the-lede">
            <aside className="pt-[365px]" aria-label="Article actions"><button className="ml-[35px] grid h-[64px] w-[64px] place-items-center rounded-[10px] border border-[#dfdfdf] bg-white p-0" aria-label="Save this story"><svg className="h-[28px] w-[28px] fill-none stroke-[#111] stroke-[1.1] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3.5h11.5v17L12 17.15 6 20.5v-17Z" /><path d="M15.4 3.5v3.2M13.8 5.1H17" /></svg></button></aside>
            <div className="w-[600px]">
              <p className="mb-[88px] mt-2 text-[#858585] font-dm text-[11px] font-normal leading-[1.25]">Photograph by Jim Watson / Getty</p>
              <button className="mb-[51px] flex h-[43px] items-center gap-[9px] border-0 bg-transparent p-0 text-[14px] text-[#111]" aria-label="Listen to this story"><span className="relative mr-1 h-[43px] w-[43px] rounded-full border border-[#d3d3d3] after:absolute after:left-[17px] after:top-[13px] after:border-y-[8px] after:border-l-[11px] after:border-y-transparent after:border-l-[#111]" aria-hidden="true" /><strong>Listen</strong><span>•</span><span className="text-[#777]">15 minutes</span></button>
              <p className={`${articleParagraphClass} first-letter:float-left first-letter:pt-[7px] first-letter:pr-[7px] first-letter:font-tny-irvin first-letter:text-[70px] first-letter:leading-[.7]`}>This month, at an Oval Office event resounding with outlandish statements, President Trump signed an executive order called “Delivering Gold Standard Childhood Vaccine Recommendations for Americans.” His order cut the number of vaccines the federal government recommends for all children from seventeen to eleven. It threatened legal action against states that don’t grant expansive exemptions from vaccine mandates. And it proposed that the vaccine against measles, mumps, and rubella (M.M.R.), which is currently combined to curb costs and reduce the total number of injections that children receive, be separated into three different shots.</p>
              <p className={articleParagraphClass}>In his remarks, Trump repeated a debunked theory that vaccines are linked to rising autism rates. He claimed, incorrectly, that doctors were injecting doses “the size of a bottle of soda” into tiny bodies, and argued that the M.M.R. shot “can be explosive” and “quite lethal.” (M.M.R. vaccines have been administered hundreds of millions of times, and have contributed to saving millions of lives while causing meaningful side effects in only the tiniest minority of cases.) During the event, he made sure to thank “the man who has done more than perhaps anyone else to bring about this real revolution”—the Secretary of Health and Human Services, Robert F. Kennedy, Jr.</p>
              <p className={articleParagraphClass}>Trump’s executive order, which was not supported by any major independent medical organization, is perhaps the Administration’s most forthright attempt yet to upend federal vaccine recommendations. It has been touted as a major victory for R.F.K., Jr., whose time as Health Secretary has dismayed the public-health community. Under Kennedy, vaccine skeptics have been elevated to prominent positions and public-health agencies have suppressed the publication of scientific reports that diverge from his preferred narrative. (Officials have said that the reports were pulled owing to methodological concerns.) Parents are increasingly asking pediatricians to delay, space out, or altogether forgo immunizations for their children. State lawmakers have introduced hundreds of bills to weaken immunization rules and access, or to undermine trust in vaccines. There’s been a sharp uptick in the number of kindergarteners deemed exempt from such mandates; in some states, more than one in every eight remains unvaccinated against a preventable disease. Under the second Trump Administration, the United States has recorded more measles cases than it did in the preceding twenty-eight years.</p>
              <p className={articleParagraphClass}>It’s reasonable to worry that the R.F.K., Jr., era has set American science and medicine back in ways that might not be corrected for years, if ever. Yet it’s also possible to read Kennedy’s efforts, especially the new vaccine recommendations, less as triumphs than as flailing attempts to enact an unwelcome vision. Kennedy and his agenda are hardly popular. Public trust in the agencies he leads has fallen. The latest order, like prior attempts to undermine established vaccine guidance, will surely face legal challenges that limit its scope and impact.</p>
              <p className={articleParagraphClass}>Kennedy has argued that “there is no vaccine that is, you know, safe and effective,” and that the COVID shot was the “deadliest vaccine ever made.” But, as the nation’s top health official, he has struggled to actualize his maximalist rhetoric in the way that other Administration officials have theirs. Trump’s Department of Homeland Security says that it deported more than half a million people in the President’s first year back in office, sending some to countries they’ve never been to. The Department of Justice has launched pretextual prosecutions against the President’s political opponents. Elon Musk bragged about throwing U.S.A.I.D., an agency estimated to have saved millions of lives around the world, into a “wood chipper.” In the meantime, measles immunization rates among kindergarteners have fallen by less than one per cent. The share of kindergarteners with formal exemptions from vaccine mandates rose from 3.6 per cent to 4.2 per cent. These are troubling developments, to be sure, and enough to contribute to an unprecedented rise in infections. But, for now, we are not living in the worst-case scenarios that some envisioned when Kennedy took office. A year and a half into his tenure, is R.F.K., Jr., winning or losing?</p>
            </div>
          </section>
        </article>
      </main>
    </div>
  )
}
