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
  const parents = fs.readFile('./parents.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err.message)
    }
    else {
      // console.log(JSON.parse(data))
      const parentsList = JSON.parse(data)
      const children = fs.readFile('./children.json', 'utf8', (err, data) => {
        if (err) {
          console.log(err.message);
        }
        else {
          // console.log(JSON.parse(data));
          const childrenList = JSON.parse(data)
          for (let i = 0; i < parentsList.length; i++) {
            parentsList[i].children = []
            for (let j = 0; j < childrenList.length; j++) {
              // console.log(parentsList.length, childrenList.length);
              if (parentsList[i].last_name === childrenList[j].family) {
                parentsList[i].children.push(childrenList[j].full_name);
              }
            }
          }
          console.log(parentsList);
        }
      })
    }
  })
}

match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");
