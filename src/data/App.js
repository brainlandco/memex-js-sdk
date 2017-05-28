// @flow

import type { AppState, AppPlatform } from './Types.js';
import { appStates } from './Types.js';

export default class App {

  id: number;
  name: ?string;
  description: ?string;
  email: ?string;
  webpage: ?string;
  token: ?string;
  state: ?AppState;
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
