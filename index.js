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
  let parentList, childrenList;
  fs.readFile(parent_file, 'utf-8', (err,data) => { 
    sleep(5000)
    if (err) throw err;
    parentList = JSON.parse(data);
    fs.readFile(children_file, 'utf-8', (err,data) => { 
      sleep(5000)
      if (err) throw err
      childrenList = JSON.parse(data);
      for(let i=0; i<parentList.length; i++){
        parentList[i]['children'] = [];
        for(let j=0; j<childrenList.length; j++){
          if(parentList[i].last_name == childrenList[j].family){
            parentList[i].children.push(childrenList[j].full_name);
          }
        }
      }
      console.log(parentList);

    })

    return data
  })

}

match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");
