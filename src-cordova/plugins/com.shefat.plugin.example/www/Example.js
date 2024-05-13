module.exports = {
  getHellow: function(successCallback, errorCallback, message="hellow from shefat") {
    cordova.exec(successCallback, errorCallback, 'Example', 'Example', [message]);
  }
};
