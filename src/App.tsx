import { useEffect, useState } from 'react'
import ArticlePage from './ArticlePage'
import GamesPage from './GamesPage'
import CataloguesPage from './CataloguesPage'
import HomePage from './HomePage'
import TaskCompletionToast from './TaskCompletionToast'

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

  const page = path === articlePath
    ? <ArticlePage onHome={() => navigate('/')} onGames={() => navigate(gamesPath)} />
    : path === gamesPath
      ? <GamesPage onHome={() => navigate('/')} onGames={() => navigate(gamesPath)} onCatalogues={() => navigate(cataloguesPath)} />
      : path === cataloguesPath
        ? <CataloguesPage onHome={() => navigate('/')} onGames={() => navigate(gamesPath)} />
        : <HomePage onArticleClick={() => navigate(articlePath)} onGamesClick={() => navigate(gamesPath)} />

  return <>
    {page}
    <TaskCompletionToast />
  </>
}

export default App
