import express from 'express';
import config from './config.js';
import server from './renderers/server';

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const initialContent = server();
  res.render('index', { initialContent });
});

app.listen(config.port, function listenHandler() {
  console.info(`Running on ${config.port}`);
});