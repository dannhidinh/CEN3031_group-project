/* register the modules the application depends upon here*/
angular.module('blistings', []);
//angular.module('ulistings', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('BodegaApp', ['blistings']);
