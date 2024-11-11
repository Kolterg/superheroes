const express = require('express')
const cors = require('cors')
const _mongooseConnector = require('./src/database');

const { constants } = require('./src/constants');
const { imageRouter, superheroRouter } = require('./src/routes');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors('*'));

app.use('/superhero', superheroRouter);
app.use('/image', imageRouter);

app.use('/uploads', express.static('uploads'));

app.listen(constants.PORT, () => {
    console.log(`App listen ${constants.PORT}`);
});