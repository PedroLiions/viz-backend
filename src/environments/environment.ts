// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // API: 'http://localhost:8000/api',
  // API: 'http://vizapi.local:8000/api',
  // API: 'http://127.0.0.1:8000/api',
  API: 'http://192.168.0.101:8000/api',
  jwt: {
    allowedDomains: [
      '127.0.0.1:8000',
      'vizapi.plima.me',
      'vizapi.local:8000',
      '192.168.0.101:8000'
    ],
    disallowedRoutes: [
      '127.0.0.1:8000/api/auth/login',
      '127.0.0.1:8000/api/auth/register',
      'vizapi.plima.me/api/auth/login',
      'vizapi.plima.me/api/auth/register',
      'vizapi.local:8000/api/auth/login',
      'vizapi.local:8000/api/auth/register',
      '192.168.0.101:8000/api/auth/login',
      '192.168.0.101:8000/api/auth/register',
    ]
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
