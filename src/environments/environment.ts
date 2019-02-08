// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


//inside this constant environement  we add one more property, it will be "firebaseConfig", 
///we add connection details that we have copied from firebase console
//and then we add this environment constant in to appModule
//go to appModule and add it to "imports" => AngularFireModule.initializeApp(environment.firebaseConfig),
export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyCGOmhCzk9h2bY4y6X5Fx9a_N1xbteAKac",
    authDomain: "angularmat-7c993.firebaseapp.com",
    databaseURL: "https://angularmat-7c993.firebaseio.com",
    projectId: "angularmat-7c993",
    storageBucket: "angularmat-7c993.appspot.com",
    messagingSenderId: "1040923942866"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
