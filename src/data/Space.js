// @flow

import Media from './Media.js';
import type { SpaceType, MediaType, EntityState } from './Types.js';
import { spaceTypes, entityStates } from './Types.js';

/** Class represents space (abstraction for linked spaces) */
export default class Space {

  /** Unique space identifier */
  muid: ?string;
  /** Visibility state of space */
  state: EntityState;
  /** Caption/name of space */
  tagLabel: ?string;
  /** Each space can define its tintColor */
  tagColor: ?string;
  /** Defines semantic type of space (eg. com.memex.media.collection, etc.) */
  spaceType: SpaceType;
  /** Set of space representations (media that defines space at most concrete level) */
  representations: ?Array<Media>;
  /** Space unread flag */
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
    this.muid = json.muid;
    this.state = json.state;
    this.tagLabel = json.tag_label;
    this.tagColor = json.tag_color;
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
      tag_label: this.tagLabel,
      tag_color: this.tagColor,
      unread: this.unread,
      representations: this.representations != null ? this.representations.map(function(media: Media): Object {
        return media.toJSON();
      }) : null
    };
  }
}
