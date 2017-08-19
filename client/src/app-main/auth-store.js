import { observable } from 'mobx'
import AppAuthManager from './app-auth-manager'
import _ from 'lodash'
// import Logger from './../utils/logger'
const STORAGE_KEY = 'auth_data'

/**
 * @class AppState
 */
export default class AuthStore {

	@observable authData
	@observable user
	appStore

	constructor( appStore ) {
		this.appStore = appStore
		this.authData = '';
		let authDataItem = localStorage.getItem( STORAGE_KEY )
		if( !_.isEmpty( authDataItem ) && authDataItem != "undefined" ) {
			//TODO: Check structure
			this.setAuthData( JSON.parse( authDataItem ) );
		}
		// this.logger = new Logger( this.user )
	}

	/**
	 *
	 * @param history
	 */
	authenticate( history ) {
		if( this.isAuthenticated() ) {
		} else {
			history.replace( {
				pathname: '/auth',
				query: history.location.query,
				state: { nextPathname: history.location.pathname + history.location.search }
			} )
		}
	}

	isAuthenticated() {
		return !_.isEmpty( this.authData );
	}

	getAccessToken() {
		return this.authData[ 'access_token' ]
	}

	setAuthData( data ) {
		this.authData = data;
		localStorage.setItem( STORAGE_KEY, JSON.stringify( data ) )

	}

	clearAuth() {
		localStorage.removeItem( STORAGE_KEY );
		this.authData = ''
	}

	signIn() {
		AppAuthManager.signIn()
	}

	signOut() {
		window.location.href='/auth/logout'
		// this.clearAuth()
		// AppAuthManager.signOut( { id_token_hint: this.authData.id_token } )
	}

	// //TODO: Move this somewhere else
	// showErrorNotification( message ) {
	// 	$( 'body' ).pgNotification( {
	// 		message: message,
	// 		type: 'danger'
	// 	} ).show();
	// }
}
