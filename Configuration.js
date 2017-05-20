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
