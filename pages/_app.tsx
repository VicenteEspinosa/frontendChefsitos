import { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import './globals.css'
import { useRouter } from 'next/router'
import { UserService } from '../services/user.service'
import { useState } from 'react'
import AuthContext from '../contexts/auth-context'
import { useMediaQuery } from 'react-responsive'

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(UserService.userValue)
  pageProps.isMobile = useMediaQuery({ query: `(max-width: 600px)` })
  const router = useRouter()
  async function onLogout() {
    await UserService.signout()
    setUser(undefined)
    router.push('/login')
  }
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Layout isMobile={pageProps.isMobile} onLogout={onLogout}>
        <Component {...pageProps} />
      </Layout>
    </AuthContext.Provider>
  )
}

export default MyApp
