import { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import './globals.css'
import { useRouter } from 'next/router'
import { UserService } from '../services/user.service'
import { useState } from 'react'
import AuthContext from '../contexts/auth-context'
import { useMediaQuery } from 'react-responsive'

function MyApp({ Component, pageProps }: AppProps) {
  const [loggedIn, setLoggedIn] = useState(UserService.isLogged())
  pageProps.isMobile = useMediaQuery({ query: `(max-width: 600px)` })
  const router = useRouter()
  async function onLogout() {
    await UserService.signout()
    setLoggedIn(false)
    router.push('/login')
  }
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      <Layout isMobile={pageProps.isMobile} onLogout={onLogout}>
        <Component {...pageProps} />
      </Layout>
    </AuthContext.Provider>
  )
}

export default MyApp
