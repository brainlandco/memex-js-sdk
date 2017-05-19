// @flow

export default class App {

  id: number;
  name: ?string;
  description: ?string;
  token: string;

  constructor() {
  }

  fromJSON(json: Object) {
    this.id = json.id;
    this.name = json.name;
    this.description = json.description;
    this.token = json.token;
  }

  toJSON(): Object {
    return {
      name: this.name,
      description: this.description,
    };
  }

}
