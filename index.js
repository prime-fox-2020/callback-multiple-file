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
  console.log(`Processing Parents Data ...`)
  sleep(5000)
  fs.readFile(parent_file, 'utf8', (err, parentFile) => {
    if (err) {
      throw err;
    } else {
      let parentData = JSON.parse(parentFile)
      console.log(`Processing Childrens Data ...`)
      sleep(5000)
      fs.readFile(children_file,'utf8',(err,childFile) =>{
        if(err){
          throw err;
        }else{
          console.log(`Finding Matching Data ... `)
          sleep(5000)
          let childData = JSON.parse(childFile)
          for(var i = 0; i<parentData.length;i++){
            parentData[i].children = []
            for(var j = 0 ; j<childData.length;j++){
              if(parentData[i].last_name === childData[j].family){
                parentData[i].children.push(childData[j].full_name)
              }
            }
          }
        }
        console.log(`Showing Finished Data ... `)
        sleep(500)
        console.log(parentData)
      })
    }
  })
}

match_data('./parents.json', './children.json')
// console.log("Notification : Data sedang diproses !");
