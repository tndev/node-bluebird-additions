
exports.extend = function(Promise) {
  
  function iterate(f, condition, handler) {
    
    return this.then(function(val) {
      f = f.bind(this);
      condition = condition.bind(this);
      handler = handler.bind(this);
      
      return new Promise(function(resolve, reject) {
        iter(resolve, reject, val);
      });
    });
    
    function iter( resolve, reject, val ) {
      Promise.resolve(condition(val))
      .then(function(cont) {
        if( cont ) next(val, resolve, reject);
        else resolve(val);
      }).catch(reject);
    }
    
    function next(val, resolve, reject) {
      Promise.resolve(handler(val))
      .then(function() {
        return f(val);
      })
      .then(function(val) {
        iter(resolve, reject, val)
      }).catch(reject)
    }
  }
  
  Promise.prototype.iterate = iterate;
};