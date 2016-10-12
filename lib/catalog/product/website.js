/**
 *  Magento 2 Promise API library
 *  File: lib/catalog/product/option.js
 *  We need to define "use strict", so we're doing it here.
 */
"use strict";

/**
 * Continue with the main functionality.
 */

const urls = {
  websites: '/V1/products/{sku}/websites', //POST PUT
  website:  '/V1/products/{sku}/websites/{websiteId}' //DELETE
}

// this.product(sku).website.post(data)
// this.product(sku).website.put(data)
// this.product(sku).website.delete(id)

module.exports.product = (pathParams, service) => {
  return {
    put: (data) => service.put(service._format(urls.websites, pathParams), data),
    post: (data) => service.post(service._format(urls.websites, pathParams), data),
    delete: (websiteId) => {
      pathParams.websiteId = websiteId;
      return service.put(service._format(urls.websites, pathParams), data)
    }
  }
}
