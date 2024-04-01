import { type Note, type NoteId, type INotesModel } from '../../types'
import NoteList from '../../../data/notes.json'

const notes = NoteList.map((note) => ({
  ...note,
  createdAt: new Date(note.createdAt as string),
  updatedAt: new Date(note.updatedAt as string)
})) as Note[]

export class NoteModel implements INotesModel {
  getAll: () => Promise<Note[]> = async () => {
    return notes
  }

  getById: ({ id }: { id: string }) => Promise<Note | null> = async ({ id }) => {
    return notes.filter((note) => note.id === id)?.[0] ?? null
  }

  createNote: (note: Omit<Note, 'id'>) => Promise<Note> = async (note) => {
    const newNote = ({
      ...note,
      id: crypto.randomUUID()
    })

    notes.push(newNote)

    return newNote
  }

  updateNote: (note: Partial<Note>) => Promise<Note | null> = async (note) => {
    const index = notes.findIndex((n) => n.id === note.id)

    if (index === -1) {
      return null
    }

    notes[index] = {
      ...notes[index],
      ...note
    }

    return notes[index]
  }

  deleteNote: ({ id }: NoteId) => Promise<boolean> = async ({ id }) => {
    const index = notes.findIndex((n) => n.id === id)

    if (index === -1) {
      return false
    }

    notes.splice(index, 1)

    return true
  }
}
