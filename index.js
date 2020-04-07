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
  fs.readFile(parent_file, 'utf8', function (err, parent) {
    fs.readFile(children_file, 'utf8', function (err, children) {
      let parent_data = JSON.parse(parent)
      let children_data = JSON.parse(children)

      for (let i = 0; i < parent_data.length; i++) {
        parent_data[i].children = []
        for (let j = 0; j < children_data.length; j++) {
          // jika last name parent sama dengan family name children
          if (parent_data[i].last_name === children_data[j].family) {
            parent_data[i].children.push(children_data[j].full_name)
          }
        }
      }
      sleep(5000)
      console.log(parent_data);
    })
  })
}

match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");
