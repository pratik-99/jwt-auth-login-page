const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;
const SECRET_KEY = 'your_jwt_secret'; // use env var in production

app.use(cors());
app.use(bodyParser.json());

const mockUser = {
  username: 'admin',
  password: 'password123'
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === mockUser.username && password === mockUser.password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/protected', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token invalid' });
    res.json({ message: `Hello, ${user.username}` });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});