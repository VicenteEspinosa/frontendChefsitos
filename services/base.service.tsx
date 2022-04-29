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
  return response.json()
}

Request
const BaseService = { RequestMethod, request }
export default BaseService
