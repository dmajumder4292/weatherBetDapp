var express  = require('express');
var app      = express(); 
var bodyParser = require('body-parser');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({ type: 'application/json' }));

app.get("/", function(req, res){
    res.render("index.html");
});

app.listen(3000);

console.log("Application is listening on port 3000");