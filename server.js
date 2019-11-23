require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const POKEDEX = require('./pokedex.json')

const app = express()

app.use(morgan('dev'))

console.log(process.env.API_TOKEN)

// app.use((req, res) => {
//   res.send('Hello, world!')
// })

const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`]

app.use(function validateBearerToken(req, res, next) {
  
  console.log(req.get('Authorization'))
  // const bearerToken = req.get('Authorization').split(' ')[1]
  const authToken = req.get('Authorization')
  const apiToken = process.env.API_TOKEN
  console.log('validate bearer token middleware')
  // if (bearerToken !== apiToken) {
  //   return res.status(401).json({ error: 'Unauthorized request' })
  // }
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }
    // debugger
  //move to the next middleware
  next()
})



function handleGetTypes(req, res) {
  res.json(validTypes)
}

app.get('/types', handleGetTypes)

function handleGetPokemon(req, res) {
  res.send('Hello Pokemon!')
}

app.get('/pokemon', handleGetPokemon)

const PORT = 8005



app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
