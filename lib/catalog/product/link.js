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
  productLink:        '/V1/products/{sku}/links', //POST PUT
  productLinkType:    '/V1/products/{sku}/links/{type}', //GET
  productLinkProduct: '/V1/products/{sku}/links/{type}/{linkedProductSku}', //DELETE

  linkTypes:          '/V1/products/links/types', //GET
  linkTypeAttributes: '/V1/products/links/{type}/attributes', //GET
}

//this.product(sku).link.post(data)
//this.product(sku).link.put(data)
//this.product(sku).link.get(type)
//this.product(sku).link(type).delete(sku)

module.exports.product = (pathParams, service) => {
  let link = (type) => {
    pathParams.type = type;
    return {
      delete: (sku) => {
        pathParams.sku = sku;
        return service.delete(service._format(urls.productLinkedProduct, pathParams))
      }
    }
  }

  link.get = (type) => {
    pathParams.type = type;
    return service.get(service._format(urls.productLinkType, pathParams))
  }
  link.put = (data) => service.put(service._format(urls.productLink, pathParams), data)
  link.post = (data) => service.post(service._format(urls.productLink, pathParams), data)

  return link;
}

//this.product.link.type.get()
//this.product.link.type(type).attributes.get()
module.exports.inline = (service) => {
  let type = (type) => {
    pathParams.type = type;
    return {
      attributes: {
        get: () => service.get(service._format(urls.linkTypes, pathParams))
      }
    }
  }
  type.get = () => service.get(service._format(urls.linkTypes, pathParams))
  return type;
}
