
// Variables necesarias por database - depression_stats

var path = require("path");
var Datastore = require("nedb");

//Database Generada - depression_stats

var BASE_API_PATH = "/api/v2";
var datafile = path.join(__dirname, 'depression_stats.db');
var db = new Datastore({ filename: datafile, autoload: true });
var depression_stats_data = [
	{
		"country": 'Spain_Andalucia',
		"year": 2011,
		"depression_men": 4.00,
		"depression_women":11.60,
		"depression_population": 7.80
	},
	{
		"country": 'Spain_Castilla_la_mancha',
		"year": 2014,
		"depression_men": 3.50,
		"depression_women": 5.70,
		"depression_population": 4.60
	},
	{
		"country": 'Spain_Extremadura',
		"year": 2011,
		"depression_men": 4.22,
		"depression_women": 24.33,
		"depression_population": 14.39
	},
	{
		"country": 'Spain_Galicia',
		"year": 2009,
		"depression_men": 23.10,
		"depression_women": 20.20,
		"depression_population": 4.30
	},
	{
		"country": 'Spain_Asturias',
		"year": 2014,
		"depression_men": 21.80,
		"depression_women": 78.20,
		"depression_population": 37.90
	},
	{
		"country": 'Spain_Comunidad_valenciana',
		"year": 2010,
		"depression_men": 6.13,
		"depression_women": 9.61,
		"depression_population": 58.30
	}
];

//var depression_stats = db.getAllData();

// API_REST de depression -> Juan Diez Blanco (@jdblanco)

module.exports.register = (app, BASE_API_PATH) => { // M I L E S T O N E  Nº 5


	//--------------------------------- M I L E S T O N E Nº 6 (F06) ------------------------------------------------



	app.get(BASE_API_PATH + "/depression_stats/loadInitialData", (req, res) => {
		

		db.find({ $or: [{ country: "Spain_Andalucia" }, { country: "Spain_Castilla_la_mancha" }] }, { _id: 0 }, function (err, data) {
			if (err) {
				console.error("ERROR accesing DB in GET");
				res.sendStatus(500);
			} else {
				if (data.length == 0) {
					db.insert(depression_stats_data);
					console.log(`Loaded initial data: <${JSON.stringify(depression_stats_data, null, 2)}>`);
					res.sendStatus(201);
				} else {
					console.error(`initial data already exists`);
					res.sendStatus(409);
				}
			}
		});

		
	});

	//

	// 6.1 GET a la lista de recursos (p.e. “/api/v2/stats”) devuelve una lista con todos los recursos (un array de objetos en JSON)

	app.get(BASE_API_PATH + "/depression_stats", (req, res) => {

		var query = req.query;

		//Aquí se obtienen offset y limit con query, si son null, le hacemos un delete y listo.
		var limit = parseInt(query.limit);
		var offset = parseInt(query.offset);

		//Deleteamos los offset y limit.
		delete query.offset;
		delete query.limit;

		//Parseamos el año a Integer, mis otras 3 propiedades numéricas también son necesarias.
		if (query.hasOwnProperty("year")) {
			query.year = parseInt(query.year);
			console.log(query.year);
		}
		if (query.hasOwnProperty("depression_men")) {
			query.depression_men = parseFloat(query.depression_men);
			console.log(query.depression_men);
		}
		if (query.hasOwnProperty("depression_women")) {
			query.depression_women = parseFloat(query.depression_women);
			console.log(query.depression_women);
		}
		if (query.hasOwnProperty("depression_population")) {
			query.depression_population = parseFloat(query.depression_population);
			console.log(query.depression_population);
		}

		console.log(query);

		db.find(query).skip(offset).limit(limit).exec((error, depression_stats) => {
			depression_stats.forEach((n) => {
				delete n._id;
			});

			if (depression_stats.length < 0) {
				res.sendStatus(400, "Bad request");
				console.log("Requested data is INVALID");
			}
			else {
				res.send(JSON.stringify(depression_stats, null, 2));
				console.log("Data sent:" + JSON.stringify(depression_stats, null, 2));

			}
		});

		/*if (depression_stats_data.length != 0) {
			console.log(`depression_stats requested`);
			return res.send(JSON.stringify(depression_stats_data, null, 2));
		} else {
			console.log("Not found");
			return res.sendStatus(404);
		}
		return res.sendStatus(200);*/
	});

	//6.2 POST a la lista de recursos (p.e. “/api/v2/stats”) crea un nuevo recurso.

	app.post(BASE_API_PATH + "/depression_stats", (req, res) => {

		var data = req.body; // Objeto entero - Si quiero acceder a algo concreto con el .name.
		var country = req.body.country;
		var year = req.body.year;

		db.find({ "country": country, "year": year }).exec((error, depression_stats) => {
			if (depression_stats.length > 0) {
				res.sendStatus(409);
				console.log("There's an object with those primary keys");
				return;
			}
			if ((data == null)
				|| (data.country == null)
				|| (data.year == null)
				|| (data.depression_men == null)
				|| (data.depression_women == null)
				|| (data.depression_population == null)
				|| ((Object.keys(data).length != 5))) {

				res.sendStatus(400, "Falta uno o más campos");
				console.log(data);
				console.log("POST not created");
				return;
			}
			db.insert(data);

			res.sendStatus(201, "Post created");
			console.log(JSON.stringify(data, null, 2));
		});
		/*var data = req.body;
		depression_stats_data.push(data);
		console.log(`new data pushed: <${JSON.stringify(depression_stats_data, null, 2)}>`);
		res.sendStatus(201);*/
	});

	// POST Alternativo para añadir - 6.2 - depression_stats //M I L E S T O N E Fº 4

	/*{
		"country": "Spain_Extremadura",
		"year": 2011,
		"depression_men": 4.22,
		"depression_women": 24.33,
		"depression_population": 14.39
	}*/


	//6.3 GET a un recurso (p.e. “/api/v2/stats/sevilla/2013”) devuelve ese recurso (un objeto en JSON) .

	app.get(BASE_API_PATH + "/depression_stats/:country/:year", (req, res) => {

		var country = req.params.country; //Pillar el contenido después de los dos puntos.
		var year = parseInt(req.params.year);

		db.find({ "country": country, "year": year }).exec((err, param) => {
			if (param.length == 1) {
				delete param[0]._id;

				res.send(JSON.stringify(param[0], null, 2));
				console.log("/GET - Recurso Específico /country/year: " + JSON.stringify(param[0]), null, 2);
			}
			else {
				res.sendStatus(404, "Not found");
			}
		});

		/*var country = req.params.country;
		var year = parseInt(req.params.year);

		console.log(`GET stat by country: <${country}> and year: <${year}>`);
		for (var stat of depression_stats_data) {
			if (stat.country === country && stat.year === year) {
				return res.status(200).json(stat);
			}
		}

		return res.sendStatus(404); */
	});

	//6.4 DELETE a un recurso (p.e. “/api/v2/stats/Andalucia/2011”) borra ese recurso (un objeto en JSON).

	app.delete(BASE_API_PATH + "/depression_stats/:country/:year", (req, res) => {

		var country = req.params.country; //Pillar el contenido después de los dos puntos.
		var year = parseInt(req.params.year);

		db.remove({ "country": country, "year": year }, { multi: true }, (err, paramsDeleted) => {
			if (paramsDeleted == 0) {
				res.sendStatus(404, "Not found");
			}
			else {
				res.sendStatus(200);
			}
		});

		/*var country = req.params.country;
		var year = parseInt(req.params.year);

		console.log(`DELETE by country <${country}> and year: <${year}>`);

		for (var i = 0; i < depression_stats_data.length; i++) {
			if (depression_stats_data[i]["country"] === country && depression_stats_data[i]["year"] === year) {
				depression_stats_data.splice(i, 1);
				return res.sendStatus(200);
			}
		}

		return res.sendStatus(404);*/
	});

	//6.5 PUT a un recurso (p.e. “/api/v2/stats/Andalucia/2011”) actualiza ese recurso. 

	app.put(BASE_API_PATH + "/depression_stats/:country/:year", (req, res) => {

		var countryData = req.params.country; //Pillar el contenido después de los dos puntos.
		var countryD = req.body.country;

		var yearData = parseInt(req.params.year);
		var yearD = parseInt(req.body.year);

		var body = req.body;

		if (countryData != countryD || yearData != yearD) {
			res.sendStatus(409);
			console.warn("There is a conflict!");
		}
		else {
			db.update({ "country": countryData, "year": yearData }, body, (err, paramsUpdated) => {
				if (paramsUpdated == 0) {
					res.sendStatus(404, "Not found");
				}
				else {
					res.sendStatus(200);
					console.log("PUT Correcto");
				}
			});
		}
	});

	/*var country = req.params.country;
	var year = parseInt(req.params.year);
	var newDataDepression = req.body;

	console.log(`PUT ${newDataDepression.country} OVER ${country} `);
	console.log(`PUT ${newDataDepression.year} OVER ${year} `);

	if (depression_stats_data.length == 0) {
		console.log("No Valido")
		return res.sendStatus(404);
	} else {
		for (var i = 0; i < depression_stats_data.length; i++) {
			var stat = depression_stats_data[i];
			if (stat.country === country && stat.year === year) {
				depression_stats_data[i] = newDataDepression;
				return res.send('PUT success');
			}
		}
	}
});*/

	//6.6 POST a un recurso (p.e. “/api/v2/stats/Andalucia/2011”) debe dar un error de método no permitido.

	app.post(BASE_API_PATH + "/depression_stats/:country/:date", (req, res) => {
		console.log("POST no valido/encontrado");
		return res.sendStatus(405);

	});

	//6.7 PUT a la lista de recursos (p.e. “/api/v2/stats”) debe dar un error de método no permitido.

	app.put(BASE_API_PATH + "/depression_stats", (req, res) => {
		console.log("PUT no valido/encontrado");
		return res.sendStatus(405);

	});

	//6.8 DELETE a la lista de recursos (p.e. “/api/v2/stats”) borra todos los recursos

	app.delete(BASE_API_PATH + "/depression_stats", (req, res) => {
		db.remove({}, { multi: true }, (error, depression_stats_deleted) => {
			console.log(depression_stats_deleted + " depression_stats deleted");
		});
		res.sendStatus(200, "OK");

	})

};

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------

