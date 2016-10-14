/**
 *  Magento 2 Promise API library
 *  File: lib/sales/shipment.js
 *  We need to define "use strict", so we're doing it here.
 */
"use strict";

/**
 * Continue with the main functionality.
 */

const urls = {
  shipments: "/V1/shipment/", //GET POST
  tracks: "/V1/shipment/track", //POST
  track: "/V1/shipment/track/{id}", //DELETE
  shipment: "/V1/shipment/{id}", //GET
  comments: "/V1/shipment/{id}/comments", //POST GET
  email: "/V1/shipment/{id}/emails", //POST
  label: "/V1/shipment/{id}/label" // GET
}

// this.sales.shipment.get(id | filter);
// this.sales.shipment.post(data)
// this.sales.shipment.track.post()
// this.sales.shipment.track.delete(id)
// this.sales.shipment(id).comment.get()
// this.sales.shipment(id).comment.post(data)
// this.sales.shipment(id).email.post()
// this.sales.shipment(id).label.get()

module.exports = function(service) {
  const shipment = function(id) {
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
  shipment.track = {
    post: (data) => service.post(urls.tracks, data),
    delete: (id) => service.delete(service._format(urls.track, {id:id}))
  }
  shipment.post = (data) => service.post(urls.shipments, data)
  shipment.get = (param) => {
    let url;
    let pathParams = {}
    let filter = {}
    if(typeof param == 'object' || typeof param == 'undefined') {
      url = urls.shipments;
      filter = param
    } else {
      url = urls.shipment
      pathParams = param
    }

    return service.get(service._format(url, pathParams), filter)
  }

  return shipment;
}
