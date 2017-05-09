// @flow

import type { MediaType, MediaDataState, EntityState } from './Types.js';
import { mediaDataStates, mediaTypes, entityStates } from './Types.js';

import base64 from 'base-64';
import utf8 from 'utf8';

export default class Media {

  muid: ?string;
  state: EntityState;
  mediaType: MediaType;
  embedData: ?ArrayBuffer;
  dataDownloadURL: ?string;
  dataState: MediaDataState;

  constructor() {
    this.state = entityStates.unknown;
    this.dataState = mediaDataStates.unknown;
    this.mediaType = mediaTypes.source;
  }

  setEmbedDataFromBase64(base64: string) {
    let binaryString = window.atob(base64);
    let length = binaryString.length;
    let bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    this.embedData = bytes.buffer;
  }

  setEmbedDataFromString(value: string) {
    let length = value.length;
    let array = new Uint8Array(length);
    for (let index = 0; index < length; index++) {
      array[index] = value.charCodeAt(index);
    }
    this.embedData = array.buffer;
  }

  base64EmbedData(): ?string {
    if (this.embedData == null) {
      return null;
    }
    let binary = '';
    let bytes = new Uint8Array(this.embedData);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  textualEmbedData(): ?string {
    if (this.embedData == null) {
      return null;
    }
    let encoded = this.base64EmbedData();
    let bytes = base64.decode(encoded);
    let text = utf8.decode(bytes);
    return text;
  }

  fromJSON(json: Object) {
    this.muid = json.muid;
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

  toJSON(): Object {
    return {
      type: this.mediaType,
      data_download_url: this.dataDownloadURL,
      embeded_data: this.base64EmbedData(),
      data_state: this.dataState
    };
  }
}
