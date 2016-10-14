/**
 *  Magento 2 Promise API library
 *  File: lib/sales/order.js
 *  We need to define "use strict", so we're doing it here.
 */
"use strict";

/**
 * Continue with the main functionality.
 */

const urls = {
  orders: "/V1/orders", //POST GET
  orderCreate: "/V1/orders/create", //PUT
  orderItems: "/V1/orders/items", //GET
  orderItem: "/V1/orders/items/{id}", //GET
  order: "/V1/orders/{id}", //GET
  //"/V1/orders/{parent_id}": 1, //PUT (address)
  orderCancel: "/V1/orders/{id}/cancel", //POST
  orderComment: "/V1/orders/{id}/comments", //GET POST
  orderEmail: "/V1/orders/{id}/emails", //POST
  orderHold: "/V1/orders/{id}/hold", //POST
  orderStatus: "/V1/orders/{id}/statuses", //GET
  orderUnhold: "/V1/orders/{id}/unhold", //POST
  orderShip: "/V1/order/{id}/ship", //POST
  orderInvoice: "/V1/order/{id}/invoice"
}

//this.sales.order(id).put(data) //address
//this.sales.order(id).cancel.post()
//this.sales.order(id).comment.get()
//this.sales.order(id).comment.post(data)
//this.sales.order(id).email.post()
//this.sales.order(id).hold.post()
//this.sales.order(id).status.get()
//this.sales.order(id).unhold.post()
//this.sales.order.get(id | filter)
//this.sales.order.post(data)
//this.sales.order.create.put(data)
//this.sales.order.item.get(id | filter)


module.exports = function(service){
  const order = function(id) {
    let pathParams = {id:id}
    return {
      put: (data) => service.put(service._format(urls.order, pathParams), data),
      cancel: {
        post: () => service.post(service._format(urls.orderCancel, pathParams))
      },
      comment: {
        get: () => service.get(service._format(urls.orderComment, pathParams)),
        post: () => service.post(service._format(urls.orderComment, pathParams))
      },
      email: {
        post: () => service.post(service._format(urls.orderEmail, pathParams))
      },
      hold: {
        post: () => service.post(service._format(urls.orderHold, pathParams))
      },
      status: {
        get: () => service.get(service._format(urls.orderStatus, pathParams))
      },
      unhold: {
        post: () => service.post(service._format(urls.orderUnhold, pathParams))
      },
      ship: {
        post: () => service.post(service._format(urls.orderShip, pathParams))
      },
      invoice: {
        post: () => service.post(service._format(urls.orderInvoice, pathParams))
      }
    }
  }

  order.get = (param) => {
    let url;
    let pathParams = {}
    let query = {}
    if(typeof param == 'object' || typeof param == 'undefined') {
      url = urls.orders;
      query = param;
    } else {
      url = urls.order;
      pathParams.id = param;
    }
    return service.get(service._format(url, pathParams), query);
  }
  order.post = (data) => service.post(urls.orders, data);
  order.create = {
    put: (data) => service.put(urls.orderCreate, data)
  }
  order.item = {
    get: (param) => {
      let pathParams = {};
      let filter = {};
      let url;
      if(typeof param == 'object' || typeof param == 'undefined') {
        url = urls.orderItems;
        filter = param
      } else {
        url = urls.orderItem;
        pathParams.id = param;
      }

      return service.get(service.format(url, pathParams), filter);
    }
  }
  return order;
}
