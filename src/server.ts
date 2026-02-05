import 'express-async-errors'
import express from "express"
import routes  from "./app/api/routes"
import { errorHandler } from "./app/api/middlewares/error-handler"
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import path from 'path'

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send(`
        <style>
            body{
                background-color: #101010;
                color: #f5f5f5;
            }
        </style>
        <h1>JWT-AUTH API</h1>
    `)
})

// Serve generated OpenAPI spec
app.get('/docs/openapi.json', (req, res) => {
    try {
        const specPath = path.resolve(process.cwd(), 'dist', 'swagger.json')
        if (!fs.existsSync(specPath)) return res.status(404).json({ error: 'OpenAPI spec not found' })
        const raw = fs.readFileSync(specPath, 'utf-8')
        const doc = JSON.parse(raw)
        return res.json(doc)
    } catch (err: any) {
        return res.status(500).json({ error: err.message })
    }
})

// Swagger UI
try {
    const specPath = path.resolve(process.cwd(), 'dist', 'swagger.json')
    if (fs.existsSync(specPath)) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const swaggerDocument = JSON.parse(fs.readFileSync(specPath, 'utf-8'))
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    }
} catch (err) {
    // ignore UI setup failures
}

app.use(express.json())
app.use(routes)
app.use(errorHandler)

app.listen(port, () => console.log(`🚀 Server is listening on port ${port}...`))

