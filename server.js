const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();

    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err !== null)
           console.log(err);
    })
    next();
});



app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear()
})

app.get('/', (req, res) => {
    res.render('homepage.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: "Welcome to sandy's page",
   });
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
       pageTitle: 'About Page',
   });
})



app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
     pageTitle: 'Projects Page',
  });
})
// /bad - send ack json with errorMessage

app.get('/bad', (req, res) => {
    res.send({
    errorMessage: 'Unable to handle request',
});
})
app.listen(3000, () => {
    console.log('Sever is up on port 3000');
});