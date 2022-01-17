import { createGlobalStyle } from "styled-components"

interface ThemeStyles {
  body: string;
  text: string;
  background: string;
  container: string;
}

export interface GlobalStyle {
  theme: ThemeStyles;
}

export const lightTheme: ThemeStyles = {
  body: '#f5f5f5',
  text: '#1d1d1d',
  background: '#363537',
  container: 'white',
}

export const darkTheme: ThemeStyles = {
  body: '#363537',
  text: '#ffffff',
  background: '#1d1d1d',
  container : '#a9a9a9'
}

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }: GlobalStyle) => theme.body};
    color: ${({ theme }: GlobalStyle) => theme.text};
    transition: all 0.50s linear;
  }
`

interface ThemeSizes {
  sm: string;
  md: string;
  lg: string;
}

const size: ThemeSizes = {
  sm: '576px',
  md: '768px',
  lg: '1200px',
}

export const device : ThemeSizes = {
  sm: `(min-width: ${size.sm})`,
  md: `(min-width: ${size.md})`,
  lg: `(min-width: ${size.lg})`
}