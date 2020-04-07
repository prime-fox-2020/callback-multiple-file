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
    if (err) {
      throw err;
    } else {
      let parents = JSON.parse(data);
      console.log('Reading childrens file.........');
      sleep(5000);
      fs.readFile(children_file, 'utf8', (err, data) => {
        if (err) {
          throw err;
        } else {
          let childrens = JSON.parse(data);
          for (let child of childrens) {
            parents.map((_, b) => {
              if (parents[b].last_name == child.family) {
                if (parents[b].childrens == undefined) {
                  parents[b].childrens = []
                  parents[b].childrens.push(child.full_name)
                  console.log(`---> Processing ${child.full_name} into ${parents[b].last_name} family`)
                  sleep(500)
                } else {
                  parents[b].childrens.push(child.full_name)
                  console.log(`---> Processing ${child.full_name} into ${parents[b].last_name} family`)
                  sleep(500)
                }
              }
            })
          }

          fs.writeFileSync('./parents.json', JSON.stringify(parents, null, 2));
          console.log('\n----------------------------------------\n');
          console.log('FINISH !');
        }
      })
    }
  })
}

match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");
