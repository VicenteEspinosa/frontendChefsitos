import Card from '../ui/Card'
import classes from './NewUserForm.module.css'

// export default function NewUserForm(props = { onAddUser: Function() }) {
//   const usernameInputRef = useRef<HTMLInputElement>(null)
//   const confirmatedUsernameInputRef = useRef<HTMLInputElement>(null)
//   const firstNameInputRef = useRef<HTMLInputElement>(null)
//   const lastNameInputRef = useRef<HTMLInputElement>(null)
//   const emailInputRef = useRef<HTMLInputElement>(null)
//   const passwordInputRef = useRef<HTMLInputElement>(null)
//   const confirmatedEmailInputRef = useRef<HTMLInputElement>(null)
//   const confirmatedPasswordInputRef = useRef<HTMLInputElement>(null)

//   function submitHandler(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault()

//     const enteredUsername = usernameInputRef!.current!.value
//     const enteredConfirmatedUsername =
//       confirmatedUsernameInputRef.current!.value
//     const enteredFirstName = firstNameInputRef.current!.value
//     const enteredLastName = lastNameInputRef.current!.value
//     const enteredEmail = emailInputRef.current!.value
//     const enteredPassword = passwordInputRef.current!.value
//     const enteredConfirmatedEmail = confirmatedEmailInputRef.current!.value
//     const enteredConfirmatedPassword =
//       confirmatedPasswordInputRef.current!.value

//     const userData = {
//       username: enteredUsername,
//       name: enteredFirstName,
//       lastname: enteredLastName,
//       email: enteredEmail,
//       password: enteredPassword,
//     }

//     props.onAddUser(userData)
//   }

//   function validateUsername(event: ChangeEvent<HTMLInputElement>) {
//     if (event.target.value !== usernameInputRef.current?.value) {
//       event.target
//     } else {
//       console.log('bien')
//     }
//   }

//   return (
//     <Card>
//       <form className={classes.form} onSubmit={submitHandler}>
//         <div className={classes.control}>
//           <label htmlFor="username">Nombre de usuario</label>
//           <input type="text" required id="username" ref={usernameInputRef} />
//         </div>
//         <div className={classes.control}>
//           <label htmlFor="confirmatedUsername">
//             Confirma tu nombre de usuario
//           </label>
//           <input
//             type="text"
//             required
//             id="confirmatedUsername"
//             ref={confirmatedUsernameInputRef}
//             onChange={validateUsername}
//           />
//         </div>
//         <div className={classes.control}>
//           <label htmlFor="email">Email</label>
//           <input type="text" required id="email" ref={emailInputRef} />
//         </div>
//         <div className={classes.control}>
//           <label htmlFor="confirmatedEmail">Confirma tu email</label>
//           <input
//             type="text"
//             required
//             id="confirmatedEmail"
//             ref={confirmatedEmailInputRef}
//           />
//         </div>
//         <div className={classes.control}>
//           <label htmlFor="firstName">Nombre</label>
//           <input type="text" required id="firstName" ref={firstNameInputRef} />
//         </div>
//         <div className={classes.control}>
//           <label htmlFor="lastName">Apellido</label>
//           <input type="text" required id="lastName" ref={lastNameInputRef} />
//         </div>
//         <div className={classes.control}>
//           <label htmlFor="password">Constraseña</label>
//           <input
//             type="password"
//             required
//             id="password"
//             ref={passwordInputRef}
//           />
//         </div>
//         <div className={classes.control}>
//           <label htmlFor="confirmatedPassword">Confirma tu contraseña</label>
//           <input
//             type="password"
//             required
//             id="confirmatedPassword"
//             ref={confirmatedPasswordInputRef}
//           />
//         </div>
// ;<div className={classes.actions}>
//   <button>Registrar</button>
// </div>
//       </form>
//     </Card>
//   )
// }
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

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

export default function NewUserForm(props = { onAddUser: Function() }) {
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
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <div className={classes.actions}>
          <button>Registrar</button>
        </div>
      </form>
    </Card>
  )
}
