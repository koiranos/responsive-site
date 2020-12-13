
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Button } from 'reactstrap';
import './Menu.css';

const Web = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const getPages = () => {
        props.getpages();
    }

    const handleClick = event => {
        let pageId = event.target.attributes[1].value;
        let pageIndex = props.pages.findIndex(page => page.id == pageId);
        props.onclick(props.pages[pageIndex].title, props.pages[pageIndex].description);
    }

    const spreadPages = () => {
        let activePages = props.pages.filter(page => {
            return page.isActive;
        })

        let pagesNumber = activePages.length;

        let listItems = []
        listItems = activePages.map(page => {
            return (<NavItem key={page.id}>
                <Link className="nav-link" key={page.id} id={page.id} onClick={handleClick} to="/Page" data-toggle="tooltip" data-placement="bottom" title={page.title} >{pagesNumber > 21? page.title.slice(0,5) + ".." : page.title}</Link>
            </NavItem>)
        })
        return listItems;
    }

    return(
        <div>
            <Navbar color="primary" dark expand="xs">
                <Link className="navbar-brand" to="/" ><img className="mr-3" src="https://www.flaticon.com/svg/static/icons/svg/3081/3081367.svg" alt="brand logo" width="30px"></img>Responsive Pages</Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                            {spreadPages()}
                    </Nav>
                    <Link to="/admin"><Button onClick={getPages} color="secondary">Admin Panel</Button>{' '}</Link>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default Web;