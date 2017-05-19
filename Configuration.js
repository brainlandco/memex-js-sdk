// @flow

export type EnvironmentType = number;
export const environmentTypes = {
  production: 0,
  stage: 1,
  localhost: 2
};

export type Configuration = {
  appToken: string,
  environment: EnvironmentType
}

export function APIURL(environment: EnvironmentType): string {
  switch (environment) {
    case environmentTypes.production:
      return 'https://mmx-spaces-api-prod.herokuapp.com';
    case environmentTypes.stage:
      return 'https://mmx-spaces-api-stage.herokuapp.com';
    case environmentTypes.localhost:
      return 'http://localhost:5000';
    default:
      console.error('Unknown environment');
      return '';
  }
}
