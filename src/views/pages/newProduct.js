import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import ProductAPI from '../../ProductAPI'
import Toast from '../../Toast'

class newProductView {
  init(){
    document.title = 'New Product'    
    this.render()    
    Utils.pageIntroAnim()
  }

  async newProductSubmitHandler(e) {
    e.preventDefault()
    const submitBtn = document.querySelector('.new-prod-submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData

    try {
      await ProductAPI.newProduct(formData)
      Toast.show('Product added!')
      submitBtn.removeAttribute('loading')
      // reset form
      // reset text + textarea inputs
      const textInputs = document.querySelectorAll('sl-input, sl-textarea')
      if (textInputs) textInputs.forEach(textInput => textInput.value = null)
      // reset radio inputs
      const radioInputs = document.querySelectorAll('sl-radio')
      if (radioInputs) radioInputs.forEach(radioInput => radioInput.removeAttribute('checked'))
      // reset ifile input
      const fileInput = document.querySelector('input[type=file]')
      if (fileInput) fileInput.value = null
      
    } catch(err) {
      Toast.show(err, 'error')
      submitBtn.removeAttribute('loading')
    }
   
  }

  render(){
    const template = html`
       <cb-app-header user="${JSON.stringify(Auth.currentUser)}"></cb-app-header>
      <div class="page-content">        
        <sl-form class="page-form" @sl-submit=${this.newProductSubmitHandler}>
        <div class="add-product">
          <h1>Add Product</h1>
          <input type="hidden" name="user" value="${Auth.currentUser._id}" />
          <div class="input-group">
            <sl-input class="new-prod-input" label="Name" type="text" placeholder="Product Name" required></sl-input>
          </div>
          <div class="input-group">              
            <sl-input class="new-prod-input" label="Price" type="text" placeholder="Product Price" required>
              <span slot="prefix">Box of a dozen - $</span>
            </sl-input>
          </div>
          <div class="input-group">
            <sl-textarea class="new-prod-text" label="Description" rows="4" placeholder="Product Description"></sl-textarea>
          </div>
          <div class="input-group">
            <sl-textarea class="new-prod-text" label="Ingredients" rows="4" placeholder="Product Ingredients"></sl-textarea>
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <label>Product Image</label><br>
            <input type="file" name="image" />              
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <label>Gluten Free</label><br>
            <sl-radio-group label="Gluten" no-fieldset>
              <sl-radio name="gluten-free" value="gluten-free">Yes</sl-radio>
              <sl-radio name="gluten-free" value="nut-free">No</sl-radio>
            </sl-radio-group><br>  
            <label>Nut Free</label><br>
            <sl-radio-group label="Nut" no-fieldset>
              <sl-radio name="nut-free" value="true">Yes</sl-radio>
              <sl-radio name="nut-free" value="false">No</sl-radio>
            </sl-radio-group><br>
            <label>Dairy Free</label><br>
            <sl-radio-group label="Dairy" no-fieldset>
              <sl-radio name="dairy-free" value="true">Yes</sl-radio>
              <sl-radio name="dairy-free" value="false">No</sl-radio>
            </sl-radio-group> <br> 
            <label>Vegan</label><br>
            <sl-radio-group label="Vegan" no-fieldset>
              <sl-radio name="vegan" value="true">Yes</sl-radio>
              <sl-radio name="vegan" value="false">No</sl-radio>
            </sl-radio-group><br> 
          </div>
          <sl-button type="primary" class="new-prod-submit-btn" submit>Add Product</sl-button>
          </div>
        </sl-form>   
        
      </div>
      <cb-app-footer></cb-app-footer>      
    `
    render(template, App.rootEl)
  }
}


export default new newProductView()