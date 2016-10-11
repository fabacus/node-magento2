/**
 *  Magento 2 Promise API library
 *  File: lib/catalog/product/groupPrice.js
 *  We need to define "use strict", so we're doing it here.
 */
"use strict";

/**
 * Continue with the main functionality.
 */

const urls = {
  priceTiers:     '/V1/products/{sku}/group-prices/{customerGroupId}/tiers', //GET
  priceTier:      '/V1/products/{sku}/group-prices/{customerGroupId}/tiers/{qty}', //DELETE
  priceTierPrice: '/V1/products/{sku}/group-prices/{customerGroupId}/tiers/{qty}/price/{price}', //POST
}

//this.product(sku).groupPrice(customerGroupId).tier.get()
//this.product(sku).groupPrice(customerGroupId).tier.delete(qty)
//this.product(sku).groupPrice(customerGroupId).tier(qty).price(price).post(data);

module.exports.product = (pathParams, service) => {
  let prices = (customerGroupId) => {
    pathParams.customerGroupId = customerGroupId;
    let tier = (qty) => {
      pathParams.qty = qty;
      return {
        price: (price) => {
          pathParams.price = price;
          return {
            post: (data) => service.post(service._format(urls.priceTierPrice, pathParams), data)
          }
        }
      }
    }

    tier.delete = (qty) => {
      pathParams.qty = qty;
      return service.delete(service._format(urls.priceTier, pathParams))
    }
    tier.get = () => service.get(service._format(urls.priceTiers, pathParams))
    return {
      tier: tier
    }
  }
  return prices;
}
