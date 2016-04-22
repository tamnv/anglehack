angular.module('starter.services', [])

.factory('fileUploadService', function($http) {
  return {
    uploadFileToUrl: function(file, uploadUrl, params){
      var fd = new FormData();
      fd.append('file', file);
      promise = $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': 'application/json'},
        params: params
      });

      return promise;
    }
  }
});
