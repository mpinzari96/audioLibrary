import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Dropdown } from 'react-bootstrap-dropdown';
import { BootstrapTable, TableHeaderColumn,InsertButton  } from 'react-bootstrap-table';
import {
	Button, DropdownButton, MenuItem, Modal, FormGroup,
	OverlayTrigger, Tooltip
} from 'react-bootstrap';

@inject('appStore') @observer
export  class NewOrderView{

  render(){
let closeModal = () => appStore.viewStore.hideAddCustomerDialog()

    let saveAndClose = () => {
      api.saveData()
        .then(() => appStore.viewStore.hideAddCustomerDialog())

return(
 <div>
        <button type='button'>Launch modal</button>

        <Modal
          show={appStore.viewStore.addCustomerDialogOpen}
          onHide={closeModal}
          aria-labelledby="ModalHeader"
        >
          <Modal.Header closeButton>
            <Modal.Title id='ModalHeader'>A Title Goes here</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Some Content here</p>
          </Modal.Body>
          <Modal.Footer>
            // If you don't have anything fancy to do you can use
            // the convenient `Dismiss` component, it will
            // trigger `onHide` when clicked
            <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>

            // Or you can create your own dismiss buttons
            <button className='btn btn-primary' onClick={saveAndClose}>
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </div>)

  }
}
}








