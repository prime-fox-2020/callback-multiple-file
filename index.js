const fs = require('fs');

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function match_data(parentList, childrenList) {
  let parents, childrens
  fs.readFile(parentList, function(err, data) {
    sleep(5000)
    parents = JSON.parse(data)
    fs.readFile(childrenList, function(err, data) {
      sleep(5000)
      childrens = JSON.parse(data)
      for (let i = 0; i < parents.length; i++) {
        parents[i].childrens = []
        for (let j = 0; j < childrens.length; j++) {
          if (parents[i].last_name === childrens[j].family) {
            parents[i].childrens.push(childrens[j].full_name)
          }
        }
      }
      console.log(parents);
    });
  });
  
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

match_data('./parents.json', './children.json')

let a1 = '.'
for(let a = 0 ; a < 4; a++){
  sleep(1000)
  clearScreen()
  console.log(`Notification : Data sedang diproses ${a1}`);
  a1 += ' .'
}