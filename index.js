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
    sleep(5000)
    let parentData = JSON.parse(data)
    
    fs.readFile(children_file, 'utf8', (err, data) => {
      sleep(5000)
      let childrenData = JSON.parse(data)


      for(let i = 0; i < parentData.length; i++){
        for(let j = 0; j < childrenData.length; j++){
          if(childrenData[j].family === parentData[i].last_name){
            if(parentData[i].children === undefined){
              parentData[i].children = []
              parentData[i].children.push(childrenData[j].full_name)
            }else{
              parentData[i].children.push(childrenData[j].full_name)
            }
          }
        }
      }


      console.log(parentData)
    })
  })
}

match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");
