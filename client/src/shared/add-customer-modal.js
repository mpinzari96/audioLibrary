import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Dropdown } from 'react-bootstrap-dropdown';
import moment from "moment"
import { BootstrapTable, TableHeaderColumn, InsertButton } from 'react-bootstrap-table';
import {
  Button, Glyphicon, DropdownButton, MenuItem, Modal, FormGroup,
  OverlayTrigger, Tooltip, FormControl, ControlLabel
} from 'react-bootstrap';
var DatePicker = require("react-bootstrap-date-picker");
import PropTypes from 'prop-types';
import form from "./add-customer-component"
import Notifications from "../utils/notification-helper"






@inject('appStore') @observer
export default class AddCustomerModal extends Component {
  constructor(props) {
    super(props)
    this.form = form
  }
  onSave() {
    this.form.validate({ showErrors: true })
      .then((form) => {
        if (form.isValid) {
          let formattedFields = {}
          _.each(this.form.values(), (value, key) => {
            if (form.fields.get(key).$extra === 'date') {
              if (!moment.isMoment(value)) {
                value = moment(value)
              }
              formattedFields[key] = value.isValid() ? value.format() : null
            }
            else {
              formattedFields[key] = value
            }
          })
          this.props.appStore.viewStore.hideAddCustomerDialog()
          this.form.clear()
       appStore.customersStore.createNewCustomer(formattedFields);

          console.log(formattedFields)
        } else {
          const errorMessages = _.filter(form.errors(), (value, key) => {
            return key !== 'email' && !_.isUndefined(value)
          })
          Notifications.ToastError(errorMessages)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}>
        <Modal.Header closeButton >
          <Modal.Title id="contained-modal-title-lg">Add New Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup >
              <ControlLabel>{this.form.$('firstName').label}</ControlLabel>
              <FormControl
                type="text" maxLength={20}
                {...this.form.$(`firstName`).bind() }
                placeholder="First Name" />
                <p>{form.$('firstName').error}</p>
            </FormGroup>
            <FormGroup >
              <ControlLabel>{this.form.$('lastName').label}</ControlLabel>
              <FormControl
                type="text" maxLength={20}
                {...this.form.$(`lastName`).bind() }
                placeholder="Last Name" />
                  <p>{form.$('lastName').error}</p>
            </FormGroup>
            <FormGroup>
              <ControlLabel>{this.form.$('phoneNumber').label}</ControlLabel>
              <FormControl
                type="number"
                maxLength={10}
                {...this.form.$(`phoneNumber`).bind() }
                placeholder="Phone Number" />
                 <p>{form.$('phoneNumber').error}</p>
            </FormGroup>
            <FormGroup >
              <ControlLabel>{this.form.$('email').label}</ControlLabel>
              <FormControl
                {...this.form.$(`email`).bind() }/>
                <p className="form-error">{form.$('email').error}</p>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-default' onClick={this.props.onHide}>Cancel</Button>
          <Button className='btn btn-primary' type='submit' onClick={this.onSave.bind(this)} > Save </Button>
        </Modal.Footer>
      </Modal>
    )

  }
}
AddCustomerModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired

};









