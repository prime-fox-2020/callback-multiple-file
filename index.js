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
    sleep(2000)
    if (err) throw err
    let parents = JSON.parse(data)
    fs.readFile(children_file, 'utf8', (err, data) => {
      sleep(2000)
      if (err) throw err
      parents.forEach(parent => {
        parent.childrens = []
        JSON.parse(data).forEach(children => {
          if (children.family === parent.last_name) parent.childrens.push(children.full_name)
        })
      })
      console.log(parents)
    })
  })
}

match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");