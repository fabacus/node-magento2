/**
 *  Magento 2 Promise API library
 *  File: lib/catalog/product/attribute.js
 *  We need to define "use strict", so we're doing it here.
 */
"use strict";

/**
 * Continue with the main functionality.
 */

const urls = {
  attributes:       '/V1/products/attributes', //GET POST
  attributeTypes:   '/V1/products/attributes/types', //GET
  attribute:        '/V1/products/attributes/{attributeCode}', //DELETE GET PUT
  attributeOptions: '/V1/products/attributes/{attributeCode}/options', //GET POST
  attributeOption:  '/V1/products/attributes/{attributeCode}/options/{optionId}' //DELETE
}

//this.catalog.product.attribute.get()
//this.catalog.product.attribute.get(code)
//this.catalog.product.attribute.delete(code)
//this.catalog.product.attribute.post(data)
//this.catalog.product.attribute.types.get()
//this.catalog.product.attribute(code).put(data)
//this.catalog.product.attribute(code).option.get()
//this.catalog.product.attribute(code).option.post(data)
//this.catalog.product.attribute(code).option.delete(123)

module.exports = function(service) {
  let attribute = (attributeCode) => {
    let pathParams = {attributeCode: attributeCode}
    return {
      put: (data) => service.put(service._format(urls.attribute, pathParams), data),
      option: {
        get: () => service.get(service._format(urls.attributeOptions, pathParams)),
        post: (data) => service.post(service._format(urls.attributeOptions, pathParams), data),
        delete: (optionId) => {
          pathParams.optionId = optionId;
          return service.delete(service._format(urls.attributeOption, pathParams))
        }
      }
    }
  }

  attribute.get = (param) => {
    let url
    let pathParams = {}
    let query = {}
    if(typeof param == 'object' || typeof param == 'undefined') {
      url = urls.attributes;
      query = param;
    } else {
      url = urls.attribute;
      pathParams.attributeCode = param;
    }
    return service.get(service._format(url, pathParams), query);
  }
  attribute.post = (data) => service.post(urls.attributes, data)
  attribute.delete = (code) => service.delete(service._format(urls.attribute, {attributeCode: code}))

  attribute.types = {
    get: () => service.get(urls.attributeTypes)
  }

  return attribute;
}
