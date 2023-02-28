import express from 'express'
import dotenv from 'dotenv'
import { errorHandler } from './middleware/error'
import routes from './routes/v1'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Dynamic Routes
app.use('/api/v1', routes)

// Error Handler
app.use(errorHandler)

app.all('*', (req: any, res: any) => {
    return res.status(403).json({
        success: false,
        message: 'Forbidden',
        data: null,
        error: {
            error_code: 'FORBIDDEN',
            error_data: null,
        }
    })
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
