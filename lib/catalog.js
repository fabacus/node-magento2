/**
 *  Magento 2 Promise API library
 *  File: lib/catalog.js
 *  We need to define "use strict", so we're doing it here.
 */
"use strict";

/**
 * Continue with the main functionality.
 */

module.exports = function(service) {
  return {
    product: require('./catalog/product')(service),
    category: require('./catalog/category')(service),
    stockItem: require('./catalog/stockItem')(service)
  }
}
