export const environment = {
  production: true,
  API: 'https://apiviz.deepcenter.com.br/api',
  jwt: {
    allowedDomains: [
      'apiviz.deepcenter.com.br'
    ],
    disallowedRoutes: [
      'apiviz.deepcenter.com.br/api/auth/login',
      'apiviz.deepcenter.com.br/api/auth/register',
    ]
  }
};
