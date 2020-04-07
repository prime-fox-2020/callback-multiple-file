const fs = require('fs');

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}


function match_data (parent_file, children_file) {
  fs.readFile(parent_file, (err, parentsData) => {
    if (err) throw err
    sleep(5000)
    const parentArr = JSON.parse(parentsData)
    fs.readFile(children_file, (err, childrenData) => {
      if (err) throw err
      sleep(5000)
      const childArr = JSON.parse(childrenData)
      parentArr.forEach(parents => {
        childArr.forEach(childrens => {
          if (parents['last_name'] === childrens['family']) {
            if (parents['children'] === undefined) {
              parents['children'] = [childrens['full_name']]
            } else {
              parents['children'].push(childrens['full_name'])
            }
          }
        })
      })
      console.log(parentArr)
    })
  })
}

match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");
