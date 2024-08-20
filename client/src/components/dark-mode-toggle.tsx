import { useEffect, useState } from 'react'
import { Moon, Sun } from 'react-bootstrap-icons'

const THEME_KEY = 'data-bs-theme'

export function DarkModeToggle({ className = '' }: { className?: string }) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setIsDarkMode(savedTheme === 'dark')
    document.body.setAttribute(THEME_KEY, savedTheme || 'light')
  }, [])

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark'
    setIsDarkMode(!isDarkMode)
    document.body.setAttribute(THEME_KEY, newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <button
      onClick={toggleDarkMode}
      className={`btn btn-link p-0 ${className}`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun size={18} color="var(--bs-body-color)" />
      ) : (
        <Moon size={18} color="var(--bs-body-color)" />
      )}
    </button>
  )
}
