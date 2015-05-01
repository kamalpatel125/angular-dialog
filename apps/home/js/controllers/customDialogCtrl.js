(function(angular, bw){
  'use strict';

  function CustomDialogControllerFn($modalInstance, data) {
      var self = this;
      self.data = data;

      self.submitForm = submitFormFn;
      self.close = closeFn;

      function submitFormFn() {
         //Submit form on server
          $modalInstance.close({
              success: true,
              formData: self.model
          });
      }

      function closeFn() {
          $modalInstance.close({
              success: false
          });
      }
  }

  CustomDialogControllerFn.$inject = ['$modalInstance', 'data'];

  angular.module(bw.modules.apps.home.name)
    .controller(bw.modules.apps.home.controllers.customDialogCtrl, CustomDialogControllerFn);

}(angular, bw));