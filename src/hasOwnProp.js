const hasOwnProp = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

module.exports = {
  hasOwnProp,
};
