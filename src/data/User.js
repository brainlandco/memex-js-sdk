// @flow

import Media from './Media.js';

/** Class represents user of Memex */
export default class User {

  /** Unique user identifier */
  id: ?number;
  /** Email of user (unique) */
  email: ?string;
  /** Fullname of user in format FirstName LastName */
  fullname: ?string;
  /** Avatar */
  avatar: ?Media;
  /** Users password */
  password: ?string;

  constructor() {
  }

  fromJSON(json: Object) {
    this.id = json.id;
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
      object.avatar_muid = this.avatar.muid;
    }
    return object;
  }
}
