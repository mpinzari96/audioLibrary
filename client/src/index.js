require( './styles/main.scss' )
import React from 'react'
import SkyTCAdminRouter from "./router";
import ReactDOM from 'react-dom'
import { reaction } from 'mobx'
import { Provider } from 'mobx-react'
import App from './app-main/app'
import AppStore from './app-main/app-store'

const appStore = new AppStore()
const router = new SkyTCAdminRouter( appStore )
window.appStore = appStore // for demo/debug

ReactDOM.render(
	<Provider appStore={appStore}>
		<App />
	</Provider>,
	document.getElementById( 'root' ),
	() => {
		router.init()
	}
)