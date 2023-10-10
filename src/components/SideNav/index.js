
import React, { useState }  from 'react';
import { Container } from 'react-bootstrap/';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/images/logo.png';
// import Toggle from "react-toggle";
// import Card from 'react-bootstrap/Card';
import { FaUser, FaBuffer, FaAt, FaQuestionCircle } from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';

// import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useMediaQuery } from "react-responsive";

function SideNav(props) {
  const {currentTab, setCurrentTab } = props;
  const [isExpended, setExpendState] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (isSystemDark) => setIsDark(isSystemDark)
  );
  return (
    
    <>
    
      {[false].map((expand) => (
        <Navbar data-bs-theme="dark" key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="/">
            <img src={logo} width="90px" height="40px" alt="logo" />
            </Navbar.Brand>

          
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title className="side-neb" id={`offcanvasNavbarLabel-expand-${expand}`}>
                <img src={logo} width="90px" height="40px" alt="logo" />
                <br/>
                  Nebula Media
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link id="b-dash" className={currentTab === "/" ? "mx-2 navActive" : "mx-2"} href="#dashboard"> <FaBuffer /> 
                  <span onClick={() => setCurrentTab("dashboard")}> Dashboard</span>
                  </Nav.Link>

                  <Nav.Link id="a-dash" className={currentTab === "about-us" ? "mx-2 navActive" : "mx-2"}
                  href="#about-us"><FaUser /> <span onClick={() => setCurrentTab("about-us")}> About Us</span>
                  </Nav.Link>

                  <Nav.Link id="c-dash" className={currentTab === "contact" ? "mx-2 navActive" : "mx-2"}
                  href="#about-us"><FaAt /> <span onClick={() => setCurrentTab("contact")}> Contact</span>
                  </Nav.Link>

                  <Nav.Link id="d-dash" className={currentTab === "faq" ? "mx-2 navActive" : "mx-2"}
                  href="#faq"><FaQuestionCircle /> <span onClick={() => setCurrentTab("faq")}> FAQs</span>
                  </Nav.Link>

                </Nav>
                <Form className="d-flex">
                  
        

                <div className="side-footer">
                {isExpended && (
                    <div className="side-info">
                    <div className="icons" alt="admin" srcset="" />
                <div className="side-footer-info">
                <p className="side_footer-user-name"> Nebula </p>
          
                </div>
                </div>
                )}
               
                <SocialIcon className="social-icons" url="mailto:colinnebula@gmail.com" network="mailto" style={{ height: 10, width: 10 }} bgColor="#024e76"/>

                <SocialIcon className="social-icons" url="https://github.com/ColinNebula" network="github" style={{ height: 10, width: 10 }} bgColor="#024e76"/>
                <SocialIcon className="social-icons" url="https://youtube.com/nebulamedia3d" network="youtube" style={{ height: 10, width: 10 }} bgColor="#024e76"/>
                </div>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default SideNav;