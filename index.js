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
  let parent_Data = []
  let children_Data = []

  fs.readFile(parent_file, "utf8", (err, data) => {
    if (err) {
      console.log(err.message)
    } else {
      parent_Data = JSON.parse(data)
      // console.log(parent_Data)
      fs.readFile(children_file, "utf8", (err, data) => {
        if (err) {
          console.log(err.message)
        } else {
          children_Data = JSON.parse(data)
          // console.log(children_Data)
          for (let i = 0; i < parent_Data.length; i++) {
            parent_Data[i].family = []
            for (let j = 0; j < children_Data.length; j++) {
              if (parent_Data[i].last_name == children_Data[j].family) {
                parent_Data[i].family.push(children_Data[j].full_name)
              }
              // console.log(parent_Data)

            }

          }
          sleep(5000)
          console.log(parent_Data)
        }
      })
    }
  })

}

match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");
