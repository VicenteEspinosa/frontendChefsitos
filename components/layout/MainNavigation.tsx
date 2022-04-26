import classes from './MainNavigation.module.css'
import Link from 'next/link'

function MainNavigation(props: { isMobile: boolean }) {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>RecipeLib</div>
      <nav hidden={props.isMobile}>
        <ul>
          <li>
            <Link href="/">Iniciar sesión</Link>
          </li>
          <li>
            <Link href="/">Registrase</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
