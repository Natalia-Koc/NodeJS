var MongoClient =require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("mydb");
	dbo.createCollection("wiadomosci", function(err, res) {
		if (err) throw err;
		console.log("Kolekcja Utworzona!");
		db.close();
	});
	var myobj = [
		{ imie: "Jan",
			nazwisko: "Kowalski",
			wiadomosc: "To moja pierwsza wiadomość"},
		{ imie: "Adam",
			nazwisko: "Nowak",
			wiadomosc: "To moja druga wiadomość"},
		{ imie: "Leon",
			nazwisko: "Mokry",
			wiadomosc: "To moja trzecia wiadomość"}
	];
	dbo.collection("wiadomosci").insertMany(myobj, function(err, res) {
		if (err) throw err;
		console.log("Dokumentywstawione");
		db.close();
	});
	dbo.collection("wiadomosci")
		.find({}, {imie: 1, nazwisko: 1, wiadomosc: 1})
		.toArray(function(err, result) {
			if (err) throw err;
			console.log(result);
			db.close();
	});
});