// @flow

import 'whatwg-fetch';

import { Auth } from './Auth.js';

import Media from './data/Media.js';
import User from './data/User.js';
import Space from './data/Space.js';
import SpaceVisit from './data/SpaceVisit.js';
import Link from './data/Link.js';
import App from './data/App.js';
import { mediaTypes, mediaDataStates } from './data/Media.js';
import { spaceTypes, spaceProcessingModes } from './data/Space.js';
import type { SpaceProcessingMode } from './data/Space.js';
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
      environment: environmentTypes.production,
      url: null
    }
    this._setEnvironment(environmentTypes.production, null)
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

  _setEnvironment(environment: EnvironmentType, url: ?string) {
    this._configuration.environment = environment;
    this._configuration.url = url;
    this._auth = new Auth(this._APIURL(environment, url));
    this._auth.appToken = this._configuration.appToken;
  }

  _APIURL(environment: EnvironmentType, url: ?string): string {
    if (url != null) {
      return url;
    }
    switch (environment) {
      case environmentTypes.production:
        return 'https://mmx-spaces-api-prod.herokuapp.com';
      case environmentTypes.stage:
        return 'https://mmx-spaces-api-stage.herokuapp.com';
      case environmentTypes.local:
        return 'http://localhost:8081';
      default:
        console.error('Unknown environment');
        return '';
    }
  }

  /**
   * Login user using standard email/password credentials
   *
   * @param string email: Users unique email
   * @param string password: Users secret password
   * @param Object completion: Completion function that returns user token andd success flag
   */
  loginWithCredentials(email: string,
                       password: string,
                       completion: (token: ?string, retryToken: ?string, errorCode: ?number) => void) {
    if (!this._isConfigured()) {
      return;
    }
    this._auth.loginWithCredentials(email, password, completion);
  }

  /**
   * Login user using onboarding token
   *
   * @param string onboardingToken: Onboarding token
   * @param Object completion: Completion function that returns user token andd success flag
   */
  loginWithOnboardingToken(onboardingToken: string,
                           completion: (token: ?string, retryToken: ?string, errorCode: ?number) => void) {
    if (!this._isConfigured()) {
      return;
    }
    this._auth.loginWithOnboardingToken(onboardingToken, completion);
  }

  /**
   * Login user using two factor authorization retry token
   *
   * @param string retryToken: TFA retry token
   * @param Object completion: Completion function that returns user token andd success flag
   */
  loginWithRetryToken(retryToken: string, completion: (token: ?string, errorCode: ?number) => void) {
    if (!this._isConfigured()) {
      return;
    }
    this._auth.loginWithRetryToken(retryToken, completion);
  }

  /**
   * Logout user. Removes user token from local storage.
   */
  logout(completion: (success: bool)=>void) {
    if (!this._isConfigured()) {
      return;
    }
    this._auth.logout(completion);
  }

  //////////////////////////////////////////////////////////////////////
  // Media Handler
  //////////////////////////////////////////////////////////////////////

  /**
   * New media creation. If there is some data that needs to be uploaded put it to dataUploadURL and call markMediaAsUploaded.
   *
   * @param Media media: New media
   * @param Object completion: Completion handler that will get created media and success flag
   */
  createMedia(media: Media,
              completion: (media: ?Media, success: bool) => void) {
    let body = {
      media: media.toJSON(),
    };
    this._perform(methods.POST,
                  'media',
                  null,
                  body,
                  (json: ?Object, success: bool) => {
      if (success === false || json == null) {
        completion(null, false);
        return;
      }
      let media = new Media();
      media.fromJSON(json.media);
      completion(media, true);
    });
  }

  /**
   * Returns media object. It can be used when dataDownloadURL is expired and new is needed.
   *
   * @param string mediaMUID: Requested media MUID
   * @param Object completion: Completion handler that will get media and success flag
   */
  getMedia(mediaMUID: string, completion: (media: ?Media, success: bool)=>void) {
    this._perform(
      methods.GET,
      'media/'+mediaMUID,
      null,
      null,
      (json: ?Object, success: bool) => {
        if (success === false || json == null) {
          completion(null, false);
          return;
        }
        let media = new Media();
        media.fromJSON(json.media);
        completion(media, true);
      });
  }

  /**
   * Marks media data as uploaded. It means that data was uploaded to dataUploadURL and dataState now can change to valid state.
   *
   * @param string mediaMUID: Requested media MUID
   * @param Object completion: Completion handler
   */
  markMediaAsUploaded(mediaMUID: string, completion: (success: bool)=>void) {
    this._perform(
      methods.POST,
      'media/'+mediaMUID+'/mark-as-uploaded',
      null,
      null,
      (json: ?Object, success: bool) => {
        if (success === false || json == null) {
          completion(false);
          return;
        }
        completion(true);
      });
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
    this.createSpace(space, spaceProcessingModes.sync, autodump, completion);
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

    this.createSpace(space, spaceProcessingModes.sync, autodump, completion);
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

    this.createSpace(space, spaceProcessingModes.sync, autodump, completion);
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

    this.createSpace(space, spaceProcessingModes.sync, autodump, completion);
  }

  /**
   * Creates space
   *
   * @param Space space: New space
   * @param SpaceProcessingMode process: Defines processing mode
   * @param bool autodump: True if new space should be autodumped
   * @param Object completion: Completion handler that will get created space and success flag
   */
  createSpace(space: Space,
              process: SpaceProcessingMode,
              autodump: bool,
              completion: (space: ?Space, success: bool) => void) {
    let body = {
      space: space.toJSON(),
      process: process,
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

  /**
   * Log space visits
   *
   * @param string visits: Array of space visits. Can contain multiple spaces with same MUID.
   * @param Object completion: Completion handler
   */
  logSpaceVisits(visits: Array<SpaceVisit>, completion: (success: bool)=>void) {
    let body = {
      spaces: visits.map(function(visit: SpaceVisit): Media {
        return visit.toJSON();
      })
    };
    this._perform(
      methods.POST,
      'spaces/log-visits',
      null,
      body,
      (json: ?Object, success: bool) => {
        if (success === false || json == null) {
          completion(false);
          return;
        }
        completion(true);
      });
  }

  /**
   * Returns abstraction (caption) for set of spaces
   *
   * @param string muids: Set of space MUIDs for that will be caption generated
   * @param Object completion: Completion handler
   */
  getSpacesAbstract(muids: Array<string>, completion: (caption: ?string, success: bool)=>void) {
    let body = {
      space_MUIDs: muids
    };
    this._perform(
      methods.POST,
      'spaces/abstract',
      null,
      body,
      (json: ?Object, success: bool) => {
        if (success === false || json == null) {
          completion(null, false);
          return;
        }
        completion(json.caption, true);
      });
  }

  //////////////////////////////////////////////////////////////////////
  // Links Handler
  //////////////////////////////////////////////////////////////////////

  /**
   * NNew link creation.
   *
   * @param Link link: New link
   * @param Object completion: Completion handler that will get created media and success flag
   */
  createMedia(link: Link,
              completion: (link: ?Link, success: bool) => void) {
    let body = {
      link: link.toJSON(),
    };
    this._perform(methods.POST,
                  'links',
                  null,
                  body,
                  (json: ?Object, success: bool) => {
      if (success === false || json == null) {
        completion(null, false);
        return;
      }
      let link = new Link();
      link.fromJSON(json.link);
      completion(link, true);
    });
  }

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

  //////////////////////////////////////////////////////////////////////
  // User Handler
  //////////////////////////////////////////////////////////////////////

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


  /**
   * Request password reset.
   *
   * @param string email: Email for request account
   * @param Object completion: Completion handler that will return only success flag
   */
  requestPasswordReset(email: string,
                       completion: (success: bool) => void) {
    var body = {
      email: email
    };
    this._perform(methods.POST,
                  'users/self/request-password-reset',
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

  /**
   * Reset password.
   *
   * @param string resetToken: Password reset token that was recevied by email
   * @param string newPassword: New password
   * @param Object completion: Completion handler that will return only success flag
   */
  resetPassword(resetToken: string,
                newPassword: string,
                completion: (success: bool) => void) {
    var body = {
      token: resetToken,
      new_password: newPassword,
    };
    this._perform(methods.POST,
                  'users/self/reset-password',
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

  /**
   * Request contact verification.
   *
   * @param string type: Contact type
   * @param string newPassword: New password
   * @param Object completion: Completion handler that will return only success flag
   */
  requestContactVerification(type: string,
                            completion: (success: bool) => void) {
    var body = {
      type: type,
    };
    this._perform(methods.POST,
                  'users/self/contacts/request-verification',
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

  /**
   * Verify user contact.
   *
   * @param string type: Contact type
   * @param string verificationToken: Verification token
   * @param Object completion: Completion handler that will return only success flag
   */
  verifyContact(type: string,
                verificationToken: string,
                completion: (success: bool) => void) {
    var body = {
      type: type,
      token: verificationToken,
    };
    this._perform(methods.POST,
                  'users/self/contacts/verify',
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

  /**
   * Activate TFA session.
   *
   * @param string activationToken: TFA activation token
   * @param Object completion: Completion handler that will return only success flag
   */
  activateTFASession(activationToken: string,
                completion: (success: bool) => void) {
    var body = {
      activation_token: activationToken,
    };
    this._perform(methods.POST,
                  'sessions/activate',
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
      headers: headers,
      credentials: 'include'
    };

    let host = this._APIURL(this._configuration.environment, this._configuration.url);
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
