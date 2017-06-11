(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("memex-js-sdk", [], factory);
	else if(typeof exports === 'object')
		exports["memex-js-sdk"] = factory();
	else
		root["memex-js-sdk"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Spaces = __webpack_require__(1);

	var _Configuration = __webpack_require__(13);

	var _User = __webpack_require__(9);

	var _User2 = _interopRequireDefault(_User);

	var _Media = __webpack_require__(4);

	var _Media2 = _interopRequireDefault(_Media);

	var _Space = __webpack_require__(10);

	var _Space2 = _interopRequireDefault(_Space);

	var _Link = __webpack_require__(11);

	var _Link2 = _interopRequireDefault(_Link);

	var _App = __webpack_require__(12);

	var _App2 = _interopRequireDefault(_App);

	var _Types = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Memex = {
	  /** Shared instance of Spaces */
	  sharedClient: new _Spaces.Spaces(),
	  environmentTypes: _Configuration.environmentTypes,
	  mediaTypes: _Types.mediaTypes,
	  spaceTypes: _Types.spaceTypes,
	  mediaDataStates: _Types.mediaDataStates,
	  appPlatforms: _Types.appPlatforms,
	  Media: _Media2.default,
	  Space: _Space2.default,
	  Link: _Link2.default,
	  App: _App2.default,
	  User: _User2.default
	};

	exports.default = Memex;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Spaces = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(2);

	var _Auth = __webpack_require__(3);

	var _Media = __webpack_require__(4);

	var _Media2 = _interopRequireDefault(_Media);

	var _User = __webpack_require__(9);

	var _User2 = _interopRequireDefault(_User);

	var _Space = __webpack_require__(10);

	var _Space2 = _interopRequireDefault(_Space);

	var _Link = __webpack_require__(11);

	var _Link2 = _interopRequireDefault(_Link);

	var _App = __webpack_require__(12);

	var _App2 = _interopRequireDefault(_App);

	var _Types = __webpack_require__(5);

	var _Configuration = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var methods = {
	  GET: 'GET',
	  POST: 'POST'
	};

	var Spaces = exports.Spaces = function () {
	  function Spaces() {
	    _classCallCheck(this, Spaces);

	    this._configuration = {
	      appToken: "",
	      environment: _Configuration.environmentTypes.production
	    };
	    this._setEnvironment(_Configuration.environmentTypes.production);
	  }

	  _createClass(Spaces, [{
	    key: '_isConfigured',
	    value: function _isConfigured() {
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

	  }, {
	    key: 'setAppToken',
	    value: function setAppToken(token) {
	      this._configuration.appToken = token;
	      this._auth.appToken = token;
	    }
	  }, {
	    key: '_setEnvironment',
	    value: function _setEnvironment(environment) {
	      this._configuration.environment = environment;
	      this._auth = new _Auth.Auth(this._APIURL(environment));
	      this._auth.appToken = this._configuration.appToken;
	    }
	  }, {
	    key: '_APIURL',
	    value: function _APIURL(environment) {
	      switch (environment) {
	        case _Configuration.environmentTypes.production:
	          return 'https://mmx-spaces-api-prod.herokuapp.com';
	        case _Configuration.environmentTypes.stage:
	          return 'https://mmx-spaces-api-stage.herokuapp.com';
	        case _Configuration.environmentTypes.local:
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

	  }, {
	    key: 'isLoggedIn',
	    value: function isLoggedIn() {
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

	  }, {
	    key: 'login',
	    value: function login(email, password, completion) {
	      if (!this._isConfigured()) {
	        return;
	      }
	      this._auth.login(email, password, completion);
	    }

	    /**
	     * Logout user. Removes user token from local storage.
	     */

	  }, {
	    key: 'logout',
	    value: function logout() {
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

	  }, {
	    key: 'createCollectionSpace',
	    value: function createCollectionSpace(tag, autodump, completion) {
	      var space = new _Space2.default();
	      space.tagLabel = tag;
	      space.tagColor = null;
	      space.spaceType = _Types.spaceTypes.collection;
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

	  }, {
	    key: 'createImageSpace',
	    value: function createImageSpace(imageURL, autodump, completion) {
	      var media = new _Media2.default();
	      media.dataDownloadURL = imageURL;
	      media.dataState = _Types.mediaDataStates.dataValid;
	      media.mediaType = _Types.mediaTypes.source;

	      var space = new _Space2.default();
	      space.spaceType = _Types.spaceTypes.image;
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

	  }, {
	    key: 'createWebPageSpace',
	    value: function createWebPageSpace(url, autodump, completion) {
	      var media = new _Media2.default();
	      media.setEmbedDataFromString(url);
	      media.dataState = _Types.mediaDataStates.dataValid;
	      media.mediaType = _Types.mediaTypes.reference;

	      var space = new _Space2.default();
	      space.spaceType = _Types.spaceTypes.webPage;
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

	  }, {
	    key: 'createTextSpace',
	    value: function createTextSpace(text, autodump, completion) {
	      var media = new _Media2.default();
	      media.setEmbedDataFromString(text);
	      media.dataState = _Types.mediaDataStates.dataValid;
	      media.mediaType = _Types.mediaTypes.source;

	      var space = new _Space2.default();
	      space.spaceType = _Types.spaceTypes.text;
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

	  }, {
	    key: 'createSpace',
	    value: function createSpace(space, autodump, completion) {
	      var body = {
	        space: space.toJSON(),
	        process: "sync",
	        autodump: autodump
	      };
	      this._perform(methods.POST, 'spaces', null, body, function (json, success) {
	        if (success === false || json == null) {
	          completion(null, false);
	          return;
	        }
	        var space = new _Space2.default();
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

	  }, {
	    key: 'getSpace',
	    value: function getSpace(spaceMUID, completion) {
	      this._perform(methods.GET, 'spaces/' + spaceMUID, null, null, function (json, success) {
	        if (success === false || json == null) {
	          completion(null, false);
	          return;
	        }
	        var space = new _Space2.default();
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

	  }, {
	    key: 'getSpaceLinks',
	    value: function getSpaceLinks(spaceMUID, completion) {
	      var path = 'spaces/' + spaceMUID + '/links';
	      var query = {
	        includeTarget: true
	      };
	      this._perform(methods.GET, path, query, null, function (json, success) {
	        if (success === false || json == null) {
	          completion(null, false);
	          return;
	        }
	        var links = [];
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = json.links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var item = _step.value;

	            var link = new _Link2.default();
	            link.fromJSON(item);
	            links.push(link);
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
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

	  }, {
	    key: 'getApps',
	    value: function getApps(completion) {
	      var path = 'apps';
	      this._perform(methods.GET, path, {}, null, function (json, success) {
	        if (success === false || json == null) {
	          completion(null, false);
	          return;
	        }
	        var apps = [];
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	          for (var _iterator2 = json.apps[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var item = _step2.value;

	            var _app = new _App2.default();
	            _app.fromJSON(item);
	            apps.push(_app);
	          }
	        } catch (err) {
	          _didIteratorError2 = true;
	          _iteratorError2 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	              _iterator2.return();
	            }
	          } finally {
	            if (_didIteratorError2) {
	              throw _iteratorError2;
	            }
	          }
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

	  }, {
	    key: 'createApp',
	    value: function createApp(app, completion) {
	      var body = {
	        app: app.toJSON()
	      };
	      this._perform(methods.POST, 'apps', null, body, function (json, success) {
	        if (success === false || json == null) {
	          completion(null, false);
	          return;
	        }
	        var newApp = new _App2.default();
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

	  }, {
	    key: 'updateApp',
	    value: function updateApp(app, completion) {
	      if (app.id === null) {
	        console.error("Missing app id");
	        completion(null, false);
	        return;
	      }
	      var body = {
	        app: app.toJSON()
	      };
	      this._perform(methods.POST, 'apps/' + app.id, null, body, function (json, success) {
	        if (success === false || json == null) {
	          completion(null, false);
	          return;
	        }
	        var newApp = new _App2.default();
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

	  }, {
	    key: 'renewAppToken',
	    value: function renewAppToken(appID, completion) {
	      this._perform(methods.POST, 'apps/' + appID + "/renew-token", null, {}, function (json, success) {
	        if (success === false || json == null) {
	          completion(null, false);
	          return;
	        }
	        var newApp = new _App2.default();
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

	  }, {
	    key: 'getApp',
	    value: function getApp(id, completion) {
	      this._perform(methods.GET, 'apps/' + id, null, null, function (json, success) {
	        if (success === false || json == null) {
	          completion(null, false);
	          return;
	        }
	        var newApp = new _App2.default();
	        newApp.fromJSON(json.app);
	        completion(newApp, true);
	      });
	    }

	    //////////////////////////////////////////////////////////////////////
	    // User Handler
	    //////////////////////////////////////////////////////////////////////

	    /**
	     * Update user. For password updates use setUserPassword function.
	     *
	     * @param User user: Updated user object
	     * @param Object completion: Completion handler that will return update user object and success flag
	     */

	  }, {
	    key: 'updateUser',
	    value: function updateUser(user, completion) {
	      var body = {
	        user: user.toJSON()
	      };
	      this._perform(methods.POST, 'users/self', null, body, function (json, success) {
	        if (success === false || json == null) {
	          completion(null, false);
	          return;
	        }
	        var newUser = new _User2.default();
	        newUser.fromJSON(json.user);
	        completion(newUser, true);
	      });
	    }

	    /**
	     * Creates new user. User object must contains password and valid email.
	     *
	     * @param User user: New user object
	     * @param Object completion: Completion handler that will return new user object and success flag
	     */

	  }, {
	    key: 'createUser',
	    value: function createUser(user, completion) {
	      var body = {
	        user: user.toJSON()
	      };
	      this._perform(methods.POST, 'users', null, body, function (json, success) {
	        if (success === false || json == null) {
	          completion(null, false);
	          return;
	        }
	        var newUser = new _User2.default();
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

	  }, {
	    key: 'getUser',
	    value: function getUser(userID, completion) {
	      this._perform(methods.GET, 'users/' + (userID == null ? 'self' : userID), null, null, function (json, success) {
	        if (success === false || json == null) {
	          completion(null, false);
	          return;
	        }
	        var newUser = new _User2.default();
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

	  }, {
	    key: 'setUserPassword',
	    value: function setUserPassword(oldPassword, newPassword, completion) {
	      var body = {
	        old_password: oldPassword,
	        new_password: newPassword
	      };
	      this._perform(methods.POST, 'users/self/change-password', null, body, function (json, success) {
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

	  }, {
	    key: '_perform',
	    value: function _perform(method, path, query, body, completion) {
	      if (!this._isConfigured()) {
	        return;
	      }

	      var headers = {
	        'Content-Type': 'application/json',
	        'X-App-Token': this._configuration.appToken
	      };
	      if (this._auth.userToken != null) {
	        headers['X-User-Token'] = this._auth.userToken;
	      }
	      var options = {
	        method: method,
	        body: body != null ? JSON.stringify(body) : null,
	        headers: headers
	      };

	      var host = this._APIURL(this._configuration.environment);
	      var url = host + '/' + path;
	      var resultQuery = query;
	      if (resultQuery != null) {
	        var keys = Object.keys(resultQuery);
	        var queryString = keys.reduce(function (array, key) {
	          if (resultQuery == null) {
	            return array;
	          }
	          var value = resultQuery[key];
	          array.push(key + '=' + encodeURIComponent(value));
	          return array;
	        }, []).join('&');
	        url += '?' + queryString;
	      }
	      fetch(url, options).then(function (response) {
	        if (response.status < 200 || response.status >= 300) {
	          throw response;
	        } else {
	          return response;
	        }
	      }).then(function (data) {
	        return data.json();
	      }).then(function (response) {
	        completion(response, true);
	      }, function (error) {
	        completion(null, false);
	      });
	    }
	  }]);

	  return Spaces;
	}();

/***/ },
/* 2 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }

	  if (support.arrayBuffer) {
	    var viewClasses = [
	      '[object Int8Array]',
	      '[object Uint8Array]',
	      '[object Uint8ClampedArray]',
	      '[object Int16Array]',
	      '[object Uint16Array]',
	      '[object Int32Array]',
	      '[object Uint32Array]',
	      '[object Float32Array]',
	      '[object Float64Array]'
	    ]

	    var isDataView = function(obj) {
	      return obj && DataView.prototype.isPrototypeOf(obj)
	    }

	    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
	      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
	    }
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }

	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }

	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }

	    return iterator
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)
	    } else if (Array.isArray(headers)) {
	      headers.forEach(function(header) {
	        this.append(header[0], header[1])
	      }, this)
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var oldValue = this.map[name]
	    this.map[name] = oldValue ? oldValue+','+value : value
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    name = normalizeName(name)
	    return this.has(name) ? this.map[name] : null
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = normalizeValue(value)
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    for (var name in this.map) {
	      if (this.map.hasOwnProperty(name)) {
	        callback.call(thisArg, this.map[name], name, this)
	      }
	    }
	  }

	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }

	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsArrayBuffer(blob)
	    return promise
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsText(blob)
	    return promise
	  }

	  function readArrayBufferAsText(buf) {
	    var view = new Uint8Array(buf)
	    var chars = new Array(view.length)

	    for (var i = 0; i < view.length; i++) {
	      chars[i] = String.fromCharCode(view[i])
	    }
	    return chars.join('')
	  }

	  function bufferClone(buf) {
	    if (buf.slice) {
	      return buf.slice(0)
	    } else {
	      var view = new Uint8Array(buf.byteLength)
	      view.set(new Uint8Array(buf))
	      return view.buffer
	    }
	  }

	  function Body() {
	    this.bodyUsed = false

	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (!body) {
	        this._bodyText = ''
	      } else if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
	        this._bodyArrayBuffer = bufferClone(body.buffer)
	        // IE 10-11 can't handle a DataView body.
	        this._bodyInit = new Blob([this._bodyArrayBuffer])
	      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	        this._bodyArrayBuffer = bufferClone(body)
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyArrayBuffer) {
	          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        if (this._bodyArrayBuffer) {
	          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
	        } else {
	          return this.blob().then(readBlobAsArrayBuffer)
	        }
	      }
	    }

	    this.text = function() {
	      var rejected = consumed(this)
	      if (rejected) {
	        return rejected
	      }

	      if (this._bodyBlob) {
	        return readBlobAsText(this._bodyBlob)
	      } else if (this._bodyArrayBuffer) {
	        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
	      } else if (this._bodyFormData) {
	        throw new Error('could not read FormData body as text')
	      } else {
	        return Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {}
	    var body = options.body

	    if (input instanceof Request) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body && input._bodyInit != null) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = String(input)
	    }

	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }

	  Request.prototype.clone = function() {
	    return new Request(this, { body: this._bodyInit })
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function parseHeaders(rawHeaders) {
	    var headers = new Headers()
	    rawHeaders.split(/\r?\n/).forEach(function(line) {
	      var parts = line.split(':')
	      var key = parts.shift().trim()
	      if (key) {
	        var value = parts.join(':').trim()
	        headers.append(key, value)
	      }
	    })
	    return headers
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this.type = 'default'
	    this.status = 'status' in options ? options.status : 200
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = 'statusText' in options ? options.statusText : 'OK'
	    this.headers = new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }

	  Body.call(Response.prototype)

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }

	  var redirectStatuses = [301, 302, 303, 307, 308]

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  }

	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request = new Request(input, init)
	      var xhr = new XMLHttpRequest()

	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	        }
	        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Auth = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var tokenKey = 'token';

	var Auth = exports.Auth = function () {
	  function Auth(host) {
	    _classCallCheck(this, Auth);

	    this._host = host;
	    this._loadFromStorage();
	  }

	  _createClass(Auth, [{
	    key: '_loadFromStorage',
	    value: function _loadFromStorage() {
	      this.userToken = localStorage.getItem(tokenKey);
	      if (this.userToken === 'null') {
	        this.userToken = null;
	      }
	    }
	  }, {
	    key: '_storeIntoStorage',
	    value: function _storeIntoStorage() {
	      if (this.userToken != null) {
	        localStorage.setItem(tokenKey, this.userToken);
	      } else {
	        localStorage.removeItem(tokenKey);
	      }
	    }
	  }, {
	    key: 'isAuthorized',
	    value: function isAuthorized() {
	      return this.userToken != null;
	    }
	  }, {
	    key: 'deauthorize',
	    value: function deauthorize() {
	      this.userToken = null;
	      this._storeIntoStorage();
	    }
	  }, {
	    key: 'login',
	    value: function login(email, password, completion) {
	      var _this = this;

	      var data = {
	        identity: {
	          email: email
	        },
	        secret: {
	          password: password
	        }
	      };
	      var options = {
	        method: 'POST',
	        body: JSON.stringify(data),
	        headers: {
	          'Content-Type': 'application/json',
	          'X-App-Token': this.appToken
	        }
	      };
	      var url = this._host + '/users/request-token';

	      fetch(url, options).then(function (response) {
	        if (response.status < 200 || response.status >= 300) {
	          throw response;
	        } else {
	          return response;
	        }
	      }).then(function (data) {
	        return data.json();
	      }).then(function (response) {
	        _this.userToken = response.token;
	        _this._storeIntoStorage();
	        completion(_this.userToken, true);
	      }, function () {
	        _this.userToken = null;
	        completion(null, false);
	      });
	    }
	  }]);

	  return Auth;
	}();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Types = __webpack_require__(5);

	var _base = __webpack_require__(6);

	var _base2 = _interopRequireDefault(_base);

	var _utf = __webpack_require__(8);

	var _utf2 = _interopRequireDefault(_utf);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/** Class represents media component of space */
	var Media = function () {
	  /** Data download URL */

	  /** Media type */


	  /** Unique media identifier */
	  function Media() {
	    _classCallCheck(this, Media);

	    this.state = _Types.entityStates.unknown;
	    this.dataState = _Types.mediaDataStates.unknown;
	    this.mediaType = _Types.mediaTypes.source;
	  }

	  /**
	   * Sets embedData (binary format) from base64 format
	   *
	   * @param string base64: Base64 encoded data
	   */

	  /** State of data in embedData or dataDownloadURL */

	  /** Embed media binary data */

	  /** Media visibility state */


	  _createClass(Media, [{
	    key: 'setEmbedDataFromBase64',
	    value: function setEmbedDataFromBase64(base64) {
	      var binaryString = window.atob(base64);
	      var length = binaryString.length;
	      var bytes = new Uint8Array(length);
	      for (var i = 0; i < length; i++) {
	        bytes[i] = binaryString.charCodeAt(i);
	      }
	      this.embedData = bytes.buffer;
	    }

	    /**
	     * Sets embedData (binary format) from ANSCI ancoded text
	     *
	     * @param string value: ANSCII encoded data
	     */

	  }, {
	    key: 'setEmbedDataFromString',
	    value: function setEmbedDataFromString(value) {
	      var length = value.length;
	      var array = new Uint8Array(length);
	      for (var index = 0; index < length; index++) {
	        array[index] = value.charCodeAt(index);
	      }
	      this.embedData = array.buffer;
	    }

	    /**
	     * Converts emebedData into base64 encoded string
	     *
	     * @returns string Base64 encoded embedData
	     */

	  }, {
	    key: 'base64EmbedData',
	    value: function base64EmbedData() {
	      if (this.embedData == null) {
	        return null;
	      }
	      var binary = '';
	      var bytes = new Uint8Array(this.embedData);
	      var len = bytes.byteLength;
	      for (var i = 0; i < len; i++) {
	        binary += String.fromCharCode(bytes[i]);
	      }
	      return window.btoa(binary);
	    }

	    /**
	     * Converts utf8 encoded emebedData into string
	     *
	     * @returns string Decoded text
	     */

	  }, {
	    key: 'textualEmbedData',
	    value: function textualEmbedData() {
	      if (this.embedData == null) {
	        return null;
	      }
	      var encoded = this.base64EmbedData();
	      var bytes = _base2.default.decode(encoded);
	      var text = _utf2.default.decode(bytes);
	      return text;
	    }
	  }, {
	    key: 'fromJSON',
	    value: function fromJSON(json) {
	      this.MUID = json.MUID;
	      this.state = json.state;
	      this.mediaType = json.type;
	      this.dataState = json.data_state;
	      if (json.embeded_data != null) {
	        this.setEmbedDataFromBase64(json.embeded_data);
	      } else {
	        this.embedData = null;
	      }
	      this.dataDownloadURL = json.data_download_url;
	    }
	  }, {
	    key: 'toJSON',
	    value: function toJSON() {
	      return {
	        type: this.mediaType,
	        data_download_url: this.dataDownloadURL,
	        embeded_data: this.base64EmbedData(),
	        data_state: this.dataState
	      };
	    }
	  }]);

	  return Media;
	}();

	exports.default = Media;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var spaceTypes = exports.spaceTypes = {
	  /** Origin is simillar to collection but defines entry point into users spaces (root) */
	  origin: 'com.memex.origin',
	  /** Collection of links to spaces */
	  collection: 'com.memex.media.collection',
	  /** Space that represents web link */
	  webPage: 'com.memex.media.webpage',
	  /** Textual kind of space */
	  text: 'com.memex.media.text',
	  /** Graphical kind of space */
	  image: 'com.memex.media.image'
	};

	/** Semantic type of media */


	/** Defines known space types */
	var mediaTypes = exports.mediaTypes = {
	  /** Link to original media source */
	  reference: 'reference',
	  /** Source of data (every other representation can be derived from it). */
	  source: 'source',
	  /** Graphical abstraction of source/reference */
	  preview: 'preview',
	  /** Textual abstraction of source/reference */
	  summary: 'summary'
	};

	/** Media data upload state */
	var mediaDataStates = exports.mediaDataStates = {
	  /** State is unknown */
	  unknown: -1,
	  /** Client is waiting for server to generate signed dataUploadURL */
	  waitingForNewUploadURL: 0,
	  /** Data Upload URL is valid and client can upload data */
	  readyForDataUpload: 1,
	  /** Data is valid and can be downloaded/used */
	  dataValid: 2
	};

	/** Entity visiblity state */
	var entityStates = exports.entityStates = {
	  /** State is unknown */
	  unknown: -1,
	  /** Entity us visible to user */
	  visible: 0,
	  /** Entity is trashed and will be deleted soon */
	  deleted: 1
	};

	/** Approval state of app  */
	var appStates = exports.appStates = {
	  /** App is new and review wasn't requested yet */
	  new: 0,
	  /** Appr review is requested */
	  requested: 1,
	  /** App was approved and will get higher limits */
	  approved: 2,
	  /** App was rejected by reviewer */
	  rejected: 3,
	  /** App was blocked by admin */
	  blocked: 4
	};

	/** Platform/language of SDK */
	var appPlatforms = exports.appPlatforms = {
	  /** Native REST API */
	  rest: 0,
	  /** Swift */
	  swift: 1,
	  /** JavaScript */
	  javaScript: 2,
	  /** Go */
	  golang: 3
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */
	;(function(root) {

		// Detect free variables `exports`.
		var freeExports = typeof exports == 'object' && exports;

		// Detect free variable `module`.
		var freeModule = typeof module == 'object' && module &&
			module.exports == freeExports && module;

		// Detect free variable `global`, from Node.js or Browserified code, and use
		// it as `root`.
		var freeGlobal = typeof global == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}

		/*--------------------------------------------------------------------------*/

		var InvalidCharacterError = function(message) {
			this.message = message;
		};
		InvalidCharacterError.prototype = new Error;
		InvalidCharacterError.prototype.name = 'InvalidCharacterError';

		var error = function(message) {
			// Note: the error messages used throughout this file match those used by
			// the native `atob`/`btoa` implementation in Chromium.
			throw new InvalidCharacterError(message);
		};

		var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
		// http://whatwg.org/html/common-microsyntaxes.html#space-character
		var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

		// `decode` is designed to be fully compatible with `atob` as described in the
		// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
		// The optimized base64-decoding algorithm used is based on @atk’s excellent
		// implementation. https://gist.github.com/atk/1020396
		var decode = function(input) {
			input = String(input)
				.replace(REGEX_SPACE_CHARACTERS, '');
			var length = input.length;
			if (length % 4 == 0) {
				input = input.replace(/==?$/, '');
				length = input.length;
			}
			if (
				length % 4 == 1 ||
				// http://whatwg.org/C#alphanumeric-ascii-characters
				/[^+a-zA-Z0-9/]/.test(input)
			) {
				error(
					'Invalid character: the string to be decoded is not correctly encoded.'
				);
			}
			var bitCounter = 0;
			var bitStorage;
			var buffer;
			var output = '';
			var position = -1;
			while (++position < length) {
				buffer = TABLE.indexOf(input.charAt(position));
				bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
				// Unless this is the first of a group of 4 characters…
				if (bitCounter++ % 4) {
					// …convert the first 8 bits to a single ASCII character.
					output += String.fromCharCode(
						0xFF & bitStorage >> (-2 * bitCounter & 6)
					);
				}
			}
			return output;
		};

		// `encode` is designed to be fully compatible with `btoa` as described in the
		// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
		var encode = function(input) {
			input = String(input);
			if (/[^\0-\xFF]/.test(input)) {
				// Note: no need to special-case astral symbols here, as surrogates are
				// matched, and the input is supposed to only contain ASCII anyway.
				error(
					'The string to be encoded contains characters outside of the ' +
					'Latin1 range.'
				);
			}
			var padding = input.length % 3;
			var output = '';
			var position = -1;
			var a;
			var b;
			var c;
			var d;
			var buffer;
			// Make sure any padding is handled outside of the loop.
			var length = input.length - padding;

			while (++position < length) {
				// Read three bytes, i.e. 24 bits.
				a = input.charCodeAt(position) << 16;
				b = input.charCodeAt(++position) << 8;
				c = input.charCodeAt(++position);
				buffer = a + b + c;
				// Turn the 24 bits into four chunks of 6 bits each, and append the
				// matching character for each of them to the output.
				output += (
					TABLE.charAt(buffer >> 18 & 0x3F) +
					TABLE.charAt(buffer >> 12 & 0x3F) +
					TABLE.charAt(buffer >> 6 & 0x3F) +
					TABLE.charAt(buffer & 0x3F)
				);
			}

			if (padding == 2) {
				a = input.charCodeAt(position) << 8;
				b = input.charCodeAt(++position);
				buffer = a + b;
				output += (
					TABLE.charAt(buffer >> 10) +
					TABLE.charAt((buffer >> 4) & 0x3F) +
					TABLE.charAt((buffer << 2) & 0x3F) +
					'='
				);
			} else if (padding == 1) {
				buffer = input.charCodeAt(position);
				output += (
					TABLE.charAt(buffer >> 2) +
					TABLE.charAt((buffer << 4) & 0x3F) +
					'=='
				);
			}

			return output;
		};

		var base64 = {
			'encode': encode,
			'decode': decode,
			'version': '0.1.0'
		};

		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return base64;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}	else if (freeExports && !freeExports.nodeType) {
			if (freeModule) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = base64;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (var key in base64) {
					base64.hasOwnProperty(key) && (freeExports[key] = base64[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.base64 = base64;
		}

	}(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)(module), (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/utf8js v2.1.2 by @mathias */
	;(function(root) {

		// Detect free variables `exports`
		var freeExports = typeof exports == 'object' && exports;

		// Detect free variable `module`
		var freeModule = typeof module == 'object' && module &&
			module.exports == freeExports && module;

		// Detect free variable `global`, from Node.js or Browserified code,
		// and use it as `root`
		var freeGlobal = typeof global == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}

		/*--------------------------------------------------------------------------*/

		var stringFromCharCode = String.fromCharCode;

		// Taken from https://mths.be/punycode
		function ucs2decode(string) {
			var output = [];
			var counter = 0;
			var length = string.length;
			var value;
			var extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		// Taken from https://mths.be/punycode
		function ucs2encode(array) {
			var length = array.length;
			var index = -1;
			var value;
			var output = '';
			while (++index < length) {
				value = array[index];
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
			}
			return output;
		}

		function checkScalarValue(codePoint) {
			if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
				throw Error(
					'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
					' is not a scalar value'
				);
			}
		}
		/*--------------------------------------------------------------------------*/

		function createByte(codePoint, shift) {
			return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
		}

		function encodeCodePoint(codePoint) {
			if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
				return stringFromCharCode(codePoint);
			}
			var symbol = '';
			if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
				symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
			}
			else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
				checkScalarValue(codePoint);
				symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
				symbol += createByte(codePoint, 6);
			}
			else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
				symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
				symbol += createByte(codePoint, 12);
				symbol += createByte(codePoint, 6);
			}
			symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
			return symbol;
		}

		function utf8encode(string) {
			var codePoints = ucs2decode(string);
			var length = codePoints.length;
			var index = -1;
			var codePoint;
			var byteString = '';
			while (++index < length) {
				codePoint = codePoints[index];
				byteString += encodeCodePoint(codePoint);
			}
			return byteString;
		}

		/*--------------------------------------------------------------------------*/

		function readContinuationByte() {
			if (byteIndex >= byteCount) {
				throw Error('Invalid byte index');
			}

			var continuationByte = byteArray[byteIndex] & 0xFF;
			byteIndex++;

			if ((continuationByte & 0xC0) == 0x80) {
				return continuationByte & 0x3F;
			}

			// If we end up here, it’s not a continuation byte
			throw Error('Invalid continuation byte');
		}

		function decodeSymbol() {
			var byte1;
			var byte2;
			var byte3;
			var byte4;
			var codePoint;

			if (byteIndex > byteCount) {
				throw Error('Invalid byte index');
			}

			if (byteIndex == byteCount) {
				return false;
			}

			// Read first byte
			byte1 = byteArray[byteIndex] & 0xFF;
			byteIndex++;

			// 1-byte sequence (no continuation bytes)
			if ((byte1 & 0x80) == 0) {
				return byte1;
			}

			// 2-byte sequence
			if ((byte1 & 0xE0) == 0xC0) {
				byte2 = readContinuationByte();
				codePoint = ((byte1 & 0x1F) << 6) | byte2;
				if (codePoint >= 0x80) {
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}

			// 3-byte sequence (may include unpaired surrogates)
			if ((byte1 & 0xF0) == 0xE0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
				if (codePoint >= 0x0800) {
					checkScalarValue(codePoint);
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}

			// 4-byte sequence
			if ((byte1 & 0xF8) == 0xF0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				byte4 = readContinuationByte();
				codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
					(byte3 << 0x06) | byte4;
				if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
					return codePoint;
				}
			}

			throw Error('Invalid UTF-8 detected');
		}

		var byteArray;
		var byteCount;
		var byteIndex;
		function utf8decode(byteString) {
			byteArray = ucs2decode(byteString);
			byteCount = byteArray.length;
			byteIndex = 0;
			var codePoints = [];
			var tmp;
			while ((tmp = decodeSymbol()) !== false) {
				codePoints.push(tmp);
			}
			return ucs2encode(codePoints);
		}

		/*--------------------------------------------------------------------------*/

		var utf8 = {
			'version': '2.1.2',
			'encode': utf8encode,
			'decode': utf8decode
		};

		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return utf8;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}	else if (freeExports && !freeExports.nodeType) {
			if (freeModule) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = utf8;
			} else { // in Narwhal or RingoJS v0.7.0-
				var object = {};
				var hasOwnProperty = object.hasOwnProperty;
				for (var key in utf8) {
					hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.utf8 = utf8;
		}

	}(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)(module), (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Media = __webpack_require__(4);

	var _Media2 = _interopRequireDefault(_Media);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/** Class represents user of Memex */
	var User = function () {
	  /** Avatar */

	  /** Email of user (unique) */
	  function User() {
	    _classCallCheck(this, User);
	  }
	  /** Users password */

	  /** Fullname of user in format FirstName LastName */


	  /** Unique user identifier */


	  _createClass(User, [{
	    key: 'fromJSON',
	    value: function fromJSON(json) {
	      this.id = json.id;
	      this.email = json.email;
	      this.fullname = json.fullname;
	      this.avatar = json.avatar;
	      this.password = json.password;
	    }
	  }, {
	    key: 'toJSON',
	    value: function toJSON() {
	      var object = {
	        email: this.email,
	        fullname: this.fullname,
	        password: this.password
	      };
	      if (this.avatar != null) {
	        object.avatar_muid = this.avatar.muid;
	      }
	      return object;
	    }
	  }]);

	  return User;
	}();

	exports.default = User;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Media = __webpack_require__(4);

	var _Media2 = _interopRequireDefault(_Media);

	var _Types = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/** Class represents space (abstraction for linked spaces) */
	var Space = function () {
	  /** Set of space representations (media that defines space at most concrete level) */

	  /** Each space can define its tintColor */

	  /** Visibility state of space */
	  function Space() {
	    _classCallCheck(this, Space);

	    this.state = _Types.entityStates.unknown;
	    this.spaceType = _Types.spaceTypes.collection;
	    this.representations = [];
	    this.unread = false;
	  }

	  /**
	   * Returns visible representation of specified type
	   *
	   * @param MediaType mediaType: Type of media/representation
	   * @returns Media: Returns found media (null if not found)
	   */

	  /** Space unread flag */

	  /** Defines semantic type of space (eg. com.memex.media.collection, etc.) */

	  /** Caption/name of space */


	  /** Unique space identifier */


	  _createClass(Space, [{
	    key: 'getRepresentation',
	    value: function getRepresentation(mediaType) {
	      if (this.representations == null) {
	        return null;
	      }
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.representations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var media = _step.value;

	          if (media.mediaType === mediaType && media.state === _Types.entityStates.visible) {
	            return media;
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      return null;
	    }
	  }, {
	    key: 'fromJSON',
	    value: function fromJSON(json) {
	      this.MUID = json.MUID;
	      this.state = json.state;
	      this.tagLabel = json.tag_label;
	      this.tagColor = json.tag_color;
	      this.spaceType = json.type_identifier;
	      this.unread = json.unread || false;
	      if (json.representations != null) {
	        this.representations = json.representations.map(function (json) {
	          var media = new _Media2.default();
	          media.fromJSON(json);
	          return media;
	        });
	      } else {
	        this.representations = null;
	      }
	    }
	  }, {
	    key: 'toJSON',
	    value: function toJSON() {
	      return {
	        type_identifier: this.spaceType,
	        state: this.state,
	        tag_label: this.tagLabel,
	        tag_color: this.tagColor,
	        unread: this.unread,
	        representations: this.representations != null ? this.representations.map(function (media) {
	          return media.toJSON();
	        }) : null
	      };
	    }
	  }]);

	  return Space;
	}();

	exports.default = Space;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Types = __webpack_require__(5);

	var _Space = __webpack_require__(10);

	var _Space2 = _interopRequireDefault(_Space);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/** Class represents link between two spaces. */
	var Link = function () {
	  /** Origin space */

	  /** Link visibility state */
	  function Link() {
	    _classCallCheck(this, Link);

	    this.state = _Types.entityStates.unknown;
	  }
	  /** Target space */

	  /** Sequence order index is used for reordering of links in space */


	  /** Unique link identifier */


	  _createClass(Link, [{
	    key: 'fromJSON',
	    value: function fromJSON(json) {
	      this.MUID = json.MUID;
	      this.state = json.state;
	      this.order = json.order;
	      if (json.origin_space_muid != null) {
	        this.origin = new _Space2.default();
	        this.origin.muid = json.origin_space_muid;
	      }
	      if (json.target_space_muid != null) {
	        this.target = new _Space2.default();
	        this.target.muid = json.target_space_muid;
	      }
	      if (json.target_space != null) {
	        this.target = new _Space2.default();
	        this.target.fromJSON(json.target_space);
	      }
	    }
	  }]);

	  return Link;
	}();

	exports.default = Link;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Types = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/** Class representing app. */
	var App = function () {
	  /** Approval state of the app */

	  /** App product page */

	  /** Secription of app (is used in review process) */


	  /** Unique identifier */
	  function App() {
	    _classCallCheck(this, App);
	  }
	  /** Default plaform for the app. App can be used from any other platform. This value is used only for suggestion of SDK. */

	  /** App token (is sent with every request in X-App-Token HTTP header) */

	  /** Developer contact email */

	  /** Name of app */


	  _createClass(App, [{
	    key: 'fromJSON',
	    value: function fromJSON(json) {
	      this.id = json.id;
	      this.name = json.name;
	      this.description = json.description;
	      this.email = json.email;
	      this.webpage = json.webpage;
	      this.token = json.token;
	      this.state = json.state;
	      this.platform = json.platform;
	    }
	  }, {
	    key: 'toJSON',
	    value: function toJSON() {
	      return {
	        name: this.name,
	        description: this.description,
	        email: this.email,
	        webpage: this.webpage,
	        platform: this.platform
	      };
	    }
	  }]);

	  return App;
	}();

	exports.default = App;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var environmentTypes = exports.environmentTypes = {
	  /** Production */
	  production: 0,
	  /** Staging (internal use only) */
	  stage: 1,
	  /** Local (internal use only) */
	  local: 2
	};

	/** Configuration of SDK */


	/** Environment of SDK */

/***/ }
/******/ ])
});
;
//# sourceMappingURL=memex-js-sdk.js.map
