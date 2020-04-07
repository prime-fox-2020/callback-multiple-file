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
			throw err
		} else {
			let parent = JSON.parse(data)
			fs.readFile(children_file, 'utf8', (err, data) => {
				if (err) {
					throw err
				} else {
					let child = JSON.parse(data)
					for (let i = 0; i < parent.length; i++) {
						parent[i].children = []
						for (let j = 0; j < child.length; j++) {
							if (child[j].family === parent[i].last_name) {
								parent[i].children.push(child[j].full_name)
							}
						}
          }
          sleep(5000)
					console.log(parent)
				}
			})
		}
	})
}

match_data('./parents.json', './children.json')
console.log("Notification : Data sedang diproses !");
