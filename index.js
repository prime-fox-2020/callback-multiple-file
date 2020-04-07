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
  fs.readFile(parent_file, "utf-8", ((err, data) => {
    if (err) {
      throw err
    } else {
      let parent_data = JSON.parse(data)
      fs.readFile(children_file, 'utf-8', ((err, data) => {
        if (err) {
          throw err
        } else {
          let children_data = JSON.parse(data)
          for (let i = 0; i < parent_data.length; i++) {
            for (let j = 0; j < children_data.length; j++) {
              if (parent_data[i].children == undefined) {
                parent_data[i].children = []
              }
              if (parent_data[i].last_name == children_data[j].family) {
                parent_data[i].children.push(children_data[j].full_name)
              }
            }
          }
          console.clear();
          console.log(parent_data);
          sleep(5000)
        }
      }))
      sleep(5000)
    }
    sleep(5000)
  }))
}

match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");
