const mongoose = require('mongoose') 
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.znkfxyl.mongodb.net/?retryWrites=true&w=majority`
// mongoose.connect(uri, ()=>{
//     console.log('connected to mongodb')
// })

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) throw err;
  console.log("connected to mongodb")
})