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
  //'/V1/products/{sku}/options', //GET
  productOption: '/V1/products/{sku}/options/{optionId}', //DELETE GET
  options: '/V1/products/options', //POST
  optionTypes: '/V1/products/options/types', //GET
  option: '/V1/products/options/{optionId}', //PUT
}

//this.product(sku).option.get()
//this.product(sku).option.get(123)
//this.product(sku).option.delete()

module.exports.product = (pathParams, service) => {
  return {
    get: (optionId) => {
      pathParams.optionId = optionId || '';
      return service.get(service._format(urls.productOption, pathParams));
    },
    delete: (optionId) => {
      pathParams.optionId = optionId;
      return service.delete(service._format(urls.productOption, pathParams));
    }
  }
}

// this.product.option.post(data);
// this.product.option.type.get()
// this.product.option(123).put(data)

module.exports.inline = (service) => {
  let option = (optionId) => {
    let pathParams = {optionId:optionId}
    return {
      put: (data) => service.put(service._format(urls.option, pathParams), data)
    }
  }

  option.post = (data) => service.post(urls.options, data);
  option.type = {
    get: () => service.get(urls.optionTypes)
  }
}
