//use EJS for our templates
var ejs = require('ejs');
//required so we can read our template file
var fs = require('fs')

var content;

//read our template file 
fs.readFile('template.ejs', 'utf8', function (err, template) {
	console.log("template: " + template);

	//render our template file with the included varables to change
	content = ejs.render(template,{
	    name:"test name",
	    description:"this is the description",
	    coordinates:"-122.0822035425683,37.42228990140251,0"
	});

	// users = ['geddy', 'neil', 'alex'];

	// content = ejs.render('<?= users.join(" | "); ?>', {users: users}, {delimiter: '?'});

	console.log("Content 1: " + content);

	fs.writeFile("geocodeKML.kml", content);
});

console.log("Content 2: " + content);

//write the rendered template to the client

