import App from './App'
import Auth from './Auth'
import Toast from './Toast'

class ProductAPI {

  async newProduct(formData){
    // send fetch request
    const response = await fetch(`${App.apiBase}/product`, {
      method: 'POST',
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
      body: formData
    })

    // if response not ok
    if(!response.ok){ 
      let message = 'Problem adding product'
      if(response.status == 400){
        const err = await response.json()
        message = err.message
      }      
      // throw error (exit this function)      
      throw new Error(message)
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }

  async getProducts(){
    
    // fetch the json data
    const response = await fetch(`${App.apiBase}/product`, {
      headers: { }
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting products')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }

  async getProduct(id){
    // fetch the json data
    const response = await fetch(`${App.apiBase}/product/${id}`, {
      headers: { }
    })

    // if response not ok
    if(!response.ok){
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)
      throw new Error('Problem getting products')
    }

    // convert response payload into json - store as data
    const data = await response.json()
    console.log(data)

    // return data
    return data
  }
}



export default new ProductAPI()