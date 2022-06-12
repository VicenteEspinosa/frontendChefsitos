interface NewUserDto {
  username: string
  first_name: string
  last_name: string
  email: string
  password: string
}

interface EditUserDto {
  username?: string
  first_name?: string
  last_name?: string
  email?: string
  picture_url?: string
  description?: string
}

interface LogUserDto {
  username: string
  password: string
}

export type { NewUserDto, EditUserDto, LogUserDto }
