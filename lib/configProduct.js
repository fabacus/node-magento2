/**
 *  Magento 2 Promise API library
 *  File: lib/bundleProduct.js
 *  We need to define "use strict", so we're doing it here.
 */
"use strict";

/**
 * Continue with the main functionality.
 */

const urls = {
  variations: '/V1/configurable-products/variation', //PUT
  child: '/V1/configurable-products/{sku}/child', //POST
  childrens: '/V1/configurable-products/{sku}/children', //GET
  children: '/V1/configurable-products/{sku}/children/{childSku}', //DELETE
  options: '/V1/configurable-products/{sku}/options', //POST
//  allOptions: '/V1/configurable-products/{sku}/options/all', //GET
  option: '/V1/configurable-products/{sku}/options/{id}' //GET PUT DELETE
}


//this.configProducts.variations(data);
//this.configProducts(sku).child.post(data);
//this.configProducts(sku).children.get()
//this.configProducts(sku).children.delete(childSku)
//this.configProducts(sku).options.post(data)
//this.configProducts(sku).options.get()
//this.configProducts(sku).options.get(id)
//this.configProducts(sku).options.delete(id)
//this.configProducts(sku).options(id).put(data)


module.exports = function(service) {
  let configProducts = (sku) => {
    let pathParams = {sku: sku}

    let options = (id) => {
      pathParams.id = id;
      return {
        put: (data) => service.put(service._format(urls.option, pathParams), data)
      }
    }
    options.post = (data) => service.put(service._format(urls.options, pathParams), data);
    options.get = (id) => {
      id = id || 'all'
      pathParams.id = id
      return service.get(service._format(urls.option, pathParams))
    }
    options.delete = (id) => {
      pathParams.id = id
      return service.delete(service._format(urls.option, pathParams))
    }

    return {
      child: {
        post: (data) => service.post(service._format(urls.child, pathParams), data)
      },
      children: {
        get: () => service.get(service._format(urls.childrens, pathParams)),
        delete: (childSku) => {
          pathParams.childSku = childSku;
          return service.delete(service._format(urls.children, pathParams))
        }
      },
      options: options
    }
  }
  configProducts.variations = (data) => service.put(urls.variations, data);
  return configProducts
}
