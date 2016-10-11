/**
 *  Magento 2 Promise API library
 *  File: lib/catalog/product/downloadableLink.js
 *  We need to define "use strict", so we're doing it here.
 */
"use strict";

/**
 * Continue with the main functionality.
 */

const urls = {
  sample: '/V1/products/downloadable-links/samples/{id}', //DELETE
  link: '/V1/products/downloadable-links/{id}', //DELETE

  productLinks: '/V1/products/{sku}/downloadable-links', //GET POST
  productSamples: '/V1/products/{sku}/downloadable-links/samples', //GET POST
  productSample:  '/V1/products/{sku}/downloadable-links/samples/{id}', //PUT
  productLink:    '/V1/products/{sku}/downloadable-links/{id}' //PUT
}

//this.product.downloadableLink.sample.delete(123)
//this.product.downloadableLink.delete(123)

module.exports.inline = (service) => {
  return {
    delete: (id) => service.delete(service._format(urls.sample, {id:id})),
    sample: {
      delete: (id) => service.delete(service._format(urls.link, {id:id}))
    }
  }
}

//this.product(sku).downloadableLink.get()
//this.product(sku).downloadableLink.post(data)
//this.product(sku).downloadableLink.sample.get()
//this.product(sku).downloadableLink.sample.post(data)
//this.product(sku).downloadableLink.sample(123).put(data)
//this.product(sku).downloadableLink(123).put(data)

module.exports.product = (pathParams, service) => {
  let link = (id) => {
    pathParams.id = id;
    return {
      put: (data) => service.put(service._format(urls.productLink, pathParams), data)
    }
  }
  link.get = () => services.get(service._format(urls.productLinks, pathParams));
  link.post = (data) => service.post(service._format(urls.productLinks, pathParams), data);

  //samples
  link.sample = (id) => {
    pathParams.id = id;
    return {
      put: (data) => service.put(service._format(urls.productSample, pathParams), data)
    }
  }
  link.sample.post = (data) => service.post(service._format(urls.productSamples, pathParams), data);
  link.sample.get = () => services.get(service._format(urls.productSamples, pathParams));

  return link;
}
