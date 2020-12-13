// import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import axios from 'axios';

const DeleteModal = (props) => {

    const handleModalVisibility = ()  => {
      let obj = {
          currentTarget: {
              id: 'tst_1234',
              name: 'close'
          }
      }
      props.toggle(obj);
    }

    const deletePage = e => {
      let pageId = props.content? props.content.id: `` 
      let url = '/api/pages/' + pageId;
      let params = {
        params: pageId
      };
        // fetch delete request
        axios.delete(url, params).then((response) => {
          handleModalVisibility();
          props.getpages();
        }, (error) => {
          let info = document.querySelector('.response-info');
          info.textContent = error + ". Please contact your administrator.";
          info.style.display = "block";
        })
    }

    return (
        <div className={props.className}>
        <Modal isOpen={props.isOpen} toggle={props.toggle} className={props.className}>
            <ModalHeader toggle={props.toggle}>
                <h4 className={props.className}>Do you want to delete this page?</h4>
            </ModalHeader>
            <ModalFooter>
                <Button onClick={props.toggle} color="danger">Cancel</Button>
                <Button onClick={deletePage} color="success">Delete</Button>
                <span className="response-info text-white mt-2 bg-danger"></span>
            </ModalFooter>
        </Modal>
        </div>
    );
}

export default DeleteModal;