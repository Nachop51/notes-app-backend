import z from 'zod'

export const noteSchema = z.object({
  title: z.string().min(1).max(50),
  content: z.string().min(1).max(500),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
})

export function validateNote (note: unknown) {
  return noteSchema.safeParse(note)
}

export function validatePartialTodo (object: unknown) {
  return noteSchema.partial().safeParse(object)
}
