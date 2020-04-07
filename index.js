const fs = require('fs');

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function match_data(parent_file, children_file,cb) {
  // Code here
  fs.readFile(parent_file,"utf8",(err,parData)=>{
    if(err){
      cb(err,null)
    }else{
      let parentData = JSON.parse(parData)
      
      fs.readFile(children_file,"utf8",(err,chiData)=>{
        if(err){
          cb(err,null)
        }else{
          let childrenData = JSON.parse(chiData)
          for (let i = 0 ; i < parentData.length ; i ++){
            parentData[i].anak = [];
            for (let j = 0; j < childrenData.length; j++) {
              if(parentData[i].last_name == childrenData[j].family){
                parentData[i].anak.push(childrenData[j].full_name);
              }
            }
          }    
          cb(null,parentData)
        }
      }) 
    }
  })
}


function consoleloghere(parameter){
  console.log(parameter)
}


match_data('./parents.json', './children.json',(err,data)=>{
  if(err){
    throw err
  }else{
    consoleloghere(data)
  }
})
console.log("Notification : Data sedang diproses !");
