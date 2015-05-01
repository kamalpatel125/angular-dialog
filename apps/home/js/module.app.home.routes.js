
angular.module(bw.modules.apps.home.name)
    .config(['$routeProvider',
        function($routeProvider) {
          $routeProvider.when(bw.modules.apps.home.routes.dialog, {
            controller: bw.modules.apps.home.controllers.dialogExamplesCtrl,
            templateUrl: 'html/dialogExamples.tpl.html',
            controllerAs: 'vm'
          });

          $routeProvider.otherwise({
            redirectTo: bw.modules.apps.home.routes.dialog
          });
        }
]);


