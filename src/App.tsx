import { useEffect, useState } from 'react'
import ArticlePage from './ArticlePage'
import GamesPage from './GamesPage'
import CataloguesPage from './CataloguesPage'
import HomePage from './HomePage'

const articlePath = '/news/the-lede/is-rfk-jr-winning-or-losing'
const gamesPath = '/crossword-puzzles-and-games'
const cataloguesPath = '/puzzles-and-games-dept/catalogues/2026/08/25'

function App() {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const syncPath = () => setPath(window.location.pathname)
    window.addEventListener('popstate', syncPath)
    return () => window.removeEventListener('popstate', syncPath)
  }, [])

  const navigate = (destination: string) => {
    window.history.pushState({}, '', destination)
    setPath(destination)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  if (path === articlePath) {
    return <ArticlePage onHome={() => navigate('/')} onGames={() => navigate(gamesPath)} />
  }

  if (path === gamesPath) {
    return <GamesPage onHome={() => navigate('/')} onGames={() => navigate(gamesPath)} onCatalogues={() => navigate(cataloguesPath)} />
  }

  if (path === cataloguesPath) {
    return <CataloguesPage onHome={() => navigate('/')} onGames={() => navigate(gamesPath)} />
  }

  return <HomePage onArticleClick={() => navigate(articlePath)} onGamesClick={() => navigate(gamesPath)} />
}

export default App
