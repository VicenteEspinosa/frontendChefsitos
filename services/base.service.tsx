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
  return fetch(`http://localhost:8000/api/${pathPrefix}${pathSufix}`, {
    body: body,
    headers: {
      'Content-Type': 'application/json',
    },
    method: method,
  })
}

Request
const BaseService = { RequestMethod, request }
export default BaseService
