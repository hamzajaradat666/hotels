import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AppHeader from '../components/AppHeader'
function MyApp({ Component, pageProps }: AppProps) {
  return (
        <div className='p-1 sm:p-12 fadeIn'>
        <AppHeader>
          <Component {...pageProps} />
        </AppHeader>
        </div>
  )


}

export default MyApp;
