// import views
import Auth from './Auth'
import homeView from './views/pages/home'
import fourOFourView from './views/pages/404'
import signinView from './views/pages/signin'
import signupView from './views/pages/signup'
import profileView from './views/pages/profile'
import editProfileView from './views/pages/editProfile'
import aboutUsView from './views/pages/aboutUs'
import shopView from './views/pages/shop'
import favouriteProductsView from './views/pages/favouriteProducts'
import newProductView from './views/pages/newProduct'
import cartView from './views/pages/cart'
import productView from './views/pages/product'
import ordersView from './views/pages/orders'

// define routes
const routes = {
	'/': homeView,	
	'/aboutUs': aboutUsView,
	'/shop': shopView,
	'/product': productView,
	'/favouriteProducts': favouriteProductsView,
	'/newProduct': newProductView,
	'/cart': cartView,
	'/404': fourOFourView,
	'/signin': signinView,
	'/signup': signupView,
	'/profile': profileView,
	'/editProfile': editProfileView,
	'/orders': ordersView,
}

const publicRoutes = {
	'/': homeView,	
	'/aboutUs': aboutUsView,
	'/shop': shopView,
	'/product': productView,
	'/404': fourOFourView,
	'/signin': signinView,
	'/signup': signupView,
}

const privateRoutes = {
	'/favouriteProducts': favouriteProductsView,
	'/newProduct': newProductView,
	'/cart': cartView,
	'/profile': profileView,
	'/editProfile': editProfileView,
	'/orders': ordersView,
}

class Router {
	constructor(){
		this.routes = routes
		this.privateRoutes = privateRoutes
		this.publicRoutes = publicRoutes
	}
	
	init(){
		// initial call
		this.route(window.location.pathname)

		// on back/forward
		window.addEventListener('popstate', () => {
			this.route(window.location.pathname)
		})
	}
	
	route(fullPathname){
		// extract path without params
		const pathname = fullPathname.split('?')[0]
		if (this.privateRoutes[pathname] != null) {
			// Authentication check    
			Auth.check(() => {
				this.privateRoutes[pathname].init()
			}) 
		} else if (this.publicRoutes[pathname] != null) {
			this.publicRoutes[pathname].init()
		} else {			
			// show 404 view instead
			this.publicRoutes['404'].init()			
		}
	}

	gotoRoute(pathname){
		window.history.pushState({}, pathname, window.location.origin + pathname);
		this.route(pathname)
	}	
}

// create appRouter instance and export
const AppRouter = new Router()
export default AppRouter


// programmatically load any route
export function gotoRoute(pathname){
	AppRouter.gotoRoute(pathname)
}


// allows anchor <a> links to load routes
export function anchorRoute(e){
	// e.preventDefault()	
	const pathname = e.target.closest('a').pathname
	AppRouter.gotoRoute(pathname)
}