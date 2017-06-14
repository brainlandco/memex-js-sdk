// @flow

import Media from './Media.js';

/** Class represents user of Memex */
export default class User {

  /** Unique user ID */
  ID: ?number;
  /** Creation timestamp */
  createdAt: ?Date;
  /** Timestamp of last update */
  updatedAt: ?Date;
  /** Fullname of user in format FirstName LastName */
  fullname: ?string;
  /** Email of user (unique) */
  email: ?string;
  /** Users password */
  password: ?string;
  /** Avatar */
  avatar: ?Media;
  /** MUID of users origin space (root, entry point) */
  originSpaceMUID: ?string;
  /** Flag that tells if user set his password or he can be only authenticated using onboarding token */
  hasPassword: ?bool;
  /** Flag that tells if user has enabled advanced features. This will be in future replaced with full feature flags set. */
  advanced: ?bool;

  constructor() {
  }

  fromJSON(json: Object) {
    this.ID = json.id;
    if (json.created_at != null) {
      this.createdAt = new Date(json.created_at);
    }
    if (json.updated_at != null) {
      this.updatedAt = new Date(json.updated_at);
    }
    this.fullname = json.fullname;
    this.email = json.email;
    this.password = json.password;
    this.avatar = json.avatar;
    this.originSpaceMUID = json.origin_space_muid;
    this.hasPassword = json.has_password;
    this.advanced = json.advanced;
  }

  toJSON(): Object {
    let json: any = {};
    if (this.createdAt != null) {
      json.created_at = this.createdAt.toISOString();
    }
    if (this.updatedAt != null) {
      json.updated_at = this.updatedAt.toISOString();
    }
    json.fullname = this.fullname;
    json.email = this.email;
    json.password = this.password;
    json.avatar = this.avatar;
    json.origin_space_muid = this.originSpaceMUID;
    json.has_password = this.hasPassword;
    json.advanced = this.advanced;
    if (this.avatar != null) {
      json.avatar_muid = this.avatar.MUID;
    }
    return json;
  }
}
