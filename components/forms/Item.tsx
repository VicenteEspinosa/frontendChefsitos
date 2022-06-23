import { useEffect, useRef } from 'react'
import classes from './Item.module.css'
import UploadImageForm from './UploadImageForm'
import DeleteIcon from '@mui/icons-material/Delete'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'

export default function Item(props: {
  orderNumber: number
  url?: string
  body?: string
  onChange: (
    orderNumber: number,
    url: string | undefined,
    body: string | undefined
  ) => void
  onDelete: (orderNumber: number) => void
  onChangeForNextItem: (orderNumber: number) => void
  showChangeButton?: boolean
}) {
  useEffect(() => {
    if (!props.body) {
      bodyRef.current!.value = ''
    }
  })
  const bodyRef = useRef<HTMLTextAreaElement>(null)
  const remove = () => {
    props.onDelete(props.orderNumber)
  }
  const uploadImage = (url: string) => {
    props.onChange(props.orderNumber, url, props.body)
  }
  const handleBodyChange = () => {
    props.onChange(props.orderNumber, props.url, bodyRef.current!.value)
  }
  const changeForNextItem = () => {
    props.onChangeForNextItem(props.orderNumber)
  }
  return (
    <div className={classes.item}>
      <div className={classes['order-number']}>{props.orderNumber + 1}.</div>
      <textarea className='item-field' ref={bodyRef} onChange={handleBodyChange} value={props.body} />
      <div className="flex">
        <div className="left">
          <UploadImageForm
            image={props.url}
            showImagePreview={true}
            handleUpload={uploadImage}
          />
        </div>
        <div className={classes['delete-button-container']}>
          <button className={classes.button} onClick={remove}>
            <DeleteIcon />
          </button>
        </div>
      </div>
      {props.showChangeButton && (
        <div className="center">
          <button className={classes.button} onClick={changeForNextItem}>
            <ChangeCircleIcon />
          </button>
        </div>
      )}
    </div>
  )
}
