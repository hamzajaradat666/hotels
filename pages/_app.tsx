import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AppHeader from '../components/AppHeader'
import { ThemeProvider } from '../contexts/ThemeContext'
function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider>
        <div style={{padding:"20px"}}>
        <AppHeader>
          <Component {...pageProps} />
        </AppHeader>
        </div>
      </ThemeProvider>
  )


}

export default MyApp;
