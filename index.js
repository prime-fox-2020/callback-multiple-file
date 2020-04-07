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
  let parent = []
  let children = []
  fs.readFile(parent_file, 'utf8', (err, data) => {
    sleep(5000)
    if (err){
      console.log('error :' + err.message)
    } else {
      parent = JSON.parse(data)
      fs.readFile(children_file, 'utf8', (err, data) => {
        if (err){
          console.log('error :' + err.message)
        } else {
          children = JSON.parse(data)
          for (let i = 0; i < parent.length; i++) {
            parent[i].children = []
            for (let j = 0; j < children.length; j++) {
              if (parent[i].last_name === children[j].family)
              parent[i].children.push(children[j].full_name)
            }
          }
        }
        console.log(parent)
      })
    }
  })
}

match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");
