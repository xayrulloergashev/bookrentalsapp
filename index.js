const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const mongoose = require('mongoose');
const http = require('http').Server(app);
const io = require('socket.io')(http);

require('./src/config/usemiddleware')(app);
app.use(express.json());

const AppRouter = require('./src/router/router');

// process.env.MONGO_HOST;
mongoose
  .connect('mongodb://localhost/bookretalsapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connected to mongodb`);
  })
  .catch((err) => {
    console.log(err);
  });

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

app.use('/api', AppRouter);
app.listen(port, () => {
  console.log(`running on port: ${port}`);
});
