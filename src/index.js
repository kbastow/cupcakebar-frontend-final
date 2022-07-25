import App from './App.js'

// components (custom web components)
import './components/cb-app-header'
import './components/cb-shop'
import './components/cb-app-footer'


// styles
import './scss/master.scss'

// modules
import { gsap } from "gsap"



// app.init
document.addEventListener('DOMContentLoaded', () => {
  App.init()
})

