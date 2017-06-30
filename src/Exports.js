// @flow

import { Spaces } from './Spaces.js';
import User from './data/User.js';
import Media from './data/Media.js';
import Space from './data/Space.js';
import SpaceVisit from './data/SpaceVisit.js';
import Link from './data/Link.js';
import App from './data/App.js';
import { environmentTypes, entityStates } from './data/Types.js';
import { mediaTypes, mediaDataStates } from './data/Media.js';
import { spaceTypes } from './data/Space.js';
import { appPlatforms } from './data/App.js';
import type { MediaType, MediaDataState } from './data/Media.js';
import type { SpaceType } from './data/Space.js';
import type { AppPlatform } from './data/App.js';

var Memex = {
  /** Shared instance of Spaces */
  sharedClient: new Spaces(),
  entityStates: entityStates,
  environmentTypes: environmentTypes,
  mediaTypes: mediaTypes,
  spaceTypes: spaceTypes,
  mediaDataStates: mediaDataStates,
  appPlatforms: appPlatforms,
  Media: Media,
  Space: Space,
  SpaceVisit: SpaceVisit,
  Link: Link,
  App: App,
  User: User,
}

export default Memex;
