const fs = require('fs');
const path = require('path');

const express = require('express');
const yate = require('yate');

const app = express();

app.engine('yate', function (filePath, options, callback) {
    let renderedHtml;
    try {
        renderedHtml = yate.run(filePath, {}, options);
    } catch (e) {
        return callback(e);
    }

    return callback(null, renderedHtml);
});

app.set('views', './views');
app.set('view engine', 'yate');

app.get('/', function (req, res, next) {
    res.render('index', {
        data: {
            title: 'Hey',
            body: 'Everything will be fine!',
        },
    });
});

app.listen(3000);
