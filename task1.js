var table = require('text-table');

bAtk = 100; // 

var xAtk = 1; // number of attack vector the attacker uses
var xDef = 2;

var defenseCost = 10; // cost to defend against a single vector
var bigV = 10; // size of the set of attack vectors an attacker can use to steal a card

// cost - cost for adversary of conduct single fraudulent activity.
var payOffMatrix = function (attackCost) {
  var a = [];
  // i - number of attack vectors
  for (var i = 0; i <= bigV; i++) {
    a[i] = [];
    // j - number of defense vectors
    for (var j = 0; j <= bigV; j++) {
      // (attack payoff, defense payoff)
      // case II - successful defense
      if (i <= j) {
        //a[i][j] = {};
        a[i][j] = [
          -1 * attackCost * i,
          -1 * defenseCost * j,
        ];
      // case I - successful attach
      } else {
        a[i][j] = [
          bAtk - attackCost * i,
          (-1*bAtk) - defenseCost * j,
        ];
      }
    }
  }
  return a;
};

var p = payOffMatrix(process.argv[2]);
console.log(table(p));
