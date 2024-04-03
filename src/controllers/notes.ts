import { type Request, type Response } from 'express'
import { validateNote, validatePartialTodo } from '../schemas/notes'
import { type NoteId, type INotesModel } from '../types'

export class NoteController {
  private readonly notesModel: INotesModel

  constructor ({ notesModel }: { notesModel: INotesModel }) {
    this.notesModel = notesModel
  }

  getNotes = async (_req: Request, res: Response) => {
    const notes = await this.notesModel.getAll()

    return res.json(notes)
  }

  getNoteById = async (req: Request, res: Response) => {
    const { id } = req.params

    const note = await this.notesModel.getById({ id })

    if (note == null) {
      return res.status(404).json({ message: 'Note not found' })
    }

    return res.json(note)
  }

  createNote = async (req: Request, res: Response) => {
    const result = validateNote(req.body)

    if (!result.success) {
      return res.status(400).json({ message: result.error.errors })
    }

    const note = await this.notesModel.createNote(result.data)

    return res.status(201).json(note)
  }

  updateNote = async (req: Request, res: Response) => {
    const { id } = req.params as NoteId
    const result = validatePartialTodo(req.body)

    if (!result.success) {
      return res.status(400).json({ message: result.error.errors })
    }

    const updatedAt = new Date()

    const note = await this.notesModel.updateNote({ id, ...result.data, updatedAt })

    if (note == null) {
      return res.status(404).json({ message: 'Note not found' })
    }

    return res.json(note)
  }

  deleteNote = async (req: Request, res: Response) => {
    const { id } = req.params as NoteId

    const note = await this.notesModel.deleteNote({ id })

    if (!note) {
      return res.status(404).json({ message: 'Note not found' })
    }

    return res.status(204).send()
  }
}
