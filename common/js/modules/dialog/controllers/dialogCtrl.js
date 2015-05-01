(function(angular, bw){
    'use strict';

    function ConfirmDialogCtrlFn($sce, $modalInstance, data) {
      var self = this, msg;
      self.data = data;

      self.yes = yesFn;
      self.close = closeFn;
      msg = angular.isDefined(self.data) && angular.isDefined(self.data.msg) ? self.data.msg
            : '<h4>You have opened up the confirm dialog </h4>';

      self.header = (angular.isDefined(self.data.header)) ? self.data.header : 'Confirm dialog title';
      self.msg = $sce.trustAsHtml(msg);
      self.hideCancelBtn = (angular.isDefined(self.data.hideCancelBtn)) ? self.data.hideCancelBtn : false;

      function closeFn() {
        $modalInstance.close('No');
      }

      function yesFn() {
        $modalInstance.close('Yes');
      }
    }

    function SuccessDialogCtrlFn($sce, $modalInstance, data) {
        var self = this, msg;
        self.data = data;

        self.close = closeFn;

        msg = angular.isDefined(self.data) && angular.isDefined(self.data.msg) ? self.data.msg
            : '<h4>You have opened up the success dialog </h4>';

        self.header = (angular.isDefined(self.data.header)) ? self.data.header : 'Success dialog title';
        self.msg = $sce.trustAsHtml(msg);

        function closeFn() {
            $modalInstance.close();
        }
    }

    function ErrorDialogCtrlFn($sce, $modalInstance, data) {

        var self = this, msg;
        self.data = data;

        self.close = closeFn;

        msg = angular.isDefined(self.data) && angular.isDefined(self.data.msg) ? self.data.msg
            : '<h4>You have opened up the error  </h4>';
        self.header = (angular.isDefined(self.data.header)) ? self.data.header : 'Error dialog title';
        self.msg = $sce.trustAsHtml(msg);

        function closeFn() {
            $modalInstance.close();
        }
    }

    function WarnDialogCtrlFn($sce, $modalInstance, data) {
        var self = this, msg;
        self.data = data;

        self.close = closeFn;

        msg = angular.isDefined(self.data) && angular.isDefined(self.data.msg) ? self.data.msg
            : '<h4>You have opened up the warn dialog </h4>';

        self.header = (angular.isDefined(self.data.header)) ? self.data.header : 'Warn dialog title';
        self.msg = $sce.trustAsHtml(msg);

        function closeFn() {
            $modalInstance.close();
        }
    }

    ErrorDialogCtrlFn.$inject = ['$sce', '$modalInstance', 'data'];

    SuccessDialogCtrlFn.$inject = ['$sce', '$modalInstance', 'data'];

    ConfirmDialogCtrlFn.$inject = ['$sce', '$modalInstance', 'data'];

    WarnDialogCtrlFn.$inject = ['$sce', '$modalInstance', 'data'];

    angular.module(bw.modules.dialog.name)
        .controller(bw.modules.dialog.controllers.dialog.errorCtrl, ErrorDialogCtrlFn);

    angular.module(bw.modules.dialog.name)
        .controller(bw.modules.dialog.controllers.dialog.warnCtrl, WarnDialogCtrlFn);

    angular.module(bw.modules.dialog.name)
        .controller(bw.modules.dialog.controllers.dialog.confirmCtrl, ConfirmDialogCtrlFn);

    angular.module(bw.modules.dialog.name)
        .controller(bw.modules.dialog.controllers.dialog.successCtrl, SuccessDialogCtrlFn);

}(angular, bw));