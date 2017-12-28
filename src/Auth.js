// @flow

import 'whatwg-fetch';

import type { Configuration } from './data/Types.js';

type AuthResponse = {
  retry_token: ?string;
  type: ?string;
  activation_token_expires_at: ?DateTime;
}

type MFAChallange = {
  token: ?string;
  mfa: ?MFAChallange;
}

export class Auth {

  appToken: string;
  _host: string;

  constructor(host: string) {
    this._host = host;
  }

  loginWithCredentials(email: string, password: string): Promise {
    let data = {
      identity: {
        email: email
      },
      secret: {
        password: password
      }
    };
    console.log(data)
    return this.login(data);
  }

  loginWithOnboardingToken(onboardingToken: string): Promise {
    let data = {
      secret: {
        onboarding_token: onboardingToken
      }
    };
    return this.login(data);
  }

  loginWithTFARetryToken(retryToken: string, activationToken: ?string): Promise {
    let data = {
      identity: {
        retry_token: retryToken
      },
      secret: {
        activation_token: activationToken
      }
    };
    return this.login(data);
  }

  login(data: Object): Promise {
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

    return fetch(url, options)
      .then((response: Object): Object => {
        console.log(response)
        if (response.status < 200 || response.status >= 300) {
          throw response;
        } else {
          return response;
        }
      })
      .then((response: Object): ?Object => {
        console.log(response)
        console.log(response.json())
        return response.json();
      })
  }

  logout(all: bool): Promise {
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-App-Token': this.appToken
      },
      credentials: 'include'
    };
    let path = all ? 'sessions/invalidate' : 'sessions/current/invalidate';
    let url = this._host + path;
    return fetch(url, options)
      .then((response: Object): Object => {
        if (response.status < 200 || response.status >= 300) {
          throw response;
        } else {
          return response;
        }
      })
  }

}
