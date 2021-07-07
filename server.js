const express = require('express')
const app = express()



app.get('/', (req, res) =>{
  res.status(200).send('App API')
})

const PORT = process.env.PORT || 6000
app.listen(PORT, () => console.log(`server running on port ${PORT}`) )
