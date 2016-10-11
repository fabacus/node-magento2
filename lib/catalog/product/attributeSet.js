/**
 *  Magento 2 Promise API library
 *  File: lib/catalog/product/attributeSet.js
 *  We need to define "use strict", so we're doing it here.
 */
"use strict";

/**
 * Continue with the main functionality.
 */

const urls = {
  attributeSet:             '/V1/products/attribute-sets', //POST
  attributeSetAttribute:    '/V1/products/attribute-sets/attributes', //POST
  attributeSetGroups:       '/V1/products/attribute-sets/groups', //POST
  attributeSetGroupList:    '/V1/products/attribute-sets/groups/list', //GET
  attributeSetGroup:        '/V1/products/attribute-sets/groups/{groupId}', //DELETE
  //'/V1/products/attribute-sets/sets/list', //GET
  attributeSetId:           '/V1/products/attribute-sets/{attributeSetId}', //DELETE GET PUT
  attributeSetIdAttributes: '/V1/products/attribute-sets/{attributeSetId}/attributes', //GET
  attributeSetIdAttrubute:  '/V1/products/attribute-sets/{attributeSetId}/attributes/{attributeCode}', //DELETE
  attributeSetIdGroup:      '/V1/products/attribute-sets/{attributeSetId}/groups' //PUT
}

//this.catalog.product.attributeSet.post({data})
//this.catalog.product.attributeSet.attribute.post({data})
//this.catalog.product.attributeSet.group.post({data})
//this.catalog.product.attributeSet.group.get()
//this.catalog.product.attributeSet.group.delete(123)
//this.catalog.product.attributeSet.get()
//this.catalog.product.attributeSet.get(123)
//this.catalog.product.attributeSet.delete(123)
//this.catalog.product.attributeSet(123).put({data})
//this.catalog.product.attributeSet(123).attribute.get()
//this.catalog.product.attributeSet(123).attribute.delete()
//this.catalog.product.attributeSet(123).group.put({data})

module.exports = function(service) {
  let attributeSet = (attributeSetId) => {
    let pathParams = {attributeSetId: attributeSetId};
    return {
      put: (data) => service.put(service._format(urls.attributeSetId, pathParams), data),
      attribute: {
        get: () => service.get(service._format(urls.attributeSetIdAttributes, pathParams)),
        delete: (attributeCode) => {
          pathParams.attributeCode = attributeCode;
          return service.delete(service._format(urls.attributeSetIdAttributes, pathParams))
        }
      },
      group: {
        put: (data) => service.put(service._format(urls.attributeSetIdGroup, pathParams), data)
      }
    }
  }

  //additional methods
  attributeSet.delete = (attributeSetId) => service.delete(service._format(urls.attributeSetId, {attributeSetId: attributeSetId}));
  attributeSet.get = (attributeSetId) => service.get(service._format(urls.attributeSetId, {attributeSetId: typeof attributeSetId == 'object' ? 'sets/list' : attributeSetId}), typeof attributeSetId == 'object' ? attributeSetId : undefined);
  attributeSet.post = (data) => service.post(urls.attributeSet, data);
  
  //attribute
  attributeSet.attribute = {
    post: (data) => service.post(urls.attributeSetAttribute, data)
  }
  //groups
  attributeSet.group = {
    post: (data) => service.post(urls.attributeSetGroups, data),
    get: () => service.get(urls.attributeSetGroupList),
    delete: (groupId) => service.delete(service._format(urls.attributeSetGroup, {groupId:groupId}))
  }

  return attributeSet;
}
