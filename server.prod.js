const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.prod');

const app = express();
const compiler = webpack(config);

app.use(config.output.publicPath, express.static(config.output.path));
app.set('trust proxy', 'loopback');

require('./server')(app);

