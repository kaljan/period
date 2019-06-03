/*
node src/index.js
*/
var express = require('express');
var app = express();

app.post('/api', function (req, res) {
  var periodicTable = [
    { number: '1', abbreviation: "H", name: 'hydrogenium', atomic_mass: 1.00784, molar_mass: 1.00811 },
    { number: '2', abbreviation: "He", name: 'helium', atomic_mass: 4.002602, molar_mass: 4.002602 },
  ];
  
  var str = JSON.stringify(periodicTable, "", 2);
  console.log("app.post(\"/api\"); " + str);

  res.send(JSON.stringify(periodicTable));
});

app.use(express.static('public'));

/**
 * localhost:3000
 */
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
