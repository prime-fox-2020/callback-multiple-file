const fs = require("fs");

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}

function readData(input, cb) {
  fs.readFile(input, "utf8", function(err, data) {
    if (err) {
      cb(err, null);
    } else {
      sleep(1000);
      cb(null, data);
    }
  });
}

function match_data(parent_file, children_file) {
  readData(parent_file, function(err, data) {
    if (err) throw err;
    else {
      let parent = JSON.parse(data);
      readData(children_file, function(err, data) {
        if (err) throw err;
        else {
          let children = JSON.parse(data);
          for (let i = 0; i < parent.length; i++) {
            if (parent[i].children == undefined) {
              parent[i].children = [];
            }
            for (let j = 0; j < children.length; j++) {
              if (parent[i].last_name === children[j].family) {
                parent[i]["children"].push(children[j].full_name);
              }
            }
          }
          console.log(parent)
        }
      });
    }
  });
}

match_data("./parents.json", "./children.json");
console.log("Notification : Data sedang diproses !");
