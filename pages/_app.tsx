import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AppHeader from '../components/AppHeader'
import { ThemeProvider } from '../contexts/ThemeContext'
function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider>
        <div className='p-1 sm:p-12 fadeIn'>
        <AppHeader>
          <Component {...pageProps} />
        </AppHeader>
        </div>
      </ThemeProvider>
  )


}

export default MyApp;
