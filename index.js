const fs = require('fs');

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function match_data(parent_file, children_file) {
 fs.readFile(parent_file, 'utf8', (err, data1) =>{
   sleep(5000);
    parents = JSON.parse(data1)
    fs.readFile(children_file, 'utf8', (err, data2) =>{
      sleep(5000);
      children = JSON.parse(data2)
      for(let a = 0; a < parents.length; a++){
        let temp = []
        for(let b = 0; b < children.length; b++){
          if(parents[a].last_name === children[b].family){
            temp.push(children[b].full_name)
          }
        }
        parents[a].children = temp
      }
      console.log(parents)
    });
  });
}

match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");

