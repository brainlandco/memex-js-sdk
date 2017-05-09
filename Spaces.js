// @flow

import 'whatwg-fetch';

import { Auth } from './Auth.js';

import Media from './data/Media.js';
import Space from './data/Space.js';
import Link from './data/Link.js';
import { mediaTypes, mediaDataStates, spaceTypes } from './data/Types.js';
import type { EnvironmentType, Configuration } from './Configuration.js';
import { authAPIURL, spacesAPIURL, environmentTypes } from './Configuration.js';

const methods = {
  GET: 'GET',
  POST: 'POST'
};
type Method = string;

export class Spaces {

  _configuration: Configuration;
  _auth: Auth;

  constructor() {
    this._configuration = {
      clientToken: "",
      environment: environmentTypes.production
    }
  }

  _isConfigured(): bool {
    if (this._configuration.clientToken === "") {
      console.error("Missing Memex configuration, call Memex.client.setClientToken('<Your app token>')");
      return false;
    }
    return true;
  }

  setClientToken(clientToken: string) {
    this._configuration.clientToken = clientToken;
  }

  _setEnvironment(environment: EnvironmentType) {
    this._configuration.environment = environment;
    this._auth = new Auth(this._authAPIURL(environment));
  }

  _authAPIURL(environment: EnvironmentType): string {
    switch (environment) {
      case environmentTypes.production:
        return 'https://localhost:5000';
      case environmentTypes.stage:
        return 'http://localhost:5000';
      case environmentTypes.localhost:
        return 'http://localhost:5000';
      case environmentTypes.sandbox:
        return 'http://localhost:5000';
      default:
        return '';
    }
  }

  _spacesAPIURL(environment: EnvironmentType): string {
    switch (environment) {
      case environmentTypes.production:
        return 'http://localhost:5000';
      case environmentTypes.stage:
        return 'http://localhost:5000';
      case environmentTypes.localhost:
        return 'http://localhost:5000';
      case environmentTypes.sandbox:
        return 'http://localhost:5000';
      default:
        return '';
    }
  }

  isLoggedIn(): bool {
    if (!this._isConfigured()) {
      return false;
    }
    return this._auth.isAuthorized();
  }

  login(email: string, password: string, completion: (token: ?string, success: bool)=>void) {
    if (!this._isConfigured()) {
      return;
    }
    this._auth.login(email, password, completion);
  }

  logout() {
    if (!this._isConfigured()) {
      return;
    }
    this._auth.deauthorize();
  }

  createCollectionSpace(tag: string, autodump: bool, completion: (space: ?Space, success: bool) => void) {
    let space = new Space();
    space.tagLabel = tag;
    space.tagColor = null;
    space.spaceType = spaceTypes.collection;
    space.representations = [];
    this.createSpace(space, autodump, completion);
  }

  createImageSpace(imageURL: string, autodump: bool, completion: (space: ?Space, success: bool) => void) {
    let media = new Media();
    media.dataDownloadURL = imageURL;
    media.dataState = mediaDataStates.dataValid;
    media.mediaType = mediaTypes.source;

    let space = new Space();
    space.spaceType = spaceTypes.image;
    space.representations = [media];

    this.createSpace(space, autodump, completion);
  }

  createWebPageSpace(url: string, autodump: bool, completion: (space: ?Space, success: bool) => void) {
    let media = new Media();
    media.setEmbedDataFromString(url);
    media.dataState = mediaDataStates.dataValid;
    media.mediaType = mediaTypes.reference;

    let space = new Space();
    space.spaceType = spaceTypes.webPage;
    space.representations = [media];

    this.createSpace(space, autodump, completion);
  }

  createTextSpace(text: string, autodump: bool, completion: (space: ?Space, success: bool) => void) {
    let media = new Media();
    media.setEmbedDataFromString(text);
    media.dataState = mediaDataStates.dataValid;
    media.mediaType = mediaTypes.source;

    let space = new Space();
    space.spaceType = spaceTypes.text;
    space.representations = [media];

    this.createSpace(space, autodump, completion);
  }

  createSpace(space: Space, autodump: bool, completion: (space: ?Space, success: bool) => void) {
    let body = {
      space: space.toJSON(),
      process: true,
      autodump: autodump
    };
    this._perform(methods.POST, 'spaces', null, body, (json: ?Object, success: bool) => {
      if (success === false || json == null) {
        completion(null, false);
        return;
      }
      let space = new Space();
      space.fromJSON(json.space);
      completion(space, true);
    });
  }

  getSpaceLinks(spaceMUID: string, completion: (links: ?Array<Link>, success: bool)=>void) {
    let path = 'spaces/'+spaceMUID+'/links';
    let query = {
      includeTarget: true
    };
    this._perform(methods.GET, path, query, null, (json: ?Object, success: bool) => {
      if (success === false || json == null) {
        completion(null, false);
        return;
      }
      let links = [];
      for (let item of json.links) {
        let link = new Link();
        link.fromJSON(item);
        links.push(link);
      }
      completion(links, true);
    });
  }

  getSpace(spaceMUID: string, completion: (space: ?Space, success: bool)=>void) {
    this._perform(
      methods.GET,
      'spaces/'+spaceMUID,
      null,
      null,
      (json: ?Object, success: bool) => {
        if (success === false || json == null) {
          completion(null, false);
          return;
        }
        let space = new Space();
        space.fromJSON(json.space);
        completion(space, true);
      });
  }

  _perform(method: Method, path: string, query: ?Object, body: ?Object, completion: (json: ?Object, success: bool) => void) {
    if (!this._isConfigured()) {
      return;
    }
    let options = {
      method: method,
      body: body != null ? JSON.stringify(body) : null,
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Token': this._configuration.clientToken
      }
    };
    let host = this._spacesAPIURL(this._configuration.environment);
    let url = host + '/api/v1/' + path;
    let resultQuery = query;
    if (this._auth.token != null) {
      options.headers['X-User-Token'] = this._auth.token;
    }
    if (resultQuery != null) {
      let keys = Object.keys(resultQuery);
      let queryString = keys.reduce(function(array: Array<string>, key: string): Array<string> {
        if (resultQuery == null) {
          return array;
        }
        let value = resultQuery[key];
        array.push(key+'='+encodeURIComponent(value));
        return array;
      }, []).join('&');
      url += '?' + queryString;
    }
    fetch(url, options)
      .then((response: Object): Object => {
        if (response.status < 200 || response.status >= 300) {
          throw response;
        } else {
          return response;
        }
      })
      .then((data: any): Object => {
        return data.json();
      })
      .then((response: Object) => {
        completion(response, true);
      },
      () => {
        completion(null, false);
      });
  }
}
