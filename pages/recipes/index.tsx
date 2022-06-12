import Recipes from '../../components/recipes/Recipes'
import AuthContext from '../../contexts/auth-context'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function MyRecipesPage() {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  useEffect(() => {
    if (!authContext.user) {
      router.push('/login')
    }
  })

  return <Recipes />
}
