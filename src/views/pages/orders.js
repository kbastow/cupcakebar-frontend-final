import App from './../../App'
import {html, render } from 'lit-html'
import Auth from './../../Auth'
import Utils from './../../Utils'
import OrderAPI from './../../OrderAPI'
import Toast from './../../Toast'

class OrdersView {
  async init(){
    document.title = 'Orders'  
    this.userOrders = null  
    this.render()    
    Utils.pageIntroAnim()
    this.getUserOrders() 
  }

  async getUserOrders(){
    try{
      this.userOrders = await OrderAPI.getUserOrders()
      console.log(this.userOrders)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <cb-app-header user="${JSON.stringify(Auth.currentUser)}"></cb-app-header>
      <div class="orders page-content calign">
        <h1>Customer Orders</h1>
        <div class="orders-grid">
          ${this.userOrders == null ? html`
            <sl-spinner></sl-spinner>
          ` : html`
            ${this.userOrders.map(order => html`
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