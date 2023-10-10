import React, { useState } from "react";
import {
  Card,
  Row,
  NavDropdown,
  Button,
  Container,
  Modal,
} from "react-bootstrap";
import hero from "../../assets/images/hero.png";
import byte from "../../assets/images/byte.png";
import rider from "../../assets/images/rider.png";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
// import { SocialIcon } from "react-social-icons";
import logo from "../../assets/images/logo.png";

function Dashboard() {
  const [lgShow, setLgShow] = useState(false);
  const [lgShow1, setLgShow1] = useState(false);

  return (
    <Container fluid>
      <Row>
        <>
        <Modal
            size="xl"
            show={lgShow1}
            onHide={() => setLgShow1(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Byte Size Soccer Videos
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Nebula Media teamed up with legend british superstar goalie, Tony
                Waiters.
              </p>
              <div className="iframe">
              <iframe width="560" height="315" 
              src="https://www.youtube.com/embed/N2WhwHaicR4?si=DpZil3O_vevDpqEl" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen>
              </iframe>
              </div>
            </Modal.Body>
          </Modal>

          <Modal
            size="xl"
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
                Nebula Media teamed up with legend british superstar goalie, Tony
                Waiters.
              </p>
              <div className="iframe">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/1wI6aDte_1Q"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </Modal.Body>
          </Modal>
        </>

        <div>
          <h2 className="dash-h2">Nebula Media </h2>
          <p className="dash-p">From simple to surreal</p>

          <Card
            className="bg-dark text-white shadow-lg"
            style={{ color: "#000", width: "auto" }}
          >
            <Card.Img
              src={hero}
              style={{ height: "25rem", width: "100rem" }}
              alt="Card image"
            />
            <Card.ImgOverlay>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <Card.Title className="humble-title">
                Humble beginnings
              </Card.Title>
              <Card.Text className="from-title text-white">
                From NYC to TO, delivering a world of experience
              </Card.Text>
            </Card.ImgOverlay>
          </Card>
          <br />
          <NavDropdown.Divider />

      <h2 className="dash-h2">Selling your vision through a customized narrative</h2>
      <p className="dash-p"> Set our team in your sight for your next project</p>

    <br/>
    <Card className="bg-dark text-white shadow-lg" style={{ color: "#000", width: 'auto' }}>
    <Card.Img  src={rider} style={{height: '25rem', width: '100rem'}} alt="Card image" />
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
        
          <Card.Title className="humble-title text-white">3D Animation</Card.Title>
          <Card.Text className="from-title text-white">
          A short low poly film completely made in blender. 
          </Card.Text>
          <Button variant="outline-dark" onClick={() => setLgShow1(true)}>See Video on Youtube</Button>
          
        </Card.ImgOverlay>
    
  </Card>
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
        
        
          <Card.Title className="humble-title text-white">Byte Size Soccer Videos</Card.Title>
          <Card.Text className="from-title text-white">
          Nebula Media and Tony Waiters brings you Byte Size Soccer videos. A series of videos edited by Nebula Media teaching kids all about soccer.
          </Card.Text>
          <Button variant="outline-dark" onClick={() => setLgShow(true)}>See Video on Youtube</Button>
          
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
          Email: <a href="mailto://nebulamedia3d@gmail.com">nebulamedia3d@gmail.com</a>
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
