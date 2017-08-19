import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Dropdown } from 'react-bootstrap-dropdown';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {
	Button, DropdownButton, MenuItem, Modal, FormGroup,
	OverlayTrigger, Tooltip, 
} from 'react-bootstrap';

@inject('appStore') @observer
export default class NewOrdersView extends Component {

	constructor(props) {
		super(props)

	}
	openAddNewOrder(name) {
		var num = name;
	}
	render() {
		return (
			<div>
				<div>
					<form onDoubleClick={this.openAddNewOrder("testing")}>
						<FormGroup role="form">
							<Button className="btn btn-primary btn-large centerButton" type="submit">New Order</Button>
						</FormGroup>
					</form>
					
					<div class="form-group row">
  <label for="example-text-input" class="col-2 col-form-label">First Name</label>
    <input class="form-control" type="text" value="Enter First Name" id="example-text-input"></input>
	</div>
	<div class="form-group row">
      <div class="offset-sm-2 col-sm-10">
        <button type="submit" class="btn btn-primary">Sign in</button>
      </div>
    </div>
	 <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Working example with validation</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
      </form>
  

				</div>
			</div>
		)
	}
}
