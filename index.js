const fs = require('fs');

function sleep(milliseconds) {
  var start = new Date().getTime();
  while ((new Date().getTime() - start) < milliseconds) {
    // Hold the process. Do nothing.
  }
}


function match_data(parent_file, children_file) {
  console.log("Notification: Data sedang diproses!");
  fs.readFile(parent_file, 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {  
      const dataParent = JSON.parse(data);
      sleep(dataParent.length * 200);
      console.log(`Selesai membaca data parent.`);
      fs.readFile(children_file, 'utf8', (err, data) => {
        if (err) {
          throw err;
        } else {
          const dataChildren = JSON.parse(data);
          sleep(dataChildren.length * 100);
          console.log(`Selesai membaca data children.`);
          console.log(`\nMemulai proses macthing.`);
          sleep(1000);
          for (let parent of dataParent) {
            parent.children = [];
            for (let children of dataChildren) {
              if (children.family == parent.last_name)
                parent.children.push(children.full_name)
            }
            sleep(parent.children.length*100);
            console.log(`\nProses matching berhasil.`);
            console.log(parent);
          }
          console.log(`\nProses matching selesai.`);
        }
      }); 
    }
  });
}

match_data('./parents.json', './children.json');
  