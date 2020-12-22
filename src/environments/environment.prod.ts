export const environment = {
  production: true,
  API: 'https://apiviz.deepcenter.com.br/api',
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
