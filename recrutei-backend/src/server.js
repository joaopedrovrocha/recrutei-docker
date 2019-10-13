const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect('mongodb+srv://recrutei:aHPyitacYLkgOpBd@recrutei-j82fu.mongodb.net/recrutei?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})

mongoose.connection.on('error', err => {
    console.error(`MongoDB connection failed. Err: ${err}`)
})

mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected')
})

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log('Server listen on ' + process.env.PORT)
})