import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Dropdown } from 'react-bootstrap-dropdown';
import { BootstrapTable, TableHeaderColumn, InsertButton } from 'react-bootstrap-table';
import {
  Button, DropdownButton, MenuItem, Modal, FormGroup,
  OverlayTrigger, Tooltip
} from 'react-bootstrap';

@inject('appStore') @observer
export default class NewOrderView{

  render() {
      return (
        <div>
          <Modal
            show={appStore.viewStore.addCustomerDialogOpen}
            onHide={appStore.viewStore.hideAddCustomerDialog}>
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
                  <Button className='btn btn-primary'>Add New Customer</Button>
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
              <button className='btn btn-default' onClick={appStore.viewStore.hideAddCustomerDialog}>Cancel</button>
              <button className='btn btn-primary'> Save </button>
            </Modal.Footer>
          </Modal>
        </div>)

    }
  }









