
const express = require('express')
const app = express()
const port = 8000
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
require('dotenv').config()

// --------- app use -------------
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use((req,res,next) =>{
    console.log('Middleware running');
    next();
})
app.use(morgan('dev'))


// connect to db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));



// -------- import router ---------------
const couponRoute = require('./api/routes/couponRouter')

// ---------- connect to route ---------------
app.use('/api/coupon', couponRoute)



//-------------- run server ------------
app.get('/', (req, res) => {
    res.send('Backend Server!')
})

app.listen(process.env.PORT || port, () => {
    console.log(`Listening at http://localhost:${port}`)
})