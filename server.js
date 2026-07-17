import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './mongodb.js'
import productRoutes from './router/productRoutes.js'
import userRoutes from './router/userRoutes.js'
import orderRoutes from './router/orderRoutes.js'
import path from 'path'


const PORT = process.env.PORT || 3000

dotenv.config()
connectDb()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

// app.get('/',(req,res)=>{
//     console.log('app running')
//     res.send('api running')
// })



const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production' || true) {
    // Serve production assets from the frontend build folder
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    // Point all routing traffic right to your index.html entry point
    app.get('*', (req, res) =>
        res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
    );
}

app.listen(PORT, () => {
    console.log('server online');
});

app.listen(PORT, () => {
    console.log('server online')
})