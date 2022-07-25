import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import moment from 'moment'

class ProfileView {
  init(){
    document.title = 'Profile'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <cb-app-header user="${JSON.stringify(Auth.currentUser)}"></cb-app-header>
      <div class="page-content calign">        
        <div class="profile">
          <h1>My Profile</h1>        
            ${Auth.currentUser && Auth.currentUser.avatar ? html`
              <sl-avatar style="--size: 200px; margin-bottom: 1em;" 
                image=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}>
              </sl-avatar>
            `:html`
            <sl-avatar style="--size: 200px; margin-bottom: 1em;"></sl-avatar>
            `}
            <p>Username: ${Auth.currentUser.firstName} ${Auth.currentUser.lastName}</p>
            <p>Email: ${Auth.currentUser.email}</p>
            
            <p>Last updated: ${moment(Auth.currentUser.updatedAt).format('MMMM Do YYYY, @ h:mm a')}</p>
            <sl-button type="primary" @click=${()=> gotoRoute('/editProfile')}>Edit profile</sl-button>
          </div>
        </div>   
      </div>
      <cb-app-footer></cb-app-footer>      
    `
    render(template, App.rootEl)
  }
}


export default new ProfileView()