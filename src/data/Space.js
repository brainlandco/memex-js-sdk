// @flow

import Media from './Media.js';
import type { MediaType } from './Media.js';
import type { EntityState } from './Types.js';
import { entityStates } from './Types.js';

/** Defines known space types */
export type SpaceType = string;
export const spaceTypes = {
  /** Origin is simillar to collection but defines entry point into users spaces (root) */
  origin: 'com.memex.origin',
  /** Collection of links to spaces */
  collection: 'com.memex.media.collection',
  /** Space that represents web link */
  webPage: 'com.memex.media.webpage',
  /** Graphical kind of space */
  image: 'com.memex.media.image',
  /** Textual kind of space */
  text: 'com.memex.media.text'
};

/** Defines space processing modes */
export type SpaceProcessingMode = string;
export const spaceProcessingModes = {
  /** Don't process */
  no: 'no',
  /** Wait for results */
  sync: 'sync',
  /** Dont wait for results */
  async: 'async',
};

/** Class represents space (abstraction for linked spaces) */
export default class Space {

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
  /** Type (eg. com.memex.media.collection, etc.) */
  spaceType: SpaceType;
  /** Caption */
  caption: ?string;
  /** Tint color */
  color: ?string;
  /** Set of media that represents space (eg webpage space is represented by url, thumbnail, summary) */
  representations: ?Array<Media>;
  /** Unread flag (if user needs to be notified about changes)*/
  unread: bool;

  constructor() {
    this.state = entityStates.visible;
    this.spaceType = spaceTypes.collection;
    this.representations = [];
    this.unread = false;
  }

  /**
   * Returns visible representation of specified type
   *
   * @param MediaType mediaType: Type of media/representation
   * @returns Media: Returns found media (null if not found)
   */
  getRepresentation(mediaType: MediaType): ?Media {
    if (this.representations == null) {
      return null;
    }
    for (let media of this.representations) {
      if (media.mediaType === mediaType && media.state === entityStates.visible) {
        return media;
      }
    }
    return null;
  }

  fromJSON(json: Object) {
    this.MUID = json.muid;
    if (json.created_at != null) {
      this.createdAt = new Date(json.created_at);
    }
    if (json.updated_at != null) {
      this.updatedAt = new Date(json.updated_at);
    }
    if (json.visited_at != null) {
      this.visitedAt = new Date(json.visited_at);
    }
    this.state = json.state;
    this.ownerID = json.owner_id;
    this.spaceType = json.type_identifier;
    this.caption = json.caption;
    this.color = json.color;
    if (json.representations != null) {
      this.representations = json.representations.map(function(json: Object): Media {
        let media = new Media();
        media.fromJSON(json);
        return media;
      });
    } else {
      this.representations = null;
    }
    this.unread = json.unread || false;
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
    if (this.visitedAt != null) {
      json.visited_at = this.visitedAt.toISOString();
    }
    json.state =  this.state;
    json.owner_id = this.ownerID;
    json.type_identifier = this.spaceType;
    json.caption = this.caption;
    json.color = this.color;
    if (this.representations != null) {
      json.representations = this.representations.map(function(media: Media): Object {
        return media.toJSON();
      });
    }
    json.unread = this.unread;
    return json;
  }
}
