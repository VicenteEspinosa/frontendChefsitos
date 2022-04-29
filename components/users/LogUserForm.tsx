import { LogUserDto } from '../../dtos/user.dto'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import classes from './NewUserForm.module.css'
import Card from '../ui/Card'

export default function LogUserForm(props: {
  onLogUser: (data: LogUserDto) => void
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
      </form>
    </Card>
  )
}
