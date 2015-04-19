var bigV = 100;

var rand = function (max) {
  return Math.floor(Math.random() * max) % (max + 1);
};

var generateV = function (max) {
  var a = [];
  for (var i = 1; i <= max; i++) {
    a.push(i);
  }
  return a;
};

var chooseVectors = function (n) {
  var a = [];
  var v = generateV(bigV);
  for (var i = 0; i < n; i++) {
    var r = rand(v.length - 1);
    a.push(v.splice(r,1)[0]);
  }
  return a;
};

var intersect = function (a, b) {
  return a.filter(function (i) {
    return b.indexOf(i) != -1;
  });
};


var successfulAttack = 0;
var successfulDefense = 0;

var xAtk = 1;
var xDef = 50;

for (var i = 0; i < 100; i++) {
  var vAtk = chooseVectors(xAtk);
  var vDef = chooseVectors(xDef);
  if (intersect(vAtk, vDef).length === 0) {
    successfulAttack++;
  } else {
    successfulDefense++;
  }
}

console.log('successful attack: ' + successfulAttack);
console.log('successful defense: ' + successfulDefense);

