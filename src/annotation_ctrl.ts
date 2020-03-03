export class DarkSkyAnnotationCtrl {
  static templateUrl = 'partials/annotations.editor.html';

  /** @ngInject **/
  constructor($scope) {
    console.log('DarkSkyAnnotationCtrl');
    console.log($scope);
    console.log(this);
  }
}
