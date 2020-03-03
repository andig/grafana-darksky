export class DarkskyQueryOptionsCtrl {
  static templateUrl = 'partials/query.options.html';

  /** @ngInject **/
  constructor($scope) {
    console.log('DarkSkyQueryOptionsCtrl');
    console.log($scope);
    console.log(this);
  }
}