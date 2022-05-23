interface NewRecipeDto {
  name: string
  picture_url?: string
  description?: string
  items: Item[]
  private: boolean
}

interface Item {
  url?: string
  body?: string
  order_number: number
}

export type { NewRecipeDto }
