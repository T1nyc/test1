const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine','ejs');
const SECRETKEY = 'I want to pass the movie database system';

const users = new Array(
        {username: 'test1', password: 'password1'},
        {username: 'test2', password: 'password2'},
        {username: 'test3', password: 'password3'}
);

app.use(session({
    name: 'sessionLogin',
    keys:[SECRETKEY]
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) => {
	console.log(req.session);
	if (!req.session.authenticated) {    
		res.redirect('/login');
	} else {
		res.status(200).render('secrets',{name:req.session.username});
	}
});

app.get('/login', (req,res) => {
	res.status(200).render('login',{});
});

app.post('/login', (req,res) => {
	users.forEach((user) => {
		if (user.name == req.body.name && user.password == req.body.password) {
            req.session.authenticated = true;        
			req.session.username = req.body.name;	
		}
	});
	res.redirect('/');
});

app.get('/logout', (req,res) => {
	req.session = null;   
	res.redirect('/');
});

app.listen(process.env.PORT || 8099);