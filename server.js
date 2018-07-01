const express = require('express');
const hbs = require('hbs');
const expressHbs = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser');

let app = express();

app.engine(
    '.hbs',
    expressHbs({
        defaultLayout: 'layout',
        extname: '.hbs'
    })
);
app.set('view engine', 'hbs');
  
app.use(express.static(__dirname + '/public'));
app.use('/vendors', express.static(__dirname + '/node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let currencies = null;
app.get('/', (req, res) => {
    res.sendFile('index.html');
    // request({
    //     url: 'https://free.currencyconverterapi.com/api/v5/currencies',
    //     json: true
    // }, (error, response, body) => {
    //     currencies = Object.keys(body.results)
    //     res.render('homepage', {
    //         layout: false,
    //         currency: currencies
    //     });
    // });
    // 
    
});

app.post('/', (req, res, next) => {
    request({
        url: 'https://www.currencyconverterapi.com/api/v5/convert?q=',
        json: true
    }, (error, response, body) => {
        res.render('homepage', {
            layout: false,
            currency: currencies,
            result: body
        });
    });
    next();
});

app.listen(3001, () => {
    console.log('Server is up on port 3001');
});