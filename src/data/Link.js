// @flow

import type { EntityState } from './Types.js';
import { entityStates } from './Types.js';
import Space from './Space.js';

/** Class represents link between two spaces. */
export default class Link {

  /** Unique identifier */
  MUID: ?string;
  /** Creation timestamp */
  createdAt: ?Date;
  /** Timestamp of last update */
  updatedAt: ?Date;
  /** Timestamp of last visit */
  visitedAt: ?Date;
  /** Visibility state */
  state: EntityState;
  /** Owner user ID */
  ownerID: ?number;
  /** Index that is used for sorting of links in space */
  order: ?number;
  /** Origin space */
  origin: Space;
  /** Target space */
  target: Space;

  constructor() {
    this.state = entityStates.unknown;
  }

  fromJSON(json: Object) {
    this.MUID = json.muid;
    this.state = json.state;
    this.order = json.order;
    if (json.origin_space_muid != null) {
      this.origin = new Space();
      this.origin.MUID = json.origin_space_muid;
    }
    if (json.target_space_muid != null) {
      this.target = new Space();
      this.target.MUID = json.target_space_muid;
    }
    if (json.target_space != null) {
      this.target = new Space();
      this.target.fromJSON(json.target_space);
    }
  }

}
