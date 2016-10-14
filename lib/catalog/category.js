/**
 *  Magento 2 Promise API library
 *  File: lib/catalog/category.js
 *  We need to define "use strict", so we're doing it here.
 */
"use strict";

/**
 * Continue with the main functionality.
 */

 const urls = {
  categorys: '/V1/categories', //GET POST
  category: '/V1/categories/{categoryId}', //DELETE GET PUT
  categoryMove: '/V1/categories/{categoryId}/move', //PUT
  categoryProducts: '/V1/categories/{categoryId}/products', //GET POST PUT
  categoryProduct: '/V1/categories/{categoryId}/products/{sku}', //DELETE
  categoryAttributes: '/V1/categories/attributes', //GET
  categoryAttribute: '/V1/categories/attributes/{attributeCode}', //GET
  categoryAttributeOptions: '/V1/categories/attributes/{attributeCode}/options', //GET
}

//this.category(id).put(data)
//this.category(id).move.put(data)
//this.category(id).product.get()
//this.category(id).product.delete(sku)
//this.category(id).product.post(data)
//this.category(id).product.put(data)
//this.category.get(params)
//this.category.post(data)
//this.category.get(id)
//this.category.delete(id)
//this.category.attribute.get(params)
//this.category.attribute.get(code)
//this.category.attribute(code).option.get()

module.exports = function(service) {
  let category = (categoryId) => {
    let pathParams = {categoryId:categoryId}
    return {
      put: (data) => service.put(service._format(urls.category, pathParams), data),
      move: {
        put: (data) => service.put(service._format(urls.categoryMove, pathParams), data)
      },
      product: {
        get: () => service.get(service._format(urls.categoryProducts, pathParams)),
        delete: (sku) => {
          pathParams.sku = sku;
          return service.delete(service._format(urls.categoryProduct, pathParams));
        },
        post: (data) => service.post(service._format(urls.categoryProducts, pathParams), data),
        put: (data) => service.put(service._format(urls.categoryProducts, pathParams), data)
      }
    }
  }

  //category inline
  category.get = (categoryId) => {
    let pathParams = {};
    let params = {};
    if(typeof categoryId == 'object' || typeof param == 'undefined') {
      pathParams.categoryId = '';
      params = categoryId;
    } else {
      pathParams.categoryId = categoryId;
    }
    return service.get(service._format(urls.category, pathParams), params);
  }
  category.post = (data) => service.post(urls.categorys, data);
  category.delete = (categoryId) => service.delete(service._format(urls.category, {categoryId:categoryId}));

  category.attribute = (attributeCode) => {
    let pathParams = {attributeCode:attributeCode}
    return {
      option: {
        get: () => service.get(service._format(urls.categoryAttributeOptions, pathParams))
      },
      get: (param) => {
        let pathParams = {};
        let url;
        if(typeof param == 'string') {
          url = urls.categoryAttribute
          pathParams = param
          param = {}
        } else {
          url = urls.categoryAttributes
        }
        return service.get(service._format(url, pathParams), param)
      }
    }
  }

  return category;
}
