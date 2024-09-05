require('dotenv').config({path: "backend/.env"})
const {app} = require('./app')
const { connectDB } = require('./db')

const PORT = 8000 || process.env.PORT

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../frontend/dist'));
}


connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`)
    })
}).catch((error) => {
    console.log("MongoDB connection failed ", error)
})