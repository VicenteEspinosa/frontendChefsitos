import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import AuthContext from '../contexts/auth-context'

export default function Home() {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  useEffect(() => {
    if (!authContext.user) {
      router.push('/login')
    }
  })
  return (
    <AuthContext.Consumer>
      {({ user }) => (
        <div>
          {user && (
            <section>
              <h1>Bienvenido {user.first_name} a RecipeLib</h1>
            </section>
          )}
        </div>
      )}
    </AuthContext.Consumer>
  )
}
