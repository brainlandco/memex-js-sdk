// @flow

import 'whatwg-fetch';

import { Auth } from './Auth.js';

import Media from './data/Media.js';
import User from './data/User.js';
import Space from './data/Space.js';
import Link from './data/Link.js';
import App from './data/App.js';
import { mediaTypes, mediaDataStates } from './data/Media.js';
import { spaceTypes } from './data/Space.js';
import type { EnvironmentType, Configuration } from './data/Types.js';
import { environmentTypes } from './data/Types.js';

type Method = string;
const methods = {
  GET: 'GET',
  POST: 'POST'
};

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

  /**
   * Sets app API token
   *
   * @param string token: App's unique API token
   */
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
      case environmentTypes.local:
        return 'http://localhost:5000';
      default:
        console.error('Unknown environment');
        return '';
    }
  }

  /**
   * Checks if user is logged in
   *
   * @returns bool: Returns flag that tells if user is authenticated
   */
  isLoggedIn(): bool {
    if (!this._isConfigured()) {
      return false;
    }
    return this._auth.isAuthorized();
  }

  /**
   * Login user using standard email/password credentials
   *
   * @param string email: Users unique email
   * @param string password: Users secret password
   * @param Object completion: Completion function that returns user token andd success flag
   */
  login(email: string,
        password: string,
        completion: (token: ?string, success: bool) => void) {
    if (!this._isConfigured()) {
      return;
    }
    this._auth.login(email, password, completion);
  }

  /**
   * Logout user. Removes user token from local storage.
   */
  logout() {
    if (!this._isConfigured()) {
      return;
    }
    this._auth.deauthorize();
  }

  //////////////////////////////////////////////////////////////////////
  // Spaces Handler
  //////////////////////////////////////////////////////////////////////

  /**
   * Creates collection space
   *
   * @param string tag: Caption of new space
   * @param bool autodump: True if new space should be autodumped
   * @param Object completion: Completion handler that will get created space and success flag
   */
  createCollectionSpace(tag: string,
                        autodump: bool,
                        completion: (space: ?Space, success: bool) => void) {
    let space = new Space();
    space.caption = tag;
    space.color = null;
    space.spaceType = spaceTypes.collection;
    space.representations = [];
    this.createSpace(space, autodump, completion);
  }

  /**
   * Creates image space from URL
   *
   * @param string url: Source URL of image
   * @param bool autodump: True if new space should be autodumped
   * @param Object completion: Completion handler that will get created space and success flag
   */
  createImageSpace(imageURL: string,
                   autodump: bool,
                   completion: (space: ?Space, success: bool) => void) {
    let media = new Media();
    media.dataDownloadURL = imageURL;
    media.dataState = mediaDataStates.dataValid;
    media.mediaType = mediaTypes.source;

    let space = new Space();
    space.spaceType = spaceTypes.image;
    space.representations = [media];

    this.createSpace(space, autodump, completion);
  }

  /**
   * Creates webpage space from URL
   *
   * @param string url: URL of webpage
   * @param bool autodump: True if new space should be autodumped
   * @param Object completion: Completion handler that will get created space and success flag
   */
  createWebPageSpace(url: string,
                     autodump: bool,
                     completion: (space: ?Space, success: bool) => void) {
    let media = new Media();
    media.setEmbedDataFromString(url);
    media.dataState = mediaDataStates.dataValid;
    media.mediaType = mediaTypes.reference;

    let space = new Space();
    space.spaceType = spaceTypes.webPage;
    space.representations = [media];

    this.createSpace(space, autodump, completion);
  }

  /**
   * Creates text space
   *
   * @param string text: Content text
   * @param bool autodump: True if new space should be autodumped
   * @param Object completion: Completion handler that will get created space and success flag
   */
  createTextSpace(text: string,
                  autodump: bool,
                  completion: (space: ?Space, success: bool) => void) {
    let media = new Media();
    media.setEmbedDataFromString(text);
    media.dataState = mediaDataStates.dataValid;
    media.mediaType = mediaTypes.source;

    let space = new Space();
    space.spaceType = spaceTypes.text;
    space.representations = [media];

    this.createSpace(space, autodump, completion);
  }

  /**
   * Creates space
   *
   * @param Space space: New space
   * @param bool autodump: True if new space should be autodumped (always synchronously)
   * @param Object completion: Completion handler that will get created space and success flag
   */
  createSpace(space: Space,
              autodump: bool,
              completion: (space: ?Space, success: bool) => void) {
    let body = {
      space: space.toJSON(),
      process: "sync",
      autodump: autodump
    };
    this._perform(methods.POST,
                  'spaces',
                  null,
                  body,
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

  /**
   * Get space
   *
   * @param string spaceMUID: Requested space MUID (or you can use keyword 'origin' for fetching users's origin space)
   * @param Object completion: Completion handler that will get space and success flag
   */
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

  //////////////////////////////////////////////////////////////////////
  // Links Handler
  //////////////////////////////////////////////////////////////////////

  /**
   * Get space links
   *
   * @param string spaceMUID: Requested space MUID (or you can use keyword 'origin' for fetching users's origin space)
   * @param Object completion: Completion handler that will get array of links and success flag
   */
  getSpaceLinks(spaceMUID: string,
                completion: (links: ?Array<Link>, success: bool)=>void) {
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

  //////////////////////////////////////////////////////////////////////
  // App Handler
  //////////////////////////////////////////////////////////////////////

  /**
   * Get all users apps
   *
   * @param Object completion: Completion handler that will get array of all users apps and success flag
   */
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

  /**
   * New app creation
   *
   * @param App app: New app object
   * @param Object completion: Completion handler that will get created app and success flag
   */
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

  /**
   * Get app detail
   *
   * @param number id: Fetched App ID
   * @param Object completion: Completion handler that will get app and success flag
   */
  getApp(id: number, completion: (app: ?App, success: bool) => void) {
    this._perform(methods.GET, 'apps/'+id,
                  null,
                  null,
                  (json: ?Object, success: bool) => {
      if (success === false || json == null) {
        completion(null, false);
        return;
      }
      let newApp = new App();
      newApp.fromJSON(json.app);
      completion(newApp, true);
    });
  }

  /**
   * Update app
   *
   * @param App app: Updated app object
   * @param Object completion: Completion handler that will get updated app and success flag
   */
  updateApp(app: App, completion: (app: ?App, success: bool) => void) {
    if (app.id === null) {
      console.error("Missing app id");
      completion(null, false);
      return;
    }
    let body = {
      app: app.toJSON(),
    };
    this._perform(methods.POST,
                  'apps/'+app.id,
                  null,
                  body,
                  (json: ?Object, success: bool) => {
      if (success === false || json == null) {
        completion(null, false);
        return;
      }
      let newApp = new App();
      newApp.fromJSON(json.app);
      completion(newApp, true);
    });
  }

  /**
   * Renew app token. Will generate new app token (all clients that uses old one will stop working!!)
   *
   * @param number appID: App ID
   * @param Object completion: Completion handler that will get updated app and success flag
   */
  renewAppToken(appID: number, completion: (app: ?App, success: bool) => void) {
    this._perform(methods.POST,
                  'apps/'+appID+"/renew-token",
                  null,
                  {},
                  (json: ?Object, success: bool) => {
      if (success === false || json == null) {
        completion(null, false);
        return;
      }
      let newApp = new App();
      newApp.fromJSON(json.app);
      completion(newApp, true);
    });
  }

  //////////////////////////////////////////////////////////////////////
  // User Handler
  //////////////////////////////////////////////////////////////////////

  /**
   * Fetch user detail.
   *
   * @param number userID: Optional user ID. If null then you will get authenticated user detail.
   * @param Object completion: Completion handler that will return requested user object and success flag
   */
  getUser(userID: ?number, completion: (user: ?User, success: bool) => void) {
    this._perform(methods.GET, 'users/' + (userID == null ? 'self' : userID),
                  null,
                  null,
                  (json: ?Object, success: bool) => {
      if (success === false || json == null) {
        completion(null, false);
        return;
      }
      let newUser = new User();
      newUser.fromJSON(json.user);
      completion(newUser, true);
    });
  }

  /**
   * Creates new user. User object must contains password and valid email.
   *
   * @param User user: New user object
   * @param string onboardingToken: Onboarding token (optional)
   * @param Object completion: Completion handler that will return new user object and success flag
   */
  createUser(user: User, onboardingToken: ?string, completion: (user: ?User, success: bool) => void) {
    var body = {
      user: user.toJSON(),
      onboardingToken: onboardingToken
    };
    this._perform(methods.POST,
                  'users',
                  null,
                  body,
                  (json: ?Object, success: bool) => {
      if (success === false || json == null) {
        completion(null, false);
        return;
      }
      let newUser = new User();
      newUser.fromJSON(json.user);
      completion(newUser, true);
    });
  }

  /**
   * Update user. For password updates use setUserPassword function.
   *
   * @param User user: Updated user object
   * @param Object completion: Completion handler that will return update user object and success flag
   */
  updateUser(user: User, completion: (user: ?User, success: bool) => void) {
    var body = {
      user: user.toJSON()
    };
    this._perform(methods.POST,
                  'users/self',
                  null,
                  body,
                  (json: ?Object, success: bool) => {
      if (success === false || json == null) {
        completion(null, false);
        return;
      }
      let newUser = new User();
      newUser.fromJSON(json.user);
      completion(newUser, true);
    });
  }

  /**
   * Sets user password.
   *
   * @param string oldPassword: Old user's password (if any exists - user was not authenticated by onboarding token)
   * @param string newPassword: New password
   * @param Object completion: Completion handler that will return only success flag
   */
  setUserPassword(oldPassword: ?string,
                  newPassword: string,
                  completion: (success: bool) => void) {
    var body = {
      old_password: oldPassword,
      new_password: newPassword
    };
    this._perform(methods.POST,
                  'users/self/change-password',
                  null,
                  body,
                  (json: ?Object, success: bool) => {
      if (success === false) {
        completion(false);
        return;
      }
      completion(true);
    });
  }

  //////////////////////////////////////////////////////////////////////
  // Shared
  //////////////////////////////////////////////////////////////////////

  _perform(method: Method, path: string, query: ?Object, body: ?Object,
           completion: (json: ?Object, success: bool) => void) {
    if (!this._isConfigured()) {
      return;
    }

    let headers: Object = {
      'Content-Type': 'application/json',
      'X-App-Token': this._configuration.appToken
    }
    if (this._auth.userToken != null) {
      headers['X-User-Token'] = this._auth.userToken;
    }
    let options = {
      method: method,
      body: body != null ? JSON.stringify(body) : null,
      headers: headers
    };

    let host = this._APIURL(this._configuration.environment);
    let url = host + '/' + path;
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
