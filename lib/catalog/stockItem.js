/**
 *  Magento 2 Promise API library
 *  File: lib/catalog/stockItem.js
 *  We need to define "use strict", so we're doing it here.
 */
"use strict";

/**
 * Continue with the main functionality.
 */

const urls = {
  lowStock: '/V1/stockItems/lowStock/', //GET
  stockItem: '/V1/stockItems/{sku}' //GET,
}

module.exports = function(service) {
  return {
    get: (sku) => service.get(service._format(urls.stockItem, {sku: sku})),
    lowStock: () => service.get(urls.lowStock)
  }
}
