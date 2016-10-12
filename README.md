## Installation
```bash
npm install node-magento2
```

## Overview
 - Handles Authentication (both through integration access token and through customer/admin username and password)
 - Includes generic methods for GET/PUT/POST/DELETE HTTP verbs
 - Return Promises
 - Wraps some functionality in a simple chained api

## Basic Usage
```javascript
"use strict";

const Magento2 = require('node-magento2');

//instantiate the client object
const options = {
  authentication: {
    integration: {
      access_token: 'ACCESS_TOKEN_FROM_INTEGRATION_ADMIN_SECTION'
    }
  }
}

const mageClient = new Magento2('http://magento.root.url', options)

//basic usage
mageClient.get('/V1/products', {searchCriteria: { /*...*/ }}) //Get a list of all products
  .then(products => {
    //do something with the returned product data
  })

mageClient.put('/V1/products/SKU_123', {visibility: 1}) //update product SKU_123
  .then(product => {
    //product data that's been modified to be invisible
  })

mageClient.post('/V1/products', { /*A product entity*/}) //Create a new product
  .then(product => {
    //the created product object
  })

mageClient.delete('/V1/procucts/SKU_123') //delete the product SKU_123
```

## Helper Usage
Helpers add a Javascript style API to generate the URLs.

```javascript
"use strict";

const Magento2 = require('node-magento2');

//instantiate the client object
const options = {
  authentication: {
    integration: {
      access_token: 'ACCESS_TOKEN_FROM_INTEGRATION_ADMIN_SECTION'
    }
  }
}

const mageClient = new Magento2('http://magento.root.url', options)

//initialise the helpers
mageClient.init();

//use the api
mageClient.catalog.product.get('SKU_123').then(product => {}) //get a product
mageClient.configProduct('CONFIG_123').options.get().then(options => {}) //get the options for a configurable
```

## Options Object

```javascript
{
  url: null,
  store: 'default', //set a store to contextualise in
  authentication: {
    login: {
      type: 'admin', //admin or customer
      username: undefined,
      password: undefined
    },
    integration: { //from the integrations section in the magento2 backend
      consumer_key: undefined,
      consumer_secret: undefined,
      access_token: undefined,
      access_token_secret: undefined
    }
  }
}
```
