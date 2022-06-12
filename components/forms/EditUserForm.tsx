import Card from '../ui/Card'
import classes from './Form.module.css'

import { useForm } from 'react-hook-form'
import { EditUserDto } from '../../dtos/user.dto'
import Alert from '../ui/Alert'
import Link from 'next/link'

type UserSubmitForm = {
  username?: string
  email?: string
  firstName?: string
  lastName?: string
  description?: string
  pictureUrl?: string
}

export default function EditUserForm(props: {
  isMobile: boolean
  onEditUser: (data: EditUserDto) => void
  showAlert: boolean
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitForm>({})

  const onSubmit = (data: UserSubmitForm) => {
    props.onEditUser({
      username: data.username,
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      picture_url: data.pictureUrl,
      description: data.description,
    })
  }

  return (
    <Card>
      <Alert
        class="warning"
        message="El nombre de usuario ya está en uso, por favor elija otro"
        hidden={!props.showAlert}
      />
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={props.isMobile ? classes['w-full'] : 'left'}>
          <div className={classes.control}>
            <label>Nombre de usuario</label>
            <input type="text" {...register('username')} />
            <div className={classes['invalid-feedback']}>
              {errors.username?.message}
            </div>
          </div>

          <div className={classes.control}>
            <label>Email</label>
            <input type="text" {...register('email')} />
            <div className={classes['invalid-feedback']}>
              {errors.email?.message}
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
            <label>Descripcion</label>
            <input type="text" {...register('description')} />
            <div className={classes['invalid-feedback']}>
              {errors.description?.message}
            </div>
          </div>

          <div className={classes.control}>
            <label>Url imagen de perfil</label>
            <input type="text" {...register('pictureUrl')} />
            <div className={classes['invalid-feedback']}>
              {errors.pictureUrl?.message}
            </div>
          </div>
        </div>
        <div className={classes.actions}>
          <button>Editar perfil</button>
        </div>
        {props.isMobile && (
          <div className={classes.link}>
            <p> o </p>
            <Link href="/profile">Cambiar datos</Link>
          </div>
        )}
      </form>
    </Card>
  )
}
