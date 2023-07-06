const express = require('express')

// Creates the express app. //
const app = express()

const fs = require('fs')
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/notes', (req, res) => {
  //

});


app.get('*')

app.post

app.use



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

