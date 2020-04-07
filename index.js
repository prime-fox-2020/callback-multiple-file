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
  fs.readFile(parent_file,'utf-8',(err, data) => {
    sleep(5000)
    if(err) {
      throw err
    } else {
      let parents = JSON.parse(data)
      fs.readFile(children_file,'utf-8',(err,data) => {
        sleep(5000)
        if(err) {
          throw err
        } else {
          let childs = JSON.parse(data)
          for(let i = 0; i < parents.length; i++) {
            parents[i].children = []
            for(let j = 0; j < childs.length; j++) {
              if(parents[i].last_name == childs[j].family) {
                parents[i].children.push(childs[j].full_name)
              }
              // console.log(parents[i])
            }
          }
        }
        console.log(parents)
      })
    }
  })
}

match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");
