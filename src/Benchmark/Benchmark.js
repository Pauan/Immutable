var Benchmark = require("benchmark");

var suite = new Benchmark.Suite({
  // TODO is this correct ?
  onComplete: function () {
    display_messages(messages);
  },
  onCycle: function (event) {
    var s = "" + event.target;
    s = s.replace(/^(.+) x ([0-9,\.]+) ops\/sec ±\d+\.\d+% \(\d+ runs sampled\)$/g, function (_, text, num) {
      if (/\./.test(num)) {
        num = "" + Math.round(+num);
      }
      return rpad(text, 49) + lpad(" " + lpad(num, 13) + " ops/sec", 21);
    });
    console.log(s);
  }
});

function repeat(i, x) {
  return new Array(i + 1).join(x);
}

function rpad(x, i) {
  return (x + repeat(i, " ")).slice(0, i);
}

function lpad(x, i) {
  return (repeat(i, " ") + x).slice(-i);
}


var indent = 0;
var timers = [];
var messages = [];

function display_messages(a) {
  a.forEach(function (x) {
    console.log(x);
  });
}

function add_timers() {
  var max = 0;

  timers.forEach(function (x) {
    max = Math.max(max, x.name.length);
  });

  timers.forEach(function (x) {
    suite.add(repeat(indent, " ") + rpad(x.name, max), x.fn, {
      onStart: function () {
        display_messages(x.messages);
      }
    });
  });
}

export function group(name, f) {
  message(repeat(70 - indent, "-"));
  message(name + ":");

  var old_indent = indent;
  var old_timers = timers;

  indent += 2;
  timers = [];

  try {
    f();
  } finally {
    add_timers();
    indent = old_indent;
    timers = old_timers;
  }
}

export function message(x) {
  if (arguments.length !== 1) {
    throw new Error("Expected 1 argument but got " + arguments.length);
  }
  messages.push(repeat(indent, " ") + x);
}

/*suite.on("complete", function () {
  var re = /([^\n]+)( x )([\d,]+)( ops\/sec ±[\d.]+% \(\d+ runs sampled\))/g;
  var s = this.join("\n");
  var a;
  var out = [];
  var lMax = 0;
  var rMax = 0;
  while ((a = re.exec(s)) !== null) {
    lMax = Math.max(lMax, a[1].length);
    rMax = Math.max(rMax, a[3].length);
    out.push([a[1], a[2], a[3], a[4]]);
  }
  console.log(out.map(function (a) {
    return rpad(a[0], lMax) + a[1] + lpad(a[2], rMax) + a[3]
  }).join("\n"));
});*/

export function time(s, f) {
  // This is to make sure that the function doesn't
  // have any errors before benchmarking it
  f();

  var a = messages;
  messages = [];

  timers.push({
    name: s,
    fn: f,
    messages: a
  });
}

export function run() {
  add_timers();
  suite.run();
}
