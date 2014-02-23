var keypress = require('keypress');
var matelight = require('matelight');


var m = matelight.connect();
// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);
var mx = 1;
var my = 1
var line = [];
var active = false;

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
    process.exit();
  }
  if (key && key.name == 'right') {
    mx++;
    if (active) line.push({x: mx, y: my});
  }
  if (key && key.name == 'left') {
    mx--;
    if (active) line.push({x: mx, y: my});
  }
  if (key && key.name == 'up') {
    my--;
    if (active) line.push({x: mx, y: my});
  }
  if (key && key.name == 'down') {
    my++;
    if(active) line.push({x: mx, y: my});
  }
  if (key && key.name == 'space') {
    active = !active;
    if(active) line.push({x: mx, y: my});
    console.log('active:', active);
  }
  if (key && key.name == 'escape') {
    console.log('clear');
    line = [];
  }
  if (key && key.name == 'x') {
    console.log('delete');
    //line = [];
  }
});


m.startLoop(function(){

  for(var i = 0; i < line.length; i++) {
    m.setLight(line[i].x,line[i].y,200,0,0);
  };
  if (active)
    m.setLight(mx,my,200,0,200);
  else
    m.setLight(mx,my,200,200,200);
}, 200)



process.stdin.setRawMode(true);
process.stdin.resume();
