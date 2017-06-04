// @flow

import type { AppState, AppPlatform } from './Types.js';
import { appStates } from './Types.js';

/** Class representing app. */
export default class App {

  /** Unique identifier */
  id: number;
  /** Name of app */
  name: ?string;
  /** Secription of app (is used in review process) */
  description: ?string;
  /** Developer contact email */
  email: ?string;
  /** App product page */
  webpage: ?string;
  /** App token (is sent with every request in X-App-Token HTTP header) */
  token: ?string;
  /** Approval state of the app */
  state: ?AppState;
  /** Default plaform for the app. App can be used from any other platform. This value is used only for suggestion of SDK. */
  platform: ?AppPlatform;

  constructor() {
  }

  fromJSON(json: Object) {
    this.id = json.id;
    this.name = json.name;
    this.description = json.description;
    this.email = json.email;
    this.webpage = json.webpage;
    this.token = json.token;
    this.state = json.state;
    this.platform = json.platform;
  }

  toJSON(): Object {
    return {
      name: this.name,
      description: this.description,
      email: this.email,
      webpage: this.webpage,
      platform: this.platform,
    };
  }

}
