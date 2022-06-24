import classes from './MainNavigation.module.css'
import Link from 'next/link'
import AuthContext from '../../contexts/auth-context'

function MainNavigation(props: { isMobile: boolean; onLogout: () => void }) {
  function onLogoutClick() {
    props.onLogout()
  }
  return (
    <AuthContext.Consumer>
      {({ user }) => (
        <header className={classes.header}>
          <div className={classes.logo}>RecipeLib</div>
          <nav>
            {!props.isMobile && !user && (
              <ul>
                <li>
                  <Link href="/login">Iniciar sesión</Link>
                </li>
                <li>
                  <Link href="/register">Registrarse</Link>
                </li>
              </ul>
            )}
            {user && (
              <ul>
                <li className="recipes-link">
                  <Link href="/recipes">Recetas</Link>
                </li>
                <li>
                  <Link href="/profile">Mi Perfil</Link>
                </li>
                <li className="new-recipe-link">
                  <Link href="/recipes/new">Crear receta</Link>
                </li>
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
