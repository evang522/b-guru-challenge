'use strict';
//================================== Import Dependencies ====================>
const orders = require('./Orders.json');

class Company  {
  constructor(orderInput) {
    this.orders = orderInput;
    this.archivedCustomers = [];
    this.customers = this.calculateCustomerInfo(orders);
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
    this.updateCustomerList();

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

  getAllCustomers() {
    console.log(this.customers);
    return this.customers;
  }

  calculateCustomerInfo(_orderInput) {

    let customerDictionary = {};
    _orderInput.forEach(order => {
      if (!this.archivedCustomers.includes(order['Customer Name'])) {
        if (customerDictionary[order['Customer Name']]) {
          customerDictionary[order['Customer Name']].orderCount++;
          customerDictionary[order['Customer Name']].totalPaid+= Number(order['Price']);
        } else {
          customerDictionary[order['Customer Name']] = {
            'Address':order['Customer Address'],
            'orderCount':1,
            'totalPaid':Number(order['Price'])
          }
        }
      }
    })

    return customerDictionary;
  }

  updateCustomerList() {
    this.customers = this.calculateCustomerInfo(this.orders);
  }

  /**
   * @param {String} customerName 
   * @param {Object} customerUpdates
   * @description Searches customer list based on Provided name and updates the orders list based on all Orders that contain a customer by the provided name.
   */
  updateCustomerInfo(customerName, customerUpdates) {
    // Calculate valid updates provided

    const updates= {};
    const acceptedUpdateFields = ['Customer Name','Customer Address'];
    acceptedUpdateFields.forEach(field => {
      if (customerUpdates[field]) {
        updates[field] = customerUpdates[field];
      }
    })
    
    if (!Object.keys(updates).length) {
      const errMsg = 'No Valid updates Provided';
      console.log(errMsg)
      return errMsg;
    }

    this.orders = this.orders.map(order => {
      if (order['Customer Name'] === customerName) {
        return Object.assign({}, order, updates);
      } else {
        return order;
      }
    })
    this.updateCustomerList();
  }


  /**
   * 
   * @param {String} customerName 
   * @description Searches orders by customer name, then 
   */
  deleteCustomerInfo(customerName) {
    this.archivedCustomers.push(customerName);
    this.updateCustomerList();
  }

  /**
   * @param {String} customerName
   * @description Searches through array of orders and returns a list of all orders by a specified customer name 
   */
  getAllOrdersByCustomer(customerName) {

    if (!customerName || typeof customerName !== 'string') {
      return 'Invalid or Missing customer name';
    }

    const orders = [];
    this.orders.forEach(order => {
      if (order['Customer Name'] === customerName) {
        orders.push(order);
      }
    })
    return orders;
  }

  /**
   * 
   * @param {String} customerName 
   * @description Searches customer list and returns the total paid value of the first customer that matches the provided name
   */
  getTotalPaid(customerName) {
    if (this.customers[customerName]) {
      return this.customers[customerName].totalPaid;
    } else {
      const errMsg = 'Customer not found';
      console.log(errMsg);
      return errMsg;
    }

  }


  

}





/*
4. On the deletion of customer data I am given the choice to only delete the customer name from an order, or both the customer name and address. But perhaps it is correct to say that the address belongs equally to the order as it does the customer, although that information is associated with the customer. So should a method which deletes customer data remove both name and address, or just the name?  
—> That’s the tricky part of the exercise :) You can’t remove the customer completely, because then you won’t know you has ordered. You can only remove extra information on the customers, which you have added in the second part of the exercise. 
*/


//================================== Main (for Testing) ====================>
function main() {
  const guru = new Company(orders);
  // guru.returnAll();
  // guru.addNewOrder('Evan Garrett', '26 Barley Way','Ditcher','200','EUR');
  guru.addNewOrder('Jim Halpert', '123 ABC Driver', 'Java Textbook','200');
  guru.addNewOrder('Jim Halpert', '123 ABC Drives', 'ava Textbook','200');
  guru.updateCustomerInfo('Peter Lustig', {'Customer Address':'123 Blah Blah Way'});
  // console.log(guru.getAllOrdersByCustomer('Peter Lustig'));
  console.log(guru.getTotalPaid('Jim Halpert'));
}

main();