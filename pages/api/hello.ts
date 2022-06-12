import { NextApiRequest, NextApiResponse } from 'next'

export default function Hello(_: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({ text: 'Hello' })
}
