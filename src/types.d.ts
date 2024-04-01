export interface Note {
  id: `${string}-${string}-${string}-${string}-${string}`
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export type NoteId = Pick<Note, 'id'>

export interface INotesModel {
  getAll: () => Promise<Note[]>
  getById: ({ id }: { id: string }) => Promise<Note | null>
  createNote: (note: Omit<Note, 'id'>) => Promise<Note>
  updateNote: (note: Partial<Note>) => Promise<Note | null>
  deleteNote: ({ id }: NoteId) => Promise<boolean>
}
