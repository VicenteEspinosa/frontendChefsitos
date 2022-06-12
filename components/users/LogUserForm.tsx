import { LogUserDto } from '../../dtos/user.dto'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import classes from './NewUserForm.module.css'
import Card from '../ui/Card'
import Alert from '../ui/Alert'
import Link from 'next/link'

export default function LogUserForm(props: {
  onLogUser: (data: LogUserDto) => void
  entityNotFound: boolean
  isMobile: boolean
}) {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('El nombre de usuario es requerido'),
    password: Yup.string().required('La contraseña es requerida'),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogUserDto>({
    resolver: yupResolver(validationSchema),
  })
  const onSubmit = (data: LogUserDto) => {
    props.onLogUser({
      username: data.username,
      password: data.password,
    })
  }

  return (
    <Card>
      <Alert
        hidden={!props.entityNotFound}
        class="warning"
        message="Tus credenciales están erroneas"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.control}>
          <label>Nombre de usuario</label>
          <input type="text" {...register('username')} />
          <div className={classes['invalid-feedback']}>
            {errors.username?.message}
          </div>
        </div>
        <div className={classes.control}>
          <label>Contraseña</label>
          <input type="password" {...register('password')} />
          <div className={classes['invalid-feedback']}>
            {errors.password?.message}
          </div>
        </div>
        <div className={classes.actions}>
          <button>Iniciar sesión</button>
        </div>
        {props.isMobile && (
          <div className={classes.link}>
            <p> o </p>
            <Link href="/register">Registrarse</Link>
          </div>
        )}
      </form>
    </Card>
  )
}
