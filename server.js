////////// EXPRESS ///////////////////////////////////
const express = require("express");
const app = express();

////////// MONGOOSE //////////////////////////////////
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotesDB', {useNewUrlParser: true});
const UserSchema = new mongoose.Schema({
 name: {type: String},
 quote: {type: String}
}, {timestamps:true})
const User = mongoose.model('User', UserSchema);

///////// EXPRESS CONNECTION PORT ////////////////////
app.listen(8000, () => console.log("listening on port 8000"));

///////// POST SETUP              ////////////////////
app.use(express.urlencoded({extended: true}));

///////// EJS CONNECTION          //////////////////// 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//////// INDEX GET ROUTE /////////////////////////////
app.get('/', (req, res) => {
    res.render('index');
})

//////// SKIP GET ROUTE /////////////////////////////
app.get('/skip', (req, res) => {
    res.render('quotes');
})

//////// QUOTE GET ROUTE /////////////////////////////
app.get('/quotes', (req, res) => {
    User.find()
        .then(user => res.render("quotes", {users: user}))
        .catch(err => res.json(err));
});

/////////// PROCESS POST REQUEST ////////////////////
app.post('/process', (req, res) => {
    const user = new User();
    user.name = req.body.name;
    user.quote = req.body.quote;
    user.save()
        .then(() => res.redirect('/quotes')
        .catch(err => console.log(err)));
})

