// @flow

import 'whatwg-fetch';
import type { Configuration } from './Configuration.js';
import { authAPIURL } from './Configuration.js';
import Cookies from 'cookies-js';

type AuthReponse = {
  authorization_token: ?string;
}


const tokenKey = 'token';

export class Auth {

  token: ?string;
  _host: string;

  constructor(configuration: Configuration) {
    this._host = authAPIURL(configuration.environment);
    this._loadFromCookies();
  }

  _loadFromCookies() {
    this.token = Cookies.get(tokenKey);
    if (this.token === 'null') {
      this.token = null;
    }
  }

  _storeIntoCookies() {
    if (this.token != null) {
      Cookies.set(tokenKey, this.token, null);
    } else {
      Cookies.expire(tokenKey);
    }
  }

  isAuthorized(): bool {
    return this.token != null;
  }

  deauthorize() {
    this.token = null;
    this._storeIntoCookies();
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
      headers: { 'Content-Type': 'application/json' }
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
        this.token = response.authorization_token;
        this._storeIntoCookies();
        completion(this.token, true);
      },
      () => {
        this.token = null;
        completion(null, false);
      });
  }

}
