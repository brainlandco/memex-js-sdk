// @flow

import 'whatwg-fetch';

import type { Configuration } from './data/Types.js';

type AuthReponse = {
  token: ?string;
  retry_token: ?string;
}

const tokenKey = 'token';

export class Auth {

  appToken: string;
  _host: string;

  constructor(host: string) {
    this._host = host;
  }

  loginWithCredentials(email: string, password: string, completion: (token: ?string, retryToken: ?string, errorCode: ?number)=>void) {
    let data = {
      identity: {
        email: email
      },
      secret: {
        password: password
      }
    };
    this.login(data, completion);
  }

  loginWithOnboardingToken(onboardingToken: string, completion: (token: ?string, retryToken: ?string, errorCode: ?number)=>void) {
    let data = {
      secret: {
        onboarding_token: onboardingToken
      }
    };
    this.login(data, completion);
  }

  loginWithRetryToken(retryToken: string, completion: (token: ?string, errorCode: ?number)=>void) {
    let data = {
      identity: {
        retry_token: retryToken
      }
    };
    this.login(data, (token: ?string, retryToken: ?string, errorCode: ?number)=>{
      completion(token, errorCode)
    });
  }

  login(data: Object, completion: (token: ?string, retryToken: ?string, errorCode: ?number)=>void) {
    let options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'X-App-Token': this.appToken
      },
      credentials: 'include'
    };
    let url = this._host + '/sessions/create';

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
        completion(response.token, response.retry_token, null);
      },
      (error: Object) => {
        console.log(error)
        completion(null, null, error.status);
      });
  }

  logout(completion: (success: bool)=>void) {
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-App-Token': this.appToken
      },
      credentials: 'include'
    };
    let url = this._host + '/sessions/invalidate';

    fetch(url, options)
      .then((response: Object): Object => {
        if (response.status < 200 || response.status >= 300) {
          throw response;
        } else {
          return response;
        }
      })
      .then((data: any) => {
        completion(true);
      },
      () => {
        completion(false);
      });
  }

}
