import { IncomingMessage } from 'http'
import App, { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import './globals.css'
import { UAParser } from 'ua-parser-js'
import { AppContextType } from 'next/dist/shared/lib/utils'
import { Router, useRouter } from 'next/router'
import { UserService } from '../services/user.service'
import { useState } from 'react'
import AuthContext from '../contexts/auth-context'

function MyApp({ Component, pageProps }: AppProps) {
  const [loggedIn, setLoggedIn] = useState(UserService.isLogged())
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

MyApp.getInitialProps = async (appContext: AppContextType<Router>) => {
  const appProps = await App.getInitialProps(appContext)
  if (appContext.ctx.req) {
    appProps.pageProps.isMobile = await isMobileFunction(appContext.ctx.req)
  }
  return { ...appProps }
}

const isMobileFunction = async (req: IncomingMessage) => {
  let userAgent
  if (req) {
    userAgent = UAParser(req.headers['user-agent'] || '')
  } else {
    userAgent = new UAParser().getResult()
  }

  return userAgent?.device?.type === 'mobile'
}

export default MyApp
