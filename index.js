console.log("primer mensaje");

var express = require("express");

var path = require("path");

var cors = require("cors");

var request = require("request");

var bodyParser = require("body-parser"); // M I L E S T O N E Nº 4


var BASE_API_PATH_v2 = "/api/v2"; //M I L E S T O N E Nº 10

var app = express();

var port = (process.env.PORT || 10000);

app.use(bodyParser.json());

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));

app.use(cors());

//-------------------------------- INTEGRACIONES -----------------------------------------------------


var pathUnemployment = '/api/v2/children-out-school/';
var apiServerHostUnemployment = 'http://sos2021-24.herokuapp.com';

app.use(pathUnemployment, function (req, res) {
  var url = apiServerHostUnemployment + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

var pathUnemployment = 'api/integration/suicide-records';
var apiServerHostUnemployment = 'http://sos2021-27.herokuapp.com';

app.use(pathUnemployment, function (req, res) {
  var url = apiServerHostUnemployment + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});


var pathUnemployment = '/api/integration/obesity-stats';
var apiServerHostUnemployment = 'http://sos2021-10.herokuapp.com';

app.use(pathUnemployment, function (req, res) {
  var url = apiServerHostUnemployment + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

//integraciones externas
var pathUnemployment= '/?action=get_standings&league_id=302&APIkey=238fa8f2f748e83ca2569474a8f848897110a90bb6837bd17d6cdc66a02eb14a';
var apiServerHostUnemployment  = 'https://apiv3.apifootball.com';

app.use(pathUnemployment, function (req, res) {
  var url = apiServerHostUnemployment + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});
var pathUnemployment = '/api/episodes';
var apiServerHostUnemployment = 'https://breakingbadapi.com';

app.use(pathUnemployment, function (req, res) {
  var url = apiServerHostUnemployment + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});


//--------------------------------- M I L E S T O N E D03 ------------------------------------------------

var depression_stats_api_INT = require("./src/back/integration");

depression_stats_api_INT.register(app, "/api/integration");


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------

// API_REST de depression -> Juan Diez Blanco (@jdblanco)

var depression_stats_api = require("./src/back/v2"); // M I L E S T O N E Nº 5

depression_stats_api.register(app, BASE_API_PATH_v2); // M I L E S T O N E Nº 5
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------


// App Listen (para todas las peticiones)

console.log("iniciando servidor");

app.listen(port, () => {
  console.log("Server ready listening on port " + port);
})



