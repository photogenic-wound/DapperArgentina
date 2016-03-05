const serverUrl = 'http://104.236.168.119:3000';
var $ = require('jquery');

module.exports = {};

module.exports.getPullsFromApi = function (successCallback, errCallback) {
  var options = {
    url: serverUrl + '/api/user/pulls',
    type: 'GET',
    success: successCallback,
    error: errCallback
  };
 
  $.ajax(options); 
};