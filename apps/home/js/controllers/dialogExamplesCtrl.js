(function(angular, bw){
  'use strict';

  function DialogExampleControllerFn(dialogService) {
      var self = this;

      self.openDilog = openDilogFn;
      self.submittedFormData = undefined;
      function openDilogFn(type){
         if(type === 'success'){
             //Can pass custom header and body message. it' returning promise.
             //dialogService.success('header', 'body message');
             dialogService.success().then(function(){
                 self.closeSuccess = 'You have closed the success dialog';
             });
         }
         if(type === 'warn'){
             //Can pass custom header and body message. it' returning promise.
             //dialogService.warn('header', 'body message');
             dialogService.warn().then(function(){
                 self.closeWarn = 'You have closed the warn dialog';
             });
         }
         if(type === 'error'){
             //Can pass custom header and body message. it' returning promise.
             //dialogService.error('header', 'body message');
             dialogService.error().then(function(){
                 self.closeError = 'You have closed the error dialog';
             });
         }
         if(type === 'confirm'){
             //Can pass custom header and body message. it' returning promise.
             //dialogService.confirm('header', 'body message');
             dialogService.confirm().then(function(result){
                 self.confirmed = 'You have pressed ' + result;
             });
         }
         if(type === 'custom'){
             var templateUrl = 'html/customDialog.tpl.html',
                 controllerName = bw.modules.apps.home.controllers.customDialogCtrl,
                 options = {
                    controllerAs : 'customDialogVm',
                    data : { title : 'Custom dialog title' }
                 };

             dialogService.custom(templateUrl, controllerName, options)
                 .then(function(results){
                    if(results.success){
                        self.submittedFormData = results.formData;
                    }
                 });
         }
      }
  }

  DialogExampleControllerFn.$inject = [
      bw.modules.dialog.services.dialogService
  ];

  angular.module(bw.modules.apps.home.name)
    .controller(bw.modules.apps.home.controllers.dialogExamplesCtrl, DialogExampleControllerFn);

}(angular, bw));