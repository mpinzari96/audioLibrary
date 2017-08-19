import React, { Component } from 'react';
import { observer, } from 'mobx-react';


@observer
class Footer extends Component {
	render() {
		return (
			<footer className="footer">
				<div className="container">
					<p className="text-muted">BBC 2017</p>
				</div>
			</footer>
		);
	}
}

export default Footer;
