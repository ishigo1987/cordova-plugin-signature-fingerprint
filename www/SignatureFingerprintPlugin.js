/*jslint indent: 2 */
/*global window, jQuery, angular, cordova */
"use strict";

var getPromisedCordovaExec = function (command, data, success, fail) {
  var toReturn, deferred, injector, $q;
  if (success === undefined) {
    if (window.jQuery) {
      deferred = jQuery.Deferred();
      success = deferred.resolve;
      fail = deferred.reject;
      toReturn = deferred;
    } else if (window.angular) {
      injector = angular.injector(["ng"]);
      $q = injector.get("$q");
      deferred = $q.defer();
      success = deferred.resolve;
      fail = deferred.reject;
      toReturn = deferred.promise;
    } else if (window.when && window.when.promise) {
      deferred = when.defer();
      success = deferred.resolve;
      fail = deferred.reject;
      toReturn = deferred.promise;
    } else if (window.Promise) {
      toReturn = new Promise(function(c, e) {
        success = c;
        fail = e;
      });
    } else if (window.WinJS && window.WinJS.Promise) {
      toReturn = new WinJS.Promise(function(c, e) {
        success = c;
        fail = e;
      });
    } else {
      return console.error('AppVersion either needs a success callback, or jQuery/AngularJS/Promise/WinJS.Promise defined for using promises');
    }
  }
  // 5th param is NOT optional. must be at least empty array
  cordova.exec(success, fail, "SignatureFingerprint", command, data || []);
  return toReturn;
};

var getSignatureFingerprint = function (success, fail) {
  return getPromisedCordovaExec('getCoolMethod', success, fail);
}

SignatureFingerprint.getCoolMethod = function (success, fail) {
  return getPromisedCordovaExec('getCoolMethod', data, success, fail);
}

module.exports = getSignatureFingerprint;