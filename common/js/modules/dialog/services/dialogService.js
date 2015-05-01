(function(angular, bw){
  'use strict';

function DialogServiceFn($document, $compile, $q, $http, $templateCache, $rootScope, $controller) {

  var self = this;

  self.success = successFn;
  self.error = errorFn;
  self.warn = warnFn;
  self.confirm = confirmFn;
  self.custom  = customFn;

  /**
     * Error Dialog
     *
     * @param    header    string
     * @param    msg    string
     */
  function errorFn(header, msg) {
    return openModalFn({
      templateUrl: '../../common/js/modules/dialog/html/errorDialog.tmpl.html',
      controller: bw.modules.dialog.controllers.dialog.errorCtrl,
      controllerAs: 'errorModalVm',
      data: {
        header: angular.copy(header),
        msg: angular.copy(msg)
      }
    });
  }

  /**
     * success Dialog
     *
     * @param    header        string
     * @param    msg        string
  */
  function successFn(header, msg) {
    return openModalFn({
      templateUrl: '../../common/js/modules/dialog/html/successDialog.tmpl.html',
      controller: bw.modules.dialog.controllers.dialog.successCtrl,
      controllerAs: 'successModalVm',
      data: {
        header: angular.copy(header),
        msg: angular.copy(msg)
      }
    });
  }

  /**
     * warn Dialog
     *
     * @param    header        string
     * @param    msg        string
     */
  function warnFn(header, msg) {
      return openModalFn({
        templateUrl: '../../common/js/modules/dialog/html/warnDialog.tmpl.html',
        controller: bw.modules.dialog.controllers.dialog.warnCtrl,
        controllerAs: 'warnModalVm',
        data: {
          header: angular.copy(header),
          msg: angular.copy(msg)
        }
      });
    }

  /**
     * Confirm Dialog
     *
     * @param    header    string
     * @param    msg    string
     * @param    opts    object
     */
  function confirmFn(header, msg, opts) {
      var hideCancelBtn;

      if (opts) {
        hideCancelBtn = opts.hideCancelBtn;
      }

      return openModalFn({
        templateUrl: '../../common/js/modules/dialog/html/confirmDialog.tmpl.html',
        controller: bw.modules.dialog.controllers.dialog.confirmCtrl,
        controllerAs: 'confirmModalVm',
        data: {
          header: angular.copy(header),
          msg: angular.copy(msg),
          hideCancelBtn: hideCancelBtn
        }
      });
    }

  /**
     * Create Custom Dialog
     *
     * @param    url    string
     * @param    ctrl    string
     * @param    data    object
     * @param    opts    object
     */
  function customFn(url, ctrl, opts) {
    var controllerAsName,
        data;
    if (opts) {
        controllerAsName = opts.controllerAs;
        data = opts.data;
    }
    return openModalFn({
      templateUrl: url,
      controller: ctrl,
      controllerAs: controllerAsName,
      data: data ? angular.copy(data) : undefined
    });
  }

  function createModal(options, templateHtml, closeCallback) {
      var bodyElement = angular.element($document[0].body),
          modalHtml, overlay, modelHtmlWithBasicTemplate,
          newScope  = $rootScope.$new();

        overlay  = angular.element('<div class="modal-backdrop"></div>');
        modelHtmlWithBasicTemplate = '<div class="modal fade"><div class="modal-dialog"><div class="modal-content">'
        + templateHtml +
        '</div></div></div>';

        modalHtml  = angular.element(modelHtmlWithBasicTemplate);

        overlay.css({
            display: 'block',
            opacity: 0.4
        });

        modalHtml.css({
            display: 'block',
            opacity: 1,
            top: '10%'
        });

        if (options.controller) {
            var ctrl, modalInstance, ctrlLocals = {};

            modalInstance = {
                close: closeModalFn,
                dismiss: closeModalFn
            };

            ctrlLocals.$scope = newScope;
            ctrlLocals.$modalInstance = modalInstance;
            ctrlLocals.data = options.data;

            ctrl = $controller(options.controller, ctrlLocals);
            if (options.controllerAs) {
                newScope[options.controllerAs] = ctrl;
            }
        }

        function closeModalFn(result) {
            newScope.$destroy();
            newScope = null;
            overlay.remove();
            overlay = null;
            modalHtml.remove();
            modalHtml = null;
            closeCallback(result);
        }

        function closeModalOnEscKeyFn(evt) {
            if (evt.which === 27) {
                evt.preventDefault();
                closeModalFn();
            }
        }

        $compile(modalHtml)(newScope);

        bodyElement.append(overlay);
        bodyElement.append(modalHtml);

        overlay.on('click', closeModalFn);
        $document.on('keydown', closeModalOnEscKeyFn);

        newScope.$on('$destroy', function() {
            overlay.off('click', closeModalFn);
            $document.off('keydown', closeModalOnEscKeyFn);
        });
    }

  function openModalFn(options) {
        var defer = $q.defer();
        loadTemplate(options.templateUrl).then(function(templateHtml) {
            createModal(options, templateHtml, function(data) {
                defer.resolve(data);
            });
        }, defer.reject);

        return defer.promise;
    }

  function loadTemplate(url) {
        var defer = $q.defer(),
            data  = $templateCache.get(url);

        if (data) {
            defer.resolve(data);
        } else {
            $http.get(url, {cache: true}).success(function(html) {
                $templateCache.put(url, html);
                defer.resolve(html);
            });
        }

        return defer.promise;
    }

}

DialogServiceFn.$inject = ['$document', '$compile', '$q', '$http', '$templateCache', '$rootScope', '$controller'];

/**
 * @ngdoc service
 * @name bw.modules.dialog.service:dialogService
 * @requires bw.modules.dialog.service:dialogFactory
 *
 * @description
 * Provides a different type of the dialog method using simple angular code.
 */

angular.module(bw.modules.dialog.name)
    .service(bw.modules.dialog.services.dialogService, DialogServiceFn);

}(angular, bw));