// @flow

import Media from './Media.js';
import type { MediaType } from './Media.js';
import type { EntityState } from './Types.js';
import { entityStates } from './Types.js';

/** Class represents space visit */
export default class SpaceVisit {

  /** Unique identifier */
  MUID: ?string;
  /** Timestamp of last visit */
  visitedAt: ?Date;

  constructor() {
  }

  toJSON(): Object {
    let json: any = {};
    json.muid = this.MUID;
    if (this.visitedAt != null) {
      json.visited_at = this.visitedAt.toISOString();
    }
    return json;
  }
}
