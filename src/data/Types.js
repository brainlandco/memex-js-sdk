// @flow

/** Defines known space types */
export type SpaceType = string;
export const spaceTypes = {
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
export type MediaType = string;
export const mediaTypes = {
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
export type MediaDataState = number;
export const mediaDataStates = {
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
export type EntityState = number;
export const entityStates = {
  /** State is unknown */
  unknown: -1,
  /** Entity us visible to user */
  visible: 0,
  /** Entity is trashed and will be deleted soon */
  deleted: 1
};

/** Approval state of app  */
export type AppState = number;
export const appStates = {
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
export type AppPlatform = number;
export const appPlatforms = {
  /** Native REST API */
  rest: 0,
  /** Swift */
  swift: 1,
  /** JavaScript */
  javaScript: 2,
  /** Go */
  golang: 3
};
