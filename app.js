//jshint esversion:6
const bodyParser= require("body-parser");
const express=require('express');
const https = require('https');
const date = require(__dirname + "/date.js");
const app=express();
const port=3000;
const items = [];
const workItems =[];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))
app.get('/', (req, res) => {

   const day = date.getDay();

    res.render('list', {listTitle: day, newListItems: items}); 
});

app.post('/', (req, res) => {
    const item = req.body.newItem;

    console.log(req.body)
    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else{
        items.push(item);
        res.redirect('/');
    }
});

app.get("/work", (req,res) => {
    res.render('list', {listTitle: "Work", newListItems: workItems});
});
app.get("/about", (req,res) => {
    res.render('about');    
});

app.post("/work", (req, res) => {
    const item= req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});