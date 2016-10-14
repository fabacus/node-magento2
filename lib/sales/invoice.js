/**
 *  Magento 2 Promise API library
 *  File: lib/sales/invoice.js
 *  We need to define "use strict", so we're doing it here.
 */
"use strict";

/**
 * Continue with the main functionality.
 */

const urls = {
  invoices: "/V1/invoices", //GET POST
  invoice: "/V1/invoices/{id}", //GET
  comments: "/V1/invoices/comments", //POST
  invoiceComment: "/V1/invoices/{id}/comments", //GET
  capture: "/V1/invoices/{id}/capture", //POST
  email: "/V1/invoices/{id}/emails", //POST
  void: "/V1/invoices/{id}/void" //POST
}

// this.invoice.get(id | filter)
// this.invoice.post(data)
// this.invoice.comment.post(data)
// this.invoice(id).comment.get()
// this.invoice(id).capture.post()
// this.invoice(id).email.post()
// this.invoice(id).void.post()


module.exports = function(service) {
  const invoice = function(id) {
    let pathParams = {id:id};
    return {
      comment: {
        get: () => service.get(service._format(urls.invoiceComment, pathParams))
      },
      capture: {
        post: () => service.post(service._format(urls.capture, pathParams))
      },
      email: {
        post: () => service.post(service._format(urls.email, pathParams))
      },
      void: {
        post: () => service.post(service._format(urls.void, pathParams))
      },
    }
  }

  invoice.comments = {
    post: (data) => service.post(urls.comments, data)
  }
  invoice.post = (data) => service.post(urls.invoices, data)
  invoice.get = (param) => {
    let url
    let pathParams = {}
    let filter = {}
    if(typeof param == 'object' || typeof param == 'undefined') {
      url = urls.invoices;
      filter = param;
    } else {
      pathParams.id = param
      url = urls.invoice
    }
    return service.get(service._format(url, pathParams), filter)
  }

  return invoice;
}
