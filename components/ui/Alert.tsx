import classes from './Alert.module.css'
export default function Alert(props: {
  class: string
  message: string
  hidden: boolean
}) {
  return (
    <div hidden={props.hidden} className={`${props.class} ${classes.div}`}>
      {props.message}
    </div>
  )
}
