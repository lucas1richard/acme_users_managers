const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

app.set('view engine', 'html');
app.engine('html', exphbs());

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json({ extended: false }));
app.use('/', require('./routes'));

app.use((req, res, next) => {
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});

app.get('/', (req, res, next) => {
  res.render('index');
});


const db = require('./db');
db.seed();
