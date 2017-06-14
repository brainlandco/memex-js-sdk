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
    this.email = json.email;
    this.fullname = json.fullname;
    this.avatar = json.avatar;
    this.password = json.password;
  }

  toJSON(): Object {
    let object: any = {
      email: this.email,
      fullname: this.fullname,
      password: this.password
    }
    if (this.avatar != null) {
      object.avatar_muid = this.avatar.MUID;
    }
    return object;
  }
}
