import Card from '../ui/Card'
import baseClasses from './Form.module.css'
import classes from './NewRecipeForm.module.css'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import UploadImageForm from './UploadImageForm'
import React, { useEffect, useState } from 'react'
import Item from './Item'
import { RecipeService } from '../../services/recipe.service'
import Alert from '../ui/Alert'
import TagSelector from '../tags/Tag'
import IngredientContainer from './IngredientContainer'
import { useRouter } from 'next/router'

type RecipeSubmitForm = {
  name: string
  picture_url: string
  description: string
  private: boolean
  items: []
}

type IngredientItem = {
  quantity: number | null
  measurement_id: number | null
  ingredient_id: number | null
}

export default function NewRecipeForm(props: { isMobile: boolean }) {
  const router = useRouter()
  const [alertMsg, setAlertMsg] = useState<string>('')
  const [itemsInfo, setItemsInfo] = useState<
    { url: undefined | string; body: undefined | string }[]
  >([{ url: undefined, body: undefined }])
  const handleDeleteItem = (orderNumber: number) => {
    setItemsInfo(itemsInfo.filter((value, index) => index !== orderNumber))
  }
  const [tagIds, setTagIds] = useState<number[]>([])
  const [ingredients, setIngredients] = useState<IngredientItem[]>([
    {
      quantity: null,
      measurement_id: null,
      ingredient_id: null,
    },
  ])
  const handleIngredientChange = (info: IngredientItem, index: number) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = info
    setIngredients(newIngredients)
  }
  const handleIngredientRemove = (ingredientIndex: number) => {
    setIngredients(
      ingredients.filter((value, index) => index !== ingredientIndex)
    )
  }
  useEffect(() => {
    const newIngredientComponents = []
    for (let i = 0; i < ingredients.length; i++) {
      newIngredientComponents.push(
        <IngredientContainer
          key={i}
          isMobile={props.isMobile}
          index={i}
          info={ingredients[i]}
          onChange={handleIngredientChange}
          onRemove={handleIngredientRemove}
        />
      )
    }
    setIngredientComponents(newIngredientComponents)
  }, [ingredients])
  const [ingredientComponents, setIngredientComponents] = useState<
    React.ReactElement[]
  >([])

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
  const [items, setItems] = useState<React.ReactElement[]>([])
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
      setAlertMsg('Las instrucciones deben tener una imagen o una descripción')
      return
    }
    if (
      ingredients.some(
        (item) => !item.quantity || !item.measurement_id || !item.ingredient_id
      )
    ) {
      setAlertMsg('Debes completar todos los campos de los ingredientes')
      return
    }
    setAlertMsg('')
    try {
      const recipe = await RecipeService.create({
        ...data,
        picture_url: pictureUrl,
        items: itemsInfo.map((item, index) => ({
          ...item,
          order_number: index,
        })),
        tagIds,
        ingredients: ingredients.map((item: IngredientItem) => ({
          ingredient_id: item.ingredient_id!,
          measurement_id: item.measurement_id!,
          quantity: item.quantity!,
        })),
      })
      router.push(`/recipes/${recipe.id}`)
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

  const handleTagsChange = (ids: number[]) => {
    setTagIds(ids)
  }

  const addIngredient = () => {
    const newIngredients = [...ingredients]
    newIngredients.push({
      measurement_id: null,
      ingredient_id: null,
      quantity: null,
    })
    setIngredients(newIngredients)
  }

  return (
    <Card>
      <div className={baseClasses.form}>
        <Alert
          class="warning"
          message={alertMsg}
          hidden={alertMsg.length === 0}
        />
        <div className="flex">
          <div className="left">
            <div className={baseClasses.control}>
              <label>Nombre</label>
              <input type="text" {...register('name')} />
              <div className={baseClasses['invalid-feedback']}>
                {errors.name?.message}
              </div>
            </div>

            <div className={baseClasses.control}>
              <label>Descripción</label>
              <textarea {...register('description')} />
            </div>
            <div className={baseClasses.control}>
              <div className={baseClasses.checkbox}>
                <input type="checkbox" {...register('private')} />
                <label>Privada</label>
              </div>
            </div>
          </div>
          <div className={baseClasses.picture}>
            <UploadImageForm
              handleUpload={onPictureUpload}
              showImagePreview={true}
            />
          </div>
        </div>
        <div className={classes.tags}>
          <TagSelector
            onSelectionChange={handleTagsChange}
            isMobile={props.isMobile}
          />
        </div>
        <div className={classes.ingredients}>
          <label> Ingredientes</label>
          {ingredientComponents}
          <button
            className={baseClasses['form-button']}
            onClick={addIngredient}
          >
            Agregar ingrediente
          </button>
        </div>
        <label> Instrucciones</label>
        <div>{items}</div>
        <button className={baseClasses['form-button']} onClick={addItem}>
          Agregar instrucción
        </button>
        <div className={baseClasses.actions}>
          <button
            className={baseClasses['form-button']}
            onClick={handleSubmit(onSubmit)}
          >
            Publicar
          </button>
        </div>
      </div>
    </Card>
  )
}
