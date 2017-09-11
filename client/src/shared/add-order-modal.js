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
export default class AddNewOrderView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customerName: "",
      customerId:"",
      orderSummary:""


    }
  }
  OpenCustomerDialog() {
    appStore.viewStore.hideNewOrderDialog()
    appStore.viewStore.showAddCustomerDialog()
  }
createOrder(e){
appStore.viewStore.hideNewOrderDialog()
appStore.newOrdersStore.createOrder(this.props.customerId,this.props.customerName,this.state.orderSummary.value)

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
                type="text" placeholder="Customer Name"
                value={this.props.customerName}
                inputRef={(ref) => { this.state.customerName = ref }} />
              <Button className='btn btn-primary' onClick={this.OpenCustomerDialog} >Add New Customer</Button>
            </FormGroup>
            <ControlLabel>Order Summary</ControlLabel>
            <FormGroup
              bsSize="large">
              <FormControl type="text" placeholder="Order Summary"
              inputRef={(ref) => { this.state.orderSummary = ref }} />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Ordered Date</ControlLabel>
              <DatePicker id="ordered-datepicker" />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-default' onClick={this.props.onHide}>Cancel</button>
          <button className='btn btn-primary'onClick={this.createOrder.bind(this)}> Save </button>
        </Modal.Footer>
      </Modal>
    )

  }
}
AddNewOrderView.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired

};









