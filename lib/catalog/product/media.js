/**
 *  Magento 2 Promise API library
 *  File: lib/catalog/product/link.js
 *  We need to define "use strict", so we're doing it here.
 */
"use strict";

/**
 * Continue with the main functionality.
 */

const urls = {
  media:      '/V1/products/{sku}/media', //GET POST
  mediaItem:  '/V1/products/{sku}/media/{entryId}', //DELETE GET PUT
  mediaAttrs: '/V1/products/media/types/{attributeSetName}', //GET
}

//this.product(sku).media.get()
//this.product(sku).media.post(data)
//this.product(sku).media.get(123)
//this.product(sku).media.delete(123)
//this.product(sku).media(123).put(data)

module.exports.product = (pathParams, service) => {
  let media = (entryId) => {
    pathParams.entryId = entryId;
    return {
      put: (data) => service.put(service._format(urls.mediaItem, pathParams), data)
    }
  }
  media.post = (data) => service.post(service._format(urls.media, pathParams), data)
  media.delete = (entryId) => {
    pathParams.entryId = entryId;
    return service.delete(service._format(urls.mediaItem, pathParams), data)
  }
  media.get = (entryId) => {
    pathParams.entryId = entryId || '';
    return service.get(service._format(urls.mediaItem, pathParams));
  }
  return media;
}

//this.product.media.type.get(set);

module.exports.inline = (service) => {
  return {
    type: {
      get: (attributeSetName) => {
        let pathParams = {attributeSetName:attributeSetName}
        return service.get(service._format(urls.mediaAttrs, pathParams));
      }
    }
  }
}
