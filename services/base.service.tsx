import { ApiError } from '../infrastructure/errors/api.error'

enum RequestMethod {
  Get = 'GET',
  Post = 'POST',
  Delete = 'DELETE',
  Put = 'PUT',
}

async function request(
  pathPrefix: string,
  pathSufix: string,
  method: RequestMethod,
  body: string
) {
  const content: {
    [index: string]: string | RequestMethod | { [index: string]: string }
  } = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: method,
    credentials: 'include',
  }
  if (body.length) content['body'] = body
  const response = await fetch(
    `http://localhost:8000/api/${pathPrefix}${pathSufix}`,
    content
  )
  const resJson = await response.json()
  if (!response.ok) {
    throw new ApiError(resJson)
  }
  return resJson
}

const BaseService = { RequestMethod, request }
export default BaseService
