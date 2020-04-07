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

  fs.readFile(parent_file, null, (err,data) =>{
    if(err) {
      throw (err)
    } else {

      let parents = JSON.parse(data)

      let children = fs.readFileSync(children_file, 'utf8')
      let chil = JSON.parse(children)

      for(let i=0; i<parents.length; i++){
        parents[i].chil = []
        for(let j=0; j<chil.length; j++) {
          if(parents[i].last_name === chil[j].family){
            parents[i].chil.push(chil[j].full_name)
          }
        }
      }

      console.log(parents)
    }
    
  })
}


match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");