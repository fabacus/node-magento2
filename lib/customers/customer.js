/**
 *  Magento 2 Promise API library
 *  File: lib/sales/customer.js
 *  We need to define "use strict", so we're doing it here.
 */
"use strict";

/**
 * Continue with the main functionality.
 */

const urls = {
  customers: "/V1/customers/", //GET
}



module.exports = function(service) {
  const customer = function(id) {
    let pathParams = {id:id}
    return {
      comment: {
        get: () => service.get(service._format(urls.comments, pathParams)),
        post: (data) => service.post(service._format(urls.comments, pathParams), data)
      },
      email: {
        post: () => service.post(service._format(urls.email, pathParams))
      },
      label: {
        get: () => service.get(service._format(urls.label, pathParams))
      },
    }
  }
  customer.track = {
    post: (data) => service.post(urls.tracks, data),
    delete: (id) => service.delete(service._format(urls.track, {id:id}))
  }
  customer.post = (data) => service.post(urls.customers, data)
  customer.get = (param) => {
    let url;
    let pathParams = {}
    let filter = {}
    if(typeof param == 'object' || typeof param == 'undefined') {
      url = urls.customers;
      filter = param
    } else {
      url = urls.customer
      pathParams = param
    }

    return service.get(service._format(url, pathParams), filter)
  }

  return customer;
}
