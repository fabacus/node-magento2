/**
 *  Magento 2 Promise API library
 *  File: lib/sales.js
 *  We need to define "use strict", so we're doing it here.
 */
"use strict";

/**
 * Continue with the main functionality.
 */

module.exports = function(service) {
  return {
    customer: require('./customers/customer')(service),

  }
}
