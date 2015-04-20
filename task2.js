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

var contains = function (a, b) {
  for (var i = 0; i < a.length; i++) {
    if (b.indexOf(a[i]) == -1) {
      return false;
    }
  }
  return true;
};

var successfulAttack = 0;
var successfulDefense = 0;

var xAtk = 10;
var xDef = 75;

for (var i = 0; i < 100; i++) {
  var vAtk = chooseVectors(xAtk);
  var vDef = chooseVectors(xDef);
  if (!contains(vAtk, vDef)) {
    successfulAttack++;
  } else {
    successfulDefense++;
  }
}

console.log('successful attack: ' + successfulAttack);
console.log('successful defense: ' + successfulDefense);

