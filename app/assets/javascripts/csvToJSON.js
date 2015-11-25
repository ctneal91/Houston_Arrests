var fs = require("fs");
var path = require("path");
var Converter = require("csvtojson").Converter;
var converter = new Converter({
	toArrayString:true
});

converter.on("end_parsed", function(jsonArray){
	console.log("Converted CSV to JSON in ../../../db/HCPDArrestData.json");
});


fs.createReadStream("../../../db/HCPDArrestData.csv")
	.pipe(converter)
	.pipe(fs.createWriteStream(path.resolve(__dirname, '../../../db/HCPDArrestData.json')));

