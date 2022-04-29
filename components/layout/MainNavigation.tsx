import classes from './MainNavigation.module.css'
import Link from 'next/link'
import AuthContext from '../../contexts/auth-context'

function MainNavigation(props: { isMobile: boolean; onLogout: () => void }) {
  function onLogoutClick() {
    props.onLogout()
  }
  return (
    <AuthContext.Consumer>
      {({ loggedIn }) => (
        <header className={classes.header}>
          <div className={classes.logo}>RecipeLib</div>
          <nav>
            {!props.isMobile && !loggedIn && (
              <ul>
                <li>
                  <Link href="/login">Iniciar sesión</Link>
                </li>
                <li>
                  <Link href="/register">Registrarse</Link>
                </li>
              </ul>
            )}
            {loggedIn && (
              <ul>
                <li>
                  <a onClick={onLogoutClick}>Cerrar sesión</a>
                </li>
              </ul>
            )}
          </nav>
        </header>
      )}
    </AuthContext.Consumer>
  )
}

export default MainNavigation
