import App from './../../App'
import {html, render } from 'lit-html'
import { gotoRoute, anchorRoute } from "../../Router";
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
      const productId = Utils.getParams().productId;
      this.orders = await OrderAPI.getOrders(productId)
      console.log(this.orders)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <cb-app-header user="${JSON.stringify(Auth.currentUser)}"></cb-app-header>
      
      <div class="orders page-content calign">     
        <div class="orders-grid">
<<<<<<< Updated upstream
          ${this.userOrders == null ? html`
            <sl-spinner></sl-spinner>
=======
         <h1>Customer Orders</h1>
          ${
            this.orders == null 
            ? html`
          <div class="loading">
          <img src="../../images/loading-animation.gif"/> </div>
>>>>>>> Stashed changes
          ` : html`
            ${this.orders.map(
              (order) => html`
            <table
                id="${order._id}"
                user="${order.user_id}"
                orderSummary="${order.orderSummary}"
                orderStatus="${order.orderStatus}"
                createdAt="${order.createdAt}"
            ></table>
            `)}
          `}
        </div>
      </div>
      <cb-app-footer></cb-app-footer>         
    `
    render(template, App.rootEl)
  }
}

export default new OrdersView()