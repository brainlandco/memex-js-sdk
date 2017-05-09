// @flow

export type EnvironmentType = number;
export const environmentTypes = {
  production: 0,
  stage: 1,
  localhost: 2,
  sandbox: 3
};

export type Configuration = {
  clientToken: string,
  environment: EnvironmentType
}

export function authAPIURL(environment: number): string {
  switch (environment) {
    case environmentTypes.production:
      return 'https://localhost:5000';
    case environmentTypes.stage:
      return 'http://localhost:5000';
    case environmentTypes.localhost:
      return 'http://localhost:5000';
    case environmentTypes.sandbox:
      return 'http://localhost:5000';
    default:
      return '';
  }
}

export function spacesAPIURL(environment: EnvironmentType): string {
  switch (environment) {
    case environmentTypes.production:
      return 'http://localhost:5000';
    case environmentTypes.stage:
      return 'http://localhost:5000';
    case environmentTypes.localhost:
      return 'http://localhost:5000';
    case environmentTypes.sandbox:
      return 'http://localhost:5000';
    default:
      return '';
  }
}
