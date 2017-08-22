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
 export default class AddCustomerModal extends Component{
  constructor(props) {
    super(props)
  }

  render() {
      return (
           <Modal
          show={this.props.show}
          onHide={this.props.onHide}>
          {/*//   onEntered={ this.onModalEntered.bind(this) }>*/}
          <Modal.Header closeButton >
            <Modal.Title id="contained-modal-title-lg">Add New Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup >
                <ControlLabel>First Name</ControlLabel>
                <FormControl
                  type="text" placeholder="first Name" />
              </FormGroup>
              <FormGroup >
                <ControlLabel>Last Name</ControlLabel>
                <FormControl
                  type="text" placeholder="last Name" />
              </FormGroup>
              <FormGroup >
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  type="email" placeholder="email" />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button className='btn btn-default' onClick={this.props.onHide}>Cancel</button>
            <button className='btn btn-primary'> Save </button>
          </Modal.Footer>
        </Modal>
        )

    }
  }
AddCustomerModal.propTypes={
show:PropTypes.bool.isRequired,
onHide:PropTypes.func.isRequired

};









