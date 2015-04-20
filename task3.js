var N = 500;    // number of turns
var bigV = 100; // number of attack vectors

// how many turns are remembered
var mAtk = 5;
var mDef = 5;

var S = [0, .25, .5, .75, 1];


var rand = function (mod) {
  return Math.floor(Math.random() * mod) % mod;
};

// M - memory of agent (number of turns)
// S - natural number >= 0
var agent = function (M, S) {
  var count = 0;
  var memory = [];

  function getNext () {
    if (count < M) {
      return rand(bigV);
    } else {
      // play a previous move (in memory)
      if (Math.random() < S) {
        return memory[rand(memory.length)];
      // choose a new attack vector (not in memory)
      } else {
        while (true) {
          var r = rand(bigV);
          if (memory.indexOf(r) == -1) {
            return r;
          }
        }
      }
    }
  }

  return function () {
    var vector = getNext();
    count++;
    memory.shift();
    memory.push(vector);
    return vector;
  };
};

var simulate = function (sAtk, sDef) {
  var attacker = agent(5, sAtk);
  var defender = agent(5, sDef);

  var successfulAttack = 0;
  var successfulDefense = 0;

  for (var i = 0; i < N; i++) {
    var v1 = attacker();
    var v2 = defender();
    if (v1 == v2) {
      successfulDefense++;
    } else {
      successfulAttack++; 
    }
  }

  /*
  console.log([
    'sAtk = ', sAtk.toFixed(2),
    ', sDef = ', sDef.toFixed(2),
    ', successful attack: ', successfulAttack,
    ', successful defense: ', successfulDefense
  ].join(''));*/

  return successfulDefense / N;
};


var perf = {};
for (var i = 0; i < S.length; i++) {
  for (var j = 0; j < S.length; j++) {
    var p = perf[S[i]+'-'+S[j]] = [];
    for (var k = 0; k < 1000; k++) {
      p.push(simulate(S[i], S[j]));
    }
    p.sort();
  }
}

var avg = function (a) {
  return a.reduce(function (prev, current) {
    return prev + current;
  }, 0) / a.length;
};

Object.keys(perf).forEach(function (key) {
  var p = perf[key]
  console.log([
    'min = ', p.shift().toFixed(3),
    ', avg = ', avg(p).toFixed(3),
    ', max = ', p.pop().toFixed(3),
    ', s = ', key,
  ].join(''));
})


