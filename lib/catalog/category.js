const urls = {
  categorys: '/V1/categories': 2, //GET POST
  category: '/V1/categories/{categoryId}': 3, //DELETE GET PUT
  categoryMove: '/V1/categories/{categoryId}/move': 1, //PUT
  categoryProducts: '/V1/categories/{categoryId}/products': 3, //GET POST PUT
  categoryProduct: '/V1/categories/{categoryId}/products/{sku}': 1, //DELETE
  '/V1/categories/attributes': 1, //GET
  '/V1/categories/attributes/{attributeCode}': 1, //GET
  '/V1/categories/attributes/{attributeCode}/options': 1, //GET
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
this.category.attribute.get(params)
this.category.attribute.get(code)
this.category.attribute(code).option.get()

module.exports = function(service) {
  let category = (categoryId) => {
    let pathParams = {categoryId:categoryId}
    return {
      put: (data) => service.put(service._format(urls.category, pathParams), data),
      move:: {
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
    if(typeof categoryId == 'object') {
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
        get: () =>
      }
    }
  }

  return category;
}
