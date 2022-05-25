interface NewRecipeDto {
  name: string
  picture_url?: string
  description?: string
  items: Item[]
  private: boolean
  tagIds: number[]
  ingredients: {
    quantity: number
    measurement_id: number
    ingredient_id: number
  }[]
}

interface EditRecipeDto {
  name?: string
  picture_url?: string
  description?: string
  items?: Item[]
  private?: boolean
  tagIds?: number[]
  ingredients?: {
    quantity: number
    measurement_id: number
    ingredient_id: number
  }[]
}

interface Item {
  url?: string
  body?: string
  order_number: number
}

export type { NewRecipeDto, EditRecipeDto }
