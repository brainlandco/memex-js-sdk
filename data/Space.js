// @flow

import Media from './Media.js';
import type { SpaceType, CreatorType, SpaceProcessingState, MediaType, EntityState } from './Types.js';
import { spaceTypes, creatorTypes, spaceProcessingStates, entityStates } from './Types.js';

export default class Space {

  muid: ?string;
  state: EntityState;
  tagLabel: ?string;
  tagColor: ?string;
  spaceType: SpaceType;
  processingState: SpaceProcessingState;
  shouldAutodump: bool;
  createdBy: CreatorType;
  managedBy: CreatorType;
  representations: ?Array<Media>;
  unread: bool;

  constructor() {
    this.state = entityStates.unknown;
    this.shouldAutodump = false;
    this.spaceType = spaceTypes.collection;
    this.processingState = spaceProcessingStates.done;
    this.shouldAutodump = false;
    this.createdBy = creatorTypes.user;
    this.managedBy = creatorTypes.user;
    this.representations = [];
    this.unread = false;
  }

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
    this.createdBy = json.created_by;
    this.managedBy = json.managed_by;
    this.shouldAutodump = json.single_system_management_required;
    this.processingState = json.processing_state;
    this.unread = json.unread;
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
      created_by: this.createdBy,
      managed_by: this.managedBy,
      single_system_management_required: this.shouldAutodump,
      representation_processing_state: this.processingState,
      unread: this.unread,
      representations: this.representations != null ? this.representations.map(function(media: Media): Object {
        return media.toJSON();
      }) : null
    };
  }
}
