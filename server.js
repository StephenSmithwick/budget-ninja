const path = require('path');
const express = require('express');
const webpack = require('webpack');

module.exports = function (app) {
  const port = process.env.PORT || 3000

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.listen(port, 'localhost', (err) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(`Listening at http://localhost:${port}`);
  })
};