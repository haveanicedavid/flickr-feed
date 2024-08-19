import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

const THEME_KEY = 'data-bs-theme'

export function DarkModeToggle() {
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
    <Form.Check
      type="switch"
      id="dark-mode-switch"
      label="Dark Mode"
      checked={isDarkMode}
      onChange={toggleDarkMode}
      className="ms-3"
    />
  )
}
