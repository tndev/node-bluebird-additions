var Promise = require('bluebird');
var keysAll = require('../keys').all;
var atomicAll = require('../atomic').all;



function test() {
  return new Promise(function(resolve, reject) {
    resolve(1);
    //reject(new Error('test'));
  });
}


keysAll({test1: test(), test2: test()})
.then(function( result) {
  console.dir(result);
})
.catch(function(e) {
  console.dir(e);
})

atomicAll([test(),test()])
.then(function(result) {
  console.dir('??????')
  console.dir(result);
}).catch(function(e) {
  console.log('got an error');
  console.dir(e);
});