const db = require('../database/model-users')
const generateToken = require('../jwt/generateToken')
const bcrypt = require('bcryptjs')
const axios = require('axios');
const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  // implement user registration
  const user = req.body

  if (user.username && user.password) {
    try {
      const hash = bcrypt.hashSync(user.password, 14)
      user.password = hash
      const newUser = await db.add(user)
      res.status(200).json({message: `Successfully registered user`, newUser})
    } catch (error) {
      res.status(500).json({ message: `Server error registering user`, error})
    }

  } else {
    res.status(400).json({ message: `Please provide valid credentials`})
  }
}

async function login(req, res) {
  // implement user login
  const { username, password } = req.body

  if (username && password) {
    try {
      const user = await db.findByUser(username)
      if (user && bcrypt.compareSync(password, user.password)) {
        const Authorization = generateToken(user)
        res.status(200).json({ message: `Successfully logged in user`, Authorization})
      } else {
        res.status(401).json({ message: `Invalid user`})
      }
    } catch (error) {
      res.status(500).json({ message: `There was a problem logging in user`, error})
    }

  } else {
    res.status(400).json({ message: `Please provide valid credentials`})
  }

}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
