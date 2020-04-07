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
  let parent, children;
  fs.readFile(parent_file, 'utf8', (err, data) => {
    if (err) throw err;
    else {
      sleep(5000);
      parent = JSON.parse(data);
      fs.readFile(children_file, 'utf8', (err, data) => {
        if (err) throw err;
        else {
          sleep(5000);
          children = JSON.parse(data);
          for (let i in parent){
            for (let j in children){
              if (children[j].family == parent[i].last_name){
                if (!parent[i]['children']) parent[i]['children'] = [children[j].full_name];
                else parent[i]['children'].push(children[j].full_name);
              }
            }
          }
          console.log(parent);
        }
      });
    }
  });
}

console.log("Notification : Data sedang diproses !");
match_data('./parents.json', './children.json')
