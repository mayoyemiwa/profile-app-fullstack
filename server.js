const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser')
const path = require('path')


const app = express();


app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());
app.use(cookieParser())

app.use(authRoutes);
require('./connection');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('profile-app/build'))
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'profile-app', 'build', 'index.html'))
    })
  }
  
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server is running on port`, PORT)
  })