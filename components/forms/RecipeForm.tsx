import Card from '../ui/Card'
import baseClasses from './Form.module.css'
import classes from './NewRecipeForm.module.css'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import UploadImageForm from './UploadImageForm'
import React, { useEffect, useState } from 'react'
import Item from './Item'
import { Recipe, RecipeService } from '../../services/recipe.service'
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

export default function RecipeForm(props: {
  isMobile: boolean
  recipe?: Recipe
}) {
  const router = useRouter()
  const [alertMsg, setAlertMsg] = useState<string>('')
  const [itemsInfo, setItemsInfo] = useState<
    { url: undefined | string; body: undefined | string }[]
  >(props.recipe ? props.recipe.items : [{ url: undefined, body: undefined }])
  const handleDeleteItem = (orderNumber: number) => {
    setItemsInfo(itemsInfo.filter((value, index) => index !== orderNumber))
  }
  const [tagIds, setTagIds] = useState<number[]>(
    props.recipe ? props.recipe.tags.map((tag) => tag.tag_id) : []
  )
  const [ingredients, setIngredients] = useState<IngredientItem[]>(
    props.recipe
      ? props.recipe.ingredients.map((item) => ({
          quantity: item.quantity,
          measurement_id: item.measurement_id,
          ingredient_id: item.ingredient_id,
        }))
      : [
          {
            quantity: null,
            measurement_id: null,
            ingredient_id: null,
          },
        ]
  )
  const handleIngredientChange = (
    index: number,
    quantity?: number | null,
    measurement_id?: number | null,
    ingredient_id?: number | null
  ) => {
    const newIngredients = [...ingredients]
    if (quantity !== undefined) {
      newIngredients[index].quantity = quantity
    }
    if (measurement_id !== undefined) {
      newIngredients[index].measurement_id = measurement_id
    }
    if (ingredient_id !== undefined) {
      newIngredients[index].ingredient_id = ingredient_id
    }
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
          initialValues={props.recipe ? props.recipe.ingredients[i] : undefined}
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
  const [pictureUrl, setPictureUrl] = useState(
    props.recipe ? props.recipe.picture_url : ''
  )
  const [recipeName, setRecipeName] = useState(
    props.recipe ? props.recipe.name : ''
  )
  const [recipeDescription, setRecipeDescription] = useState(
    props.recipe ? props.recipe.description : ''
  )
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('El nombre es requerido')
      .default(props.recipe?.name),
    description: Yup.string().default(props.recipe?.description),
    private: Yup.boolean().default(props.recipe ? props.recipe.private : false),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeSubmitForm>({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = async (data: RecipeSubmitForm) => {
    const ingredients_ids = ingredients.map((ingredient) => {
      return ingredient.ingredient_id
    })
    if (!itemsInfo.length || !ingredients.length) {
      setAlertMsg(
        'Tu receta debe contener por lo menos una o más instrucciones y uno o más ingredientes'
      )
      return
    }
    if (new Set(ingredients_ids).size !== ingredients_ids.length) {
      setAlertMsg('No puedes tener ingredientes repetidos')
      return
    }
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
      const recipeData = {
        ...data,
        name: recipeName,
        description: recipeDescription,
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
      }
      let recipe
      if (props.recipe) {
        recipe = await RecipeService.edit(props.recipe.id, recipeData)
      } else {
        recipe = await RecipeService.create(recipeData)
      }
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
        <div className="flex">
          <div className="left">
            <div className={baseClasses.control}>
              <label>Nombre</label>
              <input
                className='name-field'
                type="text"
                {...register('name')}
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
              />
              <div className={baseClasses['invalid-feedback']}>
                {errors.name?.message}
              </div>
            </div>

            <div className={baseClasses.control}>
              <label>Descripción</label>
              <textarea
                {...register('description')}
                value={recipeDescription}
                onChange={(e) => setRecipeDescription(e.target.value)}
              />
            </div>
            <div className={baseClasses.control}>
              <div className={baseClasses.checkbox}>
                <input
                  type="checkbox"
                  {...register('private')}
                  defaultChecked={props.recipe ? props.recipe.private : false}
                />
                <label>Privada</label>
              </div>
            </div>
          </div>
          <div className={baseClasses.picture}>
            <UploadImageForm
              image={props.recipe?.picture_url}
              handleUpload={onPictureUpload}
              showImagePreview={true}
            />
          </div>
        </div>
        <div className={classes.tags}>
          <TagSelector
            initialValues={tagIds}
            onSelectionChange={handleTagsChange}
            isMobile={props.isMobile}
          />
        </div>
        <Alert
          class="warning"
          message={alertMsg}
          hidden={alertMsg.length === 0}
        />
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
            className={`submit-button ${baseClasses['form-button']}`}
            onClick={handleSubmit(onSubmit)}
          >
            Publicar
          </button>
        </div>
      </div>
    </Card>
  )
}
