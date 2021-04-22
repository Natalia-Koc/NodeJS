const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const fs = require('fs');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.result =[];
app.listen(8080, function() {
	console.log('nasluchujemy na 8080')});

app.get('/', (req, resp) => {
	try {
		var data1 =fs.readFileSync('./mojewiadomosci2.json');
		app.result = JSON.parse(data1);
	} catch(e) {};
	resp.render('index2.ejs', {wiadomosci: app.result});
});

app.post('/wiadomosci', (req, resp) => {
	var nowaWiadomosc = [{
		"imie":""+req.body.imie+"",
		"nazwisko":""+req.body.nazwisko+"",
		"wiadomosc":""+req.body.wiadomosc+""
	}];
	app.result.push(nowaWiadomosc[0]);
	var data = JSON.stringify(app.result);
	fs.writeFileSync('./mojewiadomosci2.json', data);
	var data1 =fs.readFileSync('./mojewiadomosci2.json');
	app.result = JSON.parse(data1);
	resp.render('index2.ejs', {wiadomosci: app.result});
	resp.end();
});
