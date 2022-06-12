import { ReactNode } from 'react'
import classes from './Layout.module.css'
import MainNavigation from './MainNavigation'

function Layout(props: {
  children?: ReactNode
  isMobile: boolean
  onLogout: () => void
}) {
  return (
    <div>
      <MainNavigation isMobile={props.isMobile} onLogout={props.onLogout} />
      <main className={classes.main}>{props.children}</main>
    </div>
  )
}

export default Layout
