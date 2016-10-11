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
  addOption:          '/V1/bundle-products/options/add', //POST
  types:              '/V1/bundle-products/options/types', //GET
  options:            '/V1/bundle-products/options/{optionId}', //PUT
  productChildren:    '/V1/bundle-products/{sku}/children', //GET
  productLink:        '/V1/bundle-products/{sku}/links/{id}', //POST PUT
  productOption:      '/V1/bundle-products/{sku}/options/{optionId}', //DELETE GET
  productOptionChild: '/V1/bundle-products/{sku}/options/{optionId}/children/{childSku}' //DELETE
}

/*
//this.bundle.option.add.post({data})
//this.bundle.option.type.get()
//this.bundle.option(123).put({data})
//this.bundle.product(sku).children.get()
//this.bundle.product(sku).link(123).post({data})
//this.bundle.product(sku).link(123).put({data})
this.bundle.product(sku).option.get()
this.bundle.product(sku).option.get(123)
this.bundle.product(sku).option.delete(123)
//this.bundle.product(sku).option(123).children.delete(123)
*/

module.exports = function(service) {
  //option function tree
  let option = (id) => {
    let pathParams = {optionId : id}
    return {
      put: (data) => service.put(service._format(urls.options, pathParams), data)
    }
  }
  option.add = {
    post: (data) => service.post(urls.addOption, data)
  }
  option.type = {
    get: () => service.get(urls.types)
  }

  //product function tree
  let product = (sku) => {
    let pathParams = {sku : sku}

    //product option function tree
    let prodOption = (optionId) => {
      pathParams.optionId = optionId;
      return {
        children: {
          delete: (childSku) => {
            pathParams.childSku = childSku;
            return service.delete(service._format(urls.productOptionChild, pathParams))
          }
        }
      }
    }
    prodOption.get = (id) => {
      pathParams.optionId = id || 'all';
      return service.get(service._format(urls.productOption, pathParams));
    }
    prodOption.delete = (id) => {
      pathParams.optionId = id;
      return service.delete(service._format(urls.productOption, pathParams));
    }

    return {
      children: {
        get: () => service.get(urls.productChildren),
      },
      link: (id) => {
        pathParams.id = id;
        return {
          put: (data) => service.put(service._format(urls.productLink, pathParams), data),
          post: (data) => service.post(service._format(urls.productLink, pathParams), data)
        }
      },
      option: prodOption
    }
  }

  return {
    option: option,
    product: product
  }
}
