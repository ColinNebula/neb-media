import React, { useState } from 'react';
import { Card, NavDropdown, Button, Container, Modal } from 'react-bootstrap';
import hero from '../../assets/images/hero.png';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';
import logo from '../../assets/images/logo.png';

function Dashboard() {
  const [lgShow, setLgShow] = useState(false);

    return(
    <Container fluid>
    <>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Byte Size Soccer Videos
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          Nebula Media teamed up with legend brit star goalie, Tony Waiters.
          Uv, Textured in Maya 3d software. 
          Sculpted in Zbrush and painted in photoshop. 
          Post effects were done using fusion.

          </p>
          <div className="iframe">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/1wI6aDte_1Q" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen>
          </iframe>
          </div>
          
        </Modal.Body>
      </Modal>
    </>

<div>
        <h2 className="dash-h2">Nebula Media </h2>
        <p className="dash-p"> Big things from humble beginnings.</p>

        <Card className="bg-dark text-white shadow-lg d-block w-100 h-100">
        <Card.Img src={hero} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
          <Card.Text>Last updated 3 mins ago</Card.Text>
        </Card.ImgOverlay>
      </Card>
      <br/>
      <br/>
      <NavDropdown.Divider />

      <FaQuoteLeft className="left-q" /> 
      

      <h2 className="dash-h2">Video editing and compositing with a passion!</h2>
      <p className="dash-p"> From concept to completion</p>
      <FaQuoteRight className="right-q" />

      <Card>
      <Card.Header>Featured Projects</Card.Header>
      <Card.Body>
        <Card.Title>Byte Size Soccer Videos</Card.Title>
        <Card.Text>
          Nebula Media and Tony Waiters brings you Byte Size Soccer videos.
          A series of videos edited by Nebula Media teaching kids all about soccer.
        </Card.Text>
        <Button variant="outline-primary " onClick={() => setLgShow(true)}>See Video</Button>
      </Card.Body>
    </Card>
      <br/>
      <Card className="text-center overflow bg-dark text-white shadow-lg rounded">
      <Card.Header>Get in touch</Card.Header>
      <Card.Body>
      <img src={logo} width="90px" height="40px" alt="logo" />
        <Card.Title>Contact Nebula Media</Card.Title>
        <Card.Text>
        
          Please contact us and find out how we can help create lasting memories with your videos. 
          <address>
          55 Main Street <br />
          Vaughan, On <br />
          L4L-8Y9 <br />
          Phone: <a href="tel:416.856.5764"> (416.856.5764)</a><br />
          Email: <a href="mailto://info@nebmedia.io">info@nebmedia.io</a>
        </address>
        </Card.Text>
        
      </Card.Body>
      <Card.Footer className="text-muted">Neb Media</Card.Footer>
    </Card>
</div>
</Container>  


    )

};

export default Dashboard;