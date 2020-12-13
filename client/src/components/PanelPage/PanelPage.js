import React, { useState, useEffect } from 'react';
import './PanelPage.css';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import axios from 'axios';
import EditModal from '../Modals/EditModal';
import DeleteModal from '../Modals/DeleteModal';

const PanelPage = props => {
    
    const [pages, setPages] = useState(props.pages);

    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [addModal, setAddModal] = useState(false);

    const [modalContent, setModalContent] = useState({});

    useEffect(() => {
        fetchAllData();
      });

    const fetchData = id => {
        axios.get(`/api/pages/${id}`).then(res => {
            setModalContent(res.data);
        }).catch(err => console.log(err));
    }

    //get pages
    const fetchAllData = () => {
        axios.get('/api/pages').then(response => setPages(response.data));
    }

    const handleDates = pagedate => {
        let fdate = new Date(pagedate);
        let newDate = fdate.toLocaleDateString() + ", " + fdate.toLocaleTimeString();

        return newDate;
    }

    const handlePageType = type => {
        let typeName = "";
        switch(type) {
            case 0:
                typeName = 'Menu';
                break;
            case 1:
                typeName = "Events";
                break;
            case 2:
                typeName = "Content";
                break;
            default:
                break;
        }
        return typeName;
    }


    const toggle = (e) => {
        let itemID = '';
        let actionType = e.currentTarget.name;
        if(actionType != 'close'){
            itemID = e.currentTarget.id.slice(4,8);
            if(itemID) {
                fetchData(itemID);
            }
        }
        
        switch(actionType) {
            case 'edit':
                setEditModal(true);
                break;
            case 'add':
                setAddModal(true);
                break;
            case 'delete':
                setDeleteModal(true);
                break;
            default:
                setEditModal(false);
                setAddModal(false);
                setDeleteModal(false);
                break;

        }
    }
        
        const fillPages = () => {
        const table = pages.map(page => {
            return (<tr key={page.id}>
                <td>{page.title}</td>
                <td>{page.description}</td>
                <td>{handlePageType(page.type)}</td>
                <td>{handleDates(page.publishedOn)}</td>
                <td>
                   {page.isActive? <img src="https://www.flaticon.com/svg/static/icons/svg/463/463574.svg" alt="active page" width="20px" ></img> : <img src="https://www.flaticon.com/svg/static/icons/svg/463/463612.svg" alt="inactive page" width="20px" ></img>} 
                </td>
                <td>
                    <button name="edit" className="manipulation-link" id={`edt_${page.id}`} key={page.id} onClick={toggle} >
                        <img className="img-icon" src="https://www.flaticon.com/svg/static/icons/svg/364/364273.svg" alt="Edit Page" ></img>
                    </button>
                </td>
                <td>
                    <button name="delete" className="manipulation-link" id={`del_${page.id}`} key={page.id} onClick={toggle} >
                        <img className="img-icon" src="https://www.flaticon.com/svg/static/icons/svg/364/364296.svg" alt="Delete Page" ></img>
                    </button>
                </td>
            </tr>
            )
        });

        return table;
    }

    return (
        <Container fluid className="myContainer">
            <Row className="container-row">
                <Col className="mt-5">
                    <Row className="content-row">
                        <Col xs="10">
                            <h3>Pages</h3>
                            <p>This section presents the availiable pages that your website contains, their status and editing and previewing options</p>
                        </Col>
                        <Col xs="2">
                            <Button className="btn btn-success" name="add" id="add" onClick={toggle} ><img className="mr-2" src="https://www.flaticon.com/svg/static/icons/svg/189/189689.svg" alt="" width="20px"  ></img>Create Page</Button>
                        </Col>
                        <Col xs="12">
                            <div className="table-responsive">
                            <Table className="text-center table">
                                <thead>
                                    <tr>
                                        <th scope="col">PAGE</th>
                                        <th scope="col">DESCRIPTION</th>
                                        <th scope="col">TYPE</th>
                                        <th scope="col">PUBLISHED</th>
                                        <th scope="col">ACTIVE</th>
                                        <th scope="col">EDIT</th>
                                        <th scope="col">DELETE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fillPages()}
                                </tbody>
                            </Table>
                            </div>
                        </Col>
                        <EditModal isOpen = {editModal} toggle={toggle} className="text-center" content={modalContent} getpages={fetchAllData} ></EditModal>
                        <EditModal isOpen = {addModal} toggle={toggle} className="text-center" getpages={fetchAllData} ></EditModal>
                        <DeleteModal isOpen = {deleteModal} toggle={toggle} className="text-center" content={modalContent} getpages={fetchAllData} ></DeleteModal>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
export default PanelPage;