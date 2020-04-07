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
  // Code here
  fs.readFile(parent_file, 'utf8', (err, data) => {
    if(err) throw err;
    parents = JSON.parse(data);
    fs.readFile(children_file, 'utf8', (err, data) => {
      if(err) throw err;
      childs = JSON.parse(data);
      for(let parent of parents){
        parent.children = [];
        for(let child of childs){
          if(child.family === parent.last_name) parent.children.push(child.full_name);
        }
      }
      sleep(5000);
      console.log(parents)
    });
  });
}

match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");
