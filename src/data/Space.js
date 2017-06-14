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
    this.state = entityStates.unknown;
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
    this.state = json.state;
    this.caption = json.tag_label;
    this.color = json.tag_color;
    this.spaceType = json.type_identifier;
    this.unread = json.unread || false;
    if (json.representations != null) {
      this.representations = json.representations.map(function(json: Object): Media {
        let media = new Media();
        media.fromJSON(json);
        return media;
      });
    } else {
      this.representations = null;
    }
  }

  toJSON(): Object {
    return {
      type_identifier: this.spaceType,
      state: this.state,
      tag_label: this.caption,
      tag_color: this.color,
      unread: this.unread,
      representations: this.representations != null ? this.representations.map(function(media: Media): Object {
        return media.toJSON();
      }) : null
    };
  }
}
