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
    this.state = entityStates.visible;
  }

  fromJSON(json: Object) {
    this.MUID = json.muid;
    if (json.created_at != null) {
      this.createdAt = new Date(json.created_at);
    }
    if (json.updated_at != null) {
      this.updatedAt = new Date(json.updated_at);
    }
    this.state = json.state;
    this.ownerID = json.owner_id;
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

  toJSON(): Object {
    let json: any = {};
    json.muid = this.MUID;
    if (this.createdAt != null) {
      json.created_at = this.createdAt.toISOString();
    }
    if (this.updatedAt != null) {
      json.updated_at = this.updatedAt.toISOString();
    }
    json.state = this.state;
    json.owner_id = this.ownerID;
    json.order = this.order;
    if (this.target != null) {
      json.target_space_muid = this.target.MUID;
    }
    if (this.origin != null) {
      json.target_space_muid = this.origin.MUID;
    }
    return json;
  }

}
