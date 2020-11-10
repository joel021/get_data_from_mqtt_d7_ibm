var fs = require('fs');
var stream = fs.createWriteStream("helloworld.txt");
stream.once('open', function(fd) {
    console.log("O que é fd: "+fd)
  stream.write("My first row\n");
  stream.write("My second row\n");
  strem
  stream.end();
});