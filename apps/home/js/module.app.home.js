bw.modules.apps.home = {
  name: 'bwApp',
  controllers: {
    dialogExamplesCtrl: 'apps-dialogExamplesCtrl',
    customDialogCtrl: 'apps-customDialogCtrl'
  },
  routes: {
    dialog : '/dialog'
  }
};

angular.module(bw.modules.apps.home.name, ['ngRoute', bw.modules.dialog.name]);


