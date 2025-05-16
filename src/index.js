const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3333;

const route = require('./routers');
const db = require('./config/db');

const methodOverride = require('method-override');

// DB connect
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
// HTTP logger
app.use(morgan('combined'));

// Method override
app.use(methodOverride('_method'));

// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);
app.listen(port, () => console.log(`listening at localhost:${port}`));
