import express, { Request, Response } from 'express';
import next from 'next'

const port = 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/api/experience', (req:Request, res:Response) => {
    return {message: 'hello world'}
  })

  server.all('*', (req:Request, res:Response) => {
    return handle(req, res)
  })

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
