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

  var slot = 1;
  var slots = [];
  for(var i = 0; i < 40; i++) {
      slots.push(Math.floor((Math.random()*4)+1));
  };


m.startLoop(function(){

  for(var i = 0; i < line.length; i++) {
    m.setLight(line[i].x,line[i].y,0,line[i].green,line[i].blue);
    var lower = line[i].green-100;
    var lowest = line[i].green-100;
    if (lower < 0) lower = 0;
    if (lowest < 0) lowest = 0;
    lower = 50;
    lowest = 10;
    m.setLight(line[i].x,line[i].y-1,0,lower,line[i].blue);
    m.setLight(line[i].x,line[i].y-2,0,lowest,line[i].blue);
    if(slots[line[i].x] <= slot) line[i].y++;
    if (line[i].y > 16) line.splice(i, 1);
  };
  if (slot == 2) {
  for(var j = 0; j < 12; j++){
    line.push({
      x:Math.floor((Math.random()*40)+1),
      y: 1,
      green:50+Math.floor((Math.random()*200)+1),
      blue:Math.floor((Math.random()*10)+1)
    });
  }
  }
  slot++;
  if (slot > 4) slot = 1;
}, 3000)

process.stdin.setRawMode(true);
process.stdin.resume();
