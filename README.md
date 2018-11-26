This package resolve issue with certificate (https)
```Error: unable to verify the first certificate```

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

//instantiate the client object with access token
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

//instantiate the client object using access token
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
 
## Using a Magento account to login 
You can use a Magento admin or customer account to generate an access token

```javascript
"use strict";

const Magento2 = require('node-magento2');

//instantiate the client object using access token
const options = {
  authentication: {
    login: {
      username: 'apiuser',
      password: 'password123',
      type: 'admin',
    },
  }
}

const mageClient = new Magento2('http://magento.root.url', options)

//initialise the helpers & generate a token
mageClient.init(m2 => {
  //use the api 
  m2.put('/V1/products/SKU_123', {visibility: 1}) //update product SKU_123
    .then(product => {
      //product data that's been modified to be invisible
    })
});
```
## Using Basic HTTP Auth
Magento's API uses a HTTP Authorization header to authenticate.
Multiple authorization headers do not work with all web servers.
If your dev/staging server is protected behind Basic HTTP Auth the client will send the Basic Auth header as the HTTP Authentication header.
The Magento authentication header is moved to a header called X-Auth.
To get Magento/PHP to read the authentication header/token your server can be configured to pass the X-Auth HTTP header to PHP as the Authorization header.

e.g. on nginx with PHP-FPM

```shell
    fastcgi_param  HTTP_AUTHORIZATION $http_x_auth;
```

```javascript
"use strict";

const Magento2 = require('node-magento2');

//instantiate the client object using access token
const options = {
  authentication: {
    login: {
      username: 'apiuser',
      password: 'password123',
      type: 'admin',
    },
    basic: {
      username: 'httpuser',
      password: 'httppassword'
    }
  }
}

const mageClient = new Magento2('http://magento.root.url', options)

//initialise the helpers & generate a token
mageClient.init(m2 => {
  //use the api 
  m2.put('/V1/products/SKU_123', {visibility: 1}) //update product SKU_123
    .then(product => {
      //product data that's been modified to be invisible
    })
});
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
    },
    basic: {
      username: 'bobbytables',
      password: 'password123'
    }
  }
}
```
