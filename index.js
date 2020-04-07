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
  fs.readFile(parent_file,`utf8`,(err,dataParent)=>{
    fs.readFile(children_file,'utf8',(err,dataChildren) =>{
      // membaca file
      sleep(5000)
      let parent_data = JSON.parse(dataParent)
      let children_data = JSON.parse(dataChildren)

      // proses memasukan file children ke parent 
      for (let i = 0; i < parent_data.length; i++) {
        for (let j = 0; j < children_data.length; j++) {
          if(children_data[j].family == parent_data[i].last_name){
            if(parent_data[i].children == undefined){
              parent_data[i].children =[];
              parent_data[i].children.push(children_data[j].full_name)
            }else{
              parent_data[i].children.push(children_data[j].full_name)
            }
          }
        }
      }
      
      console.log(parent_data)
    })
  })
}


match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");
