const express = require('express');
const webRoutes = require('./routes/web');

const app = express();

const appConfig = require('./configs/app');

let methodOverride = require('method-override')
app.use(methodOverride('_method'));

const exphbs = require('express-handlebars');
const hbshelpers = require("handlebars-helpers");
const multihelpers = hbshelpers();
const extNameHbs = 'hbs';
const hbs = exphbs.create({
  extname: extNameHbs,
  helpers: multihelpers
});


app.engine(extNameHbs, hbs.engine);
app.set('view engine', extNameHbs);
app.use(express.static('public'));


app.use(express.urlencoded({ extended: true }))
app.use(express.json());


app.use('/', webRoutes);


app.listen(appConfig.expressPort, () => {
  console.log(`Server is listenning on ${appConfig.expressPort}! (http://localhost:${appConfig.expressPort})`);
});
