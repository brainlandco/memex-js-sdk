// @flow

import { Spaces } from './Spaces.js';
import { environmentTypes } from './Configuration.js';
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
  MediaType: MediaType,
  MediaDataState: MediaDataState,
  SpaceType: SpaceType,
  AppPlatform: AppPlatform,
  Media: Media,
  Space: Space,
  Link: Link,
  App: App,
}

export default Memex;
