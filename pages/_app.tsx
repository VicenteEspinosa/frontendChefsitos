import { IncomingMessage } from 'http'
import App, { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import './globals.css'
import { UAParser } from 'ua-parser-js'
import { AppContextType } from 'next/dist/shared/lib/utils'
import { Router } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout isMobile={pageProps.isMobile}>
      <Component {...pageProps} />
    </Layout>
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
