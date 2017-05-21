// @flow

import 'whatwg-fetch';

import { Auth } from './Auth.js';

import Media from './data/Media.js';
import Space from './data/Space.js';
import Link from './data/Link.js';
import App from './data/App.js';
import { mediaTypes, mediaDataStates, spaceTypes } from './data/Types.js';
import type { EnvironmentType, Configuration } from './Configuration.js';
import { environmentTypes } from './Configuration.js';

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
      appToken: "",
      environment: environmentTypes.production
    }
    this._setEnvironment(environmentTypes.production)
  }

  _isConfigured(): bool {
    if (this._configuration.appToken === "") {
      console.error("Missing Memex configuration, call Memex.client.setAppToken('<Your app token>')");
      return false;
    }
    return true;
  }

  setAppToken(token: string) {
    this._configuration.appToken = token;
    this._auth.appToken = token;
  }

  _setEnvironment(environment: EnvironmentType) {
    this._configuration.environment = environment;
    this._auth = new Auth(this._APIURL(environment));
    this._auth.appToken = this._configuration.appToken;
  }

  _APIURL(environment: EnvironmentType): string {
    switch (environment) {
      case environmentTypes.production:
        return 'https://mmx-spaces-api-prod.herokuapp.com';
      case environmentTypes.stage:
        return 'https://mmx-spaces-api-stage.herokuapp.com';
      case environmentTypes.localhost:
        return 'http://localhost:5000';
      default:
        console.error('Unknown environment');
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

  getApps(completion: (apps: ?Array<App>, success: bool)=>void) {
    let path = 'apps';
    this._perform(methods.GET, path, {}, null, (json: ?Object, success: bool) => {
      if (success === false || json == null) {
        completion(null, false);
        return;
      }
      let apps = [];
      for (let item of json.apps) {
        let app = new App();
        app.fromJSON(item);
        apps.push(app);
      }
      completion(apps, true);
    });
  }

  createApp(app: App, completion: (app: ?App, success: bool) => void) {
    let body = {
      app: app.toJSON(),
    };
    this._perform(methods.POST, 'apps', null, body, (json: ?Object, success: bool) => {
      if (success === false || json == null) {
        completion(null, false);
        return;
      }
      let newApp = new App();
      newApp.fromJSON(json.app);
      completion(newApp, true);
    });
  }

  updateApp(app: App, completion: (app: ?App, success: bool) => void) {
    if (app.id === null) {
      console.error("Missing app id");
      completion(null, false);
      return;
    }
    let body = {
      app: app.toJSON(),
    };
    this._perform(methods.POST, 'apps/'+app.id, null, body, (json: ?Object, success: bool) => {
      if (success === false || json == null) {
        completion(null, false);
        return;
      }
      let newApp = new App();
      newApp.fromJSON(json.app);
      completion(newApp, true);
    });
  }

  renewAppToken(appID: number, completion: (app: ?App, success: bool) => void) {
    this._perform(methods.POST, 'apps/'+appID+"/renew-token", null, {}, (json: ?Object, success: bool) => {
      if (success === false || json == null) {
        completion(null, false);
        return;
      }
      let newApp = new App();
      newApp.fromJSON(json.app);
      completion(newApp, true);
    });
  }

  getApp(id: number, completion: (app: ?App, success: bool) => void) {
    this._perform(methods.GET, 'apps/'+id, null, null, (json: ?Object, success: bool) => {
      if (success === false || json == null) {
        completion(null, false);
        return;
      }
      let newApp = new App();
      newApp.fromJSON(json.app);
      completion(newApp, true);
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
        'X-App-Token': this._configuration.appToken
      }
    };
    if (this._auth.userToken != null) {
      options.headers['X-User-Token'] = this._auth.userToken;
    }
    let host = this._APIURL(this._configuration.environment);
    let url = host + '/api/v1/' + path;
    let resultQuery = query;
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
      (error: Object) => {
        completion(null, false);
      });
  }
}
