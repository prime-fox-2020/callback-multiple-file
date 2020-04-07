const fs = require('fs');

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}


function match_data(parent_file, children_file, callback) {
  sleep(5000);
  const dataParent = JSON.parse(fs.readFileSync(parent_file, 'utf8'));
  const dataChildren = JSON.parse(fs.readFileSync(children_file, 'utf8'));

  for (let parent of dataParent) {
    sleep(5000);
    parent.childrens = [];
    for (let children of dataChildren) {
      if (parent.last_name == children.family) {
        parent.childrens.push(children.full_name);
      }
    }
    callback(parent);
  }
}



console.log("Notification : Data sedang diproses !");
match_data('./parents.json', './children.json', (parent) => {console.log(parent)});
  