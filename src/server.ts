import express from "express"
import { routes } from "./app/api/routes"
import { errorHandler } from "./app/api/middlewares/errorHandler"

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

app.use(express.json())
app.use(routes)
app.use(errorHandler)

app.listen(port, () => console.log(`🚀 Server is listening on port ${port}...`))

