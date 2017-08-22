import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Dropdown } from 'react-bootstrap-dropdown';
import { BootstrapTable, TableHeaderColumn, InsertButton } from 'react-bootstrap-table';
import {
  Button, Glyphicon, DropdownButton, MenuItem, Modal, FormGroup,
  OverlayTrigger, Tooltip, FormControl, ControlLabel
} from 'react-bootstrap';
var DatePicker = require("react-bootstrap-date-picker");
import PropTypes from 'prop-types';

@inject('appStore') @observer
 export default class AddNewOrderView extends Component{
  constructor(props) {
    super(props)
  }
  OpenCustomerDialog() {
    appStore.viewStore.hideNewOrderDialog()
    appStore.viewStore.showAddCustomerDialog()
  }
  render() {
      return (
          <Modal
            show={this.props.show}
            onHide={this.props.onHide}>
            {/*//   onEntered={ this.onModalEntered.bind(this) }>*/}
            <Modal.Header closeButton >
              <Modal.Title id="contained-modal-title-lg">Create New Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <FormGroup >
                  <ControlLabel>Customer Name</ControlLabel>
                  <FormControl
                    type="text" placeholder="Customer Name" />
                  <Button className='btn btn-primary' onClick={this.OpenCustomerDialog} >Add New Customer</Button>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Ordered Date</ControlLabel>
                  <DatePicker id="ordered-datepicker" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Expected Date</ControlLabel>
                  <DatePicker id="completed-datepicker" />
                </FormGroup>
                <ControlLabel>Order Summary</ControlLabel>
                <FormGroup
                  bsSize="large">
                  <FormControl type="text" placeholder="Order Summary" />
                </FormGroup>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <button className='btn btn-default' onClick={ this.props.onHide }>Cancel</button>
              <button className='btn btn-primary'> Save </button>
            </Modal.Footer>
          </Modal>
        )

    }
  }
AddNewOrderView.propTypes={
show:PropTypes.bool.isRequired,
onHide:PropTypes.func.isRequired

};









