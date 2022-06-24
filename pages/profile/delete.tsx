import { UserService } from '../../services/user.service'
import React, { useContext, useEffect } from 'react'
import AuthContext from '../../contexts/auth-context'
import { ApiError } from '../../infrastructure/errors/api.error'
import { InternalCode } from '../../infrastructure/errors/internal-codes'
import { useRouter } from 'next/router'

export default function DeleteUser() {
  const router = useRouter()
  const authContext = useContext(AuthContext)
  async function DelUser() {
    try {
      await UserService.delete_user()
      authContext.setUser!(undefined)
      router.push('/')
    } catch (error) {
      if (error instanceof ApiError) {
        if (
          error.internalCode == InternalCode.EntityNotProcesable &&
          error.path == 'username'
        ) {
          return
        }
      }
      throw error
    }
  }
  useEffect(() => {
    DelUser()
  })

  return <></>
}
