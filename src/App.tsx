import { useEffect, useState } from 'react'
import ArticlePage from './ArticlePage'
import HomePage from './HomePage'

const articlePath = '/news/the-lede/is-rfk-jr-winning-or-losing'

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
    return <ArticlePage onHome={() => navigate('/')} />
  }

  return <HomePage onArticleClick={() => navigate(articlePath)} />
}

export default App
