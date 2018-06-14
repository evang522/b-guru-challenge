'use strict';
//================================== Import Dependencies ====================>
const orders = require('./Orders.json');

class Company  {
  constructor(orderInput) {
    this.orders = orderInput;
  }

  returnAll() {
    console.log(this.orders);
    return this.orders;
  }

  getAllOrdersByCustomer(customerName) {
    let orderCount = 0;
    const results = this.orders.filter(order => {
      if (order['Customer Name'] === customerName) {
        orderCount++;
        return order;
      }
    });

    return {
      orders:results,
      orderCount,
      customerName
    };

  }

  getAllOrdersByAddress(customerAddress) {
    const results = this.orders.filter(order => {
      return order['Customer Address'] === customerAddress;
    });
    return results;
  }

  addNewOrder(customerName,customerAddress,itemName,price,currency) {
    const newOrder = {
      oid:this.orders.length,
      'Customer Name': customerName,
      'Customer Address':customerAddress,
      'Item Name':itemName,
      'Price':price,
      'Currency':currency
    };
    
    this.orders = [
      ...this.orders,
      newOrder
    ].sort((a,b) => Number(a.oid) > Number(b.oid));
    return newOrder;
  }

  updateOrder(id, updateObj) {

    if (!id || typeof id !== 'string') {
      return 'Missing Properly formatted Id';
    }

    let updates = {};
    let acceptedUpdateFields = [
      'Customer Name',
      'Customer Address',
      'Item Name',
      'Price',
      'Currency'
    ];

    acceptedUpdateFields.forEach(field => {
      if (updateObj[field]) {
        updates[field] = updateObj[field];
      }
    });

    this.orders = [
      ...this.orders.filter(order => order.oid !== id),
      Object.assign({}, this.orders.filter(order => order.oid===id)[0], updates)
    ].sort((a,b) => Number(a.oid) > Number(b.oid));

  }

  /** 
   * 
   * @param {String} orderId 
   * @description Receives an order Id and removes this order from the list.
   */
  deleteOrder(orderId) {
    this.orders = [
      ...this.orders.filter(order => order.oid !== orderId)
    ].sort((a,b) => Number(a.oid) > Number(b.oid));
  }

  //=================== Customer Operations ====================>
  getCustomerInfo(customerName) {
    const customerInfo = {};

    const orderForCustomer = this.orders.filter(order => order['Customer Name'] === customerName)[0];

    if (!orderForCustomer) {
      return null;
    }

    customerInfo['Customer Name'] = orderForCustomer['Customer Name'];
    customerInfo['Customer Address'] = orderForCustomer['Customer Address'];

    console.log(customerInfo);
    return customerInfo;
  }

  updateCustomerInfo(customerName, customerUpdates) {
    let updates = {};
    const acceptedUpdateFields = ['Customer Name','Customer Address'];
    acceptedUpdateFields.forEach(field => {
      if (customerUpdates[field]) {
        updates[field] = customerUpdates[field];
      }
    });

    this.orders = this.orders.map(order => {
      if (order['Customer Name'] === customerName) {
        return Object.assign({}, order, updates);
      } else {
        return order;
      }


    });
  }




}






//================================== Main (for Testing) ====================>
function main() {
  const guru = new Company(orders);
  // guru.returnAll();
  guru.addNewOrder('Evan Garrett', '26 Barley Way','Ditcher','200','EUR');
  guru.getCustomerInfo('Evan Garrett');
  guru.updateCustomerInfo('Evan Garrett',{'Customer Name':'Robert Testman'});
  guru.getCustomerInfo('Robert Testman');
}

main();