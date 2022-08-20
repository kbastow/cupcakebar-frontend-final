import App from './../../App'
import {html, render } from 'lit-html'
import Auth from './../../Auth'
import Utils from './../../Utils'
import OrderAPI from './../../OrderAPI'
import Toast from './../../Toast'

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

  render(){

  const template = html`

  <cb-app-header user="${JSON.stringify(Auth.currentUser)}"></cb-app-header>
    
    <div class="orders">
      <div class="page-content calign">
        <h1>CUSTOMER ORDERS</h1>

          <table class="orders-table calign">
              <tr>
                <th>Order Number</th>
                <th>Customer</th>
                <th>Order Summary</th>
                <th>Total</th>
                <th>Date Ordered</th>
                <th>Status</th>
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
                <td class="order-customer">${order.user}</td>
                <td class="order-summary">${order.products}</td>
                <td class="order-total">${order.total}</td>
                <td class="order-date">${order.createdAt}</td>
                <td class="order-status">${order.status}</td>
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