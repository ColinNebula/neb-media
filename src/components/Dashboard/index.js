import React, { useState } from 'react';
import { Card, Row, NavDropdown, Button, Container, Modal } from 'react-bootstrap';
import hero from '../../assets/images/hero.png';
import byte from '../../assets/images/byte.png';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';
import logo from '../../assets/images/logo.png';

function Dashboard() {
  const [lgShow, setLgShow] = useState(false);

    return(
    <Container fluid>
    <Row>
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
        <p className="dash-p">From simple to surreal</p>

        <Card  className="bg-dark text-white shadow-lg" style={{ color: "#000", width: 'auto' }}>
        <Card.Img src={hero} style={{height: '25rem', width: '100rem'}} alt="Card image" />
        <Card.ImgOverlay>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
          <Card.Title className="humble-title">Humble beginnings</Card.Title>
          <Card.Text className="from-title text-white">
            From NYC to TO, delivering a world of experience
          </Card.Text>
          
        </Card.ImgOverlay>
      </Card>
      <br/>
      <br/>
      <NavDropdown.Divider />

      <FaQuoteLeft className="left-q" style={{position: "relative", right:'-300px'}} /> 
      

      <h2 className="dash-h2">Selling your vision through a customized narrative</h2>
      <p className="dash-p"> Set our team in your sight for your next project</p>
      <FaQuoteRight className="right-q" style={{position: "relative", right:'-1000px'}}/>

  
    <br/>
    
    <Card className="bg-dark text-white shadow-lg" style={{ color: "#000", width: 'auto' }}>
    <Card.Img  src={byte} style={{height: '25rem', width: '100rem'}} alt="Card image" />
    <Card.ImgOverlay>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        
          <Card.Title className="humble-title text-white">Byte Size Soccer Videos</Card.Title>
          <Card.Text className="from-title text-white">
          Nebula Media and Tony Waiters brings you Byte Size Soccer videos. A series of videos edited by Nebula Media teaching kids all about soccer.
          </Card.Text>
          <Button variant="primary " onClick={() => setLgShow(true)}>See Video</Button>
          
        </Card.ImgOverlay>
    
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
</Row>
</Container>  


    )

};

export default Dashboard;