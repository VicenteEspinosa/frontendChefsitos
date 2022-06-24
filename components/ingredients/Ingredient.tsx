import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  IngredientService,
  Ingredient,
  NewIngredient,
} from '../../services/ingredient.service'

export default function IngredientSelector(props: {
  initialId: number | undefined
  isMobile: boolean
  onSelectionChange: (ingredientId: number | null) => void
}) {
  const [data, setData] = useState([] as Ingredient[])
  const [ingredientChosen, setIngredientChosen] =
    React.useState<Ingredient | null>(null)
  const [open, toggleOpen] = React.useState(false)
  const [newIngredient, setnewIngredient] =
    React.useState<NewIngredient | null>(null)
  const [dialogValue, setDialogValue] = React.useState('')
  const formWidth = props.isMobile ? 2 / 2 : 2 / 2
  const filter = createFilterOptions<Ingredient>()

  useEffect(() => {
    getList()
  }, [])

  useEffect(() => {
    props.onSelectionChange(ingredientChosen ? ingredientChosen.id : null)
  }, [ingredientChosen])

  useEffect(() => {
    if (props.initialId) {
      const initialIngredient = data!.find(
        (ingredient) => props.initialId === ingredient.id
      )
      if (initialIngredient) {
        setIngredientChosen(initialIngredient)
      }
    }
  }, [props.initialId, data])

  const getList = async () => {
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
      console.log(error)
      return undefined
    }
  }

  const sendNewIngredient = async (ing: NewIngredient) => {
    const choiceNew = await IngredientService.postIngredient(ing)
    if (choiceNew) {
      setIngredientChosen(choiceNew)
    }
  }

  const handleClose = () => {
    setDialogValue('')
    toggleOpen(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setnewIngredient({
      name: dialogValue,
    })
    handleClose()
  }

  useEffect(() => {
    const fetchData = async () => {
      if (newIngredient) {
        await sendNewIngredient(newIngredient)
        await getList()
        setnewIngredient(null)
      }
    }
    fetchData()
  }, [newIngredient])

  return (
    <>
      <Autocomplete
        className="ingredients-field"
        value={ingredientChosen}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true)
              setDialogValue(newValue)
            })
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true)
            setDialogValue(newValue.inputValue)
          } else {
            setIngredientChosen(newValue)
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)
          const names = filtered.map((ing) => ing.name)
          if (
            params.inputValue !== '' &&
            !names.includes(params.inputValue.toLowerCase())
          ) {
            filtered.push({
              inputValue: params.inputValue,
              name: `*Añadir "${params.inputValue}"`,
              id: -1,
            })
          }
          return filtered
        }}
        id="grouped-ingredients"
        options={data.sort(
          (a, b) => -b.name.charAt(0).localeCompare(a.name.charAt(0))
        )}
        groupBy={(option) => option.name.charAt(0).toUpperCase()}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option
          }
          if (option.inputValue) {
            return option.inputValue
          }
          return option.name
        }}
        sx={{ width: formWidth }}
        renderInput={(params) => <TextField {...params} label="Ingrediente" />}
        clearOnBlur
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        freeSolo
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Nuevo ingrediente</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Falta algún ingrediente en nuestra lista? ¡Añádelo!
            </DialogContentText>
            <TextField
              inputProps={{ readOnly: true }}
              autoFocus
              variant="outlined"
              margin="dense"
              id="name"
              value={dialogValue}
              label="Nombre"
              type="text"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit">Añadir</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
