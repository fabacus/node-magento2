/**
 *  Magento 2 Promise API library
 *  File: index.js
 *  We need to define "use strict", so we're doing it here.
 */
"use strict";

/**
 * Continue with the main functionality.
 */

const qs = require('qs');
const request = require('request');
const deepmerge = require('deepmerge');

const defaultOptions = {
  url: null,
  store: 'default',
  userAgent: 'Fabacus Magento 2 Library',
  authentication: {
    login: {
      type: 'admin',
      username: undefined,
      password: undefined
    },
    integration: {
      consumer_key: undefined,
      consumer_secret: undefined,
      access_token: undefined,
      access_token_secret: undefined
    }
  }
}

class MagentoTwo {
  constructor(url, options) {
    if(typeof url != 'string') {
      options = url;
      url = options.url;
    }
    options.url = url;
    this.baseUrl = url;
    this.options = deepmerge(defaultOptions, options);
    this.rootPath = 'rest/'+this.options.store;
    this.authKey = false;
  }

  init() {
    return new Promise((resolve, reject) => {
      this._initHelpers();
      if(this.options.authentication.login.username) {
        let path;
        if(this.options.authentication.login.type == 'admin') {
          path = '/V1/integration/admin/token'
        } else {
          path = '/V1/integration/customer/token'
        }
        this.post(path, {username: this.options.authentication.login.username, password: this.options.authentication.login.password})
          .then(token => {
            this.authKey = token;
            resolve(this);
          })
          .catch(e => {
            reject(e);
          });
      } else if(this.options.authentication.integration.access_token) {
        this.authKey = this.options.authentication.integration.access_token;
      }
      resolve(this);
    });
  }

  _initHelpers() {
    //this.backend = require('./lib/backend')(this);
  }

  get(path, params) {
    return this._send(path, 'GET', params);
  }

  delete(path, params) {
    return this._send(path, 'DELETE', params);
  }

  post(path, params, data) {
    if(!data) {
      data = params;
      params = null;
    }
    return this._send(path, 'POST', params, data);
  }

  put(path, params, data) {
    if(!data) {
      data = params;
      params = null;
    }
    return this._send(path, 'PUT', params, data);
  }

  _send(url, method, params, data, options) {
    let uri = [this.baseUrl,this.rootPath,url].join('/').replace(/\/\//g,'/').replace(':/', '://');
    let headers = {}
    headers['User-Agent'] = this.options.userAgent;
    if(this.authKey) {
      headers.Authorization = 'Bearer '+this.authKey;
    }
    return new Promise((resolve, reject) => {
      request({
        uri: uri,
        method: method,
        headers: headers,
        qs: params,
        body: data
      }, (err, response, body) => {
        if(err) reject(err);
        let returnValue = body;
        try {
          returnValue = JSON.parse(returnValue);
        } catch(e) {
          return reject(e);
        }

        //success if the code is a 200 type
        if(response.statusCode >= 200 && response.statusCode < 300) {
          return resolve(returnValue);
        }

        //otherwise fail it :)
        reject(this._format(returnValue.message, returnValue.parameters, '%{key}'));
      })
    })
  }

  _format(url, replace, replaceTemplate) {
    replaceTemplate = replaceTemplate || '{{key}}';
    for(let key of Object.keys(replace)) {
      let replaceVal = replaceTemplate.replace('{key}', key);
      url = url.replace(replaceVal, replace[key]);
    }
    return url;
  }
}

module.exports = MagentoTwo;
