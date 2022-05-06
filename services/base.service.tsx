import { ApiError } from '../infrastructure/errors/api.error'

enum RequestMethod {
  Get = 'GET',
  Post = 'POST',
}

async function request(
  pathPrefix: string,
  pathSufix: string,
  method: RequestMethod,
  body: string
) {
  const response = await fetch(
    `http://localhost:8000/api/${pathPrefix}${pathSufix}`,
    {
      body: body,
      headers: {
        'Content-Type': 'application/json',
      },
      method: method,
    }
  )
  const resJson = await response.json()
  if (!response.ok) {
    throw new ApiError(resJson)
  }
  return resJson
}

Request
const BaseService = { RequestMethod, request }
export default BaseService
