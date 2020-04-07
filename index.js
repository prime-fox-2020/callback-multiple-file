const fs = require('fs');

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if (new Date().getTime() - start > milliseconds) {
			break;
		}
	}
}

function match_data(parent_file, children_file) {
	// Code here
	let kotakParent = [];
	fs.readFile(parent_file, 'utf8', (err, data) => {
		if (err) {
			throw err;
		} else {
			let ortu = JSON.parse(data);
			fs.readFile(children_file, 'utf8', (err, data) => {
				if (err) {
					throw err;
				} else {
					let anak = JSON.parse(data);
					for (var i = 0; i < ortu.length; i++) {
						ortu[i].children = [];
						for (var j = 0; j < anak.length; j++) {
							if (anak[j].family === ortu[i].last_name) {
								ortu[i].children.push(anak[j].full_name);
							}
						}
          }
          sleep(5000)
					console.log(ortu);
				}
			});
		}
	});
}

match_data('./parents.json', './children.json');
console.log('Notification : Data sedang diproses !');
