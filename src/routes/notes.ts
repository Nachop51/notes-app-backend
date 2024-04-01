import { Router } from 'express'
import { type INotesModel } from '../types'
import { NoteController } from '../controllers/notes'

export const createNoteRouter = ({ notesModel }: { notesModel: INotesModel }): Router => {
  const notesRouter = Router()

  const notesController = new NoteController({ notesModel })

  notesRouter.get('/', notesController.getNotes)
  notesRouter.post('/', notesController.createNote)

  notesRouter.get('/:id', notesController.getNoteById)
  notesRouter.put('/:id', notesController.updateNote)
  notesRouter.delete('/:id', notesController.deleteNote)

  return notesRouter
}
