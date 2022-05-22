import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IngredientService, Ingredient } from '../../services/ingredient.service'

export default function IngredientSelector(props: {
  isMobile: boolean
}) {
  const [data, setData] = useState([] as Ingredient[])
  const [ingredientChosen, setIngredientChosen] = React.useState<Ingredient | null>(null);
  const [newIngredient, setnewIngredient] = React.useState<string | null>(null);
  const formWidth = props.isMobile ? 2/5 : 1/5

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    const preload = IngredientService.ingredientArrayValue
    if (preload) {
      setData(preload)
      return 
    }
    const fetchLoad = await onIngredientFetch()
    if (fetchLoad) {
      setData(fetchLoad)
    }
    return
  }

  async function onIngredientFetch() {
    try {
      const ingredientArray = await IngredientService.getAllIngredients()
      if (ingredientArray) {
        return ingredientArray
      }
    } catch (error) {
      console.log("Error en linea 40 de Ingredient.tsx")
      console.log(error)
      return undefined
    }
  }

  return (
    <>
      <Autocomplete
        onChange={(event: object, value: Ingredient | null, reason: string) => {
          console.log(typeof event)
          if (reason === "selectOption") {
            setIngredientChosen(value)
          }
          else if (reason === "clear") {
            setIngredientChosen(null)
          }
        }}
        id="grouped-ingredients"
        options={
          data.sort(
            (a, b) => -b.name.charAt(0).localeCompare(a.name.charAt(0))
          )
        }
        groupBy={(option) => option.name.charAt(0).toUpperCase()}
        getOptionLabel={(option) => option.name}
        sx={{ width: formWidth}}
        renderInput={(params) => <TextField {...params} label="Ingrediente" />}
      />
      <div>{`Valor escogido: ${JSON.stringify(ingredientChosen)}`}</div>
    </>
  )
}