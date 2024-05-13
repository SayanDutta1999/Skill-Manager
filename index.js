const express = require('express');
const router = require('./Routers/router_handler');
const app = express();
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

app.get('/',(req, res)=>{
    res.status(200).render('index', {title : 'Home page'})
});
app.get('/add', (req, res)=>{
    res.status(200).redirect('/');
});
app.get('/edit', (req, res)=>{
    res.status(200).render('update', {title : 'Update'});
});

app.get('/delete', (req, res)=>{
    res.status(200).render('delete', {title :'Delete'});
});
app.get('/search', (req, res)=>{
    res.status(200).render('search', {title :'Search'});
});

 

module.exports = app;
