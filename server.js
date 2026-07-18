import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './mongodb.js'
import productRoutes from './router/productRoutes.js'
import userRoutes from './router/userRoutes.js'
import orderRoutes from './router/orderRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url'

const PORT = process.env.PORT || 3000

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(filename)
dotenv.config()
connectDb()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use(express.static(path.join(__dirname,'./frontend/dist')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./frontend/dist','index.html'))
})

app.listen(PORT, () => {
    console.log('server online')
})