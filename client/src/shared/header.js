import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { MenuItem, Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";

@inject( 'appStore' )
@observer
class Header extends Component {
	handleSignOut( e ) {
		this.props.appStore.authStore.signOut()
	}

	render() {
		return (
			<Navbar onSelect={this.handleOnSelect}>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#">Audio Library</a>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav className="pull-right">
					<NavDropdown eventKey={3} title={window.config.displayName} id="nav-user">
						<MenuItem divider/>
						<MenuItem onClick={this.handleSignOut.bind( this )}>Logout</MenuItem>
					</NavDropdown>
				</Nav>
			</Navbar>
		);
	}
}

export default Header;
