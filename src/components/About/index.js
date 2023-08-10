import React from 'react';
import { Card, Container } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';

function About() {

    return(
      <Container fluid>
<div>
        <h2>About Us </h2>
        <p> Nebula Media has been around since 2015</p>

        <Card>
        <div>
            <h2> What We Do</h2>

            <uL>
            <p>Video editing</p>
        
            <p>Animation</p>
            
            <p>Video Compositing</p>
            
            <p>3D integration onto raw footage</p>
            
            <p>2D integration onto raw footage</p>
            </uL>
        </div>
        </Card>

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

export default About;