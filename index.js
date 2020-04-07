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
  fs.readFile(parent_file, (err,data) =>{
    sleep(3000);
    console.log('Sedang baca file parent...');
    sleep(3000);
    if(err) throw err;
    let parent = JSON.parse(data);
    console.log('Sedang baca file children...');
    sleep(3000);

    fs.readFile(children_file, (err, data) => {
      if(err) throw err;
      let children = JSON.parse(data);
      for (let i = 0; i < parent.length; i++) {
        parent[i].children = [];
        for (let j = 0; j < children.length; j++) {
          if(parent[i].last_name == children[j].family){
            parent[i].children.push(children[j].full_name);
          }
        }
      }
      console.log(parent);
    })
  })
}



match_data('./parents.json', './children.json');
console.log("Notification : Data sedang diproses !");
