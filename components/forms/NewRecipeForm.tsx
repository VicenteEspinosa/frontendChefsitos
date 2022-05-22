import Card from '../ui/Card'
import classes from './Form.module.css'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import UploadImageForm from './UploadImageForm'
import React, { useEffect, useState } from 'react'
import Item from './Item'
import { RecipeService } from '../../services/recipe.service'
import Alert from '../ui/Alert'

type RecipeSubmitForm = {
  name: string
  picture_url: string
  description: string
  private: boolean
  items: []
}

export default function NewRecipeForm() {
  const [showAlert, setShowAlert] = useState(false)
  const [itemsInfo, setItemsInfo] = useState<
    { url: undefined | string; body: undefined | string }[]
  >([{ url: undefined, body: undefined }])
  const handleDeleteItem = (orderNumber: number) => {
    setItemsInfo(itemsInfo.filter((value, index) => index !== orderNumber))
  }

  const handleItemChange = (
    orderNumber: number,
    url: string | undefined,
    body: string | undefined
  ) => {
    const newItemsInfo = [...itemsInfo]
    newItemsInfo[orderNumber] = { url, body }
    setItemsInfo(newItemsInfo)
  }
  const handleChangeForNextItem = (orderNumber: number) => {
    const newItemsInfo = [...itemsInfo]
    newItemsInfo[orderNumber] = itemsInfo[orderNumber + 1]
    newItemsInfo[orderNumber + 1] = itemsInfo[orderNumber]
    setItemsInfo(newItemsInfo)
  }
  useEffect(() => {
    const newItems = []
    for (let i = 0; i < itemsInfo.length; i++) {
      newItems.push(
        <Item
          url={itemsInfo[i].url}
          body={itemsInfo[i].body}
          key={i}
          orderNumber={i}
          onChange={handleItemChange}
          onDelete={handleDeleteItem}
          onChangeForNextItem={handleChangeForNextItem}
          showChangeButton={i === itemsInfo.length - 1 ? false : true}
        />
      )
    }
    setItems(newItems)
  }, [itemsInfo])
  const [items, setItems] = useState([
    <Item
      key={0}
      orderNumber={0}
      url=""
      body=""
      onChange={handleItemChange}
      onDelete={handleDeleteItem}
      onChangeForNextItem={handleChangeForNextItem}
    />,
  ])
  const [pictureUrl, setPictureUrl] = useState('')
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    description: Yup.string(),
    private: Yup.boolean().default(false),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeSubmitForm>({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = async (data: RecipeSubmitForm) => {
    if (itemsInfo.some((item) => !item.url && !item.body)) {
      setShowAlert(true)
      return
    }
    setShowAlert(false)
    try {
      await RecipeService.create({
        ...data,
        picture_url: pictureUrl,
        items: itemsInfo.map((item, index) => ({
          ...item,
          order_number: index,
        })),
      })
    } catch (error) {
      throw error
    }
  }

  const onPictureUpload = (url: string) => {
    setPictureUrl(url)
  }

  const addItem = () => {
    const newItemsInfo = [...itemsInfo]
    newItemsInfo.push({ url: '', body: '' })
    setItemsInfo(newItemsInfo)
  }

  return (
    <Card>
      <div className={classes.form}>
        <div className="flex">
          <div className="left">
            <div className={classes.control}>
              <label>Nombre</label>
              <input type="text" {...register('name')} />
              <div className={classes['invalid-feedback']}>
                {errors.name?.message}
              </div>
            </div>

            <div className={classes.control}>
              <label>Descripción</label>
              <textarea {...register('description')} />
            </div>
            <div className={classes.control}>
              <div className={classes.checkbox}>
                <input type="checkbox" {...register('private')} />
                <label>Privada</label>
              </div>
            </div>
          </div>
          <div className={classes.picture}>
            <UploadImageForm
              handleUpload={onPictureUpload}
              showImagePreview={true}
            />
          </div>
        </div>

        <label> Instrucciones</label>
        <Alert
          class="warning"
          message="Las instrucciones deben tener una imagen o una descripción"
          hidden={!showAlert}
        />
        <div>{items}</div>
        <button onClick={addItem}>Agregar instrucción</button>
        <div className={classes.actions}>
          <button onClick={handleSubmit(onSubmit)}>Publicar</button>
        </div>
      </div>
    </Card>
  )
}
