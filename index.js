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
  fs.readFile("parents.json","utf8", (err, dataP) => {
    if (err) {
      console.log(err);
    }
    else {
      let parents_data = JSON.parse(dataP);
      // console.log(parents_data);
      sleep(5000);
      fs.readFile("children.json", "utf8", (err, dataC) => {
        if (err) {
          console.log(err);
        }
        else {
          let children = JSON.parse(dataC);
          // console.log(children);
          sleep(5000);
          for (let i = 0; i < parents_data.length; i++) {
            parents_data[i].children = [];
            for (let j = 0; j < children.length; j++) {
              if (parents_data[i].last_name === children[j].family) {
                parents_data[i].children.push(children[j].full_name);
              }
            }
          }
        }
        console.log(parents_data);
      });
    }
  })
}

match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");
