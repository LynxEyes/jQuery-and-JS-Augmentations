//------------------------------------------------------------------------------
// Pure Javascript augmentations
//  * A collection of small utilities for pure javascript
//
// Ivo Jesus, 2012
//------------------------------------------------------------------------------

//##############################################################################
// Array Augmentations
//------------------------------------------------------------------------------
// Array min and max functions.
//  [1,7,3,5].max() # => 7
//  [1,7,3,5].min() # => 1
Array.prototype.max = function(){return Math.max.apply(null, this)};
Array.prototype.min = function(){return Math.min.apply(null, this)};

//------------------------------------------------------------------------------
// Array "indexOf" function. Not all implementations have it (ie8 or prior...)
// Returns the index of an element
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(obj, start) {
    for (var i = (start || 0), j = this.length; i < j; i++) {
      if (this[i] === obj) return i;
    }
    return -1;
  }
}

//-----------------------------------------------------------------------------
// For each element on the array, calls the callback with the accumulator and
// the element. The callback function should return an object of the same type
// as the accumulator.
// Ex: [1,2,3].inject("", function(acc,i){return acc+i}); # => "123"
Array.prototype.inject = function(accumulator, callback){
  for(var i = 0; i < this.length; i++)
    accumulator = callback(accumulator, this[i]);
  return accumulator;
};

//-----------------------------------------------------------------------------
// Returns a new array containing the result of calling "callback" on each
// element.
// Ex: [1,2,3].map(function(i){return i*2}); # => [2,4,6]
Array.prototype.map = function(callback){
  return this.inject([], function(acc, i){
    acc.push(callback(i));
    return acc;
  });
};

//-----------------------------------------------------------------------------
// Returns a new array containing the elements that when passed to "callback"
// return a trueish value.
// Ex: [1,2,3,5,4,0].select(function(i){return i>3}); # => [5,4]
Array.prototype.select = function(callback){
  var new_arr = [];
  for(var i = 0; i < this.length; i++)
    if (callback(this[i])) new_arr.push(this[i]);
  return new_arr;
};

//------------------------------------------------------------------------------
// Searches for an element on the array.
// If "arg" is an object, then returns the object if it is on the array:
//   Ex: [1,2,3].find(2) # => 2
// If "arg" is a function, then returns the first element that when passed to
// the function, returns a trueish value.
//   Ex: ["a","aaaa","aa"].find(function(i){return i.length > 3}) # => "aaaa"
Array.prototype.find = function(arg){
  if (arg instanceof Function){
    for(var i = 0; i < this.length; i++)
      if (arg(this[i])) return this[i];
  }else{
    var idx = this.indexOf(arg);
    return (idx >= 0) ? this[idx] : null;
  }
};

//------------------------------------------------------------------------------
// Checks if all the elements on the array yield a trueish value
// Ex: [1,2,3].to_bool() # => true;
// Ex: [1,2,null].to_bool() # => false;
// Ex: [true,false,true].to_bool() # => false;
Array.prototype.to_bool = function(){
  return this.inject(true, function(acc,i){return !!(acc && i)});
};

//------------------------------------------------------------------------------
//##############################################################################

//-----------------------------------------------------------------------------
// Chains 2 methods together.
function chain_methods(original_name, chained){
  var original_method = eval(original_name);
  eval(original_name + " = function(){\
    var retval = original_method.apply(this, arguments);\
    chained.apply(this, arguments);\
    return retval;\
  };");
}
//-----------------------------------------------------------------------------
