import express, { type Express } from 'express'
import morgan from 'morgan'
import { corsMiddleware } from './middlewares/cors'
import 'dotenv/config.js'

import { NoteModel } from './models/local/note'
import { createNoteRouter } from './routes/notes'

const app: Express = express()
const logger = morgan('dev')

app.use(logger)
app.use(express.json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' })
})

app.use('/notes', createNoteRouter({ notesModel: new NoteModel() }))

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app
