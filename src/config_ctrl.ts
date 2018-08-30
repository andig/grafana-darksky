export class DarkSkyConfigCtrl {
  static templateUrl = 'partials/config.html';
  
  current: any;
  private units: {name:string, value:string}[];
  private languages: { name: string, value: string }[];

  /** @ngInject **/
  constructor($scope) {
    console.log("DarkSkyConfigCtrl");
    console.log($scope);
    console.log(this);

    this.units = [
      { name: 'SI', value: 'si' },
      { name: 'Auto', value: 'auto' },
      { name: 'US', value: 'us' },
      { name: 'CA', value: 'ca' },
      { name: 'UK', value: 'uk2' },
    ];

    this.languages = [
      { name: 'Arabic', value: 'ar' },
      { name: 'Azerbaijani', value: 'az' },
      { name: 'Belarusian', value: 'be' },
      { name: 'Bulgarian', value: 'bg' },
      { name: 'Bosnian', value: 'bs' },
      { name: 'Catalan', value: 'ca' },
      { name: 'Czech', value: 'cs' },
      { name: 'Danish', value: 'da' },
      { name: 'German', value: 'de' },
      { name: 'Greek', value: 'el' },
      { name: 'English', value: 'en' },
      { name: 'Spanish', value: 'es' },
      { name: 'Estonian', value: 'et' },
      { name: 'Finnish', value: 'fi' },
      { name: 'French', value: 'fr' },
      { name: 'Hebrew', value: 'he' },
      { name: 'Croatian', value: 'hr' },
      { name: 'Hungarian', value: 'hu' },
      { name: 'Indonesian', value: 'id' },
      { name: 'Icelandic', value: 'is' },
      { name: 'Italian', value: 'it' },
      { name: 'Japanese', value: 'ja' },
      { name: 'Georgian', value: 'ka' },
      { name: 'Korean', value: 'ko' },
      { name: 'Cornish', value: 'kw' },
      { name: 'Norwegian', value: 'nb' },
      { name: 'Dutch', value: 'nl' },
      { name: 'Polish', value: 'pl' },
      { name: 'Portuguese', value: 'pt' },
      { name: 'Romanian', value: 'ro' },
      { name: 'Russian', value: 'ru' },
      { name: 'Slovak', value: 'sk' },
      { name: 'Slovenian', value: 'sl' },
      { name: 'Serbian', value: 'sr' },
      { name: 'Swedish', value: 'sv' },
      { name: 'Tetum', value: 'tet' },
      { name: 'Turkish', value: 'tr' },
      { name: 'Ukrainian', value: 'uk' },
      { name: 'Chinese', value: 'zh' }
    ];

    this.current.jsonData.unit = this.current.jsonData.unit || 'si';
    this.current.jsonData.language = this.current.jsonData.language || 'en';
  }
}
