//Parse an address with the url.parse() method, and it will return a URL //object with each part of the address as properties: Split a web address //into readable parts:
var url = require('url');
var adr = blisting.burl;
var q = url.parse(adr, true);

console.log(q.host); 
console.log(q.pathname); 
console.log(q.search); 

var qdata = q.query; //returns an object: {  }
console.log(qdata.month); 
 
