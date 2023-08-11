import React from 'react';
import { Card, Container } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';

function About() {

    return(
      <Container fluid>
<div>
        <h2>About Us </h2>
        <p> We are Nebula Media. We saw a need for video editing and we Nebula Media has been around since 2015</p>

        <Card>
        <div>
            <h2 className="about-h2"> What We Do</h2>
            <br/>

            <uL>
            <a href="#edit">Video editing and Compositing</a><br/>

            <a href="#animation" >Animation</a><br/>

            <a href="#modeling">3D Modeling</a><br/>
            
           <a href="#integration">3D integration onto raw footage</a><br/>

           <a href="#art">2D Art Integration</a><br/>

           <a href="#green-s">Green Screen Removal</a><br/>
          
           </uL>
        </div>
        <br/>
        </Card>

<br/>
<Card>
  <h2 className="faq-h2">What We Do</h2>
  <br/>
  <h2 id="edit">Video Editing and Compositing</h2>
  <p>We are located in Vaughan Ontario Canada. Please checkout out contact information for more info.</p>

  <h2 id="animation">Animation</h2>
  <p>This depends on the length of the video, and the work being done on it.
  3D integration will take longer because 
  <br/>we have to create those objects before from different softwares.
  </p>
  
  <h2 id="modeling">3D Modeling</h2>
  <p>Object digitization. we will take pictures of your objects and mke them 3D. and the work being done on it.</p>
  
  <h2 id="#integration">3D Integration onto raw footage</h2>
  <p>This depends on the length of the video, and the work being done on it.</p>
  
  <h2 id="green-s">2D Art and Integration</h2>
  <p>This depends on the length of the video, and the work being done on it.</p>

  <h2 id="art">Green Screen Removal</h2>
  <p>We do green screen removal of videos or raw footages.</p>

  <br/>
  
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

export default About;