var font = require('./font.js');
var keypress = require('keypress');
var matelight = require('matelight');


var m = matelight.connect();

var letters = [];
var ammount = 0;


keypress(process.stdin);

process.stdin.on('keypress', function (ch, key) {
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
    process.exit();
  }
  if (key && key.name == 'escape') {
    console.log('clear');
    ammount = 0;
    letters = [];
    return;
  }
  if(key) {
    console.log(ch, key);
    m.clean();
    var ascii = ch.charCodeAt(0);
    console.log(ch, key);
    for (var i = 0; i < font[ascii].length; i++){
      line = font[ascii][i].toString(2);
      while (line.length < 8){
        line = "0" + line;
      }
      var offsetx = ammount * 7;
      var offsety = 0;
      if (offsetx > 40)
        offsety = 8;

      for (var j = 0; j < line.length; j++){
        if(line[j] == '1')
          letters.push({x: j + offsetx, y: i + offsety, r: 200, g: 0, b: 0});
      }

    }
    ammount++;
  }
});

m.startLoop(function(){
  for(var i = 0; i < letters.length; i++) {
    m.setLight(letters[i].x,letters[i].y,letters[i].r,letters[i].g,letters[i].b);
  };
}, 200)

process.stdin.setRawMode(true);
process.stdin.resume();
