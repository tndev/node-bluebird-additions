var Promise = require('bluebird');


function keysAll(obj) {
  var keys = Object.keys(obj);
  var list = [];
  keys.forEach(function(key) {
    list.push(obj[key]);
  });
  return Promise.all(list)
  .then(function(result) {
    list = {};
    result.forEach(function( value, idx ) {
      list[keys[idx]] = value;
    });
    
    return list;
  });
}


exports.all = keysAll;