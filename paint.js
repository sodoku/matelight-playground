var keypress = require('keypress');
var matelight = require('matelight');


var m = matelight.connect();
// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);
var mx = 1;
var my = 1
var line = [];
var active = false;

var red = 200;
var green = 0;
var blue = 0;

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
    process.exit();
  }
  if (key && key.name == 'right') {
    mx++;
    if (active) line.push({x: mx, y: my, r: red, g: green, b: blue});
  }
  if (key && key.name == 'left') {
    mx--;
    if (active) line.push({x: mx, y: my, r: red, g: green, b: blue});
  }
  if (key && key.name == 'up') {
    my--;
    if (active) line.push({x: mx, y: my, r: red, g: green, b: blue});
  }
  if (key && key.name == 'down') {
    my++;
    if (active) line.push({x: mx, y: my, r: red, g: green, b: blue});
  }
  if (key && key.name == 'space') {
    active = !active;
    if (active) line.push({x: mx, y: my, r: red, g: green, b: blue});
    console.log('active:', active);
  }
  if (key && key.name == 'escape') {
    console.log('clear');
    line = [];
  }
  if (key && key.name == 'x') {
    console.log('delete');
    for(var i = 0; i < line.length; i++) {
      if (line[i].x == mx && line[i].y == my)
        line.splice(i,1);
    };
  }
  if (key && key.name == 'r') {
    red = Math.floor((Math.random()*250)+1);
  }
  if (key && key.name == 'g') {
    green = Math.floor((Math.random()*250)+1);
  }
  if (key && key.name == 'b') {
    blue = Math.floor((Math.random()*250)+1);
  }
});



m.startLoop(function(){
  m.setLight(40,1,red,green,blue);
  for(var i = 0; i < line.length; i++) {
    m.setLight(line[i].x,line[i].y,line[i].r,line[i].g,line[i].b);
  };
  if (active)
    m.setLight(mx,my,200,0,200);
  else
    m.setLight(mx,my,200,200,200);
}, 200)



process.stdin.setRawMode(true);
process.stdin.resume();
