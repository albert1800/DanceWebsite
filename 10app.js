// to start project we first open the documentation of pug and express
// and then we see in expres to install express
// first we type 'npm init' and after complete then, '$ npm install express' in terminal
// and also 'npm install pug' for installation.

const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 5000;

// define mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/10static', express.static('10static', )) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, '10views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{      // to save data in database body by requesting post by using express, we'll install 'npm install body-parser'
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item has not been saved to the database")
    })
    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
