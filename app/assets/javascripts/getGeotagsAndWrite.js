var HCPDRawArrestData = require('../../../db/HCPDArrestDataPartial.json');
var async = require('async');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var geocoder = require('geocoder');
var counter = 1;

//Use an asyncronous function to pull geocode data based on the address in the object
async.mapSeries(
	HCPDRawArrestData,
	geocodeAsync,
	function (err, geocodeResults){
	    var fullGeosByArrestUID;
	    console.log("async.mapSeries callback");

	    if(!_.isEmpty(err)){
	    	console.log("Errors!");
	     	writeToJSON('geocoding.errors', err);
	    }
	    if(!_.isEmpty(geocodeResults)){
	      	fullGeosByArrestUID = _.zipObject(_.pluck(HCPDRawArrestData, 'BOOKING_NUMBER'), geocodeResults);

	      	_.each(HCPDRawArrestData, _.partial(setLatLng, geocodeResults));
	    	console.log("added geocodes to data!");

	      	writeToJSON('geocode.results', fullGeosByArrestUID);
	      	console.log("write to geocode.results");

	      	writeToJSON('arrests.reduced.geocoded', HCPDRawArrestData);
	      	console.log("write to arrests.reduced.geocoded");
		}
	}
);


function geocodeAsync(arrestRecord, callback){
  return _.delay(getGeocodeAsync, 1);

  function getGeocodeAsync(){
    var address = getAddress(arrestRecord);
    geocoder.geocode(address, function(err, data){
      if (err) {
      	console.log("getGeocodeAsync Error");
        callback(err);
      } else {
      	console.log("Address #" + counter++ + " " + address);
        callback(null, formatGeocodeResult(data, address));
      }
    });
  }
}

//Returns a string address from several values in the arrest record object
function getAddress(arrestRecordforAddress){
	var address = _(arrestRecordforAddress).pick(
		'ADDRESS_NUMBER', 
		'ADDRESS_PREFIX', 
		'ADDRESS_STREET',
		'ADDRESS_SUFFIX',
		'ADDRES_CITY', 
		'ADDRESS_STATE',
		'ADDRESS_ZIP'
		).values().value().join(' ').trim().replace(/\s{2,}/g, ' ');
 	return address;
}

//Sets the lat and lng as a value in each arrest record object
function setLatLng(datas, arrestRecord, index){

  if(_.isUndefined(datas[index]) ||
    _.isUndefined(datas[index].results) ||
    _.isUndefined(datas[index].results[0]) ||
    _.isUndefined(datas[index].results[0].geometry) ||
    _.isUndefined(datas[index].results[0].geometry.location)
  ){
    return;
  }

  arrestRecord.lat = datas[index].results[0].geometry.location.lat;
  arrestRecord.lng = datas[index].results[0].geometry.location.lng;
}

//Haven't looked into this function
function formatGeocodeResult(result, query){
	var formattedResults = _.extend({}, result, {query: query});
  return formattedResults;
}

//You can change the information that is written to JSON by changing the array in the middle 
//JSON.stringify parameter
function writeToJSON(filename, data){
  fs.writeFile(path.resolve(__dirname, '../../../db/' + filename + '.json'), 
  	JSON.stringify(data,
  		["BOOKING_NUMBER",
  		"RACE",
		"lat",
		"lng"]
  		1));
}
