// @flow

import 'whatwg-fetch';

import type { Configuration } from './Configuration.js';

type AuthReponse = {
  authorization_token: ?string;
}

const tokenKey = 'token';

export class Auth {

  userToken: ?string;
  appToken: string;
  _host: string;

  constructor(host: string) {
    this._host = host;
    this._loadFromStorage();
  }

  _loadFromStorage() {
    this.userToken = localStorage.getItem(tokenKey);
    if (this.userToken === 'null') {
      this.userToken = null;
    }
  }

  _storeIntoStorage() {
    if (this.userToken != null) {
      localStorage.setItem(tokenKey, this.userToken);
    } else {
      localStorage.removeItem(tokenKey);
    }
  }

  isAuthorized(): bool {
    return this.userToken != null;
  }

  deauthorize() {
    this.userToken = null;
    this._storeIntoStorage();
  }

  login(email: string,
    password: string,
    completion: (token: ?string, success: bool)=>void) {
    let data = {
      email: email,
      password: password
    };
    let options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'X-App-Token': this.appToken
      }
    };
    let url = this._host + '/api/v1/auth/login';

    fetch(url, options)
      .then((response: Object): Object => {
        if (response.status < 200 || response.status >= 300) {
          throw response;
        } else {
          return response;
        }
      })
      .then((data: any): AuthReponse => {
        return data.json();
      })
      .then((response: AuthReponse) => {
        this.userToken = response.authorization_token;
        this._storeIntoStorage();
        completion(this.userToken, true);
      },
      () => {
        this.userToken = null;
        completion(null, false);
      });
  }

}
