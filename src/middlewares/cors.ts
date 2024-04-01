import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://8f6hccj0-3000.brs.devtunnels.ms/'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}): (req: cors.CorsRequest, res: { statusCode?: number | undefined, setHeader: (key: string, value: string) => any, end: () => any }, next: (err?: any) => any) => void => cors({
  origin: (origin: string | undefined, callback) => {
    if (origin == null || acceptedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
})
