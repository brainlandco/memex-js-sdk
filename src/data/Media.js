// @flow

import type { EntityState } from './Types.js';
import { entityStates } from './Types.js';

import base64 from 'base-64';
import utf8 from 'utf8';

/** Type of media */
export type MediaType = string;
export const mediaTypes = {
  /** Source of data (every other representation can be derived from it). */
  source: 'source',
  /** Reference is link to source */
  reference: 'reference',
  /** Preview is visual/graphical abstraction of source/reference */
  preview: 'preview',
  /** Summary is textual abstraction of source/reference */
  summary: 'summary'
};

/** Media data upload state */
export type MediaDataState = number;
export const mediaDataStates = {
  /** Client is waiting for server to generate signed dataUploadURL */
  waitingForNewUploadURL: 0,
  /** Data Upload URL is valid and client can upload data */
  readyForDataUpload: 1,
  /** Data is valid and can be downloaded/used */
  dataValid: 2
};

/** Class represents media component of space */
export default class Media {

  /** Unique media identifier */
  MUID: ?string;
  /** Creation timestamp */
  createdAt: ?Date;
  /** Timestamp of last update */
  updatedAt: ?Date;
  /** Visibility state */
  state: EntityState;
  /** Owner user ID */
  ownerID: ?number;
  /** JSON encodec dictionary of media metadata eg. size, encoding, etc. */
  metadata: ?string;
  /** Type of media */
  mediaType: ?MediaType;
  /** Validity of media data */
  dataState: MediaDataState;
  /** Embed media binary data (only if small enough, otherwise use dataDownloadURL and dataUploadURL) */
  embededData: ?ArrayBuffer;
  /** Download url for data (exclusive with embedData) */
  dataDownloadURL: ?string;
  /** Upload link for new data. After data is uploaded it is needed to call mark media as uploaded function. */
  dataUploadURL: ?string;
  /** If media represents any space then its MUID is present */
  representedSpaceMUID: ?string;

  constructor() {
    this.state = entityStates.visible;
  }

  /**
   * Sets embedData (binary format) from base64 format
   *
   * @param string base64: Base64 encoded data
   */
  setEmbedDataFromBase64(base64: string) {
    let binaryString = window.atob(base64);
    let length = binaryString.length;
    let bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    this.embededData = bytes.buffer;
  }

  /**
   * Sets embedData (binary format) from ANSCI ancoded text
   *
   * @param string value: ANSCII encoded data
   */
  setEmbedDataFromString(value: string) {
    let length = value.length;
    let array = new Uint8Array(length);
    for (let index = 0; index < length; index++) {
      array[index] = value.charCodeAt(index);
    }
    this.embededData = array.buffer;
  }

  /**
   * Converts emebedData into base64 encoded string
   *
   * @returns string Base64 encoded embedData
   */
  base64EmbedData(): ?string {
    if (this.embededData == null) {
      return null;
    }
    let binary = '';
    let bytes = new Uint8Array(this.embededData);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  /**
   * Converts utf8 encoded emebedData into string
   *
   * @returns string Decoded text
   */
  textualEmbedData(): ?string {
    if (this.embededData == null) {
      return null;
    }
    let encoded = this.base64EmbedData();
    let bytes = base64.decode(encoded);
    let text = utf8.decode(bytes);
    return text;
  }

  fromJSON(json: Object) {
    this.MUID = json.muid;
    if (json.created_at != null) {
      this.createdAt = new Date(json.created_at);
    }
    if (json.updated_at != null) {
      this.updatedAt = new Date(json.updated_at);
    }
    this.state = json.state;
    this.ownerID = json.owner_id;
    this.metadata = json.metadata;
    this.mediaType = json.type;
    this.dataState = json.data_state;
    if (json.embeded_data != null) {
      this.setEmbedDataFromBase64(json.embeded_data);
    } else {
      this.embededData = null;
    }
    this.dataDownloadURL = json.data_download_url;
    this.dataUploadURL = json.data_upload_url;
    this.representedSpaceMUID = json.represented_space_muid;
  }

  toJSON(): Object {
    let json: any = {};
    json.muid = this.MUID;
    if (this.createdAt != null) {
      json.created_at = this.createdAt.toISOString();
    }
    if (this.updatedAt != null) {
      json.updated_at = this.updatedAt.toISOString();
    }
    json.state = this.state;
    json.owner_id = this.ownerID;
    json.metadata = this.metadata;
    json.type = this.mediaType;
    json.data_state = this.dataState;
    json.embeded_data = this.base64EmbedData();
    json.data_download_url = this.dataDownloadURL;
    json.data_upload_url = this.dataUploadURL;
    json.represented_space_muid = this.representedSpaceMUID;
    return json;
  }
}
