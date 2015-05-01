(function(angular, bw) {
    'use strict';

    bw.modules.dialog = {
        name: 'bw-questionnaire',
        controllers: {
            dialog : {
                errorCtrl: 'dialog-errorCtrl',
                warnCtrl: 'dialog-warnCtrl',
                confirmCtrl: 'dialog-confirmCtrl',
                successCtrl: 'dialog-successCtrl',
                createCtrl: 'dialog-createCtrl'
            }
        },
        services : {
            dialogService : 'dialog-dialogService'
        },
        models: {}
    };

    angular.module(bw.modules.dialog.name, ['ngSanitize'])
        .config(['$compileProvider', '$httpProvider',
            function ($compileProvider, $httpProvider) {
                //Can check for production mode and disable only for that.
                $compileProvider.debugInfoEnabled(false);
                $httpProvider.useApplyAsync(true);
            }
    ]);

}(angular, bw));