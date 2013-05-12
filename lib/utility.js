var utility = {};

//###utility.is
//This function check if `object` is a `type`
var toString = Object.prototype.toString;
utility.is = function(type, object){
  return toString.call(object) === '[object ' + type + ']';
} 

module.exports = utility;