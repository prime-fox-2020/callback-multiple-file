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
  fs.readFile(parent_file, 'utf8', function(err,data) {
    sleep(5000)
    if (err) {
      throw err
    } 
    let parentData = JSON.parse(data)
    fs.readFile(children_file, 'utf8', function(err,data) {
      if (err) {
        throw err
      } 
      let childrenData = JSON.parse(data)
      for (let i = 0; i < parentData.length; i++) {
        parentData[i].children = []
        for (let j = 0; j < childrenData.length; j++) {
          if (parentData[i].last_name === childrenData[j].family) {
            parentData[i].children.push(childrenData[j].full_name)
          }
        }
      }
      console.log(parentData)
    })
  }) 
}

match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");
