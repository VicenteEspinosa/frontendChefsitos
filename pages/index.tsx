import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import AuthContext from '../contexts/auth-context'
import { UserService } from '../services/user.service'

export default function Home() {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  const user = UserService.userValue
  useEffect(() => {
    if (!authContext.loggedIn) {
      router.push('/login')
    }
  })
  return (
    <AuthContext.Consumer>
      {({ loggedIn }) => (
        <div>
          {loggedIn && (
            <section>
              <h1>Bienvenido {user.first_name} a RecipeLib</h1>
              <p>
                (This is a sample website - you’ll be building a site like this
                in <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
              </p>
            </section>
          )}
        </div>
      )}
    </AuthContext.Consumer>
  )
}
