import React, { Component } from "react"
import { inject, observer } from "mobx-react"
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css'
import CustomersView from "./../customers/customers-view.js"
import ReportsView from "./../reports/report-view.js"
import NewOrdersView from "./../new-orders/new-orders-view.js"

import MainTabs from "./main-tabs.js"
import Cons from "./../cons.js"
import Header from "../shared/header";
import Footer from "../shared/footer";
// import DevTool, { configureDevtool } from 'mobx-react-devtools';
// // Any configurations are optional
// configureDevtool( {
// 	// Turn on logging changes button programmatically:
// 	logEnabled: true,
// 	// Turn off displaying conponents' updates button programmatically:
// 	updatesEnabled: false,
// 	// Log only changes of type `reaction`
// 	// (only affects top-level messages in console, not inside groups)
// 	logFilter: change => change.type === 'reaction',
// } );

@inject( [ 'appStore' ] ) @observer
export default class App extends Component {
	constructor( props ) {
		super( props )
	}

	renderPage( viewStore ) {

		//all the views go here
		switch( viewStore.page ) {
			case Cons.pages.customers :
				return <CustomersView />
			case Cons.pages.reports :
				return <ReportsView />
		     case Cons.pages.newOrders :
				return <NewOrdersView />

		}
	}

	render() {
		return <div className="App" style={{ width: '100%', height: '100%' }}>

			<Header/>

			<div className="container-fluid container-fixed-lg bg-white">

				<div className="container">

					<MainTabs />
					{appStore.isLoading
						? <h1>Loading...</h1>
						: this.renderPage( appStore.viewStore )
					}
				</div>
			</div>
			<Footer/>
			{/*<DevTool/>*/}
		</div>

	}
}
