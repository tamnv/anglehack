angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaCamera, $cordovaFileTransfer, $cordovaFile, $http) {
  // Take photo
  $scope.takePicture = function(){
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };
    $cordovaCamera.getPicture(options).then(function (imageData) {
      console.log(imageData);
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function (err) {
    });
  };

  // Upload photo.
  $scope.uploadPhoto = function() {
    var fileURL = $scope.imgURI;
    var options = {
      fileKey: "file",
      fileName: 'test.jpeg',
      chunkedMode: true,
      mimeType: "image/jpeg"
    };

    $cordovaFileTransfer.upload("http://coworking.drupalchimp.com/upload.php", fileURL, options).then(function(result) {
      console.log("SUCCESS: " + JSON.stringify(result.response));
    }, function(err) {
      console.log("ERROR: " + JSON.stringify(err));
    }, function (progress) {
      // constant progress updates
    });

    var data = {
      image_data: fileURL,
    };

    var config = {
      'Content-Type' : 'application/json',
    };
    $http.post('http://hackanoi-visual-recognition.mybluemix.net/api/testrice', data, config).then(function(res){
      var data = res.data;
      console.log(data);
      if (data.score >= 0.7) {
        alert('Cay lua');
      } else {
        alert('Khong phai cay lua');
      }
    });
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
