// @flow

/** Environment of SDK */
export type EnvironmentType = number;
export const environmentTypes = {
  /** Production */
  production: 0,
  /** Staging (internal use only) */
  stage: 1,
  /** Local (internal use only) */
  local: 2
};

/** Configuration of SDK */
export type Configuration = {
  /** App (developer) token */
  appToken: string,
  /** SDK environment */
  environment: EnvironmentType
}
