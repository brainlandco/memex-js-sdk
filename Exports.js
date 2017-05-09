// @flow

import { Spaces } from './Spaces.js';
import { environmentTypes } from './Configuration.js';
import Media from './data/Media.js';
import Space from './data/Space.js';
import Link from './data/Link.js';
import { mediaTypes, mediaDataStates, spaceTypes } from './data/Types.js';

var Memex = {
  client: new Spaces(),
  environmentTypes: environmentTypes,
  mediaTypes: mediaTypes,
  spaceTypes: spaceTypes,
  mediaDataStates: mediaDataStates,
  Media: Media,
  Space: Space,
  Link: Link
}

export default Memex;
