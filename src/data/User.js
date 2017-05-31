// @flow

import Media from './Media.js';

export default class User {

  id: ?number;
  email: ?string;
  fullname: ?string;
  avatar: ?Media;
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
