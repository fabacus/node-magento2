/**
 *  Magento 2 Promise API library
 *  File: lib/catalog/product/parent.js
 *  We need to define "use strict", so we're doing it here.
 */
"use strict";

/**
 * Continue with the main functionality.
 */

const urls = {
  parentIds: '/V1/products/{sku}/parents', //GET
}

//this.product(sku).parent.get()

module.exports.product = (pathParams, service) => {
  return {
    get: () => service.get(service._format(urls.parentIds, pathParams))
  }
}
