// @flow

import type { EntityState } from './Types.js';
import { entityStates } from './Types.js';
import Space from './Space.js';

/** Class represents link between two spaces. */
export default class Link {

  /** Unique link identifier */
  muid: ?string;
  /** Link visibility state */
  state: EntityState;
  /** Sequence order index is used for reordering of links in space */
  order: ?number;
  /** Origin space */
  origin: Space;
  /** Target space */
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
