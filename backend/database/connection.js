const mongoose = require('mongoose')

// Connect to Database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Check for errors or connection
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', ()  => console.log("connected to database"))