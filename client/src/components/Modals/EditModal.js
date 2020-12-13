import React, { useState, useEffect } from 'react';
import { Col, Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input, } from 'reactstrap';
import axios from 'axios';
import './ModalStyle.css';

const EditModal = (props) => {

    const [objectState, setObjectState] = useState(props.content? props.content : {
        id: null,
        title: "",
        description: "",
        type: 0,
        isActive: false,
        publishedOn: ""
    });

    useEffect(() => {
        if(props.content) {
            setObjectState(props.content);
        } else {
            setObjectState({
                id: null,
                title: "",
                description: "",
                type: 0,
                isActive: false,
                publishedOn: ""
            })

            return function cleanup() {
                let newObject = {...objectState};
                setObjectState( newObject )
            }
        }
      }, [props.content]);


    const handleModalVisibility = ()  => {
        let obj = {
            currentTarget: {
                id: 'tst_1234',
                name: 'close'
            }
        }
        props.toggle(obj);
    }


      const dateFormat = (date) => {
          var newDate = (new Date(Date.now() - date)).toISOString().slice(0, -1);
        return newDate;
      }

    const handleChange = e => {
        let newStateObject = {...objectState}; // old values
        let value = e.target.value;
        let name = e.target.name;
        switch(name) {
            case 'title':
                newStateObject.title = value; // new value
                break;
            case 'description':
                newStateObject.description = value;
                break;
            case 'type':
                let selection = e.currentTarget.value;
                newStateObject.type = selection;
                break;
            case 'active':
                let ischecked = e.currentTarget.checked;
                newStateObject.isActive = ischecked;
                break;
            default:
                break;
        }
        setObjectState( newStateObject ); // setup new values
    }

    const validateForm = (title, description, infoBox) => {
        infoBox.style.display = "none";
        if (title.length > 50 && description.length > 200 ) {
            infoBox.textContent = "Warning! Title and Description are too long. (Title Max = 50 characters, Description Max = 200 characters) ";
            infoBox.style.display = "block";
            return false;
        }else if(title.length > 50) {
            infoBox.textContent = "Warning! Title is too long. (Max = 50 characters) ";
            infoBox.style.display = "block";
            return false;

        } else if(description.length > 200) {
            infoBox.textContent = "Warning! Description is too long. (Max = 200 characters) ";
            infoBox.style.display = "block";
            return false;
        } else if(!title) {
            infoBox.textContent = "Warning! Title field is required";
            infoBox.style.display = "block";
            return false;
        }else {
            return true;
        }
        
    }

    const handleSubmit = () => {
        //validation
        let mdlTitle = document.querySelector('#title-mdl').value;
        let mdlDescription = document.querySelector('#description-mdl').value;
        let infoBox = document.querySelector('.response-info');

        ;

        if(validateForm(mdlTitle, mdlDescription, infoBox)) {
            let url = "";
            let data = {}
            if(objectState.id) {
                url = "/api/pages/" + objectState.id;
                data = objectState;

                axios.put(url, data)
                .then((response) => {
                    handleModalVisibility();
                    props.getpages();
                }, (error) => {
                    let info = document.querySelector('.response-info');
                    info.textContent = error + ". Please contact your administrator.";
                    info.style.display = "block";
                }) 

            }else {
                let url = "/api/pages"
                var tzoffset = (new Date()).getTimezoneOffset() * 60000;

                data = {
                    title: objectState.title,
                    description: objectState.description,
                    type: objectState.type,
                    isActive: objectState.isActive,
                    publishedOn: dateFormat(tzoffset)
                }

                axios.post(url, data)
                .then((response) => {
                    if(response.status == 201) {
                        handleModalVisibility();
                        props.getpages();
                    }
                }, (error) => {
                    let info = document.querySelector('.response-info');
                    info.textContent = error + ". Please contact your administrator.";
                    info.style.display = "block";
                })

            }
        }  
    }

  return (
    <div>
      <Modal className="myModal" isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>
            <h2>{objectState.id? "Edit Selected Page" : "Create Page"}</h2>
        </ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <Label for="title">Page Title</Label>
                    <Input key="title_key" onChange={handleChange} type="text" name="title" id="title-mdl" value={objectState.title} required={true}></Input>
                </FormGroup>

                <FormGroup>
                  <Label for="description">Page Description</Label>
                  <Input key="descr_key" onChange={handleChange} type="textarea" name="description" id="description-mdl" value={objectState.description} ></Input>
                </FormGroup>

                <FormGroup row>
                    <Col>
                    <Label for="pageType" >Type</Label>
                    <Input key="type_key" onChange={handleChange} type="select" name="type" id="pageType-mdl">
                        <option value="0" selected={objectState.type == '0'? true : false} >Menu</option>
                        <option value="1" selected={objectState.type == '1'? true : false} >Events</option>
                        <option value="2" selected={objectState.type == '2'? true : false} >Content</option>
                    </Input>
                    </Col>
                </FormGroup> 

                <FormGroup check>
                  <Label check>
                    <Input id="active-mdl" key="active_key" onChange={handleChange} name="active" type="checkbox" checked={objectState.isActive? true : false} />{' '}
                    Active
                  </Label>
                </FormGroup> 
                <FormGroup>
                    <Button className="mt-4" onClick={handleSubmit}>{objectState.id? "Save Changes" : "Submit Page"}</Button>
                    <span className="response-info text-white mt-2 bg-danger"></span>
                </FormGroup>
            </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default EditModal;