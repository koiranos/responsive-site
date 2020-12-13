import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button
} from 'reactstrap';

  const PanelMenu = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const handlePages = () => {
      props.handlepages();
    } 

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <Link className="navbar-brand" onClick={handlePages} to="/"><img className="mr-3" src="https://www.flaticon.com/svg/static/icons/svg/3081/3081347.svg" alt="brand logo" width="30px"></img>Responsive Pages | Admin Panel</Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                  <Link key="2" className="nav-link" to="/admin/">Dashboard</Link>
              </NavItem>
            </Nav>
            <Link to="/home"><Button onClick={handlePages} color="primary">View Site</Button></Link>
          </Collapse>
        </Navbar>
      </div>
    );
  }

export default PanelMenu;