// @flow

import { Spaces } from './Spaces.js';
import { environmentTypes } from './Configuration.js';
import User from './data/User.js';
import Media from './data/Media.js';
import Space from './data/Space.js';
import Link from './data/Link.js';
import App from './data/App.js';
import { mediaTypes, mediaDataStates, spaceTypes, appPlatforms } from './data/Types.js';
import type { MediaType, MediaDataState, SpaceType, AppPlatform } from './data/Types.js';

var Memex = {
  sharedClient: new Spaces(),
  environmentTypes: environmentTypes,
  mediaTypes: mediaTypes,
  spaceTypes: spaceTypes,
  mediaDataStates: mediaDataStates,
  appPlatforms: appPlatforms,
  Media: Media,
  Space: Space,
  Link: Link,
  App: App,
  User: User,
}

export default Memex;
