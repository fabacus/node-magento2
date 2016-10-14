/**
 *  Magento 2 Promise API library
 *  File: lib/catalog/product.js
 *  We need to define "use strict", so we're doing it here.
 */
"use strict";

/**
 * Continue with the main functionality.
 */

const urls = {
  productTypes: '/V1/products/types', //GET
  products:     '/V1/products', //GET POST
  productStock: '/V1/products/{sku}/stockItems/{itemId}', //PUT
  product:      '/V1/products/{sku}', //DELETE GET PUT
}
const downloadableLinks = require('./product/downloadableLink');
const groupPrice = require('./product/groupPrice');
const link = require('./product/link');
const media = require('./product/media');
const option = require('./product/option');
const website = require('./product/website');

//this.catalog.product.type.get()
//this.catalog.product.get()
//this.catalog.product.post(data)
//this.catalog.product.get(123)
//this.catalog.product.delete(123)
//this.catalog.product(123).put(data)
//this.catalog.product(123).stockItem(123).put(data)

module.exports = function(service) {
  let product = (sku) => {
    let pathParams = {sku : sku}
    return {
      put: (data) => service.put(service._format(urls.product, pathParams), data),
      stockItem: (itemId) => {
        pathParams.itemId = itemId;
        return service.put(service._format(urls.productStock, pathParams), data);
      },
      downloadableLink: downloadableLinks.product(pathParams, service),
      groupPrice: groupPrice.product(pathParams, service),
      link: link.product(pathParams, service),
      media: media.product(pathParams, service),
      option: option.product(pathParams, service),
      website: website.product(pathParams, service)
    }
  }

  product.type = {
    get: () => service.get(urls.productTypes)
  }
  product.post = (data) => service.post(urls.products, data);
  product.delete = (sku) => service.delete(service._format(urls.product, {sku: sku}));
  product.get = (sku) => {
    let url, params;
    if(typeof sku == 'object' || typeof param == 'undefined') {
      url = urls.products;
      params = sku;
    } else {
      url = service._format(urls.product, {sku: sku});
      params = undefined;
    }
    return service.get(url, params);
  }

  product.attribute = require('./product/attribute')(service)
  product.attributeSet = require('./product/attributeSet')(service)
  product.downloadableLink = downloadableLinks.inline(service);
  product.link = link.inline(service);
  product.media = media.inline(service);
  product.option = option.inline(service);


  return product;
}
