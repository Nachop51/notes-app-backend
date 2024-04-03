import z from 'zod'

export const noteSchema = z.object({
  title: z.string().min(1).max(50),
  content: z.string().min(1).max(500),
  createdAt: z.coerce.date().optional().default(() => new Date()),
  updatedAt: z.coerce.date().optional().default(() => new Date())
})

export function validateNote (note: unknown) {
  return noteSchema.safeParse(note)
}

export function validatePartialTodo (object: unknown) {
  return noteSchema.partial(
    { title: true, content: true }
  ).safeParse(object)
}
