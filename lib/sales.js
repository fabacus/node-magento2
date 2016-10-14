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
    order: require('./sales/order')(service),
    invoice: require('./sales/invoice')(service),
    shipment: require('./sales/shipment')(service)
  }
}
