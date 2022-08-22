import App from './../../App'
import {html, render } from 'lit-html'
import Auth from './../../Auth'
import Utils from './../../Utils'
import OrderAPI from './../../OrderAPI'
import Toast from './../../Toast'
import moment from 'moment'
class OrdersView {
    init(){
    document.title = 'Orders'  
    this.orders = null  
    this.render()    
    Utils.pageIntroAnim()
    this.getOrders()
  }

  async getOrders(){
    try{
      const orderId = Utils.getParams().orderId;
      this.orders = await OrderAPI.getOrders(orderId)
      console.log(this.orders)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  getOrderDescription(products) {
    return products.map((e) => e.productName).join(', 1x Box ')
  }

  getCustomerName(customer) {
    if (customer !== null) {
        return `${customer.firstName} ${customer.lastName}`
    }
  }

  async clearOrdersHandler() {
    try {
      await OrderAPI.deleteOrder(this.id);
      Toast.show("Order fulfilled");
      let deleteItem = new Event('deleteItem');
      this.dispatchEvent(deleteItem);
    } catch (err) {
      Toast.show(err, "error");
    }
  }

  render(){

  const template = html`

  <cb-app-header user="${JSON.stringify(Auth.currentUser)}"></cb-app-header>
    
    <div class="orders">
      <div class="page-content calign">

          <h1>VIEW ORDERS</h1>

          <table class="orders-table calign">
              <tr>
                <th>Order No.</th>
                <th>Date Ordered</th>
                <th>Customer Name</th>
                <th>Order Summary</th>
                <th>Total Paid</th>
                <th>Fulfill</th>
              </tr>
          ${
            this.orders == null ? html`
          <div class="loading calign">
            <img src="../../images/loading-animation.gif"/> 
          </div>


          ` : html`
          ${this.orders.length == 0 
          ? html`<h2> No orders to fulfill</h2>
          <sl-button class="back-btn" type="primary" @click=${() => gotoRoute('/')}>HOME</sl-button>`

            : this.orders.map(
              (order) => html`
              
              
              <tr class="customer-order">
                <td class="order-number">${order._id}</td>
                <td class="order-date"><p>${moment(order.createdAt).format('MMMM D YYYY, @ h:mm a')}</p></td>
                <td class="order-customer">${this.getCustomerName(order.user)}</td>
                <td class="order-summary">1x Box ${this.getOrderDescription(order.products)}</td>                           
                <td class="order-total">$${order.total}</td>
                <td class="order-status" style="text-align:center;"><sl-checkbox></sl-checkbox></td>   
              </tr>
          </table>            
            `
            )}
          `}

      </div>
    </div>
    <!-- <cb-app-footer></cb-app-footer>            -->
    `
    render(template, App.rootEl)
  }
}

export default new OrdersView()