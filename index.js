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
  let parent, children;
  fs.readFile(parent_file, 'utf8', (err, parentData) => {
    if (err) {
      console.log(err);
    } else {
      parent = JSON.parse(parentData);
      sleep(5000);
    }

    fs.readFile(children_file, 'utf8', (err, childrenData) => {
      if (err) {
        console.log(err);
      } else {
        children = JSON.parse(childrenData);
        sleep(5000);
      }

      for (let a = 0; a < parent.length; a++) {
        parent[a].children = [];
        for (let b = 0; b < children.length; b++) {
          if (children[b].family == parent[a].last_name) {
            parent[a].children.push(children[b].full_name);
          }
        }
      }
      console.log(parent);
    })
  })
}

match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");
