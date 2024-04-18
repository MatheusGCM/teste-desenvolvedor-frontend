import { ThemeProvider } from './components/theme/theme-provider'
import { Home } from './pages/home'

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="app-theme">
      <Home />
    </ThemeProvider>
  )
}
