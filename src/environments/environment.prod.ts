export const environment = {
  production: true,
  API: 'http://vizapi.plima.me/api',
  jwt: {
    allowedDomains: [
      'vizapi.plima.me'
    ],
    disallowedRoutes: [
      'vizapi.plima.me/api/auth/login',
      'vizapi.plima.me/api/auth/register',
    ]
  }
};
