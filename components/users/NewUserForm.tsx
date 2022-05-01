import Card from '../ui/Card'
import classes from './NewUserForm.module.css'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { NewUserDto } from '../../dtos/user.dto'
import Alert from '../ui/Alert'

type UserSubmitForm = {
  username: string
  confirmUsername: string
  email: string
  confirmEmail: string
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
}

export default function NewUserForm(props: {
  isMobile: boolean
  onAddUser: (data: NewUserDto) => void
  showAlert: boolean
}) {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('El nombre de usuario es requerido'),
    confirmUsername: Yup.string()
      .required('La confirmación de usuario es requerida')
      .oneOf(
        [Yup.ref('username'), null],
        'La confirmación no calza con el usuario'
      ),
    email: Yup.string().required('El email es requerido'),
    confirmEmail: Yup.string()
      .required('La confirmación de email es requerida')
      .oneOf([Yup.ref('email'), null], 'La confirmación no calza con el email'),
    firstName: Yup.string().required('El nombre es requerido'),
    lastName: Yup.string().required('El apellido es requerido'),
    password: Yup.string().required('La contraseña es requerida'),
    confirmPassword: Yup.string()
      .required('La confirmación de contraseña es requerida')
      .oneOf(
        [Yup.ref('password'), null],
        'La confirmación no calza con la contraseña'
      ),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (data: UserSubmitForm) => {
    props.onAddUser({
      username: data.username,
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
    })
  }

  return (
    <Card>
      <Alert
        class="warning"
        message="El nombre de usuario ya está en uso, por favor elija otro"
        hidden={!props.showAlert}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={props.isMobile ? '' : classes.left}>
          <div className={classes.control}>
            <label>Nombre de usuario</label>
            <input type="text" {...register('username')} />
            <div className={classes['invalid-feedback']}>
              {errors.username?.message}
            </div>
          </div>

          <div className={classes.control}>
            <label>Confirmar nombre de usuario</label>
            <input type="text" {...register('confirmUsername')} />
            <div className={classes['invalid-feedback']}>
              {errors.confirmUsername?.message}
            </div>
          </div>

          <div className={classes.control}>
            <label>Email</label>
            <input type="text" {...register('email')} />
            <div className={classes['invalid-feedback']}>
              {errors.email?.message}
            </div>
          </div>

          <div className={classes.control}>
            <label>Confirmar email</label>
            <input type="text" {...register('confirmEmail')} />
            <div className={classes['invalid-feedback']}>
              {errors.confirmEmail?.message}
            </div>
          </div>
        </div>
        <div>
          <div className={classes.control}>
            <label>Nombre</label>
            <input type="text" {...register('firstName')} />
            <div className={classes['invalid-feedback']}>
              {errors.firstName?.message}
            </div>
          </div>

          <div className={classes.control}>
            <label>Apellido</label>
            <input type="text" {...register('lastName')} />
            <div className={classes['invalid-feedback']}>
              {errors.lastName?.message}
            </div>
          </div>

          <div className={classes.control}>
            <label>Contraseña</label>
            <input type="password" {...register('password')} />
            <div className={classes['invalid-feedback']}>
              {errors.password?.message}
            </div>
          </div>
          <div className={classes.control}>
            <label>Confirmar contraseña</label>
            <input type="password" {...register('confirmPassword')} />
            <div className={classes['invalid-feedback']}>
              {errors.confirmPassword?.message}
            </div>
          </div>
        </div>
        <div className={classes.actions}>
          <button>Registrar</button>
        </div>
      </form>
    </Card>
  )
}
