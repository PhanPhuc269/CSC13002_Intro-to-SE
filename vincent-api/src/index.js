require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const http = require('http');
const cors = require('cors');  


//nodemon --inspect src/index.js
const db = require('./config/db');
db.connect();

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 3000;

const route = require('./routes'); 

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json())
app.use(methodOverride('_method'));
app.use(morgan('combined'));

route(app);

const authenticateJWT = require('./config/jwtConfig');
app.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

httpServer.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});