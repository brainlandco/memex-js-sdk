// @flow

export type SpaceType = string;
export const spaceTypes = {
  origin: 'com.memex.origin',
  webPage: 'com.memex.media.webpage',
  text: 'com.memex.media.text',
  image: 'com.memex.media.image',
  collection: 'com.memex.media.collection'
};

export type SpaceProcessingState = number;
export const spaceProcessingStates = {
  done: 0,
  scheduled: 1
};

export type MediaType = string;
export const mediaTypes = {
  reference: 'reference',
  source: 'source',
  preview: 'preview',
  summary: 'summary'
};

export type MediaDataState = number;
export const mediaDataStates = {
  unknown: -1,
  waitingForNewUploadURL: 0,
  readyForDataUpload: 1,
  dataValid: 2
};

export type EntityState = number;
export const entityStates = {
  unknown: -1,
  visible: 0,
  deleted: 1
};
