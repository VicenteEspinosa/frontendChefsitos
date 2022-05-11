interface NewUserDto {
  username: string
  first_name: string
  last_name: string
  email: string
  password: string
}

interface LogUserDto {
  username: string
  password: string
}

export type { NewUserDto, LogUserDto }
