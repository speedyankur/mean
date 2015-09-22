'use strict';

angular.module('users').controller('CropModalController', ['$scope', '$timeout', '$modalInstance', 'Cropper',
  function ($scope, $timeout, $modalInstance, Cropper) {
    var data, file;

    $scope.init = function () {
      /**
       * Croppers container object should be created in controller's scope
       * for updates by directive via prototypal inheritance.
       * Pass a full proxy name to the `ng-cropper-proxy` directive attribute to
       * enable proxing.
       */
      $scope.cropper = {};
      $scope.cropperProxy = 'cropper.first';
      file = $scope.$parent.imgFile;

      Cropper.encode(file).then(function (dataUrl) {
        $scope.dataUrl = dataUrl;
        $timeout(showCropper); // wait for $digest to set image's src
      });
    };

    $scope.rotate = function (angle) {
      $scope.cropper.first('rotate', angle);
    };


    $scope.finish = function () {
      // Resize image
      data.x=Math.floor(data.x);
      data.y=Math.floor(data.y);
      Cropper.crop(file, data).then(function(blob) {
        return Cropper.scale(blob, {width: 200});
      }).then(Cropper.encode).then(function (imgUrl) {
        $scope.$emit('finishedCrop', imgUrl);
        $modalInstance.dismiss('cancel');
      });
    };

    /**
     * Object is used to pass options to initalize a cropper.
     * More on options - https://github.com/fengyuanchen/cropper#options
     */
    $scope.options = {
      maximize: true,
      aspectRatio: 4 / 3,
      strict: false,
      zoomable: false,
      movable: false,
      crop: function (dataNew) {
        data = dataNew;
      }
    };

    /**
     * Showing (initializing) and hiding (destroying) of a cropper are started by
     * events. The scope of the `ng-cropper` directive is derived from the scope of
     * the controller. When initializing the `ng-cropper` directive adds two handlers
     * listening to events passed by `ng-cropper-show` & `ng-cropper-hide` attributes.
     * To show or hide a cropper `$broadcast` a proper event.
     */
    $scope.showEvent = 'show';
    $scope.hideEvent = 'hide';

    function showCropper() {
      $scope.$broadcast($scope.showEvent);
    }

    function hideCropper() {
      $scope.$broadcast($scope.hideEvent);
    }

  }
]);
