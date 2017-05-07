// @flow

import type { EntityState } from './Types.js';
import { entityStates } from './Types.js';
import Space from './Space.js';

export default class Link {

  muid: ?string;
  state: EntityState;
  order: ?number;
  origin: Space;
  target: Space;

  constructor() {
    this.state = entityStates.unknown;
  }

  fromJSON(json: Object) {
    this.muid = json.muid;
    this.state = json.state;
    this.order = json.order;
    if (json.origin_space_muid != null) {
      this.origin = new Space();
      this.origin.muid = json.origin_space_muid;
    }
    if (json.target_space_muid != null) {
      this.target = new Space();
      this.target.muid = json.target_space_muid;
    }
    if (json.target_space != null) {
      this.target = new Space();
      this.target.fromJSON(json.target_space);
    }
  }

}
