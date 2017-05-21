// @flow

import type { AppState } from './Types.js';
import { appStates } from './Types.js';

export default class App {

  id: number;
  name: ?string;
  description: ?string;
  token: ?string;
  state: ?AppState;

  constructor() {
  }

  fromJSON(json: Object) {
    this.id = json.id;
    this.name = json.name;
    this.description = json.description;
    this.token = json.token;
    this.state = json.state;
  }

  toJSON(): Object {
    return {
      name: this.name,
      description: this.description,
    };
  }

}
