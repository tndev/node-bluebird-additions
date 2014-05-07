var Promise = require('bluebird');
var arrayMap = Array.prototype.map;

exports.map = function(array, f) {
  
  var arrayOfPromises = arrayMap.call(array,function(x) {
    return when.resolve(x).then(f);
  });
  
  return Promise.settle(arrayOfPromises)
  .then(function(descriptors) {
    var result = [];
    
    descriptors.forEach(function(descriptor) {
      if( descriptor.state === 'rejected') {
        throw descriptor.reason;
      }
      
      result.push(descriptor._settledValue);
    });
    
    return result;
  });
};




exports.all = function(arrayOfPromises) {
  
  return Promise.settle(arrayOfPromises)
  .then(function(descriptors) {
    var result = [];
    
    descriptors.forEach(function(descriptor) {
      if( descriptor.state === 'rejected') {
        throw descriptor.reason;
      }
      //console.dir(descriptor.state );
      
      result.push(descriptor._settledValue);
    });
    
    return result;
  });
};