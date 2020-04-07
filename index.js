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
  fs.readFile(parent_file,'utf-8',(err,data1) => {
    sleep(5000)
    if (err) {
      throw err
    } else {
      fs.readFile(children_file,'utf-8',(err,data2) => {
        sleep(5000)
        if (err) {
          throw err
        }
        else {
          let parents_data = JSON.parse(data1)
          let childsdata = JSON.parse(data2)
          for (let i = 0; i < parents_data.length; i++) {
            parents_data[i].children = []
          }
          for (let i = 0; i < parents_data.length; i++) {
            for (let j = 0; j < childsdata.length; j++) {
              if (parents_data[i].last_name === childsdata[j].family) {
                parents_data[i].children.push(childsdata[j].full_name)
              }
            }
          }
          console.log(parents_data)
        }
      })
    }
  })
}

match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");
